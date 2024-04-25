import React, { useEffect, useState } from "react";
import img from '../components/common/user.png'
const CounsellingContext = React.createContext();
var url = "http://192.168.0.104/CareerCounselligBackend/api/careercounselling/";
function DataProvider({ children }) {
  const [userData, setUserData] = useState({});
   const [flag, setFlag] = useState(true);
  // const [userImage,setUserImage] = useState(img);
  const [allVideos, setAllVideos] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [expertData, setExpertData] = useState([]);
  // const [updateFlag, setUpdateFlag] = useState(false);
  
  const handleSignIn = async (username, password) => {
    setLoading(true);
    try {
      const apiUrl =
        url +
        `GetUser?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`;
      var res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      var data = await res.json();
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("Error in getting user details", error);
      throw error;
    }
  };
  // console.log(flag)
  //GET DOMAIN EXPERT BY USER ID
  const getDomainExpertByUserId = async (userId) => {
    try {
      const response = await fetch(
        url + "getDomainExpertByUserId?id=" + encodeURIComponent(userId)
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Domain Expert data:", error);
    }
    // console.log(userId);
  };
  // get all videos
  const getAllVideos = async () => {
    try {
      var res = await fetch(url + "getAllVideos");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      var data = await res.json();
      // console.log(data)
      setAllVideos(data);
      return data;
    } catch (error) {
      console.log("Error in getting Video", error);
      throw error;
    }
  };
  //fetch domain expert data
  const fetchDomainExpertData = async () => {
    if (userData.Id) {
      const data = await getDomainExpertByUserId(userData.Id);
      setExpertData(data);
    }
  };
  //GET USER DATA


  
// const uploadImage = async (formData) => {
//   try {
//     const response = await fetch(url + 'uploadImage', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         // Don't set Content-Type manually, let the browser handle it
//       },
//     });

//     if (response.ok) {
//       const result = await response.json();
//       console.log('Success:', JSON.stringify(result));
//       return true;
//     } else {
//       const errorData = await response.json();
//       throw new Error(
//         `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
//       );
//     }
//   } catch (error) {
//     console.error('Upload error:', error.message);
//   }
// };
  
  //GET USER PROFILE PIC
// const getUserProfilePic = async imageName => {
//   try {
//       const response = await fetch(
//         url + 'SearchImage?imageName=' + encodeURIComponent(imageName),
//       );
//       const data = await response.json();
//       // console.log(data)
//       return data;
    
//   } catch (error) {
//     console.error('Error fetching user profile pic:', error);
//   }
// };
  //GET USER PROFILE PIC
const getUserById = async id => {
  try {
    const response = await fetch(
      url + 'getUserById?id=' + encodeURIComponent(id),
    );
    const data = await response.json();
    // console.log(data)
    // console.log(data);
    // setUpdateFlag(prev => !prev);
    // setUserImage(data);
    // localStorage.setItem('userImage',data)
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


  useEffect(() => {
    if (userData != null) {
      fetchDomainExpertData();
    }
  }, [userData]);

  useEffect(() => {
    getAllVideos();
    const storedUserData = localStorage.getItem("userData");
    setUserData(JSON.parse(storedUserData));
    // getUserProfilePic();
  }, []);
  const uploadImage = async (formData) => {
        try {
          const response = await fetch(`${url}uploadImage`, {
            method: "POST",
            body: formData,
            // headers: { /* if required */ }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setFlag(!flag)
          console.log("Success:", result);
          return true;
        } catch (error) {
          console.error("Upload error:", error.message);
          return false;
        }
      };
    
      const getUserProfilePic = async (imageName) => {
        try {
          // console.log(imageName)
          const response = await fetch(`${url}SearchImage?imageName=${encodeURIComponent(imageName)}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching user profile pic:", error);
          throw error;
        }
      };
      const uploadRating = async ratingData => {
        try {
          const response = await fetch(url + 'saveRating', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({rating: ratingData}),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }else{
            console.log('rated')
          }
      
          return response.json();
        } catch (error) {
          console.error('Error adding rating:', error.message);
          // Handle the error here
          throw error; // Rethrow the error if needed
        }
      };
      
  return (
    <CounsellingContext.Provider
      value={{
        handleSignIn,
        userData,
        allVideos,
        Loading,
        getAllVideos,
        expertData,
        getDomainExpertByUserId,
        uploadImage,
        getUserProfilePic,
        flag,
        setFlag,
        getUserById,
        uploadRating
      }}
    >
      {children}
    </CounsellingContext.Provider>
  );
}
const DataConsumer = CounsellingContext.Consumer;
export { DataProvider, DataConsumer, CounsellingContext };
// import React, { createContext, useEffect, useState } from "react";
// // const DataProvider = createContext();
// const CounsellingContext = React.createContext();
// const url = "http://192.168.0.104/CareerCounselligBackend/api/careercounselling/";

// const CounsellingProvider = ({ children }) => {
//   const [userData, setUserData] = useState({});
//   const [allVideos, setAllVideos] = useState([]);
//   const [expertData, setExpertData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSignIn = async (username, password) => {
//     setLoading(true);
//     try {
//       const apiUrl = `${url}GetUser?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setUserData(data);
//       localStorage.setItem("userData", JSON.stringify(data));
//       return data;
//     } catch (error) {
//       console.log("Error in getting user details", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDomainExpertByUserId = async (userId) => {
//     try {
//       const response = await fetch(`${url}getDomainExpertByUserId?id=${encodeURIComponent(userId)}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching Domain Expert data:", error);
//       throw error;
//     }
//   };

//   const getAllVideos = async () => {
//     try {
//       const response = await fetch(`${url}getAllVideos`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setAllVideos(data);
//       return data;
//     } catch (error) {
//       console.log("Error in getting Video", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData");
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   useEffect(() => {
//     if (userData.Id) {
//       const fetchDomainExpertData = async () => {
//         const data = await getDomainExpertByUserId(userData.Id);
//         setExpertData(data);
//       };
//       fetchDomainExpertData();
//     }
//   }, [userData.Id, getDomainExpertByUserId]);

//   const uploadImage = async (formData) => {
//     try {
//       const response = await fetch(`${url}uploadImage`, {
//         method: "POST",
//         body: formData,
//         // headers: { /* if required */ }
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const result = await response.json();
//       console.log("Success:", result);
//       return true;
//     } catch (error) {
//       console.error("Upload error:", error.message);
//       return false;
//     }
//   };

//   const getUserProfilePic = async (imageName) => {
//     try {
//       const response = await fetch(`${url}SearchImage?imageName=${encodeURIComponent(imageName)}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching user profile pic:", error);
//       throw error;
//     }
//   };

//   const value = {
//     handleSignIn,
//     userData,
//     allVideos,
//     loading,
//     getAllVideos,
//     expertData,
//     getDomainExpertByUserId,
//     uploadImage,
//     getUserProfilePic,
//   };

//   return <CounsellingContext.Provider value={value}>{children}</CounsellingContext.Provider>;
// };
// const DataConsumer = CounsellingContext.Consumer;
// export { DataProvider,DataConsumer, CounsellingContext };
