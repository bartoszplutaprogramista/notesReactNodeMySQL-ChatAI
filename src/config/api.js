import axios from 'axios';

const API_BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});