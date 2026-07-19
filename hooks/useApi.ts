"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api";

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

/**
 * Wraps a service-layer call for use inside Client Components, e.g.:
 *
 *   const { data, loading, error } = useApi(() => SubjectApi.getSubjects(), []);
 *
 * `deps` works like useEffect's own dependency array - the caller decides
 * what should trigger a re-fetch. `fn` is intentionally NOT auto-included in
 * that list (mirroring useEffect/useMemo's own API), so pass an inline
 * arrow function and control refetching entirely through `deps`.
 */
export function useApi<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    fn()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err instanceof ApiError
              ? err
              : new ApiError("Something went wrong.", "UNKNOWN"),
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  return { data, loading, error, refetch: () => setReloadKey((k) => k + 1) };
}
