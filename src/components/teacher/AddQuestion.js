import React, { useEffect } from "react";
import Nav from "../common/Nav";
import { useState } from "react";
import { addNewQuestion, getAllDomain, getTeacherByUserId } from "../../Context/AppContext";
export default function AddQuestion() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [domain, setDomains] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [subDomain, setSubDomain] = useState([]);
  const [question, setQuestion] = useState([]);
  const [user, setUser] = useState("");
  const [schoolId, setSchoolId] = useState("");


  const handleInputChange = (text) => {
    setInputValue(text);
    setSuggestions(
      domain.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const handleSelectSuggestion = (value) => {
    setInputValue(value);
    if (!selectedInterest.includes(value)) {
      setSelectedInterest(value);
    }
    setSuggestions([]);
  };

  const allDomains = async () => {
    const dom = await getAllDomain();
    setDomains(dom);
    const newDomain = dom.map((q) => q.Title);
    setDomains(newDomain);
    setSuggestions(newDomain);
  };

  useEffect(() => {
    allDomains();
    const userObject = localStorage.getItem("userData");
    const user = JSON.parse(userObject);
    setUser(user);
    console.log(user)
    if(user){
        getTeacher();
    }
//   if(schoolId==undefined){
//     getTeacher();
//   }
  }, []);

// check this if school id is not working


  const getTeacher = async()=>{
    try{
      const teach = await getTeacherByUserId(user.Id);
      console.log(teach[0].SchoolId)
      setSchoolId(teach[0]?.SchoolId);
    }
    catch(error)
    {
    console.log(error);
  }
}

  const handleClick = async() => {
    const a = await addNewQuestion(inputValue,subDomain,question,schoolId);
    console.log(a);
  };
  return (
    <React.Fragment>
      <Nav />
      <div style={{ paddingTop: "4rem" }}>
        <div>
          <h2 style={{ textAlign: "center" }}>Add New Question</h2>
        </div>
        <div className="inputs">
          <p>Select Parent Domain</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="inputt"
            placeholder="Auto Complete"
          />
          {inputValue && (
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
          )}
          <p>Enter Sub Domain</p>
          <input
            type="text"
            value={subDomain}
            onChange={(e) => {
              setSubDomain(e.target.value);
            }}
          />
          <p>Enter Question</p>
          <input
            type="text"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="taskButton" onClick={handleClick}>
            Add{" "}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
