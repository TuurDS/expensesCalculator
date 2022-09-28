import './searchbar.scss';
import React from 'react';

import { useEvents } from '../../../../hooks/useEvents';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar() {
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
      <div className="searchbar">
        <input type="search" placeholder="Search" onChange={async(e) => await search(e.target.value)}/>
        <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
      </div>
  )
}