import React, { useState, useEffect, useContext } from "react";
import SingleEvent from "./SingleEvent";
import VideoCard from "../common/VideoCard";
import Nav from "../common/Nav";

import { CounsellingContext } from "../../Context/ContextApi";
export default function Home() {
  const [arr, setarr] = useState([2, 2]);
  const { allVideos,getAllVideos } = useContext(CounsellingContext);
  useEffect(() => {
    getAllVideos();
  }, []);
  // console.log(allVideos)
  return (
    <React.Fragment>
      <Nav/>
    <div className="teacherHomeMain">
      <h2>Up Coming Events</h2>
      <div className="allEvents">
        {arr.slice(0, 6).map(() => {
          return <SingleEvent />;
        })}
      </div>
      <h2>Top Rated Videos</h2>
      <div className="HomeCards allVideos">
      {
    allVideos ? allVideos.map((video, index) => (
  <div key={index} className="videoCard ">
    <VideoCard video={video}/>
  </div>
)) : <p>Loading...</p>}
      </div>
    </div>
    </React.Fragment>
  );
}
