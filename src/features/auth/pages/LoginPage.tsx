import { useState } from "react";
import { login } from "../../../shared/auth/authApi";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    try {
      await login("admin@taskflow.dev", "admin123"); // usa un user real
      navigate("/dashboard");
    } catch (e) {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-slate-900 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-2 rounded"
        >
          {loading ? "Ingresando..." : "Login"}
        </button>
      </div>
    </div>
  );
}
