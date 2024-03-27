import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function VideoPlayer() {
  const location = useLocation();
  const { object } = location.state || {};
  if (!object) {
    return <div>Loading...</div>;
  }

  const { name, image, rating, link, views, description, title } = object;
  console.log(link);

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

  return (
    <React.Fragment>
      <Nav />
      <div className="video">
        <div style={{ marginBottom: "20px", paddingTop: "50px" }}>
          <iframe
            width="700"
            height="350"
            src={`${embedUrl}?controls=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div
            className="user-info"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={image}
              alt={name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <span>@{name}</span>

            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < rating ? "filled" : "empty"}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-views">
              <span>{views}Views</span>
            </div>
          </div>
          <div>
            <div className="player-description">
              <h4>Title : </h4>
              <span>{title}</span>
            </div>
            <div className="player-description">
              {" "}
              <h4>Description : </h4>
              <span>{description}</span>
            </div>
          </div>

          {/* Rating and Views */}
        </div>
        <Link to="/allVideos">Back to all videos</Link>
      </div>
    </React.Fragment>
  );
}
