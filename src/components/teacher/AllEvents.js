import React,{useState,useEffect} from "react";
import SingleEvent from "./SingleEvent";
import Nav from "../common/Nav";
import { getAllEvents } from "../../Context/AppContext";

export default function AllEvents() {
const [allEvents,setAllEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // console.log(video);
        const event = await getAllEvents();
        // const eventData = JSON.parse(event);

        console.log(event)
        setAllEvents(event)
        
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        
      }
    };
    fetchEvents();
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <div className="teacherHomeMain">
        <h2>Up Comming Events</h2>
        <div className="allEvents">
          {allEvents.map((item, index) => (
            <div key={index}>
              <SingleEvent e={item}/>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
