var url = "http://192.168.43.246/CareerCounselligBackend/api/careercounselling/";

// // signup domain expert
export const addDomainExpert = async (domainExpert, userData, domainId) => {
  try {
    const apiUrl =
      url + "addDomainExpert?domainId=" + encodeURIComponent(domainId);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainExpert: domainExpert, user: userData }),
    });
    // console.log('Request URL:', apiUrl);
    // console.log(
    //   'Request Data:',
    //   JSON.stringify({domainExpert: domainExpert, user: userData}),
    // );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in addDomainExpert:", error.message);
    throw error;
  }
};
// // GET ALL DOMAINS
export const getAllDomain = async () => {
  try {
    var res = await fetch(url + "getAllDomains");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getting domain", error);
    throw error;
  }
};
export const uploadVideo = async (videoData) => {
  console.log(videoData);
  try {
    const response = await fetch(url + "AddVideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video: videoData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json(); // Read and parse JSON only once
    console.log(responseData); // Log the parsed data

    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error adding video:", error.message);
    throw error;
  }
};

// teacher
export const addTeacher = async (Teacher, userData) => {
  try {
    // const apiUrl = url + 'addTeacher';

    const response = await fetch(url + "addTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacher: Teacher, user: userData }),
    });

    console.log(
      "Request Data:",
      JSON.stringify({ teacher: Teacher, user: userData })
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in addTeacher:", error.message);
    throw error;
  }
};
// GET ALL USER NAME
export const getAllUsername = async () => {
  try {
    var res = await fetch(url + "getAllUser");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log("Error in getting domain", error);
    throw error;
  }
};
export const addStudent = async (Student, userData) => {
  try {
    // const apiUrl = url + 'addStudent';

    const response = await fetch(url + "addStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: Student, user: userData }),
    });

    console.log(
      "Request Data:",
      JSON.stringify({ student: Student, user: userData })
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in addStudent:", error.message);
    throw error;
  }
};
//GET STUDENT BY USER ID
export const getStudentByUserId = async (userId) => {
  try {
    const response = await fetch(
      url + "getStudentByUserId?id=" + encodeURIComponent(userId)
    );
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching Student data:", error);
  }
};
//GET STUDENT BY School ID
export const getStudentBySchoolId = async (schoolId) => {
  try {
    const response = await fetch(
      url + "getStudentBySchoolId?id=" + encodeURIComponent(schoolId)
    );
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching Student data:", error);
  }
};

/////////////////////////////////////// aptitude test///////////////////
// Get All Questions
export const GetAllQuestions = async (schoolId) => {
  try {
    var res = await fetch(
      url + "getQuestionsBySchoolId?id=" + encodeURIComponent(schoolId)
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log("Error in getting Questions", error);
    throw error;
  }
};

// Get All Questions
export const AddInterest = async (studentId, interests) => {
  try {
    var res = await fetch(
      url + "addStudentInterest?studentId=" + encodeURIComponent(studentId),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interests),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log("Error in Adding Interest of Student", error);
    throw error;
  }
};

// Get Video By Domain
export const getVideoByDomain = async (schoolId, studentId) => {
  console.log(schoolId, studentId);
  try {
    var res = await fetch(
      url +
        `getVideoByDomain?schoolId=${encodeURIComponent(
          schoolId
        )}&studentId=${encodeURIComponent(studentId)}`
    );
    console.log(res);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    console.log(data);
    return data; // Return the data
  } catch (error) {
    console.log("Error in getting Videos", error);
    throw error;
  }
};

export const uploadRating = async (ratingData) => {
  try {
    const response = await fetch(url + "saveRating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: ratingData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding rating:", error.message);
    // Handle the error here
    throw error; // Rethrow the error if needed
  }
};

export const getFeedbackOnVideo = async (videoId) => {
  try {
    const response = await fetch(
      url + "getFeedbackOnVideo?videoId=" + encodeURIComponent(videoId)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error getting feedback:", error.message);
    // Handle the error here
    throw error; // Rethrow the error if needed
  }
};
//GET SCHOOL BY USER ID
export const getSchoolByUserId = async (userId) => {
  // console.log(userId)
  try {
    const response = await fetch(
      url + "getSchoolByUserId?id=" + encodeURIComponent(userId)
      );
      const data = await response.json();
      // console.log("hello")
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching School data:", error);
  }
};
// get user by user id
export const getUserByUserId = async (userId) => {
  try {
    const response = await fetch(
      url + "getUserById?id=" + encodeURIComponent(userId)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

//GET TEACHER BY USER ID
export const getTeacherByUserId = async (userId) => {
  try {
    const response = await fetch(
      url + "getTeacherByUserId?id=" + encodeURIComponent(userId)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Teacher data:", error);
  }
};

// GET ALL DOMAIN EXPERTs
export const getAllDomainExperts = async () => {
  try {
    var res = await fetch(url + "getAllDomainExpert");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    // console.log(data)
    return data; // Return the data
  } catch (error) {
    console.log("Error in getting Domain experts", error);
    throw error;
  }
  // return ("hello")
};
// uploadEvent
export const createEvent = async (eventData) => {
  console.log(JSON.stringify({ event: eventData }));
  try {
    const response = await fetch(url + "AddEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: eventData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding Event:", error.message);
    // Handle the error here
    throw error; // Rethrow the error if needed
  }
};

export const getUserByIdAndPassword = async (id, password) => {
  const apiUrl = `${url}/updateUserPasswordById?id=${id}&password=${password}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

//GET USER DATA
export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(
      url + "getUserById?id=" + encodeURIComponent(userId)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const addSchool = async (school, userData) => {
  try {
    const apiUrl = url + "addSchool";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ school: school, user: userData }),
    });

    console.log("Request URL:", apiUrl);
    console.log(
      "Request Data:",
      JSON.stringify({ school: school, user: userData })
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in addSchool:", error.message);
    throw error;
  }
};

export const uploadView = async (viewData) => {
  try {
    const response = await fetch(url + "saveViews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ view: viewData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding Views:", error.message);
    // Handle the error here
    throw error; // Rethrow the error if needed
  }
};
// GET ALL GROUPS
export const getAllGroups = async () => {
  try {
    var res = await fetch(url + "getAllGroups");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log("Error in getting Groups", error);
    throw error;
  }
};
export const getQuestionsBySchoolId = async (Id) => {
  try {
    const response = await fetch(
      url + "getQuestionsBySchoolId?id=" + encodeURIComponent(Id)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Questions By School Id data:", error);
  }
};
export const getVideoByDomainTitle = async (title) => {
  try {
    const response = await fetch(
      url + "getVideoByDomainTitle?title=" + encodeURIComponent(title)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching getVideoByDomainTitle:", error);
  }
};

export const updateQuestionsByTeacherByQuestionIdId = async (Id, question) => {
  console.log(Id);
  try {
    const response = await fetch(
      url +
        `updateQuestionsByTeacherByQuestionIdId?questionId=${encodeURIComponent(
          Id
        )}&question=${encodeURIComponent(question)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Questions By School Id data:", error);
  }
};
export const getAssignVideoToQuestion = async (id) => {
  try {
    const response = await fetch(
      url + "getAssignVideoToQuestion?questionId=" + encodeURIComponent(id)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching getAssignVideoToQuestion:", error);
  }
};
export const getVideoByDomainTitleNotAssigned = async (title) => {
  try {
    const response = await fetch(
      url +
        "getVideoByDomainTitleNotAssigned?title=" +
        encodeURIComponent(title)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching getVideoByDomainTitleNotAssigned:", error);
  }
};
export const assignVideoToQuestion = async (questionId, videoId) => {
  try {
    const response = await fetch(
      url +
        `assignVideoToQuestion?questionId=${encodeURIComponent(
          questionId
        )}&videoId=${encodeURIComponent(videoId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching assignVideoToQuestion:", error);
  }
};
export const deleteAssignVideoToQuestion = async (questionId, videoId) => {
  try {
    const response = await fetch(
      url +
        `deleteAssignVideoToQuestion?questionId=${encodeURIComponent(
          questionId
        )}&videoId=${encodeURIComponent(videoId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deleteAssignVideoToQuestion:", error);
  }
};
// GET ALL EVENTS
export const getAllEvents = async () => {
  try {
    var res = await fetch(url + "getAllEvents");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log("Error in getting event", error);
    throw error;
  }
};
export const updateStudent = async (studentData) => {
  console.log(JSON.stringify({ student: studentData }));
  console.log(studentData);
  try {
    const response = await fetch(url + "UpdateStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating Student:", error.message);
    throw error;
  }
};
export const deleteStudent = async (studentId) => {
  // console.log(JSON.stringify({student: studentData}));
  console.log(studentId);

  try {
    const response = await fetch(url + "deletestudent?id=" + studentId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting Student:", error.message);
    throw error;
  }
};
//GET TEACHER BY SCHOOL ID
export const getTeacherBySchoolId = async (userId) => {
  try {
    const response = await fetch(
      url + "getTeacherBySchoolId?id=" + encodeURIComponent(userId)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Teacher data:", error);
  }
};

//GET Studetn interest BY studentId ID
export const getInterestByStudentId = async (id) => {
  try {
    const response = await fetch(
      url + "getStudentInterest?id=" + encodeURIComponent(id)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Interest data:", error);
  }
};
export const getInterestById = async (id) => {
  try {
    const response = await fetch(
      url + "getStudentInterest?id=" + encodeURIComponent(id)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Interest data:", error);
  }
};
export const editStudentInterest = async (studentId, interests) => {
  console.log(studentId, interests);
  try {
    var res = await fetch(
      url + "editStudentInterest?studentId=" + encodeURIComponent(studentId),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interests),
      }
    );

    if (!res.ok) {
      // throw new Error(HTTP error! Status: ${res.status});
      console.error("Error fetching Interest data:", res.status);
    }

    var data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Adding Interest of Student", error);
    throw error;
  }
};
export const addNewQuestion = async (domain, subdomain, question, schoolId) => {
  try {
    var res = await fetch(
      // url + 'addNewQuestion?domain=' + encodeURIComponent(domain),
      url +
        `addNewQuestion?domain=${encodeURIComponent(
          domain
        )}&subdomain=${encodeURIComponent(
          subdomain
        )}&question=${encodeURIComponent(
          question
        )}&schoolId=${encodeURIComponent(schoolId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      // throw new Error(HTTP error! Status: ${res.status});
      console.error("Error fetching Interest data:", res.status);
    }

    var data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Adding Interest of Student", error);
    throw error;
  }
};
