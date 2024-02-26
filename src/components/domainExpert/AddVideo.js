import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../common/Nav";
// import './SignIn.css'; // Import your CSS file

const AddVideo = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");

  const handleUpload = () => {
    // Perform sign-in logic here using 'email' and 'password'
    console.log("link:", link);
    console.log("title:", title);
    console.log("domain:", domain);
  };

  return (
    <React.Fragment>
      <Nav />
      <div className="add-video-card">
        <div className="card">
          <div className="add-video">
            <h2>Add Video</h2>
          </div>
          <div className="input-group">
            <label htmlFor="link">Video Link:</label>
            <input
              type="text"
              id="link"
              // value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              // placeholder="Enter Video Link"
            />
          </div>
          <div className="input-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              // value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              // placeholder="Enter your password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="domain">Domain:</label>
            <input
              type="text"
              id="domain"
              // value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
              }}
              // placeholder="Enter your password"
            />
          </div>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddVideo;
