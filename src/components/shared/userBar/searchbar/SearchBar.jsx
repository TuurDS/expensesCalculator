import './searchbar.scss';
import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUpdateSearch } from '../../../../hooks/useSearch';

export default function SearchBar() {

  const { setSearchString } = useUpdateSearch();

  const handleChange = (e) => {
    setSearchString(e.target.value);
  }

  return (
      <div className="searchbar">
        <input type="search" placeholder="Search" onChange={async(e) => handleChange(e)}/>
        <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
      </div>
  )
}