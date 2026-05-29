import { useEffect, useState } from "react";
import type { GitHubUser } from "../types";
import useDebounce from "./useDebounce";

const cache = new Map<string, GitHubUser[]>();

const useGithubSearch = (query: string) => {
  const [data, setData] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // le hook useDebounce permet d'éviter de lancer un fetch par touche
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const returnEmptyData = () => {
      setData([]);
      setLoading(false);
    };

    const setCachedDataAsResult = (q: string) => {
      setData(cache.get(q)!);
    };

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      const encodedQuery = encodeURIComponent(debouncedQuery);

      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${encodedQuery}`,
          { signal: controller.signal },
        );

        // gestions des erreurs github
        if (res.status === 403 || res.status === 429) {
          setError("rate_limit");
          return;
        }

        const json = await res.json();
        cache.set(debouncedQuery, json.items); // stocke en cache
        setData(json.items);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log(`request with ${debouncedQuery} was aborted.`);
          return;
        }
        setError("network");
      } finally {
        setLoading(false);
      }
    };

    if (!debouncedQuery.trim()) {
      returnEmptyData();
      return;
    }

    // si la requête a déjà été effectué et est dans le cache, pas besoins de refetch l'api de github.
    if (cache.has(debouncedQuery)) {
      setCachedDataAsResult(debouncedQuery);
      return;
    }

    // Abort controller pour éviter la race condition
    const controller = new AbortController();

    fetchUsers();

    return () => controller.abort();
  }, [debouncedQuery]);

  return { data, loading, error };
};

export { useGithubSearch };
