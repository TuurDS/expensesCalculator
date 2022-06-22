import React, { createContext, useState, useCallback, useMemo } from 'react';
import * as EventsAPI from '../api/events';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const fetchEvents = useCallback(async () => {
        try {
            setError("");
            setLoading(true);
            
            setEvents([]);
            const { data } = await EventsAPI.getEvents();
            setEvents(data);
            //simulate loading time
            //await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const searchEvents = useCallback(async (string) => {
        try {
            setError("");
            setLoading(true);
            
            setEvents([]);
            const { data } = await EventsAPI.searchEvents(string);
            setEvents(data);
            //simulate loading time
            //await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        fetchEvents, searchEvents, events, loading, error
    }), [fetchEvents, searchEvents, events, loading, error]);

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}
