import { axios } from ".";

export const getEvents = async () => {
    return await axios.get("/event/");
};
