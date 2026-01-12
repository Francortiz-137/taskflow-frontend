import type { Task, TaskStatus } from "../api/taskApi";
import { useUpdateTaskStatus } from "../hooks/useTasks";

const allowedTransitions: Record<TaskStatus, TaskStatus[]> = {
  TODO: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["DONE", "CANCELLED"],
  DONE: [],
  CANCELLED: [],
};

export function TaskItem({ task }: { task: Task }) {
  const { mutate, isPending } = useUpdateTaskStatus();

  const transitions = allowedTransitions[task.status];

  return (
    <li className="p-4 bg-slate-900 rounded border border-slate-800">
      <div className="font-medium">{task.title}</div>

      {task.description && (
        <div className="text-slate-400 text-sm">
          {task.description}
        </div>
      )}

      <div className="text-slate-500 text-xs mt-1 mb-2">
        Estado: {task.status}
      </div>

      {transitions.length > 0 ? (
        <div className="flex gap-2">
          {transitions.map((next) => (
            <button
              key={next}
              onClick={() =>
                mutate({ id: task.id, status: next })
              }
              disabled={isPending}
              className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
            >
              {next}
            </button>
          ))}
        </div>
      ) : (
        <span className="text-xs text-slate-500">
          Estado final
        </span>
      )}
    </li>
  );
}

