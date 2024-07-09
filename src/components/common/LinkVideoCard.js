import React, { useEffect, useState, useContext } from "react";
// import user from "../domainExpert/user.jpg";
import userImg from "./user.png";
import { CounsellingContext } from "../../Context/ContextApi";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  // const rating = 3;
  const views = 20;
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState(userImg);
  
  // const [user,setUser] = useState('')
  const { getUserById, getUserProfilePic, userData } =
    useContext(CounsellingContext);

  useEffect(() => {
    setName(video.DomainExpert);
    // console.log(video);
  }, []);
console.log(video)
  const object = {
    vId: video.Id,
    name: name,
    vrating: video.Rating,
    link: video.Link,
    views: views,
    description: video.Description,
    title: video.Title,
    image: imageSrc,
    views:video.ViewsCount,
  };
  // console.log(video.DomainExpert.Users)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log(video);
        const image = await getUserProfilePic(
          video.DomainExpert.Users.UserName
        );
        if (image !== "Image not found") {
          setImageSrc(image);
        } else {
          setImageSrc(userImg);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setImageSrc(userImg);
      }
    };
    fetchUser();
  }, [userData.Id, video.DomainExpertUserId]);

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
      {/* <Link to="/videoPlayer" state={{ object: object }}> */}
        <div className="image-container">
          <img
            src={thumbnailUrl}
            alt={video.Title}
            style={{ width: "270px", height: "150px" }}
          />
        </div>
      {/* </Link> */}
      <div className="Cardcontent">
      <p style={{ textTransform: "capitalize", background:' linear-gradient(103deg, rgba(55,169,135,1) 0%, rgba(71,208,167,1) 51%, rgba(69,221,175,1) 100%)',color:'white', width:'fit-Content',padding:'6px',borderRadius:'10px' }}>
         {video.Domain.Title}
        </p>
        <h3
          className="description-clamp"
          style={{ textTransform: "capitalize" }}
        >
          {video.Title}
        </h3>
        
        {/* <p className="description-clamp">{video.Description}</p> */}
        <div className="user-profile">
          <img src={imageSrc || userImg} alt="User" className="user-image" />
          <span className="user-name">{video.DomainExpert.Users.Name}</span>
        </div>
        {/* <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < video.Rating ? "filled" : "empty"}>
                ★
              </span>
            ))}
            <p className="rating-num">{video.Rating}</p>
          </div>

          <div className="views"> {views} views</div>
        </div> */}
        {/* <div className="rating"> */}
        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => {
              let className = "empty"; 
              if (index + 1 <= Math.floor(video.Rating)) {
                className = "filled";
              } else if (index === Math.floor(video.Rating)) {
                const fractionalPart = video.Rating - Math.floor(video.Rating);
                if (fractionalPart >= 0.75) {
                  className = "filled-three-quarters";
                } else if (fractionalPart >= 0.5) {
                  className = "filled-half";
                } else if (fractionalPart >= 0.25) {
                  className = "filled-quarter";
                }
              }
              return (
                <span key={index} className={className}>
                  ★
                </span>
              );
            })}
            <p className="rating-num">{video.Rating || 0}</p>
          </div>
          <span className="views">{video.ViewsCount} views</span>

        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default VideoCard;
