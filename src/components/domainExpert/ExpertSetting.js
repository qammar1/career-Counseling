import React,{useContext, useEffect, useState} from "react";
// import user from "./user.jpg";
import defaultUser from "./user.jpg"; // Import default image
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

const ExpertSetting = () => {

  const [imageSrc, setImageSrc] = useState(null);
  const [name,setName] = useState('')
  const [userName,setUserName] = useState('')
  const [domains,setDomains] = useState([])
  const designation = "Domain Expert";
  const detail =
  "I've been designing user interfaces for about five years now, and I absolutely love it! In my experience, UI design is all about creating a compelling experience for the user. I strive to create interfaces that are easy to use and look beautiful while doing so.";
  const {userData,getDomainExpertByUserId,uploadImage} = useContext(CounsellingContext);

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
      setUserName(userData.UserName)
    }
  };
  // Call the async function
  fetchDomainExpert();
}, [userData.Id, getDomainExpertByUserId]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
const handleImageUpload = async (event) => {
    try {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];

        // Update local state with selected image for display, if necessary
        const fileUrl = URL.createObjectURL(file);

        // Update local state with selected image for display
        setImageSrc(fileUrl);

        const fileExtension = file.name.split('.').pop();
        const newFileName = `${userName}.${fileExtension}`;

        // Prepare the file for upload
        // Note: The actual file content isn't changed here, just the metadata for upload.
        // Your backend will need to handle the file accordingly.
        const imageData = {
          uri: file,
          type: file.type,
          name: newFileName,
        };

        // Assuming 'uploadImage' is a function to upload the image
       const res = await uploadImage(imageData);
       console.log(res)
        console.log(imageData);
      }
    } catch (error) {
      console.error('Error handling the image:', error);
    }
  };
// console.log(userData)
  return (
    <React.Fragment>
      <Nav />
      <div className="main">
        <div className="abc">
          <div className="profile">
            <img src={imageSrc || defaultUser} alt="User" className="image" />
            <div className="image-upload">
              <label htmlFor="file-input">
                {/* Replace "Pencil Icon" with an actual icon/image */}
                <i class="fa-solid fa-plus"></i>
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
          {/* <div className="about">
            <div className="head">About</div>
            <div className="detail">{detail}</div>
          </div> */}
          <div className="about">
            <div className="head">Domain</div>
            <div className="detail">{domains[0]}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExpertSetting;
