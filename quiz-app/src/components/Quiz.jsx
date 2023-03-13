import { nanoid } from "nanoid";
import React from "react";
import Options from "./Options";

export default function Quiz(props) {
  const styles = {
    backgroundColor: "#94d7a2",
    border: "none",
  };

  // D6DBF5
  console.log(props.answers);

  const possibleAnswers = props.answers.map((item) => {
    return <Options key={item.id} value={item.answer} />;
  });

  //figure out the answer-selection and cross check with correct answers

  return (
    <section>
      <h2>{props.question}</h2>
      <div className="possible-answers">{possibleAnswers}</div>
      <hr />
    </section>
  );
}
