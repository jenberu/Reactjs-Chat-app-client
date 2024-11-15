import axios from "axios";

const url = 'http://localhost:8000';
const api = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
});
  // Request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response interceptor for handling token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;
  
      if (response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          // Refresh token logic
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }
  
          // Refresh token request
          const refreshResponse = await axios.post( "http://localhost:8000/accounts/refresh/",
                                     { refresh: refreshToken }
                                              );
          const { access } = refreshResponse.data;
  
          // Save new token and retry original request
          localStorage.setItem("accessToken", access);
          api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // Optionally: redirect to login or clear authentication state
        }
      }
  
      return Promise.reject(error);
    }
);
export const LoginApi = async (email, password) => {
  const response = await api.post('/accounts/login/', {
    email,
    password
  });
  const { refresh, access } = response.data;
  // Save the tokens in local storage
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  return response;
    
  }