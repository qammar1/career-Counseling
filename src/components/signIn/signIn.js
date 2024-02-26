import React, { useState } from "react";
import { Link } from "react-router-dom"; // Removed unnecessary imports for clarity

const SignIn = () => {
  const correctEmail = 'ali@gmail.com';
  const correctPassword = '123';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false); // State to track login failure

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (email === correctEmail && password === correctPassword) {
      console.log("Login Successful");
      setLoginFailed(false); // Reset loginFailed state
      // Proceed with login success logic (e.g., redirect to a dashboard)
    } else {
      console.log("Login Failed");
      setLoginFailed(true); // Update state to indicate login failure
    }
  };

  return (
    <React.Fragment>
      <div className="card">
        <h2>Log In</h2>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {loginFailed && <p>Wrong email or password</p>}
          <button type="submit">Log In</button>
        </form>
        <button>Forgot Password?</button>
        <p>
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
