import React, {useState} from 'react';
import './navBar.scss';
import {AiFillHome} from 'react-icons/ai'
import {AiFillFileExcel} from 'react-icons/ai'
import Switch from "react-switch";

export default function NavBar() {
  const [checked, setChecked] = useState(false);
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };


  return (
    <div className='navbarBody'>
        <div className='title'>
            <h1>Expense Calculator</h1>
        </div>
        <div className='menu'>Menu
            <div className='tile'><AiFillHome /> Home</div>
            <div className='tile'><AiFillFileExcel/> Mijn expenses</div>
        </div>
            <div className='styleSwitch'>        
                <Switch
                    onChange={handleChange}
                    checked={checked}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#8912de"
                    className="react-switch"
                /> &ensp; Night mode
            </div>
    </div>
  )
}