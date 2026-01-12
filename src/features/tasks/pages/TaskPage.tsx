import { useTasks } from "../hooks/useTasks";
import { CreateTaskForm } from "../components/CreateTaskForm";
import { TaskItem } from "../components/TaskItem";

export function TasksPage() {
  const { data, isLoading, isError } = useTasks();

  if (isLoading) {
    return <p className="text-slate-400">Cargando tareas…</p>;
  }

  if (isError) {
    return <p className="text-red-400">Error cargando tareas</p>;
  }

  if (!data || data.content.length === 0) {
    return (
      <div>
        <CreateTaskForm />
        <p className="text-slate-400">No hay tareas aún</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <CreateTaskForm />

      <ul className="space-y-3">
        {data.content.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
