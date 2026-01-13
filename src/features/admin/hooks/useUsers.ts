import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  createUser,
  updateUserName,
} from "../api/usersApi";
import type { User } from "../api/usersApi";

const USERS_QUERY_KEY = ["users"];

export function useUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getUsers,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

export function useUpdateUserName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateUserName(id, name),

    // Optimistic update
    onMutate: async ({ id, name }) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      const previous = queryClient.getQueryData<User[]>(USERS_QUERY_KEY);

      if (previous) {
        queryClient.setQueryData<User[]>(
          USERS_QUERY_KEY,
          previous.map((u) =>
            u.id === id ? { ...u, name } : u
          )
        );
      }

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(USERS_QUERY_KEY, ctx.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}