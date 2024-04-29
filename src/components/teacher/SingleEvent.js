import React from "react";

export default function SingleEvent() {
  const title = "AI in health care";
  const des =
    "Ai in health careai in health careai in health careai in health careai in health care";
  const date = "December 15,2023";
  const sTime = "3:00PM";
  const eTime = "5:00PM";
  const expert = "Ali Ahmed"
  return (
    <div>
      <div className="crd">
        <h4>{title}</h4>
        <p className="des">{des}</p>
        <p>Coming Guest -- “ {expert} ”</p>
        <div className="date-time">
          <span>{date}</span>
          <span style={{paddingRight:4}}>
            {sTime} - {eTime}
          </span>
        </div>
      </div>
    </div>
  );
}
