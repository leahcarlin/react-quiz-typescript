import React, { useState } from "react";
import { QuestionState, Difficulty, fetchQuizQuestions } from "./API";

//import components
import QuestionCard from "./components/QuestionCard";

// styles
import { GlobalStyle, Wrapper } from "./App.styles";

// types
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const totalQuestions = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      //get user's answer
      const answer = e.currentTarget.value;
      console.log("answer?", answer);
      // check user answer to correct answer
      const correct = questions[number].correct_answer === answer;
      console.log("Correct?", correct);
      // add score if answer is correct
      if (correct) setScore(score + 1);
      // save answer in array of user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers([...userAnswers, answerObject]);
    }
  };

  const nextQuestion = () => {
    const next = number + 1;
    if (next === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === totalQuestions ? (
          <button className="start" onClick={startTrivia}>
            START
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={totalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== totalQuestions - 1 ? (
          <button onClick={nextQuestion} className="next">
            NEXT QUESTION
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
