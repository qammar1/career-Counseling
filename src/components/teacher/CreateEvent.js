import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Nav from "../common/Nav";
import {
  getAllDomainExperts,
  createEvent,
  getAllGroups,
} from "../../Context/AppContext";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [group, setGroup] = useState("");
  const [guest, setGuest] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [conductDate, setConductDate] = useState("");
  const [allDomainExperts, setAllDomainExperts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [allGroups, setAllGroups] = useState([]);
const [isEventSuccess,setIsEventSuccess] = useState();
  useEffect(() => {
    const getDomainExperts = async () => {
      const expertsList = await getAllDomainExperts();
      setAllDomainExperts(expertsList);
    };
    getDomainExperts();
    getGroups();
  }, []);
  const resetFields = () => {
    setTitle("");
    setDescription("");
    setGuest("");
    setStartTime("");
    setEndTime("");
    setConductDate("");
    setSelectedGroup("");
    
  };
  const getGroups = async () => {
    try {
      const groups = await getAllGroups();
      setAllGroups(groups);
    } catch (error) {
      console.error("Error in getGroups:", error.message);
    }
  };

  const handleCreateEvent = async () => {
    const eventData = {
      Title: title,
      Description: description,
      StartTime: startTime,
      EndTime: endTime,
      Conducted: false,
      ConductDate: conductDate,
      Groups: { Id: selectedGroup },
      DomainExpert: { Id: guest }, // Correct structure
    };

    try {
      const response = await createEvent(eventData);
      console.log(response);
      if (response) {
        setIsEventSuccess(true);
        resetFields(); 
        setTimeout(() => setIsEventSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Nav />
      <div className="add-video-card">
        <div className="cardSignUp">
          <h2>Create Event</h2>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Enter Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="domain">Choose domain:</label>
            <select
              id="domain"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="" disabled>
                Choose Group
              </option>
              {allGroups.map((group) => (
                <option key={group.Id} value={group.Id}>
                  {group.DomainName}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="guest">Guest</label>
            <select
              id="guest"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            >
              <option value="">Select a Guest</option>
              {allDomainExperts.map((expert) => (
                <option key={expert.Id} value={expert.Id}>
                  {expert.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="time">
            <div className="input-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                id="startTime"
                placeholder="Enter start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                id="endTime"
                placeholder="Enter end time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="conductDate">Conduct Date</label>
            <input
              type="date"
              id="conductDate"
              placeholder="Enter conduct date"
              value={conductDate}
              onChange={(e) => setConductDate(e.target.value)}
            />
          </div>
          {isEventSuccess && (
          <p className="signup-success">Event Created successfully!</p>
        )}
          <button onClick={handleCreateEvent} className="centered-button">
            Create
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateEvent;
