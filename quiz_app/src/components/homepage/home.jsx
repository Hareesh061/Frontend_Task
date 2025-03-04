import React, { useState, useEffect } from "react";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizCard, setShowQuizCard] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizCount, setQuizCount] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);


  useEffect(() => {
    if (isPlaying && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); 
    } else if (isPlaying && timer === 0) {
     
      if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimer(currentQuiz.questions[currentQuestionIndex + 1].timer);
      } else {
        
        submitQuiz();
      }
    }
  }, [isPlaying, timer, currentQuestionIndex, currentQuiz]);

  const addQuiz = () => {
    setShowQuizCard(true);
    setQuizzes([
      ...quizzes,
      { id: Date.now(), serialNumber: quizCount, questions: [] },
    ]);
    setQuizCount(quizCount + 1);
  };

  const addQuestion = (quizId) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: [
                ...quiz.questions,
                {
                  question: "",
                  choices: ["", "", "", ""],
                  correctAnswer: "",
                  timer: 30, 
                },
              ],
            }
          : quiz
      )
    );
  };

  const updateQuestion = (quizId, questionIndex, field, value) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map((q, index) =>
                index === questionIndex ? { ...q, [field]: value } : q
              ),
            }
          : quiz
      )
    );
  };

  const saveQuiz = () => {
    setShowQuizCard(false);
    setEditingQuizId(null); 
  };

  const playQuiz = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setIsPlaying(true);
      setUserAnswers({});
      setScore(null);
      setCurrentQuestionIndex(0);
      setTimer(quiz.questions[0].timer);
    }
  };

  const handleAnswer = (questionIndex, choice) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  };

  const submitQuiz = () => {
    let correctCount = 0;
    currentQuiz.questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsPlaying(false); 
    setShowResultPopup(true); 
  };

  const deleteQuiz = (quizId) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
  };

  const editQuiz = (quizId) => {
    setEditingQuizId(quizId); 
    setShowQuizCard(true); 
  };

  const closeResultPopup = () => {
    setShowResultPopup(false); 
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <button
        className="px-4 py-2 bg-blue-500 text-black rounded shadow-lg hover:bg-blue-600"
        onClick={addQuiz}
      >
        Create Quiz
      </button>

      {showQuizCard && (
        <div className="mt-4 w-full max-w-md p-4 border rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-semibold mb-2">Quiz Card</h3>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="mb-4">
              <h4 className="font-semibold">Quiz {quiz.serialNumber}</h4>
              {quiz.questions.map((q, index) => (
                <div key={index} className="mb-4 p-2 border rounded bg-gray-100">
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(quiz.id, index, "question", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  {q.choices.map((choice, choiceIndex) => (
                    <input
                      key={choiceIndex}
                      type="text"
                      placeholder={`Choice ${choiceIndex + 1}`}
                      value={choice}
                      onChange={(e) => {
                        const newChoices = [...q.choices];
                        newChoices[choiceIndex] = e.target.value;
                        updateQuestion(quiz.id, index, "choices", newChoices);
                      }}
                      className="w-full p-2 border rounded mb-1"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Enter correct answer"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(quiz.id, index, "correctAnswer", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Set Timer (seconds)"
                    value={q.timer}
                    onChange={(e) =>
                      updateQuestion(quiz.id, index, "timer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <button
                className="px-3 py-1 bg-green-500 text-black rounded shadow hover:bg-green-600"
                onClick={() => addQuestion(quiz.id)}
              >
                Add Question
              </button>
            </div>
          ))}
          <button
            className="mt-4 px-4 py-2 bg-purple-500 text-black rounded shadow hover:bg-purple-600"
            onClick={saveQuiz}
          >
            Save Quiz
          </button>
        </div>
      )}

      {!showQuizCard &&
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="mt-4 w-full max-w-md p-4 border rounded-lg bg-white shadow-md"
          >
            <h3 className="text-lg font-semibold">Quiz {quiz.serialNumber}</h3>
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-black rounded shadow hover:bg-red-600 w-full"
              onClick={() => playQuiz(quiz.id)}
            >
              Play Quiz
            </button>
            <div className="mt-2 flex gap-2">
              <button
                className="px-4 py-2 bg-yellow-500 text-black rounded shadow hover:bg-yellow-600"
                onClick={() => editQuiz(quiz.id)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-black rounded shadow hover:bg-red-600"
                onClick={() => deleteQuiz(quiz.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      {isPlaying && currentQuiz && (
        <div className="mt-4 w-full max-w-md p-4 border rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Playing Quiz {currentQuiz.serialNumber} (Question {currentQuestionIndex + 1})
          </h3>
          <p className="text-lg font-semibold mb-2">Time Left: {timer} seconds</p>
          <div className="mb-4 p-2 border rounded bg-gray-100">
            <p className="font-semibold">
              {currentQuiz.questions[currentQuestionIndex].question}
            </p>
            {currentQuiz.questions[currentQuestionIndex].choices.map((choice, choiceIndex) => (
              <button
                key={choiceIndex}
                className={`w-full p-2 border rounded mb-1 ${
                  userAnswers[currentQuestionIndex] === choice
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleAnswer(currentQuestionIndex, choice)}
              >
                {choice}
              </button>
            ))}
          </div>
          {score === null && (
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-black rounded shadow hover:bg-green-600 w-full"
              onClick={() => {
                if (currentQuestionIndex < currentQuiz.questions.length - 1) {
                  setCurrentQuestionIndex((prev) => prev + 1);
                  setTimer(currentQuiz.questions[currentQuestionIndex + 1].timer);
                } else {
                  submitQuiz();
                }
              }}
            >
              {currentQuestionIndex < currentQuiz.questions.length - 1
                ? "Next Question"
                : "Submit Quiz"}
            </button>
          )}
        </div>
      )}

      {showResultPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeResultPopup}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Quiz Result</h3>
            <p>
              You scored {score} out of {currentQuiz.questions.length}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;