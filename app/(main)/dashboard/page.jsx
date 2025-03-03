import React from 'react'
import VideoList from './components/VideoList'

 const Dashboard = () => {
  return (
    
    <div className='ml-[3rem]'>
      <h2 className='font-bold text-3xl'>My Videos</h2>
      <VideoList/>
    </div>
  )
}

export default Dashboard
