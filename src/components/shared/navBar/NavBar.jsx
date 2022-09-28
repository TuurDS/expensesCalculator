import React from 'react';
import './navBar.scss';
import { faHouse, faThumbtack, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar({active = 0}) {

  const nav = new Map()
  .set(0, ['Home', <FontAwesomeIcon icon={faHouse}/>])
  .set(1, ['Mijn expenses', <FontAwesomeIcon icon={faMoneyBillTransfer}/>])
  .set(2, ['pinned Events', <FontAwesomeIcon icon={faThumbtack}/>])

  return (
    <div className='navbar'>
        <div className='menu'>
          <div className="title">Menu</div>
        {
          Array.from(nav).map(([key, val]) => {
            return(
            <div className={`tile ${active===key ? 'active':''}`} key={key}>
              <div className="icon">{val[1]}</div>
              <div>
                {val[0]}
              </div> 
            </div>
            )})
        }
        </div>
    </div>
  )
}