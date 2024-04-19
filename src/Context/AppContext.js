var url = "http://192.168.0.103/CareerCounselligBackend/api/careercounselling/";

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