import React, { useContext, useEffect, useState } from "react";
import Nav from "../common/Nav";
import { addTeacher,getAllUsername } from "../../Context/AppContext";
import { getSchoolByUserId } from "../../Context/AppContext";
import { CounsellingContext } from "../../Context/ContextApi";
const AddTeacherScreen = () => {

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [schoolId, setSchoolId] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const { userData } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchData = async () => {
      await getUsernames();
      await getSchool();
    };
    fetchData();
  }, []);

  const getSchool = async () => {
    try{  
      const school = await getSchoolByUserId(userData.Id);
      setSchoolId(school[0].Id);
    }
    catch(error){
      console.log(error)
    }
  };

  const getUsernames = async () => {
    try {
      const data = await getAllUsername();
      setUsernames(data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateRandomUsername = () => {
    if (!fullName) {
      setUsername('');
      return;
    }
    const FullName = fullName.replace(/\s+/g, "_");
    let newUsername = "";
    do {
      const randomNumber = Math.floor(Math.random() * 1000);
      newUsername = FullName + randomNumber;
    } while (usernames.includes(newUsername));
    setUsername(newUsername);
  };

  const generateRandomPassword = () => {
    if (!fullName) {
      setPassword('');
      return;
    }
    const nameParts = fullName.split(" ")[0];
    let newPassword = "";
    do {
      const randomNumber = Math.floor(Math.random() * 1000);
      newPassword = nameParts + "@" + randomNumber;
    } while (usernames.includes(newPassword));
    setPassword(newPassword);
  };

  const handleAddTeacher = async () => {
    if (!fullName || !username || !password) {
      setError('Enter Full Name');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setError('');
    try {
      const result = await addTeacher({ Name: fullName, School: { Id: schoolId } }, { Name: fullName, UserName: username, Password: password });
      if (result) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        setFullName("");
        setUsername("");
        setPassword("");
      }
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error in Adding Teacher:", error.message);
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <Nav />
      <div className="parent-card">

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
                if(fullName!==''){

                generateRandomPassword();
                generateRandomUsername();
                }else{
                  setPassword('')
                  setUsername('')
                }
              }}
            />
            <label>Username:</label>
            <input value={username} placeholder="Enter Username" required readOnly />
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
            {error && <p  style={{color:'red'}}>{error}</p>}
            {isSuccess && (
              <p className="signup-success">Teacher Added successfully!</p>
            )}
            <button onClick={handleAddTeacher}>Add</button>
          </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};



export default AddTeacherScreen;
