import React from "react";
// import imageSrc from "./download.jpg";
import user from "./user.jpg";
import YouTube from 'react-youtube';

const VideoCard = () => {
  // const imageSrc="";
  const rating = 4;
  const views = 20;
  const title = "Learn machine learning";
  const subDomain = "Artificial Intelligence";
  const name = "qammar";
const link = 'C6YtPJxNULA'
  const opts = {
    height: '150',
    width: '270',
    playerVars: {
      autoplay: 0,
      controls: 1, // This hides the player controls, but not the "Watch later" and "Share" buttons
      modestbranding: 1, 
    },
  };
  const videoOnReady = (event) => {
    event.target.pauseVideo();
  }
  return (
    <div className="cardVideo">
      <div className="image-container">
        {/* <img src={imageSrc} alt="Card" style={{ position: "relative" }} /> */}
        <YouTube videoId={link} opts={opts} onReady={videoOnReady} />
      </div>
      <div className="Cardcontent">
        <h3>{title}</h3>
        <p>{subDomain}</p>
        <div className="user-profile">
          <img src={user} alt="User" className="user-image" />
          <span className="user-name">{name}</span>
        </div>
        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < rating ? 'filled' : 'empty'}>★</span>
            ))}
            <p className='rating-num'>{rating}</p>
          </div>
          
          <div className="views"> {views} views</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
