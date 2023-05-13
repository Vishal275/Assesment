import axios from "axios";
import React, { useEffect, useState } from "react";
import server from "../../config/server.json";
import "./AllUserData.css";

function AllUserData() {
  const [issercet, setIsSecret] = useState(false);
  const [allUserData, setAllUserData] = useState();
  const [secretKey, setSecretKey] = useState("");

  const handleOnChange = (e) => {
    setSecretKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (server.secret === secretKey) {
      setIsSecret(true);
    } else {
      return false;
    }
  };

  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const response = await axios.get(
          `${server.url.production}${server.api.FETCH_ALL_USER}`
        );
        setAllUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUserData();
  }, []);
  return (
    <div className="alluser">
      <div className="top-colored"></div>
      {issercet ? (
        <>
          <div className="alluser-heading">
            <span>Name</span>
            <span>Email</span>
            <span>Score</span>
          </div>
          <div className="scroll">
            {allUserData?.map((elem, i) => {
              return (
                <div className="single-user" key={elem._id}>
                  {i + 1}.<span> {elem.userName}</span>
                  <span>{elem.email}</span>
                  <span>{elem.score} / 10</span>
                </div>
              );
            })}
          </div>
          <div className="alluser-mobileview">
            {allUserData?.map((elem, i) => {
              return (
                <div>
                <strong>{i + 1}.</strong>
                <div className="alluser-mob" key={elem._id}>
                  <span>Name : {elem.userName}</span>
                  <span>Email : {elem.email}</span>
                  <span>Score : {elem.score} / 10</span>
                </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="secret-key">
          <div>
            <input
              type="text"
              placeholder="Enter the key"
              onChange={handleOnChange}
            />
            <button className="start-btn" onClick={(e) => handleSubmit(e)}>Authenticate</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUserData;
