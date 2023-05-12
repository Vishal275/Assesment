import React, { useEffect } from "react";
import "./ScoreCard.css";

function ScoreCard({score}) {
  useEffect(() => {
    localStorage.clear();
  })
  return (
    <div className="scorecard">
      <div className="top-colored"></div>
      <div className="score">
        <h2>You have answered correctly {score * 10}% of the questions.</h2>
        <ul className="scorecard-list">
          <li><span>Total Questions</span><span>10</span></li>
          <li><span>Correct Answers</span><span>{score ? score : 0}/10</span></li>
          <li><span>Incorrect Answers</span><span>{10 - score}/10</span></li>
          <li><span>Score</span><span>{score * 10} %</span></li> 
        </ul>
        <h2>Thank you for attending the test.</h2>
      </div>
    </div>
  );
}

export default ScoreCard;
