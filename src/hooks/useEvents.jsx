import { useContext } from "react";
import { EventsContext } from "../contexts/EventsProvider"; 

const useValue = () => useContext(EventsContext);

export function useEvents() {
    const { fetchEvents,searchEvents, events, loading, error } = useValue();
    return { fetchEvents, searchEvents, events, loading, error };
}