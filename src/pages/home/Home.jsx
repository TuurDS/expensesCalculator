import React from 'react'
import NavBar from '../../components/navBar/NavBar';
import './home.scss';
import UserBar from '../../components/userBar/UserBar';

export default function Home() {
    return (
  <div className='parent'>
    <div className="nav">
      <NavBar/>
    </div>
    <div className='userBar'>
      <UserBar />
    </div>
    
  </div>
  )
}
