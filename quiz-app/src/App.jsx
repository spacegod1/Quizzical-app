import React from "react";
import Begin from "./components/Begin";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [newQuiz, setNewQuiz] = React.useState(true);
  const [quizData, setQuizData] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [endQuiz, setEndQuiz] = React.useState(false);
  const [allAnswersSelected, setAllAnswersSelected] = React.useState(false);

  React.useEffect(() => fetchData(), []);
  React.useEffect(() => markAll(), [quizData]);

  function fetchData() {
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
  }

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
        selection={handleSelection}
        id={item.id}
        endQuiz={endQuiz}
      />
    );
  });

  function startQuiz() {
    setNewQuiz((prevState) => !prevState);
  }

  function handleSelection(quizId, answerId) {
    setQuizData((prevData) => {
      return prevData.map((quizElement) => {
        if (quizElement.id === quizId) {
          return {
            ...quizElement,
            answers: quizElement.answers.map((ans) => {
              if (ans.id === answerId) {
                return {
                  ...ans,
                  isSelected: !ans.isSelected,
                };
              } else
                return {
                  ...ans,
                  isSelected: false,
                };
            }),
          };
        } else return quizElement;
      });
    });
  }

  function checkCount() {
    let quizArr = [...quizData];
    let scoreCount = 0;

    setEndQuiz(true);

    for (let i = 0; i < quizArr.length; i++) {
      let answers = quizArr[i].answers;

      answers.map((ans) => {
        if (ans.isSelected) {
          if (ans.answer === quizArr[i].correctAnswer) {
            scoreCount += 1;
          }
        }
      });
    }

    return setScore(scoreCount);
  }

  function markAll() {
    let checkMarked = quizData.every((quiz) => {
      return quiz.answers.some((ans) => ans.isSelected);
    });

    checkMarked ? setAllAnswersSelected(true) : setAllAnswersSelected(false);
  }

  function playAgain() {
    fetchData();
    setNewQuiz(true);
    setEndQuiz((prevState) => !prevState);
  }

  return (
    <div className="App container-fluid">
      {newQuiz ? (
        <Begin quizState={newQuiz} start={startQuiz} />
      ) : (
        <>
          {renderQuestions}

          <div className="score-board">
            {endQuiz && <h5 className="score">You scored {score}/5 correct</h5>}
            <button
              disabled={!allAnswersSelected}
              onClick={endQuiz ? playAgain : checkCount}
              style={!allAnswersSelected ? { opacity: "50%" } : {}}
            >
              {endQuiz ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
