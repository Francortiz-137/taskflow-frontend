import { api } from "../http/api";
import { tokenStore } from "./tokenStore";

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function refreshSession() {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return;

  const res = await api.post<RefreshResponse>("/auth/refresh", {
    refreshToken,
  });

  tokenStore.setAccessToken(res.data.accessToken);

  if (res.data.refreshToken) {
    tokenStore.setRefreshToken(res.data.refreshToken);
  }
}

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  tokenStore.setAccessToken(response.data.accessToken);
  tokenStore.setRefreshToken(response.data.refreshToken);
}

export async function logout() {
  const refreshToken = tokenStore.getRefreshToken();

  try {
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } finally {
    tokenStore.clear();
  }
}

export type MeResponse = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  accessToken?: string;
  refreshToken?: string;
};


export async function getMe() {
  const response = await api.get<MeResponse>("/auth/me");
  return response.data;
}
