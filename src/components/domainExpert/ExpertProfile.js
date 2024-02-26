import React from "react";

import user from "./user.jpg";
import Nav from "../common/Nav";

const ExpertProfile = () => {
  // const imageSrc="";
  const views = 20;
  const name = "Qammar shamraiz";
  const designation = "Frontend Developer";
  const detail =
    "I've been designing user interfaces for about five years now, and I absolutely love it! In my experience, UI design is all about creating a compelling experience for the user. I strive to create interfaces that are easy to use and look beautiful while doing so.";
  return (
    <React.Fragment>
      <Nav/>
    <div className="main">
      <div className="abc">
        
          <div className="profile">
            <img src={user} alt="User" className="image" />
            <div className="details">
              <span className="name">{name}</span>
              <span className="designation">{designation}</span>
            </div>
          </div>
          <div className="about">
            <div className="head">About</div>
            <div className="detail">{detail}</div>
          </div>
        
      </div>
    </div>
    </React.Fragment>
  );
};

export default ExpertProfile;

