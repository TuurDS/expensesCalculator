import './userBar.scss';
import React,{useCallback, useState } from 'react';

import Dropdown from './dropdown/Dropdown';
import SearchBar from './searchbar/SearchBar';
import { useEvents } from '../../../hooks/useEvents';
import { useSession } from '../../../hooks/useSession';
import { useLogout } from '../../../hooks/useLogout';

import {faAngleDown, faCircle, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultUserImg from "../../../assets/img/default-user.png";

export default function UserBar() {
  const { user } = useSession();
  const logout = useLogout();
    
    const [showDropdown, setShowDropdown] = useState(false);

    const myStateRef = React.useRef(showDropdown);
    const setMyState = data => {
      myStateRef.current = data;
      setShowDropdown(data);
    };

    const handleClickOutside = useCallback((e) => {
      if(myStateRef.current) {
        if(!(e.path.map(e => e.className).includes('dropdown show') || 
        (e.path.map(e => e.className).includes('user')
        ))) {
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

    const { fetchEvents, searchEvents} = useEvents();
    
    const search = async (string) => {
      string = string.trim();
      if (string !== "") {
        await searchEvents(string);
      } else {
        await fetchEvents();
      }
    }

  return (
    <div className='userbar'>
        <SearchBar search={search}/>
        <div className='user'>
          <div onClick={() => toggleDropDown()} className='userIcon'><img src={DefaultUserImg} alt="userImage" /></div> 
          <div onClick={() => toggleDropDown()} className="text">{user.name}</div> 
          <div onClick={() => toggleDropDown()} className={`icon ${showDropdown ? "rotate":""}`}><FontAwesomeIcon icon={faAngleDown}/></div>
          <div className='notification'> <FontAwesomeIcon icon={faBell}/> <FontAwesomeIcon icon={faCircle}/></div>
        </div>
        <Dropdown handleLogout={handleLogout} showDropdown={showDropdown}/>
    </div>
  )
}