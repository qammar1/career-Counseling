
import React, { useState, useEffect, useContext } from "react";
import Nav from "../common/Nav";
import {
  getQuestionsBySchoolId,
  getTeacherByUserId,
  getVideoByDomainTitle,
  
  updateQuestionsByTeacherByQuestionIdId,
  
} from "../../Context/AppContext";
import { CounsellingContext } from "../../Context/ContextApi";
import LinkVideo from "./LinkVideo";
// import './TeacherQuestions.css'; // Import your CSS file

export default function TeacherQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVideoVisible, setModalVideoVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [videos, setVideos] = useState([]);
  const { userData } = useContext(CounsellingContext);
  // const navigate = useNavigate();
// console.log(questions)
  const getData = async () => {
    try {
      setLoading(true);
      const teacher = await getTeacherByUserId(userData.Id);
      const data = await getQuestionsBySchoolId(teacher[0].SchoolId);
      console.log(teacher[0].SchoolId)
      setQuestions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleModifyPress = (item) => {
    setSelectedQuestion(item);
    setNewQuestionText(item.question);
    setModalVisible(true);
  };

  const handleLinkVideoPress = async (item) => {
    setSelectedQuestion(item);
    setModalVideoVisible(true);
    try {
      const data = await getVideoByDomainTitle(item.domain);
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSavePress = async () => {
    try {
      await updateQuestionsByTeacherByQuestionIdId(selectedQuestion.Id, newQuestionText);
      setModalVisible(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelPress = () => {
    setModalVisible(false);
    setModalVideoVisible(false);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text === "") {
      getData();
    } else {
      const filteredData = questions.filter((item) =>
        item.domain.toLowerCase().includes(text.toLowerCase())
      );
      setQuestions(filteredData);
    }
  };

  return (
    <React.Fragment>
      <Nav onSearch={handleSearch} />
      <div className="background">
        <h2>All Questions</h2>

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="questionList">
            {questions.map((item, index) => (
              <div className="questionContainer" key={index}>
                <p className="question">{item.domain}</p>
                <p className="question">{item.question}</p>
                <div className="buttonContainer">
                  <button onClick={() => handleModifyPress(item)} className="button">
                    Modify
                  </button>
                  <button onClick={() => handleLinkVideoPress(item)} className="button">
                    Link Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modify Question Modal */}
        {modalVisible && (
          <div className="modalContainer">
            <div className="modalContent">
              <h3>Modify Question</h3>
              <textarea
                className="textInput"
                value={newQuestionText}
                maxLength={255}
                onChange={(e) => setNewQuestionText(e.target.value)}
              />
              <div className="modalButtonContainer">
                <button onClick={handleSavePress} className="button">
                  Save
                </button>
                <button onClick={handleCancelPress} className="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Link Video Modal */}
        {modalVideoVisible && (
          <div className="modalContainer">
            <div className="modalContent">
              {/* <h3>Link Video</h3> */}
              <LinkVideo
                // videos={videos}
                // onLinkVideo={handleLinkVideo}
                // onUnlinkVideo={handleUnlinkVideo}
                selectedQuestion={selectedQuestion}
              />
              <div className="modalButtonContainer">
                <button onClick={handleCancelPress} className="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
