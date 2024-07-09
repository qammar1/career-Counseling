import React, { useEffect, useState } from "react";
import Nav from "../common/Nav";
import { getInterestByStudentId, getStudentByUserId, getVideoByDomain } from "../../Context/AppContext";
import VideoCard from "../common/VideoCard";

export default function InterestVideos() {
  const [userData, setUserData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userObject = localStorage.getItem("userData");
      if (userObject) {
        const user = JSON.parse(userObject);
        setUserData(user);
        const studentData = await getStudentByUserId(user.Id);
        if (studentData.length > 0) {
          const student = studentData[0];
          setStudent(student);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (student) {
        console.log(student.StudentId, student.SchoolId)
        const videos = await getVideoByDomain(student.SchoolId, student.StudentId);
        setVideos(videos);
      }
    };

    fetchVideos();
  }, [student]);
console.log(videos)
  return (
    <React.Fragment>
      <Nav />
      <div className="topsection"></div>
      <h2>Interest Videos</h2>
      <div className="videoCardsContainer">
        {videos.length > 0 ? (
          videos.map((item) => (
            <div key={item.Id} className="videoCard">
              <VideoCard video={item} />
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </React.Fragment>
  );
}
