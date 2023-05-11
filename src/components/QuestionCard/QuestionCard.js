import React, { useEffect, useState } from "react";
import "./QuestionCard.css";
import { useNavigate } from "react-router-dom";

function QuestionCard({
  questionId,
  question,
  answers,
  questionNumber,
  setQuestionNumber,
  inc,
  dec,
  userData,
  setUserData,
  correctAnswer,
  score,
  setScore,
}) {
  const navigate = useNavigate();
  const [checkedValues, setCheckedValues] = useState([]);
  

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      JSON.stringify(correctAnswer[questionId - 1].correct_answer) ===
      JSON.stringify(checkedValues)
    ) {
      setScore(score + 1);
    } else {
      console.log("no");
    }
    inc();
  };

  useEffect(() => {
    setUserData({ ...userData, score: score });
  }, []); //eslint-disable-line

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };

  // useEffect(() => {
  //   const answers = JSON.parse(localStorage.getItem('answers'));
  //   if (answers) {
  //    setAnswerChecked(answers);
  //   }
  // }, []);

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (!name) {
      navigate('/')
    }
  }, [navigate])

  return (
    <form onSubmit={handleOnSubmit} className="question-card-form">
      <div className="question">
        <h3>
          {questionId}. {question}
        </h3>
      </div>
      <div className="options-container">
        {answers.map((elem) => {
          return (
            <div key={elem.id} className="options">
              <input
                type="checkbox"
                name={elem.id}
                value={elem.id}
                onChange={handleChange}
              />
              <label htmlFor={elem.id}>
                <span>{elem.answer}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="comment-section">
        <span>
          Please provide any comments or additional information regarding your
          answer to this question:
        </span>
        <input type="text" placeholder="Write your comments here" />
      </div>
      <div className="next-btn">
        {questionId === 1 ? <button type={"submit"}>Next</button> : null}
        {questionId > 1 && questionId < 10 ? (
          <div>
            <button onClick={() => dec()}>Previous</button>
            <button type={"submit"}>Next</button>
          </div>
        ) : null}
        {questionId === 10 ? (
          <div>
            <button onClick={() => dec()}>Previous</button>
            <button type={"submit"}>End Test</button>
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default QuestionCard;
