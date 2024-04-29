import React, { useContext, useEffect, useState } from 'react';
import dummy from '../common/user.png';
import Nav from '../common/Nav';
import { CounsellingContext } from '../../Context/ContextApi';
import { getSchoolByUserId,getUserByUserId } from '../../Context/AppContext';
import { Link } from 'react-router-dom';

const SchoolProfile = () => {
  const [imageSrc, setImageSrc] = useState(dummy);
  const [schoolName, setSchoolName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState();
  const designation = 'School Admin';
  const { userData, getUserProfilePic } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      if (userData.Id) {
        try {
          const school = await getSchoolByUserId(userData.Id);
          const user = await getUserByUserId(userData.Id);
          console.log(userData)
          console.log(user)
          console.log(school)
          if (school[0]?.Name) {
            setSchoolName(school[0].Name);
            console.log(school[0].Name);
            setAddress(school[0].Address);
          }
          setUserName(user?.Name)
        } catch (error) {
          console.error("Failed to fetch School details:", error);
        }
      }
    };

    fetchSchoolDetails();
  }, [userData.Id, getSchoolByUserId]);

  useEffect(() => {
    if (userData.UserName) {
      const fetchImage = async () => {
        try {
          const profilePic = await getUserProfilePic(userData.UserName);
          setImageSrc(profilePic || dummy);
        } catch (error) {
          console.error("Failed to fetch user image:", error);
          setImageSrc(dummy);
        }
      };

      fetchImage();
    }
  }, [userData.UserName, getUserProfilePic]);

  return (
    <>
      <Nav />
      <div className="main">
        <div className="abc">
          <div className="profile">
            <img src={imageSrc} alt="User" className="image" />
            <div className="details">
              <span className="name">{userName}</span>
              <span className="designation">{designation}</span>
            </div>
          </div>
          <div className="about">
            <div className="head">School Name</div>
            <div className="detail">{schoolName || "Name"}</div>
            <div className="head">Address</div>
            <div className="detail">{address || "Address not found"}</div>
          </div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',width:'50%',marginTop:'20px'}}>
      <Link to='/schoolSetting'>Setting</Link>
      </div>
    </>
  );
};

export default SchoolProfile;
