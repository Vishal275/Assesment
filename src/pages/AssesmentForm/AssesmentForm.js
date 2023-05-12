import React, { useEffect, useState } from "react";
import "./AssesmentForm.css";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionData from "../JsonData/QuestionsFile.json";
import CorrectAnswers from "../JsonData/Answers.json";
import ScoreCard from "../ScoreCard/ScoreCard";
import axios from "axios";
import server from "../../config/server.json";

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
  const [selectOpt, setSelectedOpt] = useState([]);
  const [user, setUser] = useState("");

  const { questions } = QuestionData;
  const { correctAnswer } = CorrectAnswers;

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
    return `${minutes === 0 ? "" : minutes < 10 ? `0${minutes}` : minutes} ${
      minutes === 0 ? "" : ":"
    } ${seconds === 0 ? "00" : seconds < 10 ? `0${seconds}` : seconds} ${
      seconds === 0 ? "" : ""
    }`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (time !== 0) {
        setTime(time - 1);
      }
    }, [1000]);

    if (time === 0) {
      setScoreCard(true);
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const sendDetails = async () => {
      try {
        const body = {
          user_id: user._id,
          score: score ? score : 0,
          answer1: selectOpt[0]?.answer ? selectOpt[0]?.answer : "",
          comment1: selectOpt[0]?.comment ? selectOpt[0]?.comment : "",
          answer2: selectOpt[1]?.answer ? selectOpt[1]?.answer : "",
          comment2: selectOpt[1]?.comment ? selectOpt[1]?.comment : "",
          answer3: selectOpt[2]?.answer ? selectOpt[2]?.answer : "",
          comment3: selectOpt[2]?.comment ? selectOpt[2]?.comment : "",
          answer4: selectOpt[3]?.answer ? selectOpt[3]?.answer : "",
          comment4: selectOpt[3]?.comment ? selectOpt[3]?.comment : "",
          answer5: selectOpt[4]?.answer ? selectOpt[4]?.answer : "",
          comment5: selectOpt[4]?.comment ? selectOpt[4]?.comment : "",
          answer6: selectOpt[5]?.answer ? selectOpt[5]?.answer : "",
          comment6: selectOpt[5]?.comment ? selectOpt[5]?.comment : "",
          answer7: selectOpt[6]?.answer ? selectOpt[6]?.answer : "",
          comment7: selectOpt[6]?.comment ? selectOpt[6]?.comment : "",
          answer8: selectOpt[7]?.answer ? selectOpt[7]?.answer : "",
          comment8: selectOpt[7]?.comment ? selectOpt[7]?.comment : "",
          answer9: selectOpt[8]?.answer ? selectOpt[8]?.answer : "",
          comment9: selectOpt[8]?.comment ? selectOpt[8]?.comment : "",
          answer10: selectOpt[9]?.answer ? selectOpt[9]?.answer : "",
          comment10: selectOpt[9]?.comment ? selectOpt[9]?.comment : "",
        };
        await axios.post(
          `${server.url.production}${server.api.EDIT_TEST_DETAILS}`,
          body
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (questionNumber > 1 && questionNumber <= 11) {
      sendDetails();
    }
  }, [questionNumber]); //eslint-disable-line

  window.onbeforeunload = function () {
    localStorage.clear();
  };

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
                      selectOpt={selectOpt}
                      setSelectedOpt={setSelectedOpt}
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
        <ScoreCard score={score} />
      )}
    </>
  );
}

export default AssesmentForm;
