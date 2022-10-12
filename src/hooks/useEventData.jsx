import { useContext } from "react";
import { EventsDataContext } from "../contexts/EventDataProvider";

const useValue = () => useContext(EventsDataContext);

export function useEventData() {
    const { fetchEventData, eventData, loading, error } = useValue();
    return { fetchEventData, eventData, loading, error };
}