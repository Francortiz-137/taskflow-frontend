import axios from "axios";
import { tokenStore } from "../auth/tokenStore";
import { attachAuthInterceptor } from "./authInterceptor";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request: agrega Authorization si hay token
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

attachAuthInterceptor(api);