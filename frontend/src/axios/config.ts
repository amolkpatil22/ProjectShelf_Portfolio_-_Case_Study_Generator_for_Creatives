import axios from 'axios';

// Create axios instance with custom config
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // If token exists, add it to request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    // Call refresh token endpoint
                    const response = await axios.post('/auth/refresh-token', {
                        refreshToken,
                    });

                    const { token } = response.data;

                    // Update token in localStorage
                    localStorage.setItem('token', token);

                    // Update Authorization header
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    // Retry the original request
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // Handle refresh token failure
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 