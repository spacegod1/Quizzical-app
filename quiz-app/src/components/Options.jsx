import React from "react";

export default function Options(props) {
  return (
    <div className={props.check ? "correct-answer option" : "option"}>
      {props.value}
    </div>
  );
}

// props
