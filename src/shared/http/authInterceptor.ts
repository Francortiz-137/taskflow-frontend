import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { tokenStore } from "../auth/tokenStore";

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

async function refreshToken(baseURL: string): Promise<string> {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await axios.post<RefreshResponse>(
    `${baseURL}/auth/refresh`,
    { refreshToken }
  );

  tokenStore.setAccessToken(res.data.accessToken);
  if (res.data.refreshToken) {
    tokenStore.setRefreshToken(res.data.refreshToken);
  }

  return res.data.accessToken;
}

export function attachAuthInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token) => {
            if (!token) return reject(error);
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken(api.defaults.baseURL ?? "");
        resolveQueue(newToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return api(originalRequest);
      } catch (e) {
        resolveQueue(null);
        tokenStore.clear();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
  );
}
