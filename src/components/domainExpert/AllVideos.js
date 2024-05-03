import React, { useState, useContext, useEffect } from "react";
import VideoCard from "../common/VideoCard";
import Nav from "../common/Nav";
import { CounsellingContext } from "../../Context/ContextApi";

export default function AllVideos() {
  const [searchTerm, setSearchTerm] = useState("");
  const { allVideos, getAllVideos } = useContext(CounsellingContext);
  useEffect(() => {
    getAllVideos();
  }, []);
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter videos based on search term
  const filteredVideos = allVideos
    ? allVideos.filter(
        (video) => video.Title && video.Title.toLowerCase().includes(searchTerm)
      )
    : [];
    // console.log(filteredVideos)
  // console.log(allVideos[0]);
  // console.log(allVideos)
  return (
    <React.Fragment>
      <Nav onSearch={handleSearch} />
      <div className='expertHome'>
        <h2>All Videos</h2>
      </div>
      <div className="allVideosMain">
        <div className="allVideos">
        {/* <h2 style={{textAlign:"center"}}>All Videos</h2> */}
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <div key={video.Id} className="videoCard">
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
