import React, { useEffect, useState } from "react";
import user from "./user.jpg";
import { Link } from "react-router-dom";
const VideoCard = ({ video }) => {
  const rating = 3;
  const views = 20; 
  const [name,setName] = useState('');
  useEffect(()=>{
    setName(video.DomainExpert);
  },[])

  const object =  {name:name,image:user,rating:rating,link:video.Link,views:views,description:video.Description,title:video.Title}
  // Function to extract video ID from URL
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
      <Link to='/videoPlayer' state={{object:object}}>
        <div className="image-container">
          <img
            src={thumbnailUrl}
            alt={video.Title}
            style={{ width: "270px", height: "150px" }}
          />
        </div>
      </Link>
      <div className="Cardcontent">
        <h3>{video.Title}</h3>
        <p>Domain :: {video.Domain}</p>
        <p className="description-clamp">{video.Description}</p>
        <div className="user-profile">
          <img src={user} alt="User" className="user-image" />
          <span className="user-name">{name}</span>
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
