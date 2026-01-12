import { useQuery } from "@tanstack/react-query";
import { getMe } from "./authApi";
import { tokenStore } from "./tokenStore";

export const meQueryKey = ["auth", "me"];

export function useMe() {
  const hasRefresh = !!tokenStore.getRefreshToken();

  return useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
    enabled: hasRefresh,
    staleTime: 60_000,
    retry: false,
  });
}
