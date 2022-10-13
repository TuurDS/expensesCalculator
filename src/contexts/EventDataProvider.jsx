//create a context like EventsProvider to store the state of the date of the event

import React, { createContext, useState, useCallback, useMemo } from 'react';
import * as EventsAPI from '../api/events';

export const EventsDataContext = createContext();

export const EventsDataProvider = ({ children }) => {
    const [eventData, seteventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchEventData = useCallback(async (id) => {
        try {
            setError("");
            setLoading(true);
            seteventData([]);
            const { data } = await EventsAPI.getEventById(id);
            seteventData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        fetchEventData, eventData, loading, error
    }), [fetchEventData, eventData, loading, error]);

    return (
        <EventsDataContext.Provider value={value}>
            {children}
        </EventsDataContext.Provider>
    )
}
