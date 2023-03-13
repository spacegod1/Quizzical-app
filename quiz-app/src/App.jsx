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
      .then((data) => {
        let questionSet = [];

        for (let i = 0; i < data.length; i++) {
          const generatedAns = [
            ...data[i].incorrectAnswers,
            data[i].correctAnswer,
          ];
          const possibleAns = shuffleArr(generatedAns).map((answer) => {
            return {
              id: nanoid(),
              answer: answer,
              isSelected: false,
              isCorrect: answer === data[i].correctAnswer ? true : false,
            };
          });

          questionSet.push({
            id: nanoid(),
            question: data[i].question,
            answers: possibleAns,
            correctAnswer: data[i].correctAnswer,
          });
        }
        setQuizData(questionSet);
      });
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

  // Maps over the API response to render questions
  const renderQuestions = quizData.map((item) => {
    return (
      <Quiz
        key={item.id}
        question={item.question}
        answers={item.answers}
        correctAnswer={item.correctAnswer}
      />
    );
  });

  function startQuiz() {
    setNewQuiz((prevState) => !prevState);
  }

  // create button to check when quiz ends to also start
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
