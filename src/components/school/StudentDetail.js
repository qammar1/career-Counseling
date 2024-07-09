import React, { useState, useEffect } from "react";
import Nav from "../common/Nav";
import { useLocation } from "react-router-dom";
import { updateStudent,deleteStudent } from "../../Context/AppContext";

export default function StudentDetail() {
  const location = useLocation();
  const { student } = location.state || {};
  const [fullName, setFullName] = useState(student?.Name || "");
  const [username, setUsername] = useState(student?.UserName || "");
  const [password, setPassword] = useState("");
  const [schoolId, setSchoolId] = useState(student?.School?.Id || "");
  const [phone, setPhone] = useState(student?.Phone || "");
  const classes = ["6th", "7th", "8th"];
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState(student?.Class || "");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const studentData = {
    Id: student?.Id || "",
    Name: fullName,
    Class: selectedClass,
    Users:{
      Password:password,
      UserName:username
    },
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateStudent(studentData);
      if (result) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      }

      // Reset the input fields
      setFullName("");
      setUsername("");
      setPassword("");
      setSelectedClass("");
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error updating Student:", error.message);
    }
  };

  const deleteData = async()=>{
    const result = await deleteStudent(studentData.Id);
    if (result) {
      setIsDeleted(true);
      setTimeout(() => setIsDeleted(false), 3000);
    }
    // if (result) {
    //   setIsSuccess(true);
    //   setTimeout(() => setIsSuccess(false), 3000);
    // }
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="videoCard">
        <div className="add-video-card">
          <div className="cardSignUp">
            <h2 className="signh2">Update Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="userName">User Name</label>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // readOnly
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
              {isSuccess && (
                <p className="signup-success">Student updated successfully!</p>
              )}
              <button type="submit" className="centered-button">
                Update
              </button>
            </form>
            {isDeleted && <p className="delete-success">Student deleted successfully!</p>}
              <button onClick={deleteData} style={{backgroundColor:"red"}} className="centered-button">
                Delete
              </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
