import { Link, useNavigate } from "react-router-dom";
import { logout } from "../shared/auth/authApi";
import { useMe } from "../shared/auth/authQuery";

export function Navbar() {
  const { data: me } = useMe();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="h-14 flex items-center justify-between px-6 border-b border-slate-800">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-bold">
          Taskflow
        </Link>

        <Link to="/tasks" className="text-slate-400 hover:text-slate-200">
          Tasks
        </Link>

        {me?.role === "ADMIN" && (
          <Link to="/admin/users" className="text-slate-400 hover:text-slate-200">
            Users
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {me && (
          <span className="text-slate-400 text-sm">
            {me.name}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
