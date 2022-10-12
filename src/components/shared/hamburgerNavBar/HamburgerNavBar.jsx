import React from 'react'
import { faHouse, faThumbtack, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./hamburgerNavBar.scss";

export default function HamburgerNavBar({ active = 0 }) {

  const nav = new Map()
    .set(0, ['Home', <FontAwesomeIcon icon={faHouse} />])
    .set(1, ['Mijn expenses', <FontAwesomeIcon icon={faMoneyBillTransfer} />])
    .set(2, ['pinned Events', <FontAwesomeIcon icon={faThumbtack} />])

  return (
    <div className="hamburgermenu">
      <input type="checkbox" id="spinner-form" />
      <label className="spinner-spin" htmlFor="spinner-form">
        <div className="spinner diagonal part-1"></div>
        <div className="spinner horizontal"></div>
        <div className="spinner diagonal part-2"></div>
      </label>
      <div className="items">
        {
          Array.from(nav).map(([key, val]) => {
            return (
              <div className={`tile ${active === key ? 'active' : ''}`} key={key}>
                <div className="icon">{val[1]}</div>
                <div>
                  {val[0]}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
