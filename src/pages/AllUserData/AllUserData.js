import axios from "axios";
import React, { useEffect, useState } from "react";
import server from "../../config/server.json";
import "./AllUserData.css";

function AllUserData() {
  const [allUserData, setAllUserData] = useState();
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
        <div className="alluser-heading">
          <span>Name</span>
          <span>Email</span>
          <span>Score</span>
        </div>
      <div className="scroll">
        {allUserData.map((elem, i) => {
          return (
            <div className="single-user" key={elem._id}>
              {i+1}.<span> {elem.userName}</span>
              <span>{elem.email}</span>
              <span>{elem.score} / 10</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllUserData;
