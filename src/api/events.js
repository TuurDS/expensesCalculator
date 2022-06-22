import { axios } from ".";

export const getEvents = async () => {
    return await axios.get("/event/");
};

export const searchEvents = async (string) => {
    return await axios.get(`/event/search/${string}`);
}
