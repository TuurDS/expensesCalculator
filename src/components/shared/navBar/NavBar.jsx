import React from 'react';
import './navBar.scss';
import { faHouse, faThumbtack, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar({active = 0}) {

  const nav = new Map()
  .set(0, ['Home', <FontAwesomeIcon icon={faHouse}/>,"/"])
  .set(1, ['Mijn expenses', <FontAwesomeIcon icon={faMoneyBillTransfer}/>, "/expenses"])
  .set(2, ['pinned Events', <FontAwesomeIcon icon={faThumbtack}/>, "/pinnedEvents"]);

  return (
    <div className='navbar'>
        <div className='menu'>
          <div className="title">Menu</div>
        {
          Array.from(nav).map(([key, val]) => {
            return(
            <a key={key} href={val[2]}>
              <div className={`tile ${active===key ? 'active':''}`}>
                <div className="icon">{val[1]}</div>
                <div>
                  {val[0]}
                </div> 
              </div>
            </a>
            )})
        }
        </div>
    </div>
  )
}