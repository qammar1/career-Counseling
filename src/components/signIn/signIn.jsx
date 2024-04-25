import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CounsellingContext } from "../../Context/ContextApi";

export default function SgnIn () {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { handleSignIn } = useContext(CounsellingContext);
  const clickSignIn = async (e) => {
    e.preventDefault();
    try {
      const respon = await handleSignIn(userName, password);
      if (respon != null) {
        // console.log(respon);
        if (respon.Role === "Domain Expert") {
          navigate("/expertHome");
        } else if(respon.Role === "Student"){
          navigate("/studentHome")
        }
         else if(respon.Role === "Teacher"){
          navigate("/teacherHome")
        }
         else if(respon.Role === "School"){
          navigate("/schoolHome")
        }
      }
    } catch (error) {
      setLoginFailed(true);
      // console.log("not found");
    }
  };
  return (
    <React.Fragment>
      <div className="card">
        <h2>Log In</h2>
        <form onSubmit={clickSignIn}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={userName}
              onChange={handleNameChange}
              placeholder="Enter User Name"
              required
            />
          </div>

          <div className="password-wrapper input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePasswordChange}
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

          {loginFailed && (
            <div className="validity">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>Invalid User Name or password</p>
            </div>
          )}
          <button type="submit">Log In</button>
        </form>
        <button>Forgot Password?</button>
        <p>
          Don't have an account? <Link to="/options">Sign up</Link>
        </p>
      </div>
    </React.Fragment>
  );
          }