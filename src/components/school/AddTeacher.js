import React, { useEffect, useState } from "react";
import Nav from "../common/Nav";
import "@fortawesome/fontawesome-free/css/all.css";
function AddTeacher() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const classes = ["6th", "7th", "8th"];
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // Reset all input fields
  const resetFields = () => {
    setName("");
    setUserName("");
    setPhone("");
    setPassword("");
    setSelectedClass("");
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
      // const result = await addDomainExpert(DomainExpert, UserData, domainId);
      // if (result) {
      //   setIsSignUpSuccess(true);
      //   resetFields();
      //   setTimeout(() => setIsSignUpSuccess(false), 3000);
      // }
    } catch (error) {
      console.error("Error in SignUp:", error.message);
    }
  };
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Nav />
    <div className="add-video-card">
      <div className="cardSignUp">
        <h2 className="signh2">Add Teacher</h2>
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

          {/* <div className="input-group">
          <label htmlFor="class">Class</label>
          <input
            type="number"
            id="clas"
            placeholder="Enter Class of student"
            value={clas}
            onChange={(e) => setClas(e.target.value)}
            required
          />
        </div> */}
          {/* <div className="input-group">
            <label htmlFor="domain">Select Class:</label>
            <select
              id="domain"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="" disabled>
                Select class
              </option>
              {classes.map((clas, index) => (
                <option key={index} value={clas}>
                  {clas}
                </option>
              ))}
            </select>
          </div> */}
          {isSignUpSuccess && (
            <p className="signup-success">Added successfully!</p>
          )}
          <button type="submit" className="centered-button">
            ADD
          </button>
        </form>
        {/* <p>
        Already have an account? <a href="/SignIn">Login here</a>
      </p> */}
      </div>
    </div>
    </React.Fragment>
  );
}

export default AddTeacher;
