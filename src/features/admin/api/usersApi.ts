import { api } from "../../../shared/http/api";

export type UserRole = "ADMIN" | "USER";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export async function getUsers() {
  const res = await api.get<User[]>("/users");
  return res.data;
}

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  const res = await api.post<User>("/users", payload);
  return res.data;
}

export async function updateUserName(id: number, name: string) {
  const res = await api.put<User>(`/users/${id}`, { name });
  return res.data;
}

export async function resetUserPassword(
  id: number,
  newPassword: string
) {
  await api.put(`/users/${id}/password`, {
    newPassword,
  });
}

