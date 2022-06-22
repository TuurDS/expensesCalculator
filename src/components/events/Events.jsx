import "./events.scss" ;
import React, { useEffect } from 'react'
import { useEvents } from '../../hooks/useEvents';
import { useSession } from '../../hooks/useSession';

import DefaultUserImg from "../../assets/img/default-user.png";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Events() {
  
    const { fetchEvents, events, loading, error } = useEvents();
    const { user } = useSession();
    
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents])

    return (
    <>
    <div className='events'>
    <div className="title">Events</div>
    {!loading && events.map((event, index) => {
        return (
            <div className='event' key={event.id}>
                <div className='number'>{`${index + 1 < 10 ? "0": ""}${index+1}`}</div>
                <div className='eventInfo'>
                    <div className='eventTitle'>{event.name}</div>
                    <div className='user'>
                        <div className='userIcon'><img src={DefaultUserImg} alt="userImage" /></div> 
                        <div className="text">{user.name}</div>
                    </div>
                </div>
                <div className="pin"><FontAwesomeIcon icon={faHeart}/></div>
            </div>
        )})
    }
    {loading && <div className="loading"><div className="loadingRing">loading</div></div>}
    </div>
    </>
  )
}