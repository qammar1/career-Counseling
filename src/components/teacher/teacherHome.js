import React, { useState, useContext } from "react";
import SingleEvent from "./SingleEvent";
import VideoCard from "../common/VideoCard";
import Nav from "../common/Nav";

import { CounsellingContext } from "../../Context/ContextApi";
export default function Home() {
  const [arr, setarr] = useState([1, 2, 24, 2, 4, 2, 2, 2]);
  const { allVidoes,getAllVideos } = useContext(CounsellingContext);
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
    allVidoes ? allVidoes.map((video, index) => (
  <div key={index} className="videoCard ">
    <VideoCard video={video}/>
  </div>
)) : <p>Loading...</p>}
      </div>
    </div>
    </React.Fragment>
  );
}
