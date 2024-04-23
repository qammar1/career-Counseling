import React, { useEffect, useState,useContext} from "react";
// import user from "../domainExpert/user.jpg";
import userImg from "./user.png";
import { CounsellingContext } from "../../Context/ContextApi";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const rating = 3;
  const views = 20;
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState(userImg);
  // const [user,setUser] = useState('')
  const {getUserById, getUserProfilePic} = useContext(CounsellingContext);

  useEffect(() => {
    setName(video.DomainExpert);
    // checkAndFetchImage();
  }, []);

// const user =async()=>{
//   const a = await getDomainExpertByUserId(video.DomainExpertUserId)
//   console.log(a)
// } 
// user();
  
  const object = {
    name: name,
    rating: rating,
    link: video.Link,
    views: views,
    description: video.Description,
    title: video.Title,
    image:imageSrc
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log(video.DomainExpert.Users.Username)
        // console.log(video.DomainExpert.Users.UserName)
        // const fetchedUser = await getUserById(video.DomainExpertUserId);
        const image = await getUserProfilePic(video.DomainExpert.Users.UserName)
        if(image!=="Image not found"){
          // console.log(image)
          setImageSrc(image)
        }
        else{
          setImageSrc(userImg)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setImageSrc(userImg)
      }
    };
    fetchUser();
    
  }, [video.DomainExpertUserId]);

  function extractVideoID(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  const videoID = extractVideoID(video.Link);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoID}/0.jpg`;
  
  return (
    <div className="cardVideo">
      <Link to="/videoPlayer" state={{ object: object }}>
        <div className="image-container">
          <img
            src={thumbnailUrl}
            alt={video.Title}
            style={{ width: "270px", height: "150px" }}
          />
        </div>
      </Link>
      <div className="Cardcontent">
        <h3 className="description-clamp"  style={{ textTransform: 'capitalize' }}>{video.Title}</h3>
        <p style={{ textTransform: 'capitalize' }}>Domain :: {video.Domain.Title}</p>
        <p className="description-clamp">{video.Description}</p>
        <div className="user-profile">
          <img src={imageSrc || userImg} alt="User" className="user-image" />
          <span className="user-name">{video.DomainExpert.Users.Name}</span>
        </div>
        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < rating ? "filled" : "empty"}>
                ★
              </span>
            ))}
            <p className="rating-num">{rating}</p>
          </div>

          <div className="views"> {views} views</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
