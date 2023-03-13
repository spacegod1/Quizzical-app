import React from "react";

export default function Options(props) {
  return (
    <div className="option" onClick={props.selected}>
      {props.value}
    </div>
  );
}
