import React, { useEffect, useState } from "react";
import "./AssesmentForm.css";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionData from "../JsonData/QuestionsFile.json";
import CorrectAnswers from "../JsonData/Answers.json";
import ScoreCard from "../ScoreCard/ScoreCard";

function AssesmentForm() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [scoreCard, setScoreCard] = useState(false);
  const [time, setTime] = useState(900);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    score: "",
  });

  const { questions } = QuestionData;
  const { correctAnswer } = CorrectAnswers;
  console.log(questionNumber);
  const inc = () => {
    if (questionNumber === 10) {
      setScoreCard(true);
    }
    setQuestionNumber(questionNumber + 1);
  };
  const dec = () => {
    setQuestionNumber(questionNumber - 1);
  };

  const timeInMinutes = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes === 0 ? "" : minutes} ${minutes === 0 ? "" : "min :"} ${
      seconds === 0 ? "00 sec" : seconds
    } ${seconds === 0 ? "" : "sec"}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (time !== 0) {
        setTime(time - 1);
      }
    }, [1000]);

    if(time === 0) {
      setScoreCard(true)
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    setUserData({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      score: "",
    });
  }, []);

  // useEffect(() => {
  //   if (time === 0) {
  //     setTimeUp(true);
  //     setScoreCard(true);
  //     localStorage.clear();
  //   }
  // }, [time])

  return (
    <>
      {scoreCard === false ? (
        <div className="questions-container">
          <div className="top-colored"></div>
          <div className="heading">
            <span>{questionNumber} / 10</span>
            <h3>C# Skills Questionarre</h3>
            <span className="time">{timeInMinutes(time)}</span>
          </div>
          <div className="question-card">
            {questions.map((elem) => {
              return (
                <div key={elem.id}>
                  {questionNumber === elem.id ? (
                    <QuestionCard
                      questionId={elem.id}
                      question={elem.question}
                      answers={elem.answers}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      inc={inc}
                      dec={dec}
                      userData={userData}
                      setUserData={setUserData}
                      correctAnswer={correctAnswer}
                      score={score}
                      setScore={setScore}
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <ScoreCard userData={userData} />
      )}
    </>
  );
}

export default AssesmentForm;
