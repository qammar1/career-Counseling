import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { COLORS } from "../../Assets/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddInterest, GetAllQuestions, getAllDomain } from "../../Assets/Api";
import { Picker } from "@react-native-picker/picker";

const PersonalityTestManager = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState([]);
  const [questionDisabled, setQuestionDisabled] = useState([]);
  const [interest, setInterest] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [haveInterest, setHaveInterest] = useState(false);
  const [domain, setDomains] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [showQuest, setShowQuest] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const uId = await AsyncStorage.getItem("userId");
        const sId = await AsyncStorage.getItem("SchoolId");
        const dom = await getAllDomain();
        setDomains(dom);
        if (uId != null) {
          setStudentId(uId);
        }
        if (sId != null) {
          console.log(sId);
          const value = await GetAllQuestions(sId);
          if (value !== null) {
            setAllQuestions(value);
          }

          // Filter questions for the initial display
          const initialQuestions = value.filter((q) => q.subDomain === null);
          setQuestions(initialQuestions);
          setButtonDisabled(Array(initialQuestions.length).fill(false));
          setQuestionDisabled(Array(initialQuestions.length).fill(false));
        } else {
          // Handle the case when no data is fetched
          console.error("No data fetched");
        }
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

  useEffect(() => {
    // Move to the next question after updating answers
    if (Object.keys(answers).length > 0) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // You've reached the end of questions, update state and log answers
        // const filteredQuestions = allQuestions.filter(question => {
        //   if (question.subDomain) {
        //     return answers[question.subDomain] === 'Yes';
        //   }
        //   //return answers[question.domain] === 'Yes';
        // });
        const filteredQuestions = allQuestions.filter((question) => {
          if (question.subDomain && answers[question.subDomain] === "Yes") {
            return true;
          }
          return false;
        });
        if (filteredQuestions.length == 0) {
          // console.log('Your interest is in :: ' + JSON.stringify(answers));
          // const inter = Object.keys(answers).join(', ');
          // console.log('Your interest is in :: ' + inter);
          const filteredAnswers = Object.entries(answers)
            .filter(([key, value]) => value === "Yes")
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});
          const inter = Object.keys(filteredAnswers);

          // console.log('Your interest is in :: ', inter);
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

  const handleNoInterest = () => {
    setHaveInterest(false);
    setShowQuest(true);
    // Display initial questions
    const initialQuestions = allQuestions.filter((q) => q.subDomain === null);
    setQuestions(initialQuestions);
    setButtonDisabled(Array(initialQuestions.length).fill(false));
    setQuestionDisabled(Array(initialQuestions.length).fill(false));
    setCurrentQuestionIndex(0);
  };

  const handleYesInterest = () => {
    setHaveInterest(true);
  };

  const handleDomainSelection = () => {
    setHaveInterest(false);
    setShowQuest(true);

    const filteredQuestions = allQuestions.filter(
      (question) => question.subDomain === selectedInterest
    );
    setQuestions(filteredQuestions);
    setButtonDisabled(Array(filteredQuestions.length).fill(false));
    setQuestionDisabled(Array(filteredQuestions.length).fill(false));
    setCurrentQuestionIndex(0);
  };

  const renderItem = ({ item, index }) => {
    return (
      !questionDisabled[index] && (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{item.question}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.green }]}
              onPress={() => handleAnswer("Yes", index)}
              disabled={buttonDisabled[index]}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.red }]}
              onPress={() => handleAnswer("No", index)}
              disabled={buttonDisabled[index]}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    );
  };

  return (
    <View style={styles.background}>
      <Text
        style={{
          color: COLORS.black,
          fontSize: 23,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Finding Interest
      </Text>

      {interest != "" && (
        <Text
          style={{
            color: COLORS.black,
            fontSize: 23,
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {interest}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.green} />
      ) : showQuest ? (
        <FlatList
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            Do you have any particular interests in any academic subjects or
            fields?
          </Text>
          {haveInterest && (
            <View>
              <View style={styles.input}>
                <Picker
                  selectedValue={selectedInterest}
                  onValueChange={(itemValue) => setSelectedInterest(itemValue)}
                  mode="dialog"
                  dropdownIconColor={COLORS.gray}
                  style={{ color: COLORS.black }}
                >
                  <Picker.Item label="Select Field" value="" />

                  {domain.map((domain, index) => (
                    <Picker.Item
                      key={index}
                      label={domain.Title}
                      value={domain.Title}
                    />
                  ))}
                </Picker>
              </View>
              {/* <TouchableOpacity
                style={[styles.button, {backgroundColor: COLORS.green}]}
                onPress={handleDomainSelection}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity> */}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.green }]}
              onPress={handleYesInterest}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.red }]}
              onPress={handleNoInterest}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
{
  /* <FlatList
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        /> */
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  questionContainer: {
    padding: 12,
    marginBottom: 20,
    borderColor: COLORS.darkCyan,
    borderWidth: 1,
    borderRadius: 10,
  },
  question: {
    color: COLORS.jet,
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "justify",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  input: {
    height: 40,
    color: COLORS.gray,
    borderWidth: 2,
    borderColor: COLORS.darkCyan,
    borderRadius: 8,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8, // Adjust this value as needed to add space between the checkbox and the text
    fontSize: 16, // Adjust the font size as needed
    color: COLORS.black, // Adjust the color as needed
  },
});

export default PersonalityTestManager;
