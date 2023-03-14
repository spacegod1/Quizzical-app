import React from "react";

export default function Options(props) {
  const stylesForSelect = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "",
    border: props.isSelected ? "none" : "",
  };

  function stylesForAnsCheck() {
    let color;
    if (props.isSelected && props.isCorrect) {
      color = "#94d7a2";
    } else if (props.isSelected && !props.isCorrect) {
      color = "#f8bcbc";
    } else if (!props.isSelected && props.isCorrect) {
      color = "#94d7a2";
    } else {
      color = "";
    }

    return {
      backgroundColor: color,
      opacity: !props.isSelected && "50%",
      border: props.isSelected ? "none" : "",
    };
  }

  return (
    <div
      style={props.endQuiz ? stylesForAnsCheck() : stylesForSelect}
      className="option"
      onClick={props.selected}
    >
      {props.value}
    </div>
  );
}
