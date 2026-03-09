import type { User } from "../types/user";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  isEmpty: boolean;
  searchQuery?: string;
}

const SkeletonRow = () => (
  <tr className="border-b border-zinc-100">
    <td className="px-6 py-4">
      <div className="h-9 w-9 bg-zinc-200 rounded-full animate-pulse" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-zinc-200 rounded w-20 animate-pulse" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-zinc-200 rounded w-20 animate-pulse" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-zinc-200 rounded w-36 animate-pulse" />
    </td>
    <td className="px-6 py-4 hidden md:table-cell">
      <div className="h-4 bg-zinc-200 rounded w-28 animate-pulse" />
    </td>
    <td className="px-6 py-4 hidden lg:table-cell">
      <div className="h-4 bg-zinc-200 rounded w-24 animate-pulse" />
    </td>
    <td className="px-6 py-4 hidden xl:table-cell">
      <div className="h-4 bg-zinc-200 rounded w-10 animate-pulse" />
    </td>
  </tr>
);

export const UserList = ({
  users,
  isLoading,
  isEmpty,
  searchQuery,
}: UserListProps) => {
  if (isEmpty) {
    return (
      <div className="flex items-center justify-center min-h-80 rounded-lg border border-zinc-200 bg-white">
        <div className="text-center px-6">
          <svg
            className="mx-auto h-10 w-10 text-zinc-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <p className="mt-3 text-sm font-medium text-zinc-700">
            {searchQuery ? `No results for "${searchQuery}"` : "No users found"}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {searchQuery
              ? "Try a different name or clear the search"
              : "No data available"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <table className="min-w-full">
        <thead>
          <tr className="border-b-2 border-zinc-200 bg-zinc-50">
            {["Avatar", "First Name", "Last Name", "Email"].map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide hidden md:table-cell">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide hidden lg:table-cell">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide hidden xl:table-cell">
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            : users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex h-9 w-9 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 hidden md:table-cell">
                    {user.phone || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 hidden lg:table-cell">
                    {user.company?.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 hidden xl:table-cell">
                    {user.age ?? "—"}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
