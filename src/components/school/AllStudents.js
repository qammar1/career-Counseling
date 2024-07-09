import React, { useState, useEffect } from "react";
import Nav from "../common/Nav";
import {
  getSchoolByUserId,
  getStudentBySchoolId,
  getTeacherBySchoolId,
} from "../../Context/AppContext";
import StudentCard from "./StudentCard";
import TeacherCard from "./TeacherCard";

export default function AllStudents() {
  const [userData, setUserData] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(allTeachers)
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userObject = localStorage.getItem("userData");
        if (userObject) {
          const data = JSON.parse(userObject);
          setUserData(data);
        } else {
          setError("No user data found in local storage.");
          setLoading(false);
        }
      } catch (err) {
        setError("Error parsing user data from local storage.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userData) return;

    const fetchStudentData = async () => {
      try {
        const school = await getSchoolByUserId(userData.Id);
        if (school && school.length > 0) {
          const students = await getStudentBySchoolId(school[0].Id);
          const teachers = await getTeacherBySchoolId(school[0].Id);
          setAllStudents(students);
          setAllTeachers(teachers);
        } else {
          setError("No school data found for the user.");
        }
      } catch (err) {
        setError("Error fetching school or student data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [userData]);
//   console.log(allStudents);
  if (loading) {
    return (
      <React.Fragment>
        <Nav />
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <React.Fragment>
        <Nav />
        <div>Error: {error}</div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="videoCard">
        <div className="counsellor">
          <h2 style={{ paddingTop: "2.5cap",display:'flex',justifyContent:'center' }}>Counsellor</h2>
          {allTeachers.length > 0 ? (
            allTeachers.map((teacher, index) => (
              <div key={teacher.Id} className="studentCard">
                <TeacherCard teacher={teacher} />
              </div>
            ))
          ) : (
            <p>No Student found.</p>
          )}
        </div>
      </div>
      <div className="students">
        <div className="AllStudents">
          <h2>All Students</h2>
          {allStudents.length > 0 ? (
            allStudents.map((student, index) => (
              <div key={student.Id} className="studentCard">
                <StudentCard student={student} />
              </div>
            ))
          ) : (
            <p>No Student found.</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
