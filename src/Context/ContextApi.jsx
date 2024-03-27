import React, { useEffect, useState } from "react";
const CounsellingContext = React.createContext();
var url = "http://192.168.0.102/CareerCounselligBackend/api/careercounselling/";
function DataProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [allVideos, setAllVideos] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [expertData, setExpertData] = useState([]);
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
  //upload image
const uploadImage = async imageData => {
    if (imageData) {
      const formData = new FormData();
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.name,
      });
  
      try {
        const response = await fetch(url + 'uploadImage', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Success:', JSON.stringify(result));
        } else {
          const errorData = await response.json();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorData.message}`,
          );
        }
      } catch (error) {
        console.error('Upload error:', error.message);
      }
    } else {
      console.log('Error', 'Please select an image first.');
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
        uploadImage
      }}
    >
      {children}
    </CounsellingContext.Provider>
  );
}
const DataConsumer = CounsellingContext.Consumer;
export { DataProvider, DataConsumer, CounsellingContext };
