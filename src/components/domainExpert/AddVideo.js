import React, { useState, useEffect, useContext } from "react";
import Nav from "../common/Nav";
import { getAllDomain, uploadVideo } from "../../Context/AppContext";
import { CounsellingContext } from "../../Context/ContextApi";

const AddVideo = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [failed, setFailed] = useState(false);
  const [isVideoSuccess, setIsVideoSuccess] = useState(false);
  const [level,setLevel] = useState('')
  const levels = ["Basic", "Intermediate", "Advance"];


    // Reset all input fields
    const resetFields = () => {
      setLink("");
      setTitle("");
      setDescription("");
      setSelectedDomain("");
    };

  const { expertData } = useContext(CounsellingContext);
  const videoData = {
    Link: link,
    Title: title,
    Description: description,
    Domain: {
      Id: selectedDomain,
    },
    DomainExpert: {
      Id: expertData.Id,
    },
  };
  const handleUpload = async () => {
    if (!isValidYouTubeUrl(link)) {
      setFailed(true);
      return;
    }
    try {
      const result = await uploadVideo(videoData);
      console.log("Video added successfully:", result);
      if (result) {
        setIsVideoSuccess(true);
        resetFields(); 
        setTimeout(() => setIsVideoSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error adding video:", error.message);
    }
  };
  // GET DOMAINS
  const getDomains = async () => {
    try {
      const domains = await getAllDomain();
      setDomain(domains);
    } catch (error) {
      console.error("Error in getDomains:", error.message);
    }
  };
  useEffect(() => {
    getDomains();
    let timer;
    if (failed) {
      timer = setTimeout(() => {
        setFailed(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [failed]);

  // URL validation function
  const isValidYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };
  // console.log(level);
  
  return (
    <React.Fragment>
      <Nav/>
      <div className="add-video-card">
        <div className="card">
          <div className="add-video">
            <h2>Add Video</h2>
          </div>
          <div className="input-group">
            <label htmlFor="link">Video Link:</label>
            <input
              type="text"
              id="link"
              onChange={(e) => {
                setLink(e.target.value);
              }}
              value={link}
              placeholder="Enter valid youtube video link"
              required
            />
            {failed && (
              <div className="validity">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p className="validity">Invalid Link</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter video title"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="title">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter descrptions of video"
            />
          </div>
          <div className="input-group">
            <label htmlFor="domain">Video Level:</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="" disabled>
                Choose level
              </option>
              {levels.map((value,index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="domain">Choose domain:</label>
            <select
              id="domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="" disabled>
                Choose domain
              </option>
              {domain.map((domain) => (
                <option key={domain.Id} value={domain.Id}>
                  {domain.Title}
                </option>
              ))}
            </select>
          </div>
          {isVideoSuccess && (
          <p className="signup-success">Video uploaded successfully!</p>
        )}
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddVideo;
