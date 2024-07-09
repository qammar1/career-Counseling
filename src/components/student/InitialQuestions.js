import React, { useEffect, useState } from 'react';
import {
  AddInterest,
  GetAllQuestions,
  getAllDomain,
  getStudentByUserId
} from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
// import './PersonalityTestManager.css';

const PersonalityTestManager = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState([]);
  const [questionDisabled, setQuestionDisabled] = useState([]);
  const [buttonYes, setButtonYes] = useState([]);
  const [buttonNo, setButtonNo] = useState([]);
  const [interest, setInterest] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(true);
  const [haveInterest, setHaveInterest] = useState(true);
  const [domain, setDomains] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [showQuest, setShowQuest] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

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
    setSuggestions([]);
  };

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
        if (s && s.length > 0) {
          setStudent(s[0]);
          setStudentId(s[0].StudentId);
        }
      }
    };
    fetchStudentData();
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (student) {
        try {
          setLoading(true);
          const sId = student.SchoolId;
          const dom = await getAllDomain();
          if (dom) {
            setDomains(dom);
          }

          const value = await GetAllQuestions(sId);
          if (value !== null) {
            setAllQuestions(value);
            const newDomain = value
              .filter(q => !value.some(subQ => subQ.subDomain === q.domain))
              .map(q => q.domain);
            setDomains(newDomain);

            const initialQuestions = value.filter(q => q.subDomain === null);
            setQuestions(initialQuestions);
            setButtonDisabled(Array(initialQuestions.length).fill(false));
            setQuestionDisabled(Array(initialQuestions.length).fill(false));
          } else {
            console.error('No data fetched');
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [student]);

  const handleAnswer = (answer, index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex].domain]: answer,
    }));

    if (answer === 'Yes') {
      setButtonYes((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
      setButtonNo((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    } else {
      setButtonYes((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
      setButtonNo((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }

    setButtonDisabled((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setQuestionDisabled((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const storeInterest = async (studentId, interest) => {
    try {
      const value = await AddInterest(studentId, interest);
      if (value !== null) {
        console.log(value);
      } else {
        console.error('No data fetched');
      }
    } catch (error) {
      console.error('Error adding interest:', error);
    }
  };

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const filteredQuestions = allQuestions.filter(question => {
          if (question.subDomain && answers[question.subDomain] === 'Yes') {
            return true;
          }
          return false;
        });
        if (filteredQuestions.length == 0) {
          const filteredAnswers = Object.entries(answers)
            .filter(([key, value]) => value === 'Yes')
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});
          const inter = Object.keys(filteredAnswers);

          storeInterest(studentId, Object.keys(filteredAnswers));
          navigate('/test');
        }
        setQuestions(filteredQuestions);
        setButtonDisabled(Array(filteredQuestions.length).fill(false));
        setQuestionDisabled(Array(filteredQuestions.length).fill(false));
        setButtonYes(Array(filteredQuestions.length).fill(false));
        setButtonNo(Array(filteredQuestions.length).fill(false));
        setCurrentQuestionIndex(0);
        setAnswers([]);
      }
    }
  }, [answers]);

  const handleNoInterest = () => {
    setHaveInterest(false);
    setShowQuest(true);
    const initialQuestions = allQuestions.filter(q => q.subDomain === null);
    setQuestions(initialQuestions);
    setButtonDisabled(Array(initialQuestions.length).fill(false));
    setQuestionDisabled(Array(initialQuestions.length).fill(false));
    setCurrentQuestionIndex(0);
  };

  const handleYesInterest = () => {
    storeInterest(studentId, selectedInterest);
    setInterest(true);
    navigate('/test');
    setHaveInterest(false);
  };

  return (
    <div className="background">
      <h1 className="title">Questionnaires</h1>

      {interest ? (
        <div className='Questionnaires'>
          <h2 className="question">Your Interests are:</h2>
          {selectedInterest.map((interest, index) => (
            <p className="text" key={index}>
              {index + 1}. {interest}
            </p>
          ))}
        </div>
      ) : loading ? (
        <div className="loading">Loading...</div>
      ) : !haveInterest ? (
        <div>
          {questions.map((item, index) => (
            <div key={index} className="question-container">
              {questionDisabled[index] && (
                <span className="check-icon">✓</span>
              )}
              <p className="question">{item.question}</p>
              <div className="button-container">
                <button
                  className={`button ${!buttonNo[index] ? 'yes' : 'disabled'}`}
                  onClick={() => handleAnswer('Yes', index)}
                  disabled={buttonDisabled[index]}
                >
                  Yes
                </button>
                <button
                  className={`button ${!buttonYes[index] ? 'no' : 'disabled'}`}
                  onClick={() => handleAnswer('No', index)}
                  disabled={buttonDisabled[index]}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="question">Do you have any specific interests?</p>
          <button className="button yes" onClick={handleNoInterest}>
            No
          </button>
          <div>
            <div className="autocomplete-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className="inputt"
                placeholder='Enter Your Interests'
              />
              <button
                className="button yes"
                onClick={handleYesInterest}
                disabled={inputValue === ''}
        
              >
                Yes
              </button>
            </div>
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
            <div className="selected-interest-container">
              {selectedInterest.map((interest, index) => (
                <span key={index} className="selected-interest">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityTestManager;
