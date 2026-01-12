import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useMe } from "./authQuery";

export function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const { data: me, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Cargando sesión…
      </div>
    );
  }

  if (isError || !me) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
