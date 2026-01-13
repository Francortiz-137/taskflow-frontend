import { useUsers } from "../hooks/useUsers";
import { CreateUserForm } from "../components/CreateUserForm";
import { UserItem } from "../components/UserItem";

export function UsersPage() {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) {
    return <p className="text-slate-400">Cargando usuarios…</p>;
  }

  if (isError) {
    return <p className="text-red-400">Error cargando usuarios</p>;
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <CreateUserForm />
        <p className="text-slate-400">No hay usuarios</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <CreateUserForm />

      <ul className="space-y-3">
        {data.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
