import './eventPage.scss';
import React from 'react'
import NavBar from '../../components/navBar/NavBar';
import UserBar from '../../components/userBar/UserBar';

export default function EventPage() {

    return (
    <div className="base-box">
      <div className='parent'>
        <div className="nav">
          <NavBar/>
        </div>
        <div className="right">
          <div className='userBar'>
            <UserBar />
          </div>
        </div>
      </div>
    </div>
    )
}