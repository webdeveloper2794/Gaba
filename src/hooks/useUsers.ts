import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { UserResponse } from "../types/user";

export const useUsers = (limit: number, skip: number, enabled = true) =>
  useQuery<UserResponse>({
    queryKey: ["users", limit, skip],
    queryFn: ({ signal }) => api.fetchUsers(limit, skip, signal),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

export const useSearchUsers = (
  query: string,
  enabled = true,
  limit?: number,
  skip?: number,
) =>
  useQuery<UserResponse>({
    queryKey: ["searchUsers", query, limit, skip],
    queryFn: ({ signal }) => api.searchUsers({ q: query, limit, skip }, signal),
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
