import React, {useState} from 'react';
import './navBar.scss';
import {AiFillHome} from 'react-icons/ai'
import {AiFillFileExcel} from 'react-icons/ai'
import Switch from "react-switch";

export default function NavBar({active = 0}) {
  const [checked, setChecked] = useState(false);
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };

  const nav = new Map()
  .set(0, ['Home', <AiFillHome />])
  .set(1, ['Mijn expenses', <AiFillFileExcel/>])

  return (
    <div className='navbarBody'>
        <div className='title'>
            <h1>Expense Calculator</h1>
        </div>
        <div className='menu'>Menu
        {
          Array.from(nav).map(([key, val]) => {
            return(
            <div className={`tile ${active===key ? 'active':''}`} key={key}>
              <span className="icon">{val[1]}</span> 
                {val[0]}
            </div>
            )})
        }
        </div>
            <div className='styleSwitch'>        
                <Switch
                    onChange={handleChange}
                    checked={checked}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#03e9f4"
                    className="react-switch"
                />&emsp;Night mode
            </div>
    </div>
  )
}