import React from 'react'
import TopBar from '../../components/topbar/Topbar'
import LeftBar from '../../components/leftbar/LeftBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import './home.css';

const Home = () => {
  return (
    <div>
      <TopBar />
      <div className="homeContainer">
        <LeftBar />
        <Feed />
        <RightBar />
      </div>
    </div>
  )
}

export default Home
