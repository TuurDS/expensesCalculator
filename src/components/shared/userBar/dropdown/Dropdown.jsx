import './dropdown.scss';

import { useSession } from '../../../../hooks/useSession';

import { faUser,faMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Dropdown({handleLogout, showDropdown, ...rest}) {
  const { user } = useSession();

  return (
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
  )
}