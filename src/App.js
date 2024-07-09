import React from "react";
import './Apps.css'
import '../src/components/student/student.css'
import '../src/components/teacher/teacher.css'
import '../src/components/school/school.css'
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
import TeacherSetting from './components/teacher/TeacherSetting'
import TeachersHome from "./components/teacher/TeachersHome";
import TeachersProfile from "./components/teacher/TeachersProfile";
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
import StudentSetting from "./components/student/StudentSetting";
// import AllStundents from "./components/school/AllStudents";
// import AllTeachers from "./components/school/AllTeachers";
import ChangePassword from "./components/common/ChangePassword";
import TeacherQuestions from "./components/teacher/TeacherQuestions";
import PrivacyPolicy from "./components/common/PrivaryPolicy";
import StudentDetail from "./components/school/StudentDetail";
import AllStudents from "./components/school/AllStudents";
import TeacherDetail from "./components/school/TeacherDetail";
import InitialQuestions from './components/student/InitialQuestions'
import AddQuestion from "./components/teacher/AddQuestion";
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
            <Route path="/changePassword" element=<ChangePassword />></Route>
            <Route path="/privacyPolicy" element=<PrivacyPolicy />></Route>
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
            <Route path="/teacherProfile" element=<TeachersProfile />></Route>
            <Route path="/teacherHome" element=<TeachersHome />></Route>
            <Route path="/createEvent" element=<CreateEvent />></Route>
            <Route path="/teacherSetting" element=<TeacherSetting />></Route>
            <Route path="/teacherQuestions" element=<TeacherQuestions />></Route>
            <Route path="/addQuestion" element=<AddQuestion />></Route>
            {/* //student side */}
            <Route path="/studentProfile" element=<StudentProfile />></Route>
            <Route path="/studentSetting" element=<StudentSetting />></Route>
            <Route path="/studentHome" element=<StudentHome />></Route>
            <Route path="/interestVideos" element=<InterestVideos />></Route>
            <Route path="/test" element=<Test />></Route>
            <Route path="/initialQuestions" element=<InitialQuestions/>></Route>

            {/* //school Side */}
            <Route path="/schoolProfile" element=<SchoolProfile/>></Route>
            <Route path="/schoolHome" element=<SchoolHome />></Route>
            <Route path="/addTeacher" element=<AddTeacher />></Route>
            <Route path="/addStudent" element=<AddStudent/>></Route>
            <Route path="/schoolSetting" element=<SchoolSetting/>></Route>
            <Route path="/studentDetail" element=<StudentDetail />></Route>
            <Route path="/allStudents" element=<AllStudents />></Route>
            <Route path="/teacherDetail" element=<TeacherDetail />></Route>
            {/* <Route path="/allTeachers" element=<AllStundents/>></Route> */}
            {/* <Route path="/allStudents" element=<AllTeachers/>></Route> */}

          </Routes>
        </Router> 
        
        {/* <Options/> */}
  
    </React.Fragment>
  );
}
