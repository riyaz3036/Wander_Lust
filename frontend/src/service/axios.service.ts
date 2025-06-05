import axios, { AxiosInstance } from "axios";
import { authStore } from "../store/auth.store";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_BE_URL
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


// Response interceptor for error handling and token refresh
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Handle 401 unauthorized - token might be expired
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Try to refresh token if you have refresh token logic
//                 // const newToken = await authStore.refreshToken();
//                 // if (newToken) {
//                 //     originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//                 //     return axiosInstance(originalRequest);
//                 // }
                
//                 // If no refresh logic, clear auth and redirect to login
//                 // authStore.clearAuth();
//                 // window.location.href = '/login'; // or use your router
//             } catch (refreshError) {
//                 console.error('Token refresh failed:', refreshError);
//                 // authStore.clearAuth();
//                 // window.location.href = '/login';
//             }
//         }

//         // Log errors for debugging (remove in production or use proper logging)
//         if (process.env.NODE_ENV === 'development') {
//             console.error('API Error:', {
//                 url: error.config?.url,
//                 method: error.config?.method,
//                 status: error.response?.status,
//                 data: error.response?.data,
//             });
//         }

//         return Promise.reject(error);
//     }
// );

const getAxiosInstance = (): AxiosInstance => {
    return axiosInstance;
}

export default getAxiosInstance;