import React, { useState } from "react";
import SingleEvent from "./SingleEvent";
import VideoCard from "../common/VideoCard";
import Nav from "../common/Nav";
export default function Home() {
  const [arr, setarr] = useState([1, 2, 24, 2, 4, 2, 2, 2]);
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
      <div className="HomeCards">
        <VideoCard />
      </div>
    </div>
    </React.Fragment>
  );
}
