import './eventPage.scss';
import React, { useEffect, useCallback } from 'react'
import NavBar from '../../components/shared/navBar/NavBar';
import UserBar from '../../components/shared/userBar/UserBar';
import { useParams } from 'react-router-dom';
import { useEventData } from '../../hooks/useEventData';

export default function EventPage() {
    const { id } = useParams();
    const { fetchEventData, eventData, loading, error } = useEventData();

    const updateEventData = useCallback(async () => {
        await fetchEventData(id);
    }, [fetchEventData, id]);

    useEffect(() => {
        updateEventData();
    }, [updateEventData]);

    return (
        <div className="base-box">
            <div className='pagetitle'>
                <h1>Expense Calculator</h1>
            </div>
            {console.log(eventData)}
            <UserBar />
            <NavBar />
        </div>
    )
}