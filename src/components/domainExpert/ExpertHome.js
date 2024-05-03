import React, { useState, useContext, useEffect } from "react";
import Nav from '../common/Nav'
import VideoCard from "../common/VideoCard";
import { CounsellingContext } from "../../Context/ContextApi";

export default function ExpertHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const {userData, allVideos, getAllVideos } = useContext(CounsellingContext);
  
  // Assuming `sid` is fetched or defined somewhere else
  const sid = userData.Id; // Replace "specificId" with the actual ID you have

  useEffect(() => {
    getAllVideos();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };


  const filteredAndSortedVideos = allVideos
    ? allVideos
        .filter(video => video.DomainExpert.Users && video.DomainExpert.Users.Id === sid)
        // .filter(video => video.Title && video.Title.toLowerCase().includes(searchTerm))
        .sort((a, b) => {
          const ratingA = a.Rating || 0; // Default to 0 if no rating
          const ratingB = b.Rating || 0; // Default to 0 if no rating
          return ratingB - ratingA;
        })
    : [];
  // console.log(filteredAndSortedVideos);

  return (
    <React.Fragment>
      <Nav onSearch={handleSearch} />
      <div className='expertHome'>
        <h2>Top Rated Videos</h2>
      </div>
      <div className="allVideosMain">
        <div className="allVideos">
          {filteredAndSortedVideos.length > 0 ? (
            filteredAndSortedVideos.map((video, index) => (
              <div key={index} className="videoCard">
                <VideoCard video={video} />
              </div>
            ))
          ) : (
            <p>No video found.</p>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
