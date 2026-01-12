import { api } from "../http/api";
import { tokenStore } from "./tokenStore";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

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
  email: string;
  roles: Array<"ADMIN" | "USER">;
};

export async function getMe() {
  const response = await api.get<MeResponse>("/auth/me");
  return response.data;
}
