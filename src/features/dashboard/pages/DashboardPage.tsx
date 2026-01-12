import { Link } from "react-router-dom";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <p className="text-slate-400 mb-6">
        Dashboard page (placeholder)
      </p>

      <Link
        to="/login"
        className="text-indigo-400 hover:underline"
      >
        Ir a login
      </Link>
    </div>
  );
}
