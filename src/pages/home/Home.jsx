import './home.scss';
import React from 'react'
import NavBar from '../../components/navBar/NavBar';
import UserBar from '../../components/userBar/UserBar';
import Events from '../../components/events/Events';

export default function Home() {

    return (
    <div className="base-box">
        <div className="nav">
          <NavBar/>
        </div>
        <div className="right">
          <div className='userBar'>
            <UserBar />
          </div>    
          <div className="content">
            <Events />
            <div className="friends">
              <div className="title">Coming soon</div>
              <div className="container"></div>
            </div>
          </div> 
        </div>
    </div>
    )
}
