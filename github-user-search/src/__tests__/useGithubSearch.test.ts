import { renderHook, waitFor } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { beforeEach, describe, expect, test } from "vitest";
import { clearCache, useGithubSearch } from "../hooks/useGithubSearch";
import { server } from "../test/server";

// Reset du cache entre chaque test — le cache est un module-level Map
// donc il persiste entre les tests si on le vide pas

// Plus de fake timers du tout
describe("useGithubSearch", () => {
  beforeEach(() => {
    clearCache();
  });

  test("returns empty array when query is empty", async () => {
    const { result } = renderHook(() => useGithubSearch("", 0));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  test("returns users when query is valid", async () => {
    const { result } = renderHook(() => useGithubSearch("react", 0));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data.length).toBeGreaterThan(0);
      expect(result.current.error).toBeNull();
    });
  });

  test("sets error to rate_limit on 403", async () => {
    server.use(
      http.get("https://api.github.com/search/users", () => {
        return HttpResponse.json(
          { message: "API rate limit exceeded" },
          { status: 403 },
        );
      }),
    );

    const { result } = renderHook(() => useGithubSearch("react", 0));

    await waitFor(() => {
      expect(result.current.error).toBe("rate_limit");
      expect(result.current.data).toEqual([]);
    });
  });

  test("serves from cache on repeated query", async () => {
    let callCount = 0;

    server.use(
      http.get("https://api.github.com/search/users", () => {
        callCount++;
        return HttpResponse.json({
          total_count: 1,
          incomplete_results: false,
          items: [
            {
              id: 12345,
              login: "testuser",
              avatar_url: "https://example.com/avatar.png",
              html_url: "https://github.com/testuser",
            },
          ],
        });
      }),
    );

    const { rerender } = renderHook(({ query }) => useGithubSearch(query, 0), {
      initialProps: { query: "react" },
    });

    await waitFor(() => expect(callCount).toBe(1));

    rerender({ query: "vue" });
    await waitFor(() => expect(callCount).toBe(2));

    rerender({ query: "react" });

    // Petite pause pour laisser le useEffect tourner
    await waitFor(() => {
      expect(callCount).toBe(2); // cache hit, pas de 3ème appel
    });
  });

  test("ignores results from outdated requests (race condition)", async () => {
    server.use(
      http.get("https://api.github.com/search/users", async ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get("q");

        // Simule une première requête lente
        if (query === "rea") {
          await delay(200);

          return HttpResponse.json({
            total_count: 1,
            incomplete_results: false,
            items: [
              { id: 1, login: "old_result", avatar_url: "", html_url: "" },
            ],
          });
        }

        // Deuxième requête rapide
        return HttpResponse.json({
          total_count: 1,
          incomplete_results: false,
          items: [{ id: 2, login: "new_result", avatar_url: "", html_url: "" }],
        });
      }),
    );

    const { rerender, result } = renderHook(
      ({ query }) => useGithubSearch(query, 0),
      { initialProps: { query: "rea" } },
    );

    // Change la query avant que la première requête revienne
    rerender({ query: "react" });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // On doit voir le résultat de "react", pas de "rea"
    expect(result.current.data[0].login).toBe("new_result");
  });

  test("does not fetch if query is only whitespace", async () => {
    const { result } = renderHook(() => useGithubSearch("   ", 0));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
  });

  test("sets error to network on fetch failure", async () => {
    server.use(
      http.get("https://api.github.com/search/users", () => {
        return HttpResponse.error();
      }),
    );

    const { result } = renderHook(() => useGithubSearch("react", 0));

    await waitFor(() => {
      expect(result.current.error).toBe("network");
    });
  });

  test("clears results when query is cleared", async () => {
    const { rerender, result } = renderHook(
      ({ query }) => useGithubSearch(query, 0),
      { initialProps: { query: "react" } },
    );

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0);
    });

    rerender({ query: "" });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });
});
