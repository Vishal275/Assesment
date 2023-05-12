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
  selectOpt,
  setSelectedOpt
}) {
  const navigate = useNavigate();
  const [checkedValues, setCheckedValues] = useState([]);
  const [comment, setComment] = useState("");  

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      JSON.stringify(correctAnswer[questionId - 1].correct_answer) ===
      JSON.stringify(checkedValues)
    ) {
      setScore(score + 1);
    } 

    setSelectedOpt([...selectOpt, {question_id: questionId, answer: checkedValues , comment:comment}])
    // try {
    //   const body = {
    //     user_id: user._id,
    //     score: questionId === 10 ? score : "",

    //   }
    //   const response = await axios.post('http://localhost:5000/api/test-details/edit', 
    //   body)
    // } catch (error) {
      
    // }
    inc();
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   if (user) {
  //     setUser(user);
  //   }
  // }, []);

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

  useEffect(() => {
    const name = localStorage.getItem('user');
    if (!name) {
      navigate('/')
    }
  }, [navigate]);

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
                id={elem.id}
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
        <input type="text" placeholder="Write your comments here" onChange={handleComment} />
      </div>
      <div className="next-btn">
        {questionId === 1 ? <button type={"submit"}>Next</button> : null}
        {questionId > 1 && questionId < 10 ? (
          <div>
            {/* <button onClick={() => dec()}>Previous</button> */}
            <button type={"submit"}>Next</button>
          </div>
        ) : null}
        {questionId === 10 ? (
          <div>
            {/* <button onClick={() => dec()}>Previous</button> */}
            <button type={"submit"}>End Test</button>
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default QuestionCard;
