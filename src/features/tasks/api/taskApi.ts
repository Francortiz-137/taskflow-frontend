import { api } from "../../../shared/http/api";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt: string;
  createdBy: number;
};

export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // page index
  size: number;
};

export async function getTasks() {
  const res = await api.get<Page<Task>>("/tasks");
  return res.data;
}
