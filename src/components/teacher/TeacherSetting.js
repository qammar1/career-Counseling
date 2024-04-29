import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../common/Nav';
import { CounsellingContext } from '../../Context/ContextApi';
import { getTeacherByUserId } from '../../Context/AppContext';

import defaultUser from "../common/user.png";

const ExpertProfile = () => {
  const [imageSrc, setImageSrc] = useState(defaultUser);
  const [name, setName] = useState('');
  const [userName,setUserName] = useState('');
  const [school, setSchool] = useState();
  const designation = 'Teacher';
  const { userData, getUserProfilePic,uploadImage } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchDomainExpert = async () => {
      if (userData?.Id) {
        try {
          const data = await getTeacherByUserId(userData.Id);
          console.log(data[0])
          
          setUserName(userData.UserName);
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
  const handleImageUpload = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      // console.log(fileUrl)
      setImageSrc(fileUrl); // Preview the image

      const fileExtension = file.name.split(".").pop();
      const newFileName = `${userName}.${fileExtension}`;

      try {
        const formData = new FormData();
        formData.append("image", file, newFileName);

        const success = await uploadImage(formData);
        if (success) {
          console.log("Image uploaded successfully");
        } else {
          console.error("Failed to upload image");
          setImageSrc(defaultUser); // Revert to default on error
        }
      } catch (error) {
        console.error("Error during image upload:", error);
        setImageSrc(defaultUser); // Revert to default on error
      }
    }
  };
  return (
    <React.Fragment>
      <Nav />
      <div className="main">
        <div className="abc">
          <div className="profile">
          <img src={imageSrc} alt="User" className="image" />
            <div className="image-upload">
              <label htmlFor="file-input">
                <i className="fa-solid fa-plus"></i>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
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
    </React.Fragment>
  );
};

export default ExpertProfile;
