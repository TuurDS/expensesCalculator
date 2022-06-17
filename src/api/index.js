import axiosRoot from 'axios';
import config from '../config.json';

export const axios = axiosRoot.create({
    baseURL: config.api_base_url
});

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}