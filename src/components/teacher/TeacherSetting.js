import React, { useContext, useEffect, useState } from "react";
import dummy from "../common/user.png";
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";
import { Link } from "react-router-dom";
import { getTeacherByUserId } from "../../Context/AppContext";
const ExpertProfile = () => {
  const [imageSrc, setImageSrc] = useState(dummy);
  const [name, setName] = useState("");
  const [domains, setDomains] = useState([]);
  const designation = "Domain Expert";
  const { userData,flag,getUserProfilePic} = useContext(CounsellingContext);

  useEffect(() => {
    const fetchDomainExpert = async () => {
      if (userData.Id) {
        try {
          const data = await getTeacherByUserId(userData.Id);
          console.log(data)
          setName(data.Name);
          setDomains(data.Domain);
          // setImageSrc(localStorage.getItem('image'))
        } catch (error) {
          console.error("Failed to fetch domain expert by user ID:", error);
        }
      }
    };
    // console.log(imageSrc);
    // Call the async function
    fetchDomainExpert();
  }, [userData.Id, getTeacherByUserId]);
  // console.log(domains)
  // useEffect(()=>{
  //   const img = localStorage.getItem('userImage')
  //   if(img!='Image not found'){
  //     setImageSrc(img);
  //   }
  //   else{
  //     setImageSrc(defaultUser)
  //   }
  //   console.log(img)
  //   // console.log('heelo')
  // },[flag])
  useEffect(() => {
    if (userData) {
        const fetchImage = async () => {
            try {
                const profilePic = await getUserProfilePic(userData.UserName);
                if (profilePic !== "Image not found") {
                  setImageSrc(profilePic);
                } else {
                  setImageSrc(dummy);
                }
            } catch (error) {
                console.error("Failed to fetch user image", error);
                setImageSrc(dummy);
            }
        };
        fetchImage();
    }
}, [userData, getUserProfilePic, setImageSrc]);
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
      <div style={{display:'flex',justifyContent:'flex-end',width:'50%',marginTop:'20px'}}>
      <Link to='/expertSetting'>Setting</Link>
      </div>
    </React.Fragment>
  );
};

export default ExpertProfile;
