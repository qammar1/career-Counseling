// import React, { useEffect, useState } from 'react';
// import {
//   getAssignVideoToQuestion,
//   getVideoByDomainTitleNotAssigned,
//   assignVideoToQuestion,
//   deleteAssignVideoToQuestion,
// } from '../../Context/AppContext';
// import VideoCard from '../common/LinkVideoCard';

// const LinkVideo = ({ video, onLinkVideo, onUnlinkVideo, selectedQuestion }) => {
//     console.log(selectedQuestion.domain)
//   const question = "hello";
//   const [videos, setVideos] = useState([]);
//   const [assignVideos, setAssignVideos] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const getVideo = async (item) => {
//     try {
//       setLoading(true);
//       const data = await getVideoByDomainTitleNotAssigned(selectedQuestion.domain);
//       const value = await getAssignVideoToQuestion(selectedQuestion.Id);
      
//       setVideos(data);
//       setAssignVideos(value);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
// console.log(assignVideos);
//   const handleLinkVideoPress = async (item) => {
//     try {
//       await assignVideoToQuestion(selectedQuestion.Id, item.Id);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setRefreshing(true);
//       getVideo(question);
//     }
//   };

//   const handleUnLinkVideoPress = async (item) => {
//     try {
//       await deleteAssignVideoToQuestion(selectedQuestion.Id, item.Id);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setRefreshing(true);
//       getVideo(question);
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     getVideo(question);
//   };

//   useEffect(() => {
//     getVideo(question);
//   }, []);
// console.log(videos)
//   return (
//     <div >
//       <h3>Linked Video</h3>
//       <div style={{ flex: 2 }}>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             {assignVideos.map((item) => (
//               <div key={item.Id}>
//                 <VideoCard video={item} onClick={() => console.log(item)} />
//                 <button
//                   onClick={() => handleUnLinkVideoPress(item)}
//                 //   style={{ ...styles.button, backgroundColor: COLORS.red }}
//                 >
//                   Unlink Video
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <h3 >Not Linked Video</h3>
      
//       <div style={{ flex: 2 }}>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             {videos.map((item) => (
//               <div key={item.Id}>
//                 <VideoCard video={item} onClick={() => console.log(item)} />
//                 <button
//                   onClick={() => handleLinkVideoPress(item)}
//                 //   style={{ ...styles.button, backgroundColor: COLORS.darkCyan }}
//                 >
//                   Link Video
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {refreshing && <p>Refreshing...</p>}
//     </div>
//   );
// };



// export default LinkVideo;
import React, { useEffect, useState } from 'react';
import {
  getAssignVideoToQuestion,
  getVideoByDomainTitleNotAssigned,
  assignVideoToQuestion,
  deleteAssignVideoToQuestion,
} from '../../Context/AppContext';
import VideoCard from '../common/LinkVideoCard';

const LinkVideo = ({ video, onLinkVideo, onUnlinkVideo, selectedQuestion }) => {
  console.log(selectedQuestion.domain);
  const question = "hello";
  const [videos, setVideos] = useState([]);
  const [assignVideos, setAssignVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getVideo = async () => {
    try {
      setLoading(true);

      console.log(selectedQuestion)
      const data = await getVideoByDomainTitleNotAssigned(selectedQuestion.domain);
      const value = await getAssignVideoToQuestion(selectedQuestion.Id);
      setVideos(data);
      setAssignVideos(value);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLinkVideoPress = async (item) => {
    try {
      await assignVideoToQuestion(selectedQuestion.Id, item.Id);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(true);
      getVideo();
    }
  };

  const handleUnLinkVideoPress = async (item) => {
    try {
      await deleteAssignVideoToQuestion(selectedQuestion.Id, item.Id);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(true);
      getVideo();
    }
  };

  useEffect(() => {
    getVideo();
  }, []);
console.log(videos)
  return (
    <div style={styles.modalContent}>
      <h3>Linked Video</h3>
      <div style={styles.videoContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {assignVideos.map((item) => (
              <div key={item.Id} style={styles.videoCard}>
                <VideoCard video={item} onClick={() => console.log(item)} />
                <button
                  onClick={() => handleUnLinkVideoPress(item)}
                  style={styles.unlinkButton}
                >
                  Unlink Video
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <h3>Not Linked Video</h3>
      <div style={styles.videoContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {videos.map((item) => (
              <div key={item.Id} style={styles.videoCard}>
                <VideoCard video={item} onClick={() => console.log(item)} />
                <button
                  onClick={() => handleLinkVideoPress(item)}
                  style={styles.linkButton}
                >
                  Link Video
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {refreshing && <p>Refreshing...</p>}
    </div>
  );
};

const styles = {
  modalContent: {
    maxHeight: '80vh', // Set the max height of the modal content
    overflowY: 'auto', // Make the content scrollable
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  videoContainer: {
    maxHeight: '35vh', // Adjust based on your layout needs
    overflowY: 'auto', // Make the container scrollable
    marginBottom: '20px',
  },
  videoCard: {
    marginBottom: '10px',
  },
  linkButton: {
    backgroundColor: 'darkCyan',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  unlinkButton: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LinkVideo;
