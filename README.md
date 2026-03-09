# User Catalog

A user directory app built on [dummyjson.com](https://dummyjson.com/users). Browse users paginated or search by name.

## Stack

- **React 19** — UI, `useTransition` for page changes
- **TypeScript 5.9** — strict mode
- **Vite 7** — build tool
- **TanStack Query 5** — data fetching, caching, request cancellation
- **TailwindCSS 3.4** — styling

## Project structure

```
src/
├── components/
│   ├── UserList.tsx       # Table with skeleton rows and empty state
│   ├── SearchBar.tsx      # Search input
│   └── Pagination.tsx     # Page controls
├── hooks/
│   ├── useUsers.ts        # TanStack Query wrappers
│   └── useDebounce.ts     # Debounce hook
├── services/
│   └── api.ts             # Fetch calls
├── types/
│   └── user.ts            # TypeScript interfaces
├── pages/
│   └── UsersPage.tsx      # Main page
└── App.tsx                # QueryClientProvider setup
```

## Running it

```bash
pnpm install
pnpm dev
pnpm build
```
