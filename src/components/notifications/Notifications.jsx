import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import { faCircleCheck, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./notifications.scss";

export default function Notifications({notificationType, message, resolution, isActive, exit}) {

  const ref = useRef(null);

  const typeMap = new Map()
  .set(0, ['error', faCircleXmark])
  .set(1, ['confirmation', faCircleCheck])

  return (
    <CSSTransition in={isActive} timeout={500} classNames="notification" nodeRef={ref} unmountOnExit>
      <div className={`notifications ${typeMap.get(notificationType)[0]}`} ref={ref}>
        <FontAwesomeIcon icon={typeMap.get(notificationType)[1]}/>
        <div className='body'>
          <div className='message'>{message}</div>
          <div className='resolution'>{resolution}</div>
        </div>
        <div className="exit">
          <div className="wrap" onClick={() => exit()}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
    </CSSTransition >
  )
}
