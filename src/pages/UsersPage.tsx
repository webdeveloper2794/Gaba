import { useState, useEffect, useTransition } from "react";
import { useUsers, useSearchUsers } from "../hooks/useUsers";
import { useDebounce } from "../hooks/useDebounce";
import { SearchBar } from "../components/SearchBar";
import { UserList } from "../components/UserList";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

function describeError(error: unknown, isOnline: boolean): string {
  if (!isOnline)
    return "No internet connection. Check your network and try again.";
  const msg = error instanceof Error ? error.message : "";
  if (msg.startsWith("HTTP 5"))
    return "Server error — please try again shortly.";
  if (msg.startsWith("HTTP 4")) return "Something went wrong with the request.";
  return "Failed to load users.";
}

export const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useDebounce(searchInput, 400);
  const isSearching = debouncedSearch.length > 0;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const usersQuery = useUsers(ITEMS_PER_PAGE, skip, !isSearching);
  const searchQuery = useSearchUsers(debouncedSearch, isSearching);

  const activeQuery = isSearching ? searchQuery : usersQuery;
  const { data, isLoading, isFetching, error } = activeQuery;

  const users = data?.users ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    startTransition(() => setCurrentPage(page));
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
  };

  const showError = !!error;
  const dim = isPending || (isFetching && !isLoading);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            User Catalog
          </h1>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
            isLoading={isLoading}
            placeholder="Search users by name..."
          />
        </div>

        {!isOnline && (
          <div className="mb-4 px-4 py-3 rounded-md border border-zinc-300 bg-zinc-100 text-zinc-700 text-sm">
            You're offline. Cached data may be shown.
          </div>
        )}

        {showError && (
          <div className="mb-6 px-4 py-3 rounded-md border border-zinc-200 bg-white text-zinc-800 text-sm flex items-center justify-between gap-4">
            <span>{describeError(error, isOnline)}</span>
            <button
              onClick={() => activeQuery.refetch()}
              className="text-zinc-500 underline underline-offset-2 hover:text-zinc-900 whitespace-nowrap"
            >
              Try again
            </button>
          </div>
        )}

        <div
          className={dim ? "opacity-50 transition-opacity duration-200" : ""}
        >
          <UserList
            users={users}
            isLoading={isLoading}
            isEmpty={!isLoading && !showError && users.length === 0}
            searchQuery={isSearching ? debouncedSearch : undefined}
          />
        </div>

        {totalPages > 1 && !showError && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading || isPending}
          />
        )}

        {data && !isLoading && (
          <p
            className={`mt-6 text-center text-xs text-zinc-400${dim ? " opacity-50" : ""}`}
          >
            {isSearching
              ? `${total} result${total !== 1 ? "s" : ""} for "${debouncedSearch}"`
              : `Showing ${skip + 1}–${Math.min(skip + ITEMS_PER_PAGE, total)} of ${total}`}
          </p>
        )}
      </div>
    </div>
  );
};
