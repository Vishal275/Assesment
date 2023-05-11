import React, { useState } from "react";
import "./Login.css";
import QuestionData from "../JsonData/QuestionsFile.json";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { name, email } = userData;
  const { title, time_required, comments } = QuestionData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnValidation = () => {
    if (userData.name === "" || userData.name > 30) {
      setError(true);
      setErrorMessage("Please enter a valid Name")
    } else if (userData.email === "" || userData.email > 30) {
      setError(true);
      setErrorMessage("Please enter a valid Email")
    } else {
      return true
    }
  };

  // const saveData = (data) => {
  //   const jsonData = JSON.stringify(data);
  //   const blob = new Blob([jsonData], { type: "text/json" });
  //   document.createElement("a")
  //   // const finished = (error) => {
  //   //   if (error) {
  //   //     console.log(error);
  //   //     return;
  //   //   }
  //   // } 
  //   // scores.push(jsonData);
  //   // fs.writeFile('Scores.json', jsonData, finished);
  // }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (handleOnValidation()) {
      setError(false)
      // saveData(userData)
      localStorage.setItem("name", userData.name);
      localStorage.setItem("email", userData.email);
      navigate('/assesment');
    // setSteps(2)
    }
  };

  return (
    <div className="landing-page">
      <div className="top-colored"></div>
      <div className="landing">
        <h2 className="title">{title}</h2>
        <h3>Test Time : {time_required}</h3>
        <p>{comments}</p>
        <form onSubmit={handleOnSubmit} className="landing-form">
          <input
            type="text"
            placeholder="Enter your name here"
            name="name"
            value={name}
            onChange={handleChange}
            
            />
          <input
            type="email"
            placeholder="Enter your email id here"
            name="email"
            value={email}
            onChange={handleChange}
            
            />
            {error && <span className="error-msg">{errorMessage}</span>}
          <div className="btn-container">
            <button type={"submit"} className="start-btn">
              Start Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
