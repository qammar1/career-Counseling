import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CounsellingContext } from "../../Context/ContextApi";
import { Link } from "react-router-dom";

export default function VideoPlayer() {
  const [expandDescription, setExpandDescription] = useState(false);
  const [feedbacks, setFeedback] = useState("");
  const [allFeedback, setAllFeedback] = useState([]);
  const [rating, setRating] = useState(0);
  // const [imagePath, setImagePath] = useState("/defaultUser.png");
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();
  const { object } = location.state || {};
  const {uploadRating,userData } = useContext(CounsellingContext);

  const {vId, name, image, link, views, description, title } = object;
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
// console.log(name.Users.Name)
  // console.log(rating, feedbacks);
  const handleDescriptionToggle = () => {
    setExpandDescription(!expandDescription);
  };

  const sendRating = async () => {
    try {
      const rate = {
        rating: rating,
        feedBack: feedbacks,
        videoId: vId,
        studentId: userData.Id,
        // console.log(videoId)
      };

      console.log('Rating is now' + JSON.stringify({rate}));

      await uploadRating(rate);
      setRating(0);
      setFeedback('');
    } catch (error) {
      // Handle errors, if any, during the removal of user data
      console.log('Upload rating failed:', error);
    }

    // You can perform any additional actions based on the new rating here
  };

  // New function to extract video ID from both types of URLs

  const extractVideoId = (url) => {
    let videoId = null;
    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com")) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v");
    }
    // Handle additional URL parameters, if present
    if (videoId && videoId.includes("?")) {
      videoId = videoId.split("?")[0];
    }
    return videoId;
  };

  const videoId = extractVideoId(link);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  // handle rating
  const [hoverRating, setHoverRating] = useState(0);
  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    handleRatingChange(index);
  };
  return (
    <div className="video-player">
      <iframe
        title="youtube-video"
        // width="100%"
        // height="210px"
        src={`${embedUrl}?controls=1&rel=0&modestbranding=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      <div className="content">
        <div style={{padding:'2px'}}>
        <h3  style={{ textTransform: 'capitalize' }} className="title">{title}</h3>
        <p className="description"  onClick={handleDescriptionToggle}>
          {description}
        </p>

        <div className="expert-info">
          <img src={image} alt="Expert" className="expert-image" />
          <div>
            <p className="expert-name">{name.Users.Name}</p>
          </div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',width:'100%',marginTop:'20px'}}>
      <Link to='/allVideos' style={{paddingRight:'20px'}}>Back To All Videos</Link>
      </div>

        <div className="feedback-section">
          <h2>Feedback ({allFeedback.length})</h2>
          <div>
            {allFeedback.map((item, index) => (
              <div key={index} className="feedback-item">
                <p className="feedback-student-name">{item.Name}:</p>
                <p className="feedback-text">{item.FeedBack}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="feedback-button" onClick={() => setModalVisible(true)}>
        Give feedback
      </button>
   

      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Give Feedback</h2>
            <div style={{cursor:'pointer'}}>
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={index}
                    className={
                      rating >= starValue || hoverRating >= starValue
                        ? "filled"
                        : ""
                    }
                    onMouseEnter={() => handleMouseEnter(starValue)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(starValue)}
                  >
                    &#9733; {/* Unicode character for star */}
                  </span>
                );
              })}
            </div>
            <textarea
              value={feedbacks}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts"
            ></textarea>
            <button onClick={sendRating}>Send</button>
            <button
              onClick={() => {
                setModalVisible(false);
                setRating(0);
                setFeedback("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
