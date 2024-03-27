import React,{useContext, useEffect, useState} from "react";
import defaultUser from "./user.jpg"; // Import default image
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

const ExpertProfile = () => {

  const [imageSrc, setImageSrc] = useState(null);
  const [name,setName] = useState('')
  const [domains,setDomains] = useState([])
  const designation = "Domain Expert";
  const detail =
  "I've been designing user interfaces for about five years now, and I absolutely love it! In my experience, UI design is all about creating a compelling experience for the user. I strive to create interfaces that are easy to use and look beautiful while doing so.";
  const {userData,getDomainExpertByUserId} = useContext(CounsellingContext);

  useEffect(() => {
  const fetchDomainExpert = async () => {
    if (userData.Id) {
      try {
        const data = await getDomainExpertByUserId(userData.Id);
        setName(data.Name)
        setDomains(data.Domain)
      } catch (error) {
        console.error('Failed to fetch domain expert by user ID:', error);
      }
    }
  };
  // Call the async function
  fetchDomainExpert();
}, [userData.Id, getDomainExpertByUserId]);
console.log(domains)
  return (
    <React.Fragment>
      <Nav />
      <div className="main">
        <div className="abc">
          <div className="profile">
            <img src={imageSrc || defaultUser} alt="User" className="image" />
            <div className="details">
              <span className="name">{name}</span>
              <span className="designation">{designation}</span>
            </div>
          </div>
          <div className="about">
            <div className="head">Domain</div>
            <div className="detail">{domains[0]}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExpertProfile;
