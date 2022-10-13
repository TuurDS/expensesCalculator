import './home.scss';
import React from 'react'
import NavBar from '../../components/shared/navBar/NavBar';
import UserBar from '../../components/shared/userBar/UserBar';
import HamburgerNavBar from '../../components/shared/hamburgerNavBar/HamburgerNavBar';
import Events from '../../components/events/Events';
export default function Home() {

    return (
    <div className="base-box">
        <div className='pagetitle'>
            <h1>Expense Calculator</h1>
        </div>
        <UserBar />
        <NavBar/>
        <Events />
        <HamburgerNavBar />
        <div className="friends">
          <div className="title">Coming soon</div>
          <div className="container"></div>
        </div>
    </div>
    )
}
