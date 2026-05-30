# GitHub User Search

## Getting started

```bash //
pnpm install
pnpm dev
pnpm test
```

## Features

- Real-time search as you type (debounced 500ms)
- GitHub users displayed in a responsive grid
- Per-card and select-all checkbox selection
- Duplicate and delete selected items
- Cache: repeated queries served instantly without re-fetching
- Rate limit handling with user-friendly error message
- Empty states: no results / initial state
- Bonus: Edit mode

## Architecture & technical decisions

The most interesting challenge here was handling GitHub API's rate limit of 10 requests per minute.
I used it as an opportunity to build `useGithubSearch`, a custom hook inspired by useSWR and TanStack Query,
but written from scratch without any dependency.

It solves three classic problems that come up when using `useEffect` + `fetch` in React:

- **Race conditions** — handled with `AbortController`. When the user types quickly,
  outdated requests are cancelled so stale results never overwrite fresh ones.
- **Redundant API calls** — handled with a `Map`-based cache with a max size of 50 entries (LRU).
  Repeated queries are served instantly without hitting the API again.
- **Too many requests per keystroke** — handled with a custom `useDebounce` hook (500ms delay),
  so the API is only called when the user stops typing.

I also extracted the toolbar logic (selection, duplicate, delete) into a dedicated `useUserList` hook.
It receives the search results as input and resets automatically when the source changes,
keeping `App.tsx` clean and each piece of logic easy to find and maintain.

For the edit mode (bonus), I chose props drilling over React Context,
since this is a small SPA with 3-4 levels of components at most.
Context would have added complexity without any noticeable benefit.
The React team themselves recommend against over-abstracting for cases like this.

Finally, I kept a structured project architecture even on a small exercise —
separating hooks, components, types and test utilities because it reflects how I work
on real projects and helps avoid technical debt from day one.

## Tests

The project has 55 tests across 7 test files, covering hooks and components.

**Tools:** Vitest + React Testing Library + MSW (Mock Service Worker) for API mocking.

**Hooks**

- `useGithubSearch` — fetch lifecycle, cache hit, race condition, rate limit (403), network error, empty query, results reset on query change
- `useUserList` — selection toggle, select all / deselect all, duplicate with unique IDs, delete

**Components**

- `UserCard` — rendering, checkbox state, link URL, selected class, callback
- `UserGrid` — correct number of cards, empty message, selection passed correctly
- `Toolbar` — counter display, duplicate/delete visibility, indeterminate checkbox state, callbacks
- `SearchInput` — rendering, controlled value, onChange callback

## Possible improvements

These are not things I didn't have time for, but rather enhancements
that would make sense in a production context:

- **GitHub token** — adding a `VITE_GITHUB_TOKEN` env variable would raise
  the rate limit from 10 to 60 requests/minute
- **Pagination** — the GitHub API returns up to 30 results by default,
  adding a "load more" button would improve the experience on broad queries
- **Accessibility** — adding `aria-live` to announce new search results
  to screen readers
- **Cache persistence** — storing the cache in `sessionStorage`
  to survive page refreshes
