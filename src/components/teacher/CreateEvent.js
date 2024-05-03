import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Nav from "../common/Nav";
import { getAllDomainExperts, createEvent } from "../../Context/AppContext";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [guest, setGuest] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [conductDate, setConductDate] = useState("");
  const [allDomainExperts, setAllDomainExperts] = useState([]);

  useEffect(() => {
    const getDomainExperts = async () => {
      const expertsList = await getAllDomainExperts();
      setAllDomainExperts(expertsList);
    };
    getDomainExperts();
  }, []);

  const handleCreateEvent = async () => {
    console.log(title, description, group, guest, startTime, endTime, conductDate);
    const eventData = {
      Title: title,
      Description: description,
      StartTime: startTime,
      EndTime: endTime,
      Conducted: false,
      ConductDate: conductDate,
      Groups: { Id: group },
      DomainExpertId: guest, // Assuming this should be the selected expert's ID
    };
    const response = await createEvent(eventData);
  };

  return (
    <React.Fragment>
      <Nav />
      <div className="add-video-card">

      <div className="cardSignUp">
        <h2>Create Event</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Enter Short description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="group">Group</label>
          <input type="text" id="group" placeholder="Enter Group" value={group} onChange={(e) => setGroup(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="guest">Guest</label>
          <select id="guest" value={guest} onChange={(e) => setGuest(e.target.value)}>
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
            <input type="time" id="startTime" placeholder="Enter start time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="endTime">End Time</label>
            <input type="time" id="endTime" placeholder="Enter end time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="conductDate">Conduct Date</label>
          <input type="date" id="conductDate" placeholder="Enter conduct date" value={conductDate} onChange={(e) => setConductDate(e.target.value)} />
        </div>
        <button onClick={handleCreateEvent} className="centered-button">Create</button>
      </div>
      </div>
    </React.Fragment>
  );
}

export default CreateEvent;
