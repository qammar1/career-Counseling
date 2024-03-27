import React from "react";
import { Link } from "react-router-dom";
export default function options() {
  return (
    <React.Fragment>
    <h2 className="signup">SignUp As</h2>
      <div className="icon-container">
      
      <div className="icon-main">
          <Link to="/signUpSchool">
        <div className="icon">
          <i class="fa-solid fa-school"></i>
          <p className="icon-p">School</p>
        </div>
          </Link>
      </div>
      <div className="icon-main">
          <Link to="/signUpExpert">
        <div className="icon">
          <i class="fa-solid fa-user-tie"></i>
          <p className="icon-p">Domain Expert</p>
        </div>
          </Link>
      </div>
      </div>
    </React.Fragment>
  );
}
