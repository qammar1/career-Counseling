import React, { useState, useContext, useEffect } from "react";
import Nav from "../common/Nav";
import VideoCard from "../common/VideoCard";
import { CounsellingContext } from "../../Context/ContextApi";
import { getAllEvents } from "../../Context/AppContext";
import SingleEvent from "./SingleEvent";

export default function TeachersHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const { allVideos, getAllVideos } = useContext(CounsellingContext);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    getAllVideos();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const eventsData = await getAllEvents();
    setEvents(eventsData);
    findUpcomingEvents(eventsData);
  };

  const findUpcomingEvents = (eventsData) => {
    const currentDate = new Date();
    const upcomingEvents = eventsData
      .map((event) => {
        const eventConductDate = new Date(event.ConductDate);
        const timeDifference = Math.abs(eventConductDate - currentDate);
        return { ...event, timeDifference };
      })
      .sort((a, b) => a.timeDifference - b.timeDifference)
      .slice(0, 3);
    setUpcomingEvents(upcomingEvents);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAndSortedVideos = allVideos
    ? allVideos
        .filter((video) => video.Title.toLowerCase().includes(searchTerm))
        .sort((a, b) => (b.Rating || 0) - (a.Rating || 0))
    : [];

  return (
    <React.Fragment>
      <Nav />
      <div className="topsection">
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Top Rated Videos
        </h3>
        <div className="allVideosMain">
          <div className="allVideos">
            {filteredAndSortedVideos.length > 0 ? (
              filteredAndSortedVideos.slice(0, 3).map((video, index) => (
                <div key={index} className="videoCard">
                  <VideoCard video={video} />
                </div>
              ))
            ) : (
              <p>No video found.</p>
            )}
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
        <h3>Upcoming Events</h3>
        {upcomingEvents.map((event, index) => (
          <div key={index}>
            <SingleEvent e={event} />
          </div>
        ))}
        </div>
       
      </div>
    </React.Fragment>
  );
}
