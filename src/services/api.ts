import type { UserResponse, SearchParams } from "../types/user";

const BASE_URL = "https://dummyjson.com";

export const api = {
  async fetchUsers(
    limit: number,
    skip: number,
    signal?: AbortSignal,
  ): Promise<UserResponse> {
    const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`, {
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async searchUsers(
    params: SearchParams,
    signal?: AbortSignal,
  ): Promise<UserResponse> {
    const qs = new URLSearchParams({ q: params.q });
    if (params.limit) qs.set("limit", String(params.limit));
    if (params.skip) qs.set("skip", String(params.skip));
    const res = await fetch(`${BASE_URL}/users/search?${qs}`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
};
