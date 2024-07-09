import React from "react";

export default function SingleEvent({ e }) {
  console.log(e);
  const title = e.Title;
  const des = e.Description;
  const date = new Date(e.ConductDate);
  const sTime = e.StartTime;
  const eTime = e.EndTime;
  const expert = e.DomainExpert.Name;

  return (
    <div>
      <div className="crd">
        <div style={{ padding: "10px" }}>
          <h4 style={{ padding: "5px 0px 5px 0px" }}>{title}</h4>
          <p className="des">{des}</p>
          <p style={{ padding: "5px 0px 5px 0px" }}>Guest -- “ {expert} ”</p>
          <div className="date-time">
            <span style={{ padding: "5px 0px 5px 0px" }}>
              {date.toLocaleDateString()}
            </span>
            <span style={{ paddingRight: 4, paddingTop: 5 }}>
              {sTime} - {eTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
