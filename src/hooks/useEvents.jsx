import { useContext } from "react";
import { EventsContext } from "../contexts/EventsProvider"; 

const useValue = () => useContext(EventsContext);

export function useEvents() {
    const { fetchEvents,searchEvents, fetchPinnedEvents, pinnedEvents, events, loading, error, updatePinnedEvent } = useValue();
    return { fetchEvents, searchEvents, fetchPinnedEvents, pinnedEvents, events, loading, error, updatePinnedEvent };
}