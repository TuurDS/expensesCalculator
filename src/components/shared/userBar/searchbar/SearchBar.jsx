import './searchbar.scss';
import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar({search}) {

  return (
      <div className="searchbar">
        <input type="search" placeholder="Search" onChange={async(e) => await search(e.target.value)}/>
        <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
      </div>
  )
}