import React from "react";

//types
import { AnswerObject } from "../App";

//styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};
export default function QuestionCard(props: Props) {
  return (
    <Wrapper>
      <p className="number">
        Question: {props.questionNr} / {props.totalQuestions}
      </p>
      <p>{props.question}</p>
      <div style={{ marginBottom: "20px" }}>
        {props.answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={props.userAnswer?.correctAnswer === answer}
            userClicked={props.userAnswer?.answer === answer}
          >
            <button
              disabled={props.userAnswer ? true : false}
              value={answer}
              onClick={props.callback}
              style={{ marginBottom: "10px" }}
            >
              <span>{answer}</span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
}
