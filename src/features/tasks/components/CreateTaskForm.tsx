import { useState } from "react";
import { useCreateTask } from "../hooks/useTasks";

export function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending, isError } = useCreateTask();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    mutate(
      { title, description: description || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-4 py-2 rounded"
      >
        {isPending ? "Creando..." : "Crear tarea"}
      </button>

      {isError && (
        <p className="text-red-400 text-sm">
          Error creando la tarea
        </p>
      )}
    </form>
  );
}
