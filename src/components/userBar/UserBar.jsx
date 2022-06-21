import React,{useCallback} from 'react';
import {AiFillBell} from 'react-icons/ai'
import './userBar.scss';

import { useLogout } from '../../hooks/useLogout';

export default function UserBar() {
  const logout = useLogout();
    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);
  return (
    <div className='userbarBody'>
      <div className="searchBarDiv">
        <input type="text" placeholder="Search" />
      </div>
      <div className='userContainer'>
        <div className='user'> user </div>
        <div className='notification'> <AiFillBell/> </div>
      </div>
      <button className='logout' data-cy="logout_btn" onClick={() => handleLogout()}> Uitloggen</button>
    </div>
  )
}