import axios from "axios";
import SecureLocalStorage from "../utils/secureLocalStorage";

const axiosInterceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});
axiosInterceptor.interceptors.request.use(
    (config) => {
        const accessToken = SecureLocalStorage().get("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
axiosInterceptor.interceptors.response.use(
    (response) => {
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = SecureLocalStorage().get("refreshToken");
            const accessToken = SecureLocalStorage().get("accessToken");

            if (!refreshToken || !accessToken) {
                // Handle the case where refresh token or access token is missing
                return Promise.reject(error);
            }

            try {
                const response = await axiosInterceptor.post("auth/token", { refreshToken, accessToken });

                if (response.status === 200) {
                    SecureLocalStorage().set("accessToken", response.data.accessToken);
                    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                    return axiosInterceptor(originalRequest);
                }
            } catch (refreshError) {
                // Handle the case where token refresh fails
                console.log("Token refresh failed:", refreshError);
                return Promise.reject(error);
            }
        } else {
            console.error('Error response is undefined:', error);
        }

        // If the error is not a 401 or the token refresh also fails, reject the promise
        return Promise.reject(error);
    }
);
export default axiosInterceptor;