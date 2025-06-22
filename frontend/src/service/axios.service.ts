import axios, { AxiosInstance } from "axios";
import { authStore } from "../store/auth.store";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BE_URL
});

// Request interceptor to add the auhorization to the request
axiosInstance.interceptors.request.use(
    async (config) => {
        if (authStore.getAccessToken() && !config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${authStore.getAccessToken()}`;
        }
        config.headers['x-api-key'] = process.env.REACT_APP_API_KEY;
        config.headers['Cache-Control'] = 'no-cache';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = '0';
        return config;
    },
    (error) => Promise.reject(error)
);

const getAxiosInstance = (): AxiosInstance => {
    return axiosInstance;
}

export default getAxiosInstance;