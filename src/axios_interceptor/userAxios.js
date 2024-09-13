import axios from "axios";

const userInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL
});

userInstance.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

export default userInstance;