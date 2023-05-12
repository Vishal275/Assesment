import React, { useState } from "react";
import "./Login.css";
import QuestionData from "../JsonData/QuestionsFile.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../config/server.json";

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
      setErrorMessage("Please enter a valid Name");
    } else if (userData.email === "" || userData.email > 30) {
      setError(true);
      setErrorMessage("Please enter a valid Email");
    } else {
      return true;
    }
  };

  window.onbeforeunload = function()
  {
      localStorage.clear();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (handleOnValidation()) {
      setError(false);
      try {
        const body = {
          userName: userData.name,
          email: userData.email,
        };
        const response = await axios.post(
          `${server.url.local}${server.api.CREATE_USER}`,
          body
        );
        if (response) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/assesment");
        }
      } catch (error) {
        console.log("You have already submitted the assesment");
      }
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
