import React from "react";

export default function Begin(props) {
  const styles = {
    height: props.quizState ? "100vh" : "100%",
  };

  return (
    <div style={styles} className="start-page">
      <h2>Quizzical.</h2>
      <h5 className="start-desc">THIS IS NOT AN IQ TEST! (or is it?)</h5>
      <button onClick={props.start}>Start Quiz</button>
    </div>
  );
}
