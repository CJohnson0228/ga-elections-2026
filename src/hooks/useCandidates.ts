import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import type { GitHubCandidate } from "../types";

interface UseCandidatesResult {
  candidates: GitHubCandidate[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch candidates for a specific race
 * @param raceFilter - The race filter (e.g., "ga_governor", "ga_senate_sd18")
 * @returns Candidates, loading state, and error
 */
export function useCandidates(raceFilter: string): UseCandidatesResult {
  const [candidates, setCandidates] = useState<GitHubCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCandidates() {
      try {
        setLoading(true);
        setError(null);

        const data = await dataService.getCandidatesByRace(raceFilter);

        if (isMounted) {
          setCandidates(data.candidates);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch candidates"));
          console.error("Error fetching candidates:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (raceFilter) {
      fetchCandidates();
    }

    return () => {
      isMounted = false;
    };
  }, [raceFilter]);

  return { candidates, loading, error };
}

/**
 * Hook to fetch all candidates
 * @returns All candidates, loading state, and error
 */
export function useAllCandidates(): UseCandidatesResult {
  const [candidates, setCandidates] = useState<GitHubCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllCandidates() {
      try {
        setLoading(true);
        setError(null);

        const data = await dataService.getAllCandidates();

        if (isMounted) {
          setCandidates(data.candidates);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch candidates"));
          console.error("Error fetching all candidates:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAllCandidates();

    return () => {
      isMounted = false;
    };
  }, []);

  return { candidates, loading, error };
}
