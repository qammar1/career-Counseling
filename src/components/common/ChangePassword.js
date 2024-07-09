import React, { useState, useEffect, useContext } from "react";
import Nav from "../common/Nav";
import { getUserByIdAndPassword } from "../../Context/AppContext";
import { CounsellingContext } from "../../Context/ContextApi";
export default function ChangePassword() {
  // const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState("");
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incorrectPassword,setIncorrectPassword] = useState(false);
  const [success,setSuccess] = useState(false);
  const { userData,updateUser } = useContext(CounsellingContext);
  console.log(userData.Password);

//   const [showPassword, setShowPassword] = useState(false);

  const togglePasswordOld = () => {
    setOldShowPassword(!showOldPassword);
  };
  const togglePasswordNew = () => {
    setNewShowPassword(!showNewPassword);
  };
  const togglePasswordConfirm = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    if (confirmPassword != newPassword) {
        setIncorrectPassword(true);
       setTimeout(() => {
        setIncorrectPassword(false);
       }, 3000);
      return;
    }
    if (oldPassword != userData.Password) {
        setIncorrectPassword(true);
        setTimeout(() => {
         setIncorrectPassword(false);
        }, 3000);
      return;
    }
    try {
      const response = await getUserByIdAndPassword(
        userData.Id,
        confirmPassword
      );
      const updatedUser = { ...userData, Password: confirmPassword};
      updateUser(updatedUser);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000);
      //   ToastAndroid.show('Password change successfully!', ToastAndroid.SHORT);
      //   navigation.navigate('UserProfile');
    } catch (error) {
      console.log("Password Changed", error);
    }
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // const value = await AsyncStorage.getItem('userId');
  //         if (userData.Id !== null) {
  //         //   const userPass = await fetchUserData(value);
  //         //   setUserId(userData.Id);
  //         //   setPassword(userData.Password);
  //         } else {
  //         }
  //       } catch (error) {
  //         console.error('Error retrieving data:', error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  return (
    <React.Fragment>
      <Nav />
      <div className="parent-card">
        <div className="card">
        <h2>Change Password</h2>
        <div className="password-wrapper input-group">
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            placeholder="Enter Your Password"
            value={oldPassword}
            onChange={(e)=>{setOldPassword(e.target.value)}}
            required
          />
          <span className="toggle-password" onClick={togglePasswordOld}>
            {showOldPassword ? (
              <i className="far fa-eye"></i>
            ) : (
              <i className="far fa-eye-slash"></i>
            )}
          </span>
        </div>
        <div className="password-wrapper input-group">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Enter Your Password"
            value={newPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}}
            required
          />
          <span className="toggle-password" onClick={togglePasswordNew}>
            {showNewPassword ? (
              <i className="far fa-eye"></i>
            ) : (
              <i className="far fa-eye-slash"></i>
            )}
          </span>
        </div>
        <div className="password-wrapper input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Enter Your Password"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            required
          />
          <span className="toggle-password" onClick={togglePasswordConfirm}>
            {showConfirmPassword ? (
              <i className="far fa-eye"></i>
            ) : (
              <i className="far fa-eye-slash"></i>
            )}
          </span>
        </div>
        {success && (
          <p className="signup-success">Password Changed successfully!</p>
        )}
        {incorrectPassword && (
          <p className="validity">Incorrect Password</p>
        )}
        <button className="btn" onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>
    </React.Fragment>
  );
}
