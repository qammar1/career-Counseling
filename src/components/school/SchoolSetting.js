import React, { useContext, useEffect, useState } from 'react';
import dummy from '../common/user.png';
import Nav from '../common/Nav';
import { CounsellingContext } from '../../Context/ContextApi';
import { getSchoolByUserId, getUserByUserId } from '../../Context/AppContext';
import { Link } from 'react-router-dom';
import ChangePassword from '../common/ChangePassword';

const SchoolSetting = () => {
  const [imageSrc, setImageSrc] = useState(dummy);
  const [schoolName, setSchoolName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const designation = 'School Admin';
  const { userData, getUserProfilePic, uploadImage } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      if (userData.Id) {
        try {
          const school = await getSchoolByUserId(userData.Id);
          const user = await getUserByUserId(userData.Id);
          if (school[0]?.Name) {
            setSchoolName(school[0].Name);
            setAddress(school[0].Address);
          }
          setUserName(user?.Name);
        } catch (error) {
          console.error("Failed to fetch school details:", error);
        }
      }
    };

    fetchSchoolDetails();
  }, [userData.Id, getSchoolByUserId, getUserByUserId]);

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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageSrc(fileUrl); // Preview the image
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${userData.UserName}.${fileExtension}`;

      try {
        const formData = new FormData();
        formData.append("image", file, newFileName);
        const success = await uploadImage(formData);
        if (!success) {
          throw new Error("Failed to upload image");
        }
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error during image upload:", error);
        setImageSrc(dummy); // Revert to default on error
      }
    }
  };

  return (
    <>
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
              <span className="name">{userName}</span>
              <span className="designation">{designation}</span>
            </div>
          </div>
          <div className="about">
            <div className="head">School Name</div>
            <div className="detail">{schoolName || "Name not available"}</div>
            <div className="head">Address</div>
            <div className="detail">{address || "Address not found"}</div>
          </div>
          <div className='changePassword'>
            <Link to='/changePassword'><span>Change Password</span></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolSetting;
