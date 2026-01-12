import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { useSessionBootstrap } from "./shared/auth/useSessionBootstrap";

export function App() {
  const ready = useSessionBootstrap();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Inicializando sesión…
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
