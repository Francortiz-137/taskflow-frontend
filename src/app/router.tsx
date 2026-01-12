import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { TasksPage } from "../features/tasks/pages/TaskPage";
import { UsersPage } from "../features/admin/pages/UsersPage";
import { RequireAuth } from "../shared/auth/RequireAuth";
import { RequireRole } from "../shared/auth/RequireRole";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },

  { path: "/login", element: <LoginPage /> },

  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/tasks", element: <TasksPage /> },
      {
        path: "/admin/users",
        element: (
          <RequireRole role="ADMIN">
            <UsersPage />
          </RequireRole>
        ),
      },
    ],
  },
]);
