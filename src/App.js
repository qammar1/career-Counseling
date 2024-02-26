import React from "react";
import './Apps.css'
import '../src/components/teacher/teacher.css'
import '../src/components/domainExpert/expert.css'
import '../src/components/signIn/signIn.css'
import SignIn from './components/signIn/signIn';
import SignUp from './components/signIn/signUp';
// import VideoCard from './components/common/VideoCard';
import AddVideo from './components/domainExpert/AddVideo';
// import SingleEvent from './components/teacher/SingleEvent';
import CreateEvent from './components/teacher/CreateEvent';
import ExpertProfile from './components/domainExpert/ExpertProfile';
// import Sidebar from './components/common/sidebar';
// import TeacherMain from './components/teacher/teacherMain'
// import ExpertMain from './components/domainExpert/expertMain';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AllVideos from './components/domainExpert/AllVideos';
import ExpertHome from './components/domainExpert/ExpertHome';
import AllEvents from './components/teacher/AllEvents';
import TeacherProfile from './components/teacher/teacherProfile';
import TeacherHome from './components/teacher/teacherHome'
  
// import './App.css'
export default function App() {
  return (
    <React.Fragment>
     <Router>
          <Routes>
            <Route path="/" element=<SignIn />></Route>
            <Route path="/signIn" element=<SignIn />></Route>
            {/* <Route path="/expertMain" element=<ExpertMain />></Route> */}
            {/* <Route path="/teacherMain" element=<TeacherMain />></Route> */}
            <Route path="/allvideos" element=<AllVideos />></Route>
            <Route path="/signUp" element=<SignUp />></Route>
            <Route path="/expertHome" element=<ExpertHome />></Route>
            <Route path="/allEvents" element=<AllEvents />></Route>
            <Route path="/teacherProfile" element=<TeacherProfile />></Route>
            <Route path="/expertProfile" element=<ExpertProfile />></Route>
            <Route path="/teacherHome" element=<TeacherHome />></Route>
            <Route path="/addVideo" element=<AddVideo />></Route>
            <Route path="/createEvent" element=<CreateEvent />></Route>
          </Routes>
        </Router> 
    </React.Fragment>
  );
}
