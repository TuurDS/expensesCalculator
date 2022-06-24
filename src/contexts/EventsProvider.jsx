import React, { createContext, useState, useCallback, useMemo } from 'react';
import * as EventsAPI from '../api/events';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [pinnedEvents, setPinnedEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const fetchEvents = useCallback(async () => {
        try {
            setError("");
            setLoading(true);
            setEvents([]);
            const { data } = await EventsAPI.getEvents();
            const pinned = data.filter(event => event.pinned);
            const unpinned = data.filter(event => !event.pinned);
            const sortedEvents = [...pinned, ...unpinned];
            setEvents(sortedEvents);
            setPinnedEvents(pinned);
            setSearch('');
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
            setSearch(string);
            const { data } = await EventsAPI.searchEvents(string);
            const pinned = data.filter(event => event.pinned);
            const unpinned = data.filter(event => !event.pinned);
            const sortedEvents = [...pinned, ...unpinned];
            setEvents(sortedEvents);
            setPinnedEvents(pinned);
            await new Promise(resolve => setTimeout(resolve, 500));
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
        fetchEvents, searchEvents, fetchPinnedEvents, pinnedEvents, events, loading, error, updatePinnedEvent, search
    }), [fetchEvents, searchEvents, fetchPinnedEvents, pinnedEvents, events, loading, error, updatePinnedEvent, search]);

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}
