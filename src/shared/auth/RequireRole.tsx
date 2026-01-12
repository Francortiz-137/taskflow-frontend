import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useMe } from "./authQuery";

type Role = "ADMIN" | "USER";

type Props = PropsWithChildren<{
  role: Role;
}>;

export function RequireRole({ role, children }: Props) {
  const { data: me, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Verificando permisos…
      </div>
    );
  }

  if (!me || me.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
