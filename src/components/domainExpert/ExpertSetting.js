// import React, { useContext, useEffect, useState } from "react";
// import defaultUser from "../common/user.png";
// import Nav from "../common/Nav";
// import { CounsellingContext } from "../../Context/ContextApi";

// const ExpertSetting = () => {
//   const [imageSrc, setImageSrc] = useState(defaultUser);
//   // const [flag, setFlag] = useState(true);
//   const [userName, setUserName] = useState("");
//   const [name, setName] = useState("");
//   const [domains, setDomains] = useState([]);
//   const designation = "Domain Expert";
//   const { userData, getDomainExpertByUserId, uploadImage, getUserProfilePic,setFlag,flag } =
//     useContext(CounsellingContext);

//   useEffect(() => {
//     const fetchDomainExpert = async () => {
//       if (userData.Id) {
//         try {
//           const data = await getDomainExpertByUserId(userData.Id);
//           setName(data.Name);
//           setDomains(data.Domain);
//           setUserName(userData.UserName);
//           getUserProfilePic(userData.UserName);
//         } catch (error) {
//           console.error("Failed to fetch data:", error);
//         }
//       }
//     };
//     fetchDomainExpert();
//   }, [userData.Id, getDomainExpertByUserId]);
//   useEffect(() => {
//     const image = localStorage.getItem("userImage");
//     if(image=="Image not found"){
//       setImageSrc(defaultUser)
//     }else{
//       setImageSrc(image);
//     }
//   }, []);

//   const handleImageUpload = async (event) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       const fileUrl = URL.createObjectURL(file);

//       setImageSrc(fileUrl); // Preview the image
//       localStorage.setItem("userImage", fileUrl);
//       setFlag(!flag);
//       // console.log(flag)
//       const fileExtension = file.name.split(".").pop();
//       const newFileName = `${userName}.${fileExtension}`;

//       try {
//         // Create FormData and append the file
//         const formData = new FormData();
//         formData.append("image", file, newFileName);
//         await uploadImage(formData);
//       } catch (error) {
//         console.error("Error during image upload:", error);
//         // setImageSrc(defaultUser); // Revert to default on error
//       }
//     }
//   };

//   return (
//     <>
//       <Nav />
//       <div className="main">
//         <div className="abc">
//           <div className="profile">
//             <img src={imageSrc} alt="User" className="image" />
//             <div className="image-upload">
//               <label htmlFor="file-input">
//                 <i className="fa-solid fa-plus"></i>
//               </label>
//               <input
//                 id="file-input"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//             </div>
//             <div className="details">
//               <span className="name">{name}</span>
//               <span className="designation">{designation}</span>
//             </div>
//           </div>
//           <div className="about">
//             <div className="head">Domain</div>
//             <div className="detail">{domains}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ExpertSetting;
import React, { useContext, useEffect, useState } from "react";
import defaultUser from "../common/user.png";
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

const ExpertSetting = () => {
  const [imageSrc, setImageSrc] = useState(defaultUser);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [domains, setDomains] = useState([]);
  const designation = "Domain Expert";
  const { userData, getDomainExpertByUserId, uploadImage, getUserProfilePic } =
    useContext(CounsellingContext);

  useEffect(() => {
    const fetchDomainExpert = async () => {
      if (userData.Id) {
        try {
          const data = await getDomainExpertByUserId(userData.Id);
          setName(data.Name);
          setDomains(data.Domain);
          setUserName(userData.UserName);
          const profilePic = await getUserProfilePic(userData.UserName);
          // console.log(profilePic.imageUrl)
          setImageSrc(profilePic|| defaultUser);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    fetchDomainExpert();
  }, [userData.Id, getDomainExpertByUserId, getUserProfilePic]);

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
              <span className="designation">{designation}</span>
            </div>
          </div>
          <div className="about">
            <div className="head">Domain</div>
            <div className="detail">{domains.join(", ")}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertSetting;
