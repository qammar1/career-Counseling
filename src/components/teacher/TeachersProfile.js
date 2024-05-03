import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../common/Nav';
import { CounsellingContext } from '../../Context/ContextApi';
import { getTeacherByUserId } from '../../Context/AppContext';
import defaultUser from "../common/user.png";

const TeachersProfile = () => {
  const [imageSrc, setImageSrc] = useState(defaultUser);
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const designation = 'Teacher';
  const { userData, getUserProfilePic } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchDomainExpert = async () => {
      if (userData?.Id) {
        try {
          const data = await getTeacherByUserId(userData.Id);
          // console.log(data[0]);  // Log the first item from the fetched data
          setName(data[0].TeacherName);
          setSchool(data[0].SchoolName);
        } catch (error) {
          console.error('Failed to fetch teacher by user ID:', error);
        }
      }
    };

    fetchDomainExpert();
  }, [userData, getTeacherByUserId]);

  useEffect(() => {
    const fetchImage = async () => {
      if (userData?.UserName) {
        try {
          const profilePic = await getUserProfilePic(userData.UserName);
          setImageSrc(profilePic !== 'Image not found' ? profilePic : defaultUser);
        } catch (error) {
          console.error('Failed to fetch user image', error);
          setImageSrc(defaultUser);
        }
      }
    };

    fetchImage();
  }, [userData, getUserProfilePic]);

  return (
    <React.Fragment>
      <Nav />
      <div className="main">
        <div className="abc">
          <div className="profile">
            <img src={imageSrc} alt="User" className="image" />
            <div className="details">
              <span className="name">{name}</span>
              <span className="designation">{designation}</span>
            </div>
          </div>
          <div className="about">
            <div className="head">School</div>
            <div className="detail">{school}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%', marginTop: '20px' }}>
        <Link to="/teacherSetting">Settings</Link>
      </div>
    </React.Fragment>
  );
};

export default TeachersProfile;
