import React from 'react'
import { Link } from 'react-router-dom'
export default function TeacherCard({teacher}) {
  return (
    <React.Fragment>

 {/* <Link to='/studentDetail' state={{teacher:teacher}}> */}
        <div className="CardStudent">
          <div
            style={{
              padding: "10px",
              display: "flesx",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="des">{teacher.Name}</h3>
           
            <span style={{ padding: "5px 0px 5px 0px" }}>
              {teacher.School.Name}
            </span>
          </div>
        </div>
      {/* </Link> */}
    </React.Fragment>
  )
}
