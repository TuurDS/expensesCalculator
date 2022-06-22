import { axios } from ".";

export const getEvents = async () => {
    return await axios.get("/event/");
};

export const getPinnedEvents = async () => {
    return await axios.get("/event/pinned/all");
};

export const searchEvents = async (string) => {
    return await axios.get(`/event/search/${string}`);
}

export const updatePinned = async (eventId, pinned) => {
    return await axios.put(`/event/pin`, { id: eventId, pinned: pinned });
}