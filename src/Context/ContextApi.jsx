import React, { useEffect, useState } from "react";
import img from '../components/common/user.png'
const CounsellingContext = React.createContext();
var url = "http://192.168.0.103/CareerCounselligBackend/api/careercounselling/";
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
  };
  // get all videos
  const getAllVideos = async () => {
    try {
      var res = await fetch(url + "getAllVideos");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      var data = await res.json();
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
  
const uploadImage = async (formData) => {
  try {
    const response = await fetch(url + 'uploadImage', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type manually, let the browser handle it
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Success:', JSON.stringify(result));
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
      );
    }
  } catch (error) {
    console.error('Upload error:', error.message);
  }
};
  
  //GET USER PROFILE PIC
const getUserProfilePic = async imageName => {
  try {
    const response = await fetch(
      url + 'SearchImage?imageName=' + encodeURIComponent(imageName),
    );
    const data = await response.json();
    // console.log(data);
    // setUpdateFlag(prev => !prev);
    // setUserImage(data);
    localStorage.setItem('userImage',data)

    return data;
  } catch (error) {
    console.error('Error fetching user profile pic:', error);
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
        // userImage,
        // updateFlag,
        flag,
        setFlag
      }}
    >
      {children}
    </CounsellingContext.Provider>
  );
}
const DataConsumer = CounsellingContext.Consumer;
export { DataProvider, DataConsumer, CounsellingContext };