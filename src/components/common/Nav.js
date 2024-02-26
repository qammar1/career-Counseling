import React, { useState } from "react";
import img from "./user.jpg";
import { Link } from "react-router-dom";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  // const [show, setShow] = useState(true);

  let user = "domainExpert";
  // let user = "teacher";

  const toggleSidebar = () => setIsOpen(!isOpen);
  const hideButton = () => {
    setIsOpen(!isOpen);
    // setShow(false);
  };
  //search baar
  const [query, setQuery] = useState("");
  // const {toggleSidebar} = props;
  const handleChange = (event) => {
    setQuery(event.target.value);
    // if(onSearch) {
    //   onSearch(event.target.value);
    // }
  };
  return (
    <div>
      <div className="app">
        {/* {show ? ( */}
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
            {user === "domainExpert" ? (
              <div className="addVideobtn">
                <Link to="/addVideo">
                  <i className="fas fa-video"></i>
                </Link>
                <Link to="/expertProfile">
                  <div className="navpic">
                    <img src={img} alt="User" />
                  </div>
                </Link>
              </div>
            ) : null}
            {/* {loginFailed && <p>Wrong email or password</p>} */}

            {user === "teacher" ? (
              <div className="addVideobtn">
                <Link to="/CreateEvent">
                  <i className="fa-solid fa-calendar-plus"></i>
                </Link>
                <Link to="/teacherProfile">
                  <div className="navpic">
                    <img src={img} alt="User" />
                  </div>
                </Link>
              </div>
            ) : null}
          </nav>
        {/* ) : null} */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          {user === "teacher"?<Link to="/teacherHome" onClick={toggleSidebar}>
            <div className="term">
              <i className="fas fa-home"></i>
              <p>Home</p>
            </div>
          </Link>:null}
          {user === "domainExpert" ? (
            <Link to="/expertHome" onClick={toggleSidebar}>
              <div className="term">
                <i className="fas fa-home"></i>
                <p>Home</p>
              </div>
            </Link>
          ) : null}

          <Link to="/allVideos" onClick={toggleSidebar}>
            <div className="term">
              <i className="fas fa-video"></i>
              <p>Videos</p>
            </div>
          </Link>
          {user === "teacher" ? (
            <Link to="/allEvents" onClick={hideButton}>
              <div className="term">
              <i class="fa-regular fa-calendar-days"></i>
                <p>AllEvents</p>
              </div>
            </Link>
          ) : null}
          <Link to="/teacherProfile" onClick={toggleSidebar}>
            <div className="term">
              <i className="fas fa-cog"></i>
              <p>Setting</p>s
            </div>
          </Link>
          <Link to="/SignIn" onClick={hideButton}>
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
export default Nav;
