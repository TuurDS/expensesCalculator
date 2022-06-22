import './userBar.scss';
import React,{useCallback, useState } from 'react';

import { useEvents } from '../../hooks/useEvents';
import { useSession } from '../../hooks/useSession';
import { useLogout } from '../../hooks/useLogout';

import { faUser,faMarker, faMagnifyingGlass, faAngleDown, faCircle, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultUserImg from "../../assets/img/default-user.png";

export default function UserBar() {
    const logout = useLogout();

    const { fetchEvents, searchEvents, events, loading, error } = useEvents();
    const { user } = useSession();
    
    const [showDropdown, setShowDropdown] = useState(false);

    const myStateRef = React.useRef(showDropdown);
    const setMyState = data => {
      myStateRef.current = data;
      setShowDropdown(data);
    };

    const handleClickOutside = useCallback((e) => {
      if(myStateRef.current) {
        if(!(e.path.map(e => e.className).includes('dropdown show') || e.path.map(e => e.className).includes('user'))) {
          setMyState(false);
          document.removeEventListener('mousedown', handleClickOutside);
        }
      }
    },[]);

    function toggleDropDown(){
      if(myStateRef.current) {
        setMyState(false);
        document.removeEventListener('mousedown', handleClickOutside);
        return;
      };
      setMyState(true);
      document.addEventListener('mousedown', handleClickOutside);
    }

    const handleLogout = useCallback(async () => {
      document.removeEventListener('mousedown', handleClickOutside);  
      await logout();
    }, [handleClickOutside, logout]);

    const search = (string) => {
      if (string !== "") {
        searchEvents(string);
      } else {
        fetchEvents()
      }
    }

  return (
    <div className='userbarBody'>
      <div className="searchBarDiv">
        <input type="search" placeholder="Search" onChange={(e) =>  search(e.target.value)}/>
        <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
      </div>
      <div className='userContainer'>
        <div className='user' onClick={() => toggleDropDown()}>
          <div className='userIcon'><img src={DefaultUserImg} alt="userImage" /></div> 
          <div className="text">{user.name}</div> 
          <div className={`icon ${showDropdown ? "rotate":""}`}><FontAwesomeIcon icon={faAngleDown}/></div>
        </div>
        
        <div className={`dropdown ${showDropdown ? "show":""}`}>
          <div className="username"> 
            <div> 
              <div className='icon'><FontAwesomeIcon icon={faUser}/></div>
               <div>Username</div> 
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
        <div className='notification'> <FontAwesomeIcon icon={faBell}/> <FontAwesomeIcon icon={faCircle}/></div>
      </div>

    </div>
  )
}