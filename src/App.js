import React from "react";
import './Apps.css'
import '../src/components/student/student.css'
import '../src/components/teacher/teacher.css'
import '../src/components/domainExpert/expert.css'
import '../src/components/signIn/signIn.css'
import SignIn from './components/signIn/signIn';
import SignUp from './components/signIn/signUp';
import AddVideo from './components/domainExpert/AddVideo';
import CreateEvent from './components/teacher/CreateEvent';
import ExpertProfile from './components/domainExpert/ExpertProfile';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AllVideos from './components/domainExpert/AllVideos';
import ExpertHome from './components/domainExpert/ExpertHome';
import AllEvents from './components/teacher/AllEvents';
import TeacherProfile from './components/teacher/teacherProfile';
import TeacherHome from './components/teacher/teacherHome'
import SignUpExpert from './components/signIn/signUpExpert';
import SignUpSchool from './components/signIn/signUpSchool';
import Options from "./components/signIn/options";
import VideoPlayer from "./components/common/VideoPlayer";
import AddStudent from "./components/school/AddStudent";
import AddTeacher from "./components/school/AddTeacher";
import SchoolHome from "./components/school/SchoolHome";
import SchoolProfile from "./components/school/SchoolProfile"
import SchoolSetting from "./components/school/SchoolSetting";
import StudentProfile from "./components/student/StudentProfile";
import StudentHome from "./components/student/StudentHome";
import InterestVideos from "./components/student/InterestVideos";
import ExpertSetting from "./components/domainExpert/ExpertSetting";
import Test from "./components/student/Test";
// import './App.css'
export default function App() {
  return (
    <React.Fragment>
    
     <Router>
          <Routes>
          
            <Route path="/" element=<SignIn />></Route>
            <Route path="/signIn" element=<SignIn />></Route>
            <Route path="/options" element=<Options />></Route>
            <Route path="/videoPlayer" element=<VideoPlayer />></Route>
            <Route path="/signUpSchool" element=<SignUpSchool />></Route>
            {/* <Route path="/signUp" element=<SignUp />></Route> */}
            {/* expert side */}
            <Route path="/allvideos" element=<AllVideos />></Route>
            <Route path="/addVideo" element=<AddVideo />></Route>
            <Route path="/expertHome" element=<ExpertHome />></Route>
            <Route path="/expertProfile" element=<ExpertProfile />></Route>
            <Route path="/signUpExpert" element=<SignUpExpert />></Route>
            <Route path="/expertSetting" element=<ExpertSetting />></Route>
            {/* teacher side */}
            <Route path="/allEvents" element=<AllEvents />></Route>
            <Route path="/teacherProfile" element=<TeacherProfile />></Route>
            <Route path="/teacherHome" element=<TeacherHome />></Route>
            <Route path="/createEvent" element=<CreateEvent />></Route>
            {/* //student side */}
            <Route path="/studentProfile" element=<StudentProfile />></Route>
            <Route path="/studentHome" element=<StudentHome />></Route>
            <Route path="/interestVideos" element=<InterestVideos />></Route>
            <Route path="/test" element=<Test />></Route>

            {/* //school Side */}
            <Route path="/schoolProfile" element=<SchoolProfile/>></Route>
            <Route path="/shoolHome" element=<SchoolHome />></Route>
            <Route path="/addTeacher" element=<AddTeacher />></Route>
            <Route path="/addStudent" element=<AddStudent/>></Route>
            <Route path="/schoolSetting" element=<SchoolSetting/>></Route>

          </Routes>
        </Router> 
        
        {/* <Options/> */}
  
    </React.Fragment>
  );
}
