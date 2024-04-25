import React, { useEffect, useState } from "react";
import Nav from "../common/Nav";
import { addTeacher,getAllUsername } from "../../Context/AppContext";
const AddTeacherScreen = ({}) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleAddTeacher = async () => {
    // Your API endpoint for adding a teacher
    // const apiUrl = "your_api_endpoint_here";

    const schoolId = localStorage.getItem("SchoolId");

    const Teacher = {
      Name: fullName,
      School: {
        Id: schoolId,
      },
    };

    const UserData = {
      Name: fullName,
      UserName: username,
      Password: password,
    };

    console.log("Adding Teacher:", { Teacher, UserData });
    try {
      const result = await addTeacher(Teacher, UserData);
      // ToastAndroid.show(result, ToastAndroid.SHORT);
      // Reset the input fields
      setFullName("");
      setUsername("");
      setPassword("");
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error in Adding Teacher:", error.message);
    }

    // try {
    //   const response = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ Teacher, UserData }),
    //   });
    //   const result = await response.text();
    //   alert(result);
    //   setFullName('');
    //   setUsername('');
    //   setPassword('');
    // } catch (error) {
    //   console.error('Error in Adding Teacher:', error.message);
    // }
  };

  // const getUsernames = async () => {
  //   try {
  //     // Your API endpoint for getting all usernames
  //     const apiUrl = "your_api_endpoint_here";
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     if (data != null) {
  //       setUsernames(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    getAllUsername();
  }, []);
  console.log(password);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <Nav />
      <div className="add-video-card">
        <div className="card">
          <h2>Add Teacher</h2>
          <div>
            <label>Full Name:</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Full Name"
              required
              onBlur={() => {
                generateRandomPassword();
                generateRandomUsername();
              }}
            />
            <label>Username:</label>
            <input value={username} placeholder="Enter Username" readOnly />
            <label>Password:</label>
            <div className="password-wrapper input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter Password"
                readOnly
              />{" "}
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
            <button onClick={handleAddTeacher}>Add</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '20px',
//   },
// };

export default AddTeacherScreen;
