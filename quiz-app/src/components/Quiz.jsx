import { nanoid } from "nanoid";
import React from "react";
import Options from "./Options";

export default function Quiz(props) {
  const styles = {
    backgroundColor: "#94d7a2",
    border: "none",
  };

  // D6DBF5

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

  //update function to capture selected answers per question
  //

  // check correct answers against selected answers and calculate score

  return (
    <section>
      <h2>{props.question}</h2>
      <div className="possible-answers">{possibleAnswers}</div>
      <hr />
    </section>
  );
}
