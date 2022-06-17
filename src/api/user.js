import { axios } from ".";

export const login = async (username, password) => {
  return await axios.post("/user/login", { name: username, password });
};


