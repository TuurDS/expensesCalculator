import './eventPage.scss';
import React from 'react'
import NavBar from '../../components/shared/navBar/NavBar';
import UserBar from '../../components/shared/userBar/UserBar';

export default function EventPage() {

    return (
      <div className="base-box">
      <div className='pagetitle'>
          <h1>Expense Calculator</h1>
      </div>
      <UserBar />
      <NavBar/>
  </div>
    )
}