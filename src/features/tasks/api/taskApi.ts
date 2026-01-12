import { api } from "../../../shared/http/api";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "DONE"
  | "CANCELLED";


export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
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

export type CreateTaskRequest = {
  title: string;
  description?: string;
};

export async function getTasks() {
  const res = await api.get<Page<Task>>("/tasks");
  return res.data;
}

export async function createTask(payload: CreateTaskRequest) {
  const res = await api.post<Task>("/tasks", payload);
  return res.data;
}

export async function updateTaskStatus(
  id: number,
  status: TaskStatus
) {
  const res = await api.put<Task>(`/tasks/${id}/status`, { status });
  return res.data;
}

export async function deleteTask(id: number) {
  await api.delete(`/tasks/${id}`);
}