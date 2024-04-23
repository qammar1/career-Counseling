import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { getAllDomain, addDomainExpert } from "../../Context/AppContext";
function SignUpExpert() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // Reset all input fields
  const resetFields = () => {
    setName("");
    setUserName("");
    setPhone("");
    setPassword("");
    setSelectedDomain("");
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

  // GET DOMAINS
  const getDomains = async () => {
    try {
      const domains = await getAllDomain();
      setDomain(domains);
    } catch (error) {
      console.error("Error in getDomains:", error.message);
    }
  };
  //password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const domainId = selectedDomain;
      // console.log(domainId);
      const result = await addDomainExpert(DomainExpert, UserData, domainId);
      if (result) {
        setIsSignUpSuccess(true);
        resetFields(); 
        setTimeout(() => setIsSignUpSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error in SignUp:", error.message);
    }
  };
  useEffect(() => {
    getDomains();
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
          <label htmlFor="domain">Choose domain:</label>
          <select
            id="domain"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <option value="" disabled>
              Choose domain
            </option>
            {domain.map((domain) => (
              <option key={domain.Id} value={domain.Id}>
                {domain.Title}
              </option>
            ))}
          </select>
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

export default SignUpExpert;
