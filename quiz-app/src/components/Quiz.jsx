import { nanoid } from "nanoid";
import React from "react";
import Options from "./Options";

export default function Quiz(props) {
  const possibleAnswers = props.answers.map((item) => {
    return (
      <Options
        key={item.id}
        value={item.answer}
        selected={() => props.selection(props.id, item.id)}
        isSelected={item.isSelected}
        isCorrect={item.isCorrect}
        endQuiz={props.endQuiz}
      />
    );
  });

  // make app responsive to other view ports

  return (
    <section className="quiz-set">
      <h2>{props.question}</h2>
      <div className="possible-answers">{possibleAnswers}</div>
      <hr />
    </section>
  );
}
