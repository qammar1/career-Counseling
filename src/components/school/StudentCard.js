import React from "react";
import { Link } from "react-router-dom";

export default function StudentCard({ student }) {
  //   console.log(student);
  return (
    <React.Fragment>
      {/* <div className="studentCard"></div> */}
      <Link to='/studentDetail' state={{student:student}}>
        <div className="CardStudent">
          <div
            style={{
              padding: "10px",
              display: "flesx",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="des">{student.Name}</h3>
            <p style={{ padding: "5px 0px 5px 0px" }}>
              Class - “ {student.Class} ”
            </p>
            <span style={{ padding: "5px 0px 5px 0px" }}>
              {student.School.Name}
            </span>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
