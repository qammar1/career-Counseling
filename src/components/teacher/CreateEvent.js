import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

// import './YourStylesheet.css'; // Import your CSS file

function CreateEvent() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="cardSignUp">
      <h2>Create Event</h2>
      <div className="input-group">
        <label htmlFor="name">Title</label>
        <input type="text" id="title" placeholder="Enter Title" />
      </div>
      <div className="input-group">
        <label htmlFor="email">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter Short description"
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Domain</label>
        <input
          type="text"
          id="description"
          placeholder="Enter Domain"
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Guest</label>
        <input
          type="text"
          id="description"
          placeholder="Enter guest name"
        />
      </div>
      <div className="time">
        <div className="input-group">
          <label htmlFor="stime">Start Time</label>
          <input type="time" id="phone" placeholder="Enter start time" />
        </div>
        <div className="input-group">
          <label htmlFor="etime">End Time</label>

          <input type="time" id="phone" placeholder="Enter start time" />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="etime">Condunct Date</label>
        <input type="date" id="conductdate" placeholder="Enter start time" />
      </div>
      {/* <div className="input-group">
        
        <div className="password-wrapper input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
          {showPassword ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
          </span>
        </div>
      </div> */}
      <div className="input-group"></div>
      <button className="centered-button">Create</button>
      {/* <p>
        Already have an account? <a href="SignIn">Login here</a>
      </p> */}
    </div>
  );
}

export default CreateEvent;
