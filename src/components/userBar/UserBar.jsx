import React,{useCallback, useState } from 'react';
import {AiFillBell} from 'react-icons/ai'
import './userBar.scss';
import { useSession } from '../../hooks/useSession';
import { useLogout } from '../../hooks/useLogout';

import { faUser,faMarker, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UserBar() {
  const logout = useLogout();
    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    const { user } = useSession();
    
    const [showDropdown, setShowDropdown] = useState(false)

    function toggleDropdown(){
      if(showDropdown) {
        setShowDropdown(false);
        return;
      }
      setShowDropdown(true);
    }

  return (
    <div className='userbarBody'>
      <div className="searchBarDiv">
        <input type="text" placeholder="Search" />
        <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
      </div>
      <div className='userContainer'>
        <div className='user' onClick={() => toggleDropdown()}> {user.name} </div>
        <div className={`dropdown ${showDropdown ? "show":""}`}>
          <div className="username"> 
            <div> 
              <div className='icon'><FontAwesomeIcon icon={faUser}/></div>
               <div>User</div> 
            </div>
            <div className="prop">{user.name}</div>
          </div>
          <div className="role">
            <div> 
              <div className='icon'><FontAwesomeIcon icon={faMarker}/></div>
              <div>Role</div>
            </div>
            <div className="prop">{user.role}</div>
          </div>
          <div className='line'></div>
          <div className='logoutDiv'>
            <button className='global-button' onClick={() => handleLogout()}> Uitloggen</button>
          </div>
        </div>
        <div className='notification'> <AiFillBell/> </div>
      </div>

    </div>
  )
}