import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

// import './YourStylesheet.css'; // Import your CSS file

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="cardSignUp">
      <h2>Sign Up</h2>
      <div className="input-group">
        {/* <label htmlFor="name">Name</label> */}
        <input type="text" id="name" placeholder="Enter Name" />
      </div>
      <div className="input-group">
        {/* <label htmlFor="email">Email</label> */}
        <input type="email" id="email" placeholder="Enter Email" />
      </div>
      <div className="input-group">
        {/* <label htmlFor="phone">Phone</label> */}
        <input type="tel" id="phone" placeholder="Enter your Phone Number" />
      </div>
      <div className="input-group">
        {/* <label htmlFor="phone">Password</label> */}
        
        {/* <input type="tel" id="phone" placeholder="Your Phone Number" /> */}
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
      </div>
      <div className="input-group">
        
      </div>
      <button className="centered-button">Sign Up</button>
      <p>
        Already have an account? <a href="SignIn">Login here</a>
      </p>
    </div>
  );
}

export default SignUpForm;
