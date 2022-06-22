import React, { createContext, useState, useCallback, useMemo } from 'react';
import * as EventsAPI from '../api/events';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pinnedEvents, setPinnedEvents] = useState([]);


    const fetchEvents = useCallback(async () => {
        try {
            setError("");
            setLoading(true);
            setEvents([]);
            const { data } = await EventsAPI.getEvents();
            //sort data on data.pinned
            const pinned = data.filter(event => event.pinned);
            const unpinned = data.filter(event => !event.pinned);
            const sortedEvents = [...pinned, ...unpinned];
            setEvents(sortedEvents);
            setPinnedEvents(pinned);
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

    const fetchPinnedEvents = useCallback(async (string) => {
        try {
            setError("");
            setLoading(true);
            setPinnedEvents([]);
            const { data } = await EventsAPI.getPinnedEvents(string);
            setPinnedEvents(data);
            //simulate loading time
            //await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePinnedEvent = useCallback(async (id, pinned) => {
        try {
            setError("");
            setLoading(true);
            await EventsAPI.updatePinned(id, pinned);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        fetchEvents, searchEvents, fetchPinnedEvents, pinnedEvents, events, loading, error, updatePinnedEvent
    }), [fetchEvents, searchEvents, fetchPinnedEvents, pinnedEvents, events, loading, error, updatePinnedEvent]);

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}
