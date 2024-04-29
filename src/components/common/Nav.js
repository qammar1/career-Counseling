import React, { useState, useContext, useEffect } from "react";
import { CounsellingContext } from "../../Context/ContextApi";
import dummy from "./user.png";
import { Link } from "react-router-dom";
function Nav({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setUserImage] = useState(dummy);
  const [user, setUser] = useState("Domain Expert");
  const { userData, flag, getUserProfilePic } = useContext(CounsellingContext);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const hideButton = () => {
    setIsOpen(!isOpen);
  };
  const signOut = () => {
    setIsOpen(!isOpen);
    localStorage.removeItem("userData");
    localStorage.removeItem("userImage");
    // console.log("signout");
  };
  //search baar
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event);
  };

  useEffect(() => {
    setUser(userData ? userData.Role : null);
  }, [userData]);
 
  
  useEffect(() => {
    if (userData) {
        const fetchImage = async () => {
            try {
                const profilePic = await getUserProfilePic(userData.UserName);
                if (profilePic !== "Image not found") {
                    setUserImage(profilePic);
                } else {
                    setUserImage(dummy);
                }
            } catch (error) {
                console.error("Failed to fetch user image", error);
                setUserImage(dummy);
            }
        };
        fetchImage();
    }
}, [userData, getUserProfilePic, setUserImage,flag]);
  return (
    <div>
      <div className="app">
        <nav className="inner">
          <div>
            {" "}
            <button className="openbtn" onClick={toggleSidebar}>
              &#9776;
            </button>
          </div>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
            />
          </div>
          {user === "Domain Expert" ? (
            <div className="addVideobtn">
              <Link to="/addVideo">
                <i className="fas fa-video"></i>
              </Link>
              <Link to="/expertProfile">
                <div className="navpic">
                  <img src={image} alt="User" />
                </div>
              </Link>
            </div>
          ) : null}
          {user === "School" ? (
            <div className="addVideobtn">
            <Link to="/allVideos">
                <i className="fas fa-video"></i>
              </Link>
              <Link to="/schoolProfile">
                <div className="navpic">
                  <img src={image} alt="User" />
                </div>
              </Link>
            </div>
          ) : null}

          {user === "Teacher" ? (
            <div className="addVideobtn">
              <Link to="/CreateEvent">
                <i className="fa-solid fa-calendar-plus"></i>
              </Link>
              <Link to="/teacherProfile">
                <div className="navpic">
                  <img src={image} alt="User" />
                </div>
              </Link>
            </div>
          ) : null}
          {user === "Student" ? (
            <div className="addVideobtn">
              <Link to="/interestVideos">
                <i className="fas fa-video"></i>
              </Link>
              <Link to="/studentProfile">
                <div className="navpic">
                  <img src={image} alt="User" />
                </div>
              </Link>
            </div>
          ) : null}
        </nav>
        {/* side baar links */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          {user === "Teacher" ? (
            <div>
              <Link to="/teacherHome" onClick={toggleSidebar}>
                <div className="term">
                  <i className="fas fa-home"></i>
                  <p>Home</p>
                </div>
              </Link>
              <Link to="/allEvents" onClick={hideButton}>
                <div className="term">
                  <i class="fa-regular fa-calendar-days"></i>
                  <p class="no-wrap">All Events</p>
                </div>
              </Link>
            </div>
          ) : null}
          {user === "Domain Expert" ? (
            <Link to="/expertHome" onClick={toggleSidebar}>
              <div className="term">
                <i className="fas fa-home"></i>
                <p>Home</p>
              </div>
            </Link>
          ) : null}
          {user === "Student" ? (
            <div>
              <Link to="/studentHome" onClick={toggleSidebar}>
                <div className="term">
                  <i className="fas fa-home"></i>
                  <p>Home</p>
                </div>
              </Link>
            </div>
          ) : null}
          {user === "School" ? (
            <div>
              <Link to="/schoolHome" onClick={toggleSidebar}>
                <div className="term">
                  <i className="fas fa-home"></i>
                  <p>Home</p>
                </div>
              </Link>
            </div>
          ) : null}
          {user !== "Student" ? (
            <Link to="/allVideos" onClick={toggleSidebar}>
              <div className="term">
                <i className="fas fa-video"></i>
                <p>Videos</p>
              </div>
            </Link>
          ) : (
            <>
              <Link to="/test" onClick={toggleSidebar}>
                <div className="term">
                  <i class="fa-solid fa-file-lines"></i>
                  <p>Test</p>
                </div>
              </Link>
              <Link to="/interestVideos" onClick={toggleSidebar}>
                <div className="term">
                  <i className="fas fa-video"></i>
                  <p>Videos</p>
                </div>
              </Link>
            </>
          )}
          {user === "Teacher" ? (
            <Link to="/teacherSetting" onClick={toggleSidebar}>
              <div className="term">
                <i className="fas fa-cog"></i>
                <p>Setting</p>
              </div>
            </Link>
          ) : null}
          {user === "Domain Expert" ? (
            <Link to="/expertSetting" onClick={toggleSidebar}>
              <div className="term">
                <i className="fas fa-cog"></i>
                <p>Setting</p>
              </div>
            </Link>
          ) : null}
          {user === "Student" ? (
            <Link to="/studentSetting" onClick={toggleSidebar}>
              <div className="term">
                <i className="fas fa-cog"></i>
                <p>Setting</p>
              </div>
            </Link>
          ) : null}
          {user === "School" ? (
            <>
              <Link to="/addTeacher" onClick={toggleSidebar}>
                <div className="term">
                  <i class="fa-solid fa-user-tie"></i>
                  <p class="no-wrap">Add Teacher</p>
                </div>
              </Link>
              <Link to="/addStudent" onClick={toggleSidebar}>
                <div className="term">
                  <i class="fa-solid fa-user"></i>
                  <p class="no-wrap">Add Student</p>
                </div>
              </Link>
              <Link to="/schoolSetting" onClick={toggleSidebar}>
                <div className="term">
                  <i className="fas fa-cog"></i>
                  <p>Setting</p>
                </div>
              </Link>
            </>
          ) : null}

          <Link to="/SignIn" onClick={signOut}>
            <div className="term">
              <i className="fas fa-sign-out-alt"></i>
              <p>SignOut</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
Nav.defaultProps = {
  onSearch: () => {}, // Does nothing by default
};
export default Nav;
