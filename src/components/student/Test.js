import React, { useEffect, useState } from "react";
// import './App.css';
import { GetAllQuestions, AddInterest } from "../../Context/AppContext";
import Nav from "../common/Nav";

const COLORS = {
  green: "#34C759",
  red: "#FF3B30",
  black: "#000",
  white: "#FFF",
  darkCyan: "#008B8B",
  jet: "#333333",
};
const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState([]);
  const [questionDisabled, setQuestionDisabled] = useState([]);
  const [interest, setInterest] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentId = localStorage.getItem("userId"); // Adjust based on storage
        setStudentId(studentId);
        const questionsData = await GetAllQuestions();
        setAllQuestions(questionsData);
        const initialQuestions = questionsData.filter(
          (q) => q.subDomain === null
        );
        setQuestions(initialQuestions);
        setButtonDisabled(Array(initialQuestions.length).fill(false));
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnswer = (answer, index) => {
    // Store the answer for the current question
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex].domain]: answer,
    }));

    console.log(
      currentQuestionIndex +
        " :: " +
        questions[currentQuestionIndex].domain +
        " : " +
        answer
    );
    // Disable the button for the current question
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
  useEffect(() => {
    // Move to the next question after updating answers
    if (Object.keys(answers).length > 0) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const filteredQuestions = allQuestions.filter((question) => {
          if (question.subDomain && answers[question.subDomain] === "Yes") {
            return true;
          }
          return false;
        });
        if (filteredQuestions.length == 0) {
          const filteredAnswers = Object.entries(answers)
            .filter(([key, value]) => value === "Yes")
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});
          const inter = Object.keys(filteredAnswers);
          storeInterest(studentId, Object.keys(filteredAnswers));
          setInterest("Interest :: " + inter);
        }
        // console.log(filteredQuestions);
        setQuestions(filteredQuestions);
        setButtonDisabled(Array(filteredQuestions.length).fill(false));
        setQuestionDisabled(Array(filteredQuestions.length).fill(false));
        // console.log(answers);
        setCurrentQuestionIndex(0);

        setAnswers([]);
      }
    }
  }, [answers]);

  const storeInterest = async (studentId, interest) => {
    try {
      console.log(interest);
      const value = await AddInterest(studentId, interest);
      if (value !== null) {
        console.log(value);
      } else {
        // Handle the case when no data is fetched
        console.error("No data fetched");
      }
    } catch (error) {
      console.error("Error adding interest:", error);
    }
  };
  console.log(allQuestions);
  return (
    <React.Fragment>
    <Nav/>
    <div className="topsection"></div>
      <div>
        <h1>Finding Interest</h1>
        {interest && <h2>{interest}</h2>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {questions.map((item, index) => (
              <div key={index} className="questionContainer">
                <p>{item.question}</p>
                <div className="buttonContainer">
                  <button
                    style={{ backgroundColor: COLORS.green }}
                    onClick={() => handleAnswer("Yes", index)}
                    disabled={buttonDisabled[index]}
                  >
                    Yes
                  </button>
                  <button
                    style={{ backgroundColor: COLORS.red }}
                    onClick={() => handleAnswer("No", index)}
                    disabled={buttonDisabled[index]}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Test;
