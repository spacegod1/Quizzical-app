import React from "react";

export default function Options(props) {
  return (
    <div onClick={props.handleAns} className="option">
      {props.item}
    </div>
  );
}
