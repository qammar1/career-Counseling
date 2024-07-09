import React, { useEffect, useState,useContext  } from "react";

const CounsellingContext = React.createContext();
// export const useUser = () => useContext(CounsellingContext);
var url = "http://192.168.43.246/CareerCounselligBackend/api/careercounselling/";
function DataProvider({ children }) {
  const [userData, setUserData] = useState({});
   const [flag, setFlag] = useState(true);
  // const [userImage,setUserImage] = useState(img);
  const [allVideos, setAllVideos] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [expertData, setExpertData] = useState([]);
  const [rating, setRating] = useState(0);
  // const [updateFlag, setUpdateFlag] = useState(false);


  const updateUser = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };
  
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
      if(response.ok){
        return data;
      }
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
      // console.log(data)
      setExpertData(data);
    }
  };
  
  //GET USER PROFILE PIC
const getUserById = async id => {
  try {
    const response = await fetch(
      url + 'getUserById?id=' + encodeURIComponent(id),
    );
    const data = await response.json();
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
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setFlag(!flag)
          // console.log("Success:", result);
          return true;
        } catch (error) {
          console.error("Upload error:", error.message);
          return false;
        }
      };
    
      const getUserProfilePic = async (imageName) => {
        if(imageName){
          try {
            const response = await fetch(`${url}SearchImage?imageName=${encodeURIComponent(imageName)}`);
            if (!response.ok) {
              return null;  // or any other appropriate value or action
          }
            const data = await response.json();
            if(response.ok){
              return data;
            }else{
              return null;
            }
          } catch (error) {
            return null;
            // console.error("Error fetching user profile pic:", error);
            // throw error;
          }
        }
      };
      const uploadRating = async (ratingData) => {
        // console.log('Rating data:', ratingData);
        // console.log('Sending rating...');
    
        try {
            const response = await fetch(url + 'saveRating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({rating: ratingData})
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json(); // Read the response data only once
            // console.log('Rating response:', responseData);
            return responseData;
        } catch (error) {
            console.error('Error adding rating:', error.message);
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
        uploadRating,
        updateUser,
        rating,
        setRating,
      }}
    >
      {children}
    </CounsellingContext.Provider>
  );
}
const DataConsumer = CounsellingContext.Consumer;
export { DataProvider, DataConsumer, CounsellingContext };
