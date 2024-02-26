import React, { useState } from "react";
import SingleEvent from "./SingleEvent";
import Nav from "../common/Nav";

export default function AllEvents() {
  const [arr, setarr] = useState([1, 2, 34, 45, 5, 6, 4, 2, 53, 23]);
  return (
    <React.Fragment>
      <Nav />
      <div className="teacherHomeMain">
        <h2>Up Comming Events</h2>
        <div className="allEvents">
          {arr.map((e, index) => (
            <div key={index}>
              <SingleEvent />
            </div>
          ))}
        </div>
        <h2>Previous Events</h2>
        <div className="allEvents">
          {arr.map((e, index) => (
            <div key={index}>
              <SingleEvent />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
