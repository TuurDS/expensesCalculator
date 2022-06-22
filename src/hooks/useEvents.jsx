import { useContext } from "react";
import { EventsContext } from "../contexts/EventsProvider"; 

const useValue = () => useContext(EventsContext);

export function useEvents() {
    const { fetchEvents, events, loading, error } = useValue();
    return { fetchEvents, events, loading, error };
}