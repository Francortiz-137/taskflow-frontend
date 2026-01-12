import { useNavigate } from "react-router-dom";
import { logout } from "../../../shared/auth/authApi";
import { useMe } from "../../../shared/auth/authQuery";

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: me } = useMe();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        {me && (
          <p className="text-slate-400 mt-1">
            Bienvenido, <span className="text-slate-100 font-medium">{me.name}</span>
            <br />
            <span className="text-slate-100 font-medium">{me.email}</span>
          </p>
        )}
      </header>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
