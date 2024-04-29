import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Nav from "../common/Nav";


function CreateEvent() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
<Nav/>
<div className="add-video-card"></div>
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
      <div className="input-group"></div>
      <button className="centered-button">Create</button>
    </div>
    </React.Fragment>
  );
}

export default CreateEvent;
