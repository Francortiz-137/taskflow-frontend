import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../api/taskApi";

import type {Task,
  TaskStatus,
  Page} from "../api/taskApi";

const TASKS_QUERY_KEY = ["tasks"];

export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      updateTaskStatus(id, status),

    // OPTIMISTIC UI
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });

      const previous = queryClient.getQueryData<Page<Task>>(TASKS_QUERY_KEY);

      if (previous) {
        queryClient.setQueryData<Page<Task>>(TASKS_QUERY_KEY, {
          ...previous,
          content: previous.content.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        });
      }

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}
