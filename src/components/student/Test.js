// import React, { useEffect, useState } from "react";
// import {
//   AddInterest,
//   getQuestionsBySchoolId,
//   getStudentByUserId,
//   getAllDomain,
// } from "../../Context/AppContext";
// import Nav from "../common/Nav";

// const PersonalityTestManager = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [buttonDisabled, setButtonDisabled] = useState([]);
//   const [questionDisabled, setQuestionDisabled] = useState([]);
//   const [interest, setInterest] = useState("");
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [studentId, setStudentId] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [haveInterest, setHaveInterest] = useState(false);
//   const [domain, setDomains] = useState([]);
//   const [selectedInterest, setSelectedInterest] = useState("");
//   const [showQuest, setShowQuest] = useState(false);
//   const [student, setStudent] = useState("");
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = () => {
//       const userObject = localStorage.getItem("userData");
//       if (userObject) {
//         const data = JSON.parse(userObject);
//         setUserData(data);
//       }
//     };
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (userData) {
//         const s = await getStudentByUserId(userData.Id);
//         setStudent(s[0]);
//       }
//     };
//     fetchStudentData();
//   }, [userData]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (student) {
//         try {
//           setLoading(true);
//           const uId = student.StudentId;
//           const sId = student.SchoolId;
//           const dom = await getAllDomain();
//           setDomains(dom);
//           if (uId != null) {
//             setStudentId(uId);
//           }
//           if (sId !== null) {
//             const value = await getQuestionsBySchoolId(sId);
//             if (value !== null) {
//               setAllQuestions(value);
//               const initialQuestions = value.filter((q) => q.subDomain === null);
//               setQuestions(initialQuestions);
//               setButtonDisabled(Array(initialQuestions.length).fill(false));
//               setQuestionDisabled(Array(initialQuestions.length).fill(false));
//             } else {
//               console.error("No data fetched");
//             }
//           }
//         } catch (error) {
//           console.error("Error retrieving data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchData();
//   }, [student]);

//   const handleAnswer = (answer, index) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questions[currentQuestionIndex].domain]: answer,
//     }));

//     setButtonDisabled((prevState) => {
//       const newState = [...prevState];
//       newState[index] = true;
//       return newState;
//     });
//     setQuestionDisabled((prevState) => {
//       const newState = [...prevState];
//       newState[index] = true;
//       return newState;
//     });
//   };

//   const storeInterest = async (studentId, interest) => {
//     console.log(interest)
//     try {
//       const value = await AddInterest(studentId, interest);
//       if (value !== null) {
//         console.log(value);
//       } else {
//         console.error("No data fetched");
//       }
//     } catch (error) {
//       console.error("Error adding interest:", error);
//     }
//   };

//   useEffect(() => {
//     if (Object.keys(answers).length > 0) {
//       if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//       } else {
//         const filteredQuestions = allQuestions.filter((question) => {
//           if (question.subDomain && answers[question.subDomain] === "Yes") {
//             return true;
//           }
//           return false;
//         });
//         if (filteredQuestions.length === 0) {
//           const filteredAnswers = Object.entries(answers)
//             .filter(([key, value]) => value === "Yes")
//             .reduce((obj, [key, value]) => {
//               obj[key] = value;
//               return obj;
//             }, {});
//           const inter = Object.keys(filteredAnswers);
//           storeInterest(studentId, Object.keys(filteredAnswers));
//           setInterest("Interest :: " + inter);
//         }
//         setQuestions(filteredQuestions);
//         setButtonDisabled(Array(filteredQuestions.length).fill(false));
//         setQuestionDisabled(Array(filteredQuestions.length).fill(false));
//         setCurrentQuestionIndex(0);
//         setAnswers({});
//       }
//     }
//   }, [answers]);

//   const renderItem = ({ item, index }) => {
//     return (
//       !questionDisabled[index] && (
//         <div
//           style={{
//             padding: "1cap",
//             border: "1px solid green",
//             marginBottom: "1cap",
//           }}
//         >
//           <p>{item.question}</p>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "row",
//             }}
//           >
//             <button
//               style={{
//                 width: "7rem",
//                 padding: "10px",
//                 backgroundColor: " var(--green-color)",
//                 margin: "10px",
//                 outline: "none",
//               }}
//               onClick={() => handleAnswer("Yes", index)}
//               disabled={buttonDisabled[index]}
//             >
//               Yes
//             </button>
//             <button
//               className="btn"
//               onClick={() => handleAnswer("No", index)}
//               disabled={buttonDisabled[index]}
//             >
//               No
//             </button>
//           </div>
//         </div>
//       )
//     );
//   };

//   return (
//     <React.Fragment>
//       <Nav />
//       <div className="test">
//         {!questionDisabled ? <h2>Interest</h2> : <h2>Finding Interest</h2>}
//         {interest !== "" && <p>{interest}</p>}
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <div style={{ padding: "0.5cap" }}>
//             {questions.map((question, index) => (
//               <div key={index}>{renderItem({ item: question, index })}</div>
//             ))}
//           </div>
//         )}
//       </div>
//     </React.Fragment>
//   );
// };

// export default PersonalityTestManager;
import React, { useEffect, useState } from 'react';
import {
  getQuestionsBySchoolId,
  getStudentByUserId,
  getInterestById,
  editStudentInterest,
} from "../../Context/AppContext";
import { Link } from 'react-router-dom';
import Nav from '../common/Nav';
// import './MyInterest.css'; // Assume you have the equivalent CSS styles in MyInterest.css
// import { useNavigate } from 'react-router-dom';

const Test = () => {
  const [interest, setInterest] = useState([]);
  // const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [domain, setDomains] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [student, setStudent] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const userObject = localStorage.getItem("userData");
      if (userObject) {
        const data = JSON.parse(userObject);
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (userData) {
        const s = await getStudentByUserId(userData.Id);
        setStudent(s[0]);
      }
    };
    fetchStudentData();
  }, [userData]);

  useEffect(() => {
    if (student) {
      fetchData();
    }
  }, [student]);

  const fetchData = async () => {
    try {
      const uId = student.StudentId;
      const sId = student.SchoolId;
      setStudentId(uId);
      if (uId) {
        const data = await getInterestById(uId);
        const value = await getQuestionsBySchoolId(sId);
        setInterest(data);

        const newDomain = value
          .filter((q) => !value.some((subQ) => subQ.subDomain === q.domain))
          .map((q) => q.domain);

        setDomains(newDomain);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  const handleModifyPress = () => {
    setModalVisible(true);
  };

  const handleInputChange = (text) => {
    setInputValue(text);

    setSuggestions(
      domain.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const handleSelectSuggestion = (value) => {
    setInputValue(value);
    if (!selectedInterest.includes(value)) {
      setSelectedInterest((prevState) => [...prevState, value]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const storeInterest = async (studentId, interest) => {
    console.log(studentId);
    try {
      console.log(studentId,selectedInterest)
      const value = await editStudentInterest(studentId, selectedInterest);
      if (value) {
        console.log(value);
      } else {
        console.error('No interest added');
      }
    } catch (error) {
      console.error('Error adding interest:', error);
    } finally {
      setModalVisible(false);
      setSelectedInterest([]);
      setInputValue('');
    }
  };

  return (
    <React.Fragment>
      <Nav/>
    <div className="background">
      <h1 className="title">My Interest</h1>
      <div className="interest-list">
        {interest.map((item, index) => (
          <div key={index} className="interest-item">
            {index + 1}. {item}
          </div>
        ))}
      </div>
      {/* <button onClick={handleRefresh} className="refresh-button">
        Refresh
      </button> */}
      <div className="action-container">
        <span>Would you like to add an interest?</span>
        <button onClick={handleModifyPress} className="action-button">
          Yes
        </button>
      </div>
      <div className="action-container">
        <span>Would you like to retake the test?</span>
        {/* <button
          onClick={() => {
            navigate('/personality-test-manager');
          }}
          className="action-button"
        >
          Yes
        </button> */}
        <Link to='/initialQuestions'> <p className=''>Yes</p> </Link>
      </div>
      {modalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="modal-title">Add Interest</h2>
            <input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type your interest..."
              className="input"
            />
            {inputValue && (
              <div className="suggestions-list">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSuggestion(item)}
                    className="suggestion-item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
            {selectedInterest.map((interest, index) => (
              <div className="text" key={index}>
                {index + 1}. {interest}
              </div>
            ))}
            <div className="modal-button-container">
              <button
                onClick={() => storeInterest(studentId, selectedInterest)}
                className="button save-button"
              >
                Save
              </button>
              <button onClick={handleCancelPress} className="button cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </React.Fragment>
  );
};

export default Test;
