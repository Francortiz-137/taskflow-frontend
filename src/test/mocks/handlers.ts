import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/auth/me", () => {
    return HttpResponse.json({
      id: 1,
      name: "Test User",
      email: "test@taskflow.dev",
      role: "USER",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    });
  }),

  http.get("/api/tasks", () => {
    return HttpResponse.json({
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 20,
    });
  }),
];
