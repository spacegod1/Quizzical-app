import React from "react";
import Begin from "./components/Begin";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [newQuiz, setNewQuiz] = React.useState(true);
  const [quizData, setQuizData] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://the-trivia-api.com/api/questions?categories=geography,history,science,society_and_culture,sport_and_leisure&limit=5&difficulty=easy"
    )
      .then((res) => res.json())
      .then((data) => setQuizData(data));
  }, []);

  // Fisher Yates algorithm to shuffle an array
  function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let randomPos = Math.floor(Math.random() * array.length);
      let temp = array[i];
      // swap positions
      array[i] = array[randomPos];
      array[randomPos] = temp;
    }

    return array;
  }

  // console.log(quizData);

  // Maps over the API response to render questions
  const renderQuestions = quizData.map((item) => {
    const generatedAns = [...item.incorrectAnswers, item.correctAnswer];

    return (
      <Quiz
        key={item.id}
        question={item.question}
        options={shuffleArr(generatedAns)}
        correctAnswer={item.correctAnswer}
        data={item}
      />
    );
  });

  function startQuiz() {
    setNewQuiz((prevState) => !prevState);
  }

  return (
    <div className="App">
      {newQuiz ? (
        <Begin quizState={newQuiz} start={startQuiz} />
      ) : (
        renderQuestions
      )}
    </div>
  );
}

export default App;
