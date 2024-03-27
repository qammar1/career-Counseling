import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { getAllDomain, addDomainExpert } from "../../Context/AppContext";
 function SignUpSchool() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // Reset all input fields
  const resetFields = () => {
    setName("");
    setUserName("");
    setPhone("");
    setPassword("");
    setAddress("");
  };

  const DomainExpert = {
    Name: name,
  };

  const UserData = {
    Name: name,
    UserName: userName,
    Password: password,
    Phone: phone,
  };

  //password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      console.error("Error in SignUp:", error.message);
    }
  };
  useEffect(() => {
    
  }, []);
  return (
    <div className="cardSignUp">
      <h2 className="signh2">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <i className="far fa-eye"></i>
              ) : (
                <i className="far fa-eye-slash"></i>
              )}
            </span>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="domain">Address:</label>
          <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Address"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        {isSignUpSuccess && (
          <p className="signup-success">Signup successful!</p>
        )}
        <button type="submit" className="centered-button">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <a href="/SignIn">Login here</a>
      </p>
    </div>
  );
}

export default SignUpSchool;
