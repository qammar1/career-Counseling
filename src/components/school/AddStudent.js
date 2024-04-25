import React, { useEffect, useState } from "react";
import Nav from "../common/Nav";
import "@fortawesome/fontawesome-free/css/all.css";
import { getAllUsername, addStudent } from "../../Context/AppContext";
function AddStudent() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [phone, setPhone] = useState("");
  const classes = ["6th", "7th", "8th"];
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // const [studentClass, setStudentClass] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [usernames, setUsernames] = useState([]);
  // const [name, setName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const getUsernames = async () => {
    try {
      const data = await getAllUsername();
      if (data != null) {
        setUsernames(data);

        // console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateRandomUsername = () => {
    const FullName = fullName.replace(/\s+/g, "_");
    let newUsername = "";
    do {
      const randomNumber = Math.floor(Math.random() * 1000);
      newUsername = FullName + randomNumber;
    } while (usernames.includes(newUsername));
    setUsername(newUsername);
  };

  const generateRandomPassword = () => {
    const nameParts = fullName.split(" ")[0];
    let newPassword = "";
    do {
      const randomNumber = Math.floor(Math.random() * 1000);
      newPassword = nameParts + "@" + randomNumber;
    } while (usernames.includes(newPassword));
    setPassword(newPassword);
  };

  useEffect(() => {
    getUsernames();
  }, []);

  //password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    // const result = await addDomainExpert(DomainExpert, UserData, domainId);
    // if (result) {
    //   setIsSignUpSuccess(true);
    //   resetFields();
    //   setTimeout(() => setIsSignUpSuccess(false), 3000);
    // }

    const Student = {
      Name: fullName,
      Class: selectedClass,
      IsNew: true,
      School: {
        // Id: schoolId,
      },
    };

    const UserData = {
      Name: fullName,
      UserName: username,
      Password: password,
    };
    console.log(Student, UserData);
    try {
      const result = await addStudent(Student, UserData);
      // Reset the input fields
      setFullName("");
      setUsername("");
      setPassword("");
      setSelectedClass("");
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error in Adding Student:", error.message);
    }

    // } catch (error) {
    //   console.error("Error in SignUp:", error.message);
    // }
  };
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Nav />
      <div className="add-video-card">
        <div className="cardSignUp">
          <h2 className="signh2">Add Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                onBlur={() => {
                  generateRandomPassword();
                  generateRandomUsername();
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter user name"
                value={username}
                // onChange={(e) => setUsername(e.target.value)}
                readOnly
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
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                  readOnly
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

            {/* <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div> */}

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
            <div className="input-group">
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
            </div>
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

export default AddStudent;
