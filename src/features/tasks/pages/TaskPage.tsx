import { useTasks } from "../hooks/useTasks";

export function TasksPage() {
  const { data, isLoading, isError } = useTasks();

  if (isLoading) {
    return <p className="text-slate-400">Cargando tareas…</p>;
  }

  if (isError) {
    return <p className="text-red-400">Error cargando tareas</p>;
  }

  if (!data || data.content.length === 0) {
    return <p className="text-slate-400">No hay tareas aún</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <ul className="space-y-3">
        {data.content.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-slate-900 rounded border border-slate-800"
          >
            <div className="font-medium">{task.title}</div>

            {task.description && (
              <div className="text-slate-400 text-sm">
                {task.description}
              </div>
            )}

            <div className="text-slate-500 text-xs mt-1">
              {task.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
