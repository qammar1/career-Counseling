import React, { useContext, useEffect, useState } from "react";
import defaultUser from "../common/user.png";
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

const ExpertProfile = () => {
  const [imageSrc, setImageSrc] = useState(defaultUser);
  const [name, setName] = useState("");
  const [domains, setDomains] = useState([]);
  const designation = "Domain Expert";
  const { userData, getDomainExpertByUserId,flag} = useContext(CounsellingContext);

  useEffect(() => {
    const fetchDomainExpert = async () => {
      if (userData.Id) {
        try {
          const data = await getDomainExpertByUserId(userData.Id);
          setName(data.Name);
          setDomains(data.Domain);
          // setImageSrc(localStorage.getItem('image'))
        } catch (error) {
          console.error("Failed to fetch domain expert by user ID:", error);
        }
      }
    };
    console.log(imageSrc);
    // Call the async function
    fetchDomainExpert();
  }, [userData.Id, getDomainExpertByUserId]);
  // console.log(domains)
  useEffect(()=>{
    const img = localStorage.getItem('userImage')
    setImageSrc(img);
    // console.log(img)
    // console.log('heelo')
  },[flag])
  return (
    <React.Fragment>
      <Nav />
      <div className="main">
        <div className="abc">
          <div className="profile">
            <img
              src={imageSrc}
              alt="User"
              className="image"
            />
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
