import React, { useContext, useEffect, useState } from 'react';
import dummy from '../common/user.png';
import Nav from '../common/Nav';
import { CounsellingContext } from '../../Context/ContextApi';
import { getStudentByUserId } from '../../Context/AppContext';
import { Link } from 'react-router-dom';
import { getInterestByStudentId } from '../../Context/AppContext';
const StudentProfile = () => {
  const [imageSrc, setImageSrc] = useState(dummy);
  const [name, setName] = useState('');
  const [domains, setDomains] = useState([]);
  const designation = 'Student';
  const { userData, getUserProfilePic } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (userData.Id) {
        try {
          // const studentData = await getStudentByUserId(userData.Id);
          // if (studentData) {
          //   setName(studentData.Name || '');
          // }
          const data = await getStudentByUserId(userData.Id);
          console.log(data)
          if (data[0]?.StudentName) {
            setName(data[0].StudentName);
          }
          const interestsData = await getInterestByStudentId(data[0].StudentId);
          setDomains(interestsData)
          console.log(interestsData);
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch student details:", error);
        }
      }
    };

    fetchStudentDetails();
  }, [userData.Id, getStudentByUserId]);

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
            <div className="head">Domain</div>
            <div className="detail">{domains || "No domains defined"}</div>
          </div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',width:'50%',marginTop:'20px'}}>
      <Link to='/studentSetting'>Setting</Link>
      </div>
    </React.Fragment>
  );
};

export default StudentProfile;
