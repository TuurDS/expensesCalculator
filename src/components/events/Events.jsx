import "./events.scss";
import React, { useEffect, useCallback } from 'react'
import { useEvents } from '../../hooks/useEvents';
import { useSession } from '../../hooks/useSession';
import { useSearch } from '../../hooks/useSearch';
import { useNavigate } from "react-router-dom";

import DefaultUserImg from "../../assets/img/default-user.png";
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../loader/Loader';
export default function Events() {

    const { fetchEvents, searchEvents, events, loading, updatePinnedEvent } = useEvents();
    const { searchString, subscribe, unsubscribe, unsubscribeAll } = useSearch();
    const { user } = useSession();
    const navigate = useNavigate();

    const EventSearch = useCallback(async (searchString) => {
        let string = searchString?.trim();
        if (string !== "") {
            await searchEvents(string);
        } else {
            await fetchEvents();
        }
    }, [fetchEvents, searchEvents]);

    useEffect(() => {
        unsubscribeAll();
        subscribe(EventSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const togglePin = async (id) => {
        await updatePinnedEvent(id, !events.find(event => event.id === id).pinned);
        await EventSearch(searchString);
    }


    const getEvent = (e, id) => {
        unsubscribe(EventSearch);
        navigate(`/event/${id}`);
    }
    return (
        <>
            <div className='events'>
                <div className="title">Events</div>
                <div className="scroll">
                    {!loading && events.map((event, index) => {
                        return (
                            <div className='event' key={event.id} onClick={(e) => getEvent(e, event.id)}>
                                <div className="event-left">

                                    <div className='number'>{`${index + 1 < 10 ? "0" : ""}${index + 1}`}</div>
                                    <div className='eventInfo'>
                                        <div className='eventTitle'>
                                            <div dangerouslySetInnerHTML={{
                                                __html: searchString === "" ?
                                                    event.name :
                                                    event.name.replace(new RegExp(searchString, "gi"), `<span class='highlight'>${searchString.toLowerCase()}</span>`)
                                            }} />


                                        </div>
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
                                        <FontAwesomeIcon icon={faThumbtack} className={`icon ${event.pinned ? "pinned" : ""}`} />
                                    </div>
                                </div>
                            </div>

                        )
                    })
                    }
                    {!loading && events.length === 0 && <div className="no-events">Sorry, we couldn't find any results</div>}
                    {loading && <Loader />}
                </div>
            </div>
        </>
    )
}
