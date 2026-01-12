const REFRESH_KEY = "taskflow_refresh_token";

let accessToken: string | null = null;

export const tokenStore = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string | null) {
    accessToken = token;
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
  },

  setRefreshToken(token: string | null) {
    if (!token) {
      localStorage.removeItem(REFRESH_KEY);
    } else {
      localStorage.setItem(REFRESH_KEY, token);
    }
  },

  clear() {
    accessToken = null;
    localStorage.removeItem(REFRESH_KEY);
  },
};
