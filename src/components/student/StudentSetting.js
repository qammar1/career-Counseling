import React, { useContext, useEffect, useState } from "react";
import defaultUser from "../common/user.png";
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

const StudentSetting = () => {
  const [imageSrc, setImageSrc] = useState(defaultUser);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const { userData, uploadImage, getUserProfilePic } = useContext(CounsellingContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData.Id) {
        const profilePic = await getUserProfilePic(userData.UserName).catch(console.error);
        setImageSrc(profilePic || defaultUser);

        const { getStudentByUserId } = require("../../Context/AppContext"); // Assume dynamic import (conditional based on userData.Id presence)
        const data = await getStudentByUserId(userData.Id);
        if (data[0]?.StudentName) {
          setName(data[0].StudentName);
        }
      }
    };

    fetchUserData();
  }, [userData, getUserProfilePic]);

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
        setImageSrc(defaultUser); // Revert to default on error
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
              <span className="name">{name}</span>
              <span className="designation">Student</span>
            </div>
          </div>
          <div className="about">
            <div className="head">Interests</div>
            <div className="detail">{interests.join(", ") || "No interests defined"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSetting;
