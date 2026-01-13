import { useState } from "react";
import { useCreateUser } from "../hooks/useUsers";
import type { UserRole } from "../api/usersApi";

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("USER");

  const { mutate, isPending, isError } = useCreateUser();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(
      { name, email, password, role },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setPassword("");
          setRole("USER");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2"
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button
        disabled={isPending}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-4 py-2 rounded"
      >
        {isPending ? "Creando..." : "Crear usuario"}
      </button>

      {isError && (
        <p className="text-red-400 text-sm">Error creando usuario</p>
      )}
    </form>
  );
}
