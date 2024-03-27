import React, { useState, useContext, useEffect } from "react";
import VideoCard from "../common/VideoCard";
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

export default function AllVideos() {
  const [searchTerm, setSearchTerm] = useState('');

  const { allVideos, getAllVideos } = useContext(CounsellingContext);
  useEffect(() => {
    getAllVideos();
  }, []);
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter videos based on search term
  const filteredVideos = allVideos ? allVideos.filter(video => 
    video.Title && video.Title.toLowerCase().includes(searchTerm)
  ) : [];

console.log(filteredVideos)
  return (
    <React.Fragment>
      <Nav onSearch={handleSearch} />
      <div className="allVideosMain">
        <div className="allVideos">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
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
  );
}
