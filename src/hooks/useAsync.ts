/**
 * Generic useAsync Hook
 * Reusable hook for async data fetching with loading/error states
 */

import { useState, useEffect, type DependencyList } from "react";
import { logger } from "../utils/logger";

export interface UseAsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface UseAsyncOptions<T> {
  /** The async function to execute */
  asyncFn: () => Promise<T>;
  /** Dependencies that trigger refetch */
  dependencies: DependencyList;
  /** Initial data value */
  initialData?: T | null;
  /** Error message prefix */
  errorMessage?: string;
  /** Whether to execute immediately */
  immediate?: boolean;
}

/**
 * Generic hook for async data fetching
 *
 * @example
 * const { data, loading, error } = useAsync({
 *   asyncFn: () => dataService.getAllCandidates(),
 *   dependencies: [],
 *   errorMessage: "Failed to fetch candidates",
 * });
 */
export function useAsync<T>({
  asyncFn,
  dependencies,
  initialData = null,
  errorMessage = "Failed to fetch data",
  immediate = true,
}: UseAsyncOptions<T>): UseAsyncResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [refetchToggle, setRefetchToggle] = useState(0);

  useEffect(() => {
    if (!immediate && refetchToggle === 0) {
      return;
    }

    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = await asyncFn();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          const fetchError =
            err instanceof Error ? err : new Error(errorMessage);
          setError(fetchError);
          logger.error(errorMessage, err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, refetchToggle]);

  const refetch = () => {
    setRefetchToggle((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
}
