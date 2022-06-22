import "./events.scss" ;
import React, { useEffect } from 'react'
import { useEvents } from '../../hooks/useEvents';
import { useSession } from '../../hooks/useSession';
import { useNavigate } from "react-router-dom";

import DefaultUserImg from "../../assets/img/default-user.png";
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Events() {
  
    const { fetchEvents, events, loading, updatePinnedEvent } = useEvents();
    const { user } = useSession();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
    
    const togglePin = async (id) => {
        await updatePinnedEvent(id, !events.find(event => event.id === id).pinned);
        await fetchEvents();
    }

    const getEvent = (e, id) => {
        navigate(`/event/${id}`);
    }

    return (
    <>
    <div className='events'>
    <div className="title">Events</div>
    {!loading && events.map((event, index) => {
        console.log(event.name," ",event.pinned);
        return (
            <div className='event' key={event.id} onClick={(e) => getEvent(e,event.id)}>
                <div className="event-left">

                    <div className='number'>{`${index + 1 < 10 ? "0": ""}${index+1}`}</div>
                    <div className='eventInfo'>
                        <div className='eventTitle'>{event.name}</div>
                        <div className='user'>
                            <div className='userIcon'><img src={DefaultUserImg} alt="userImage" /></div> 
                            <div className="text">{user.name}</div>
                        </div>
                    </div>  
                </div>
                
                <div className="event-right"> 
                    <div className="pin" onClick={(e) => {
                        e.stopPropagation();
                        togglePin(event.id);
                    }}>
                        <FontAwesomeIcon icon={faThumbtack} className={`icon ${event.pinned ? "pinned":""}`}/>
                    </div>
                </div> 
            </div>
            
        )})
    }
    {/* {loading && <div className="loading"><div className="loadingRing">loading</div></div>} */}
    </div>
    </>
  )
}
