import React, { useState } from 'react'
import VideoCard from '../common/VideoCard'
import Nav from '../common/Nav'
export default function AllVideos() {
  const[arr,setarr] = useState([1,2,34,45,5,6])
  return (
   <React.Fragment>
   <Nav/>
   <div className="allVideos">
  {arr.map((e, index) => (
    <div key={index} className="videoCard">
      <VideoCard />
    </div>
  ))}
</div>
   </React.Fragment> 
  
  )
}
