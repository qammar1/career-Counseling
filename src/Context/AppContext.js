var url = "http://192.168.0.104/CareerCounselligBackend/api/careercounselling/";

// // signup domain expert
export const addDomainExpert = async (domainExpert, userData, domainId) => {

  try {
    const apiUrl =
      url + 'addDomainExpert?domainId=' + encodeURIComponent(domainId);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({domainExpert: domainExpert, user: userData}),
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
    console.error('Error in addDomainExpert:', error.message);
    throw error;
  }
};
// // GET ALL DOMAINS
export const getAllDomain = async () => {
  try {
    var res = await fetch(url + 'getAllDomains');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; 
  } catch (error) {
    console.log('Error in getting domain', error);
    throw error;
  }
};
export const uploadVideo = async (videoData) => {
  // console.log(videoData)
  try {
    const response = await fetch(url + 'AddVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({video: videoData}),
    });
    

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error adding video:', error.message);
    throw error; 
  }
};

// teacher
export const addTeacher = async (Teacher, userData) => {
  try {
    // const apiUrl = url + 'addTeacher';

    const response = await fetch(url + 'addTeacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teacher: Teacher, user: userData}),
    });

    console.log(
      'Request Data:',
      JSON.stringify({teacher: Teacher, user: userData}),
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in addTeacher:', error.message);
    throw error;
  }
};
// GET ALL USER NAME
export const getAllUsername = async () => {
  try {
    var res = await fetch(url + 'getAllUser');

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log('Error in getting domain', error);
    throw error;
  }
};
export const addStudent = async (Student, userData) => {
  try {
    // const apiUrl = url + 'addStudent';

    const response = await fetch(url + 'addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({student: Student, user: userData}),
    });

    console.log(
      'Request Data:',
      JSON.stringify({student: Student, user: userData}),
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in addStudent:', error.message);
    throw error;
  }
};
//GET STUDENT BY USER ID
export const getStudentByUserId = async userId => {
  try {
    const response = await fetch(
      url + 'getStudentByUserId?id=' + encodeURIComponent(userId),
    );
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching Student data:', error);
  }
};

/////////////////////////////////////// aptitude test///////////////////
// Get All Questions
export const GetAllQuestions = async () => {
  try {
    var res = await fetch(url + 'getQuestions');

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log('Error in getting Questions', error);
    throw error;
  }
};

// Get All Questions
export const AddInterest = async (studentId, interests) => {
  try {
    var res = await fetch(
      url + 'addStudentInterest?studentId=' + encodeURIComponent(studentId),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interests),
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    return data; // Return the data
  } catch (error) {
    console.log('Error in Adding Interest of Student', error);
    throw error;
  }
};

// Get Video By Domain
export const getVideoByDomain = async studentId => {
  try {
    var res = await fetch(
      url + 'getVideoByDomain?userId=' + encodeURIComponent(studentId),
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    var data = await res.json();
    // console.log(data);
    return data; // Return the data
  } catch (error) {
    console.log('Error in getting Questions', error);
    throw error;
  }
};

export const uploadRating = async ratingData => {
  try {
    const response = await fetch(url + 'saveRating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({rating: ratingData}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error adding rating:', error.message);
    // Handle the error here
    throw error; // Rethrow the error if needed
  }
};

export const getFeedbackOnVideo = async videoId => {
  try {
    const response = await fetch(
      url + 'getFeedbackOnVideo?videoId=' + encodeURIComponent(videoId),
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error getting feedback:', error.message);
    // Handle the error here
    throw error; // Rethrow the error if needed
  }
};
//GET SCHOOL BY USER ID
export const getSchoolByUserId = async userId => {
  try {
    const response = await fetch(
      url + 'getSchoolByUserId?id=' + encodeURIComponent(userId),
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching School data:', error);
  }
};
// get user by user id 
export const  getUserByUserId= async userId => {
  try {
    const response = await fetch(
      url + 'getUserById?id=' + encodeURIComponent(userId),
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

//GET TEACHER BY USER ID
export const getTeacherByUserId = async userId => {
  try {
    const response = await fetch(
      url + 'getTeacherByUserId?id=' + encodeURIComponent(userId),
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Teacher data:', error);
  }
};