import { useState } from "react";
import type { User } from "../api/usersApi";
import { useUpdateUserName } from "../hooks/useUsers";

export function UserItem({ user }: { user: User }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const { mutate, isPending } = useUpdateUserName();

  function handleSave() {
    if (!name.trim() || name === user.name) {
      setEditing(false);
      setName(user.name);
      return;
    }

    mutate(
      { id: user.id, name },
      {
        onSuccess: () => setEditing(false),
      }
    );
  }

  return (
    <li className="p-4 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
      <div className="flex-1">
        {editing ? (
          <input
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
          />
        ) : (
          <>
            <div className="font-medium">{user.name}</div>
            <div className="text-slate-400 text-sm">{user.email}</div>
            <div className="text-slate-500 text-xs">
              Rol: {user.role}
            </div>
          </>
        )}
      </div>

      <div className="ml-4 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="text-sm text-indigo-400 hover:underline disabled:opacity-50"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setName(user.name);
              }}
              className="text-sm text-slate-400 hover:underline"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-indigo-400 hover:underline"
          >
            Editar
          </button>
        )}
      </div>
    </li>
  );
}
