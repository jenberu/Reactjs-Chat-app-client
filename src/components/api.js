import axios from "axios";

const url = "http://localhost:8000";
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
        const refreshResponse = await axios.post(
          "http://localhost:8000/accounts/token/refresh/",
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
  // directly use axios with Authorization header b/c it does not need jwtauthentations
  const response = await axios.post("http://localhost:8000/accounts/login/", {
    email,
    password,
  });
  const { refresh, access } = response.data;
  // Save the tokens in local storage
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  return response;
};
export const getMessages = async (room_id) => {
  const response = await api.get(`/chat/messages/${room_id}/`);
  return response;
};
export const getUser = async () => {
  const response = await api.get("/accounts/user/profile/");
  return response;
};

export const userRegistor = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/accounts/register/",
      data
    );
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx

      // The default Error class in JavaScript only supports a string message
      throw new Error(
        JSON.stringify(error.response.data.errors) || "Registration error"
      ); // Pass meaningful message
    } else if (error.request) {
      // Request made but no response received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Other errors
      console.error("Error:", error.message);
      throw new Error("Unexpected error occurred. Please try again.");
    }
  }
};

export const Logout = async () => {
  try {
    await api.post('/accounts/logout/', { refresh_token: localStorage.getItem('refreshToken') })
    localStorage.clear();
    
  } catch (e) { 
    console.error('Error logging out:', e)


  }
}
