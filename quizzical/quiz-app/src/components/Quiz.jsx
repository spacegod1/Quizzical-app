import { nanoid } from "nanoid";
import React from "react";
import Options from "./Options";

export default function Quiz(props) {
  // props.data.options = props.options;

  const [isSelected, setIsSelected] = React.useState(false);

  const styles = {
    backgroundColor: "#94d7a2",
    border: "none",
  };

  // const [selected, setSelected] = React.useState([]);

  const possibleAnswers = props.options.map((item, i) => {
    return <Options key={i} handleAns={() => handle(item)} item={item} />;
  });

  function handle(answer) {
    if (answer === props.correctAnswer) {
      console.log(true);
    }
  }

  return (
    <section>
      <h2>{props.question}</h2>
      <div className="possible-answers">{possibleAnswers}</div>
      <hr />
    </section>
  );
}
