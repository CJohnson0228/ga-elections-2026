import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import type { GitHubRace } from '../types';

interface UseRacesResult {
  races: Record<string, GitHubRace>;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch all races from GitHub
 */
export function useRaces(): UseRacesResult {
  const [races, setRaces] = useState<Record<string, GitHubRace>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRaces() {
      try {
        setLoading(true);
        const data = await dataService.getAllRaces();

        if (isMounted) {
          setRaces(data.races);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch races'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRaces();

    return () => {
      isMounted = false;
    };
  }, []);

  return { races, loading, error };
}

interface UseRaceResult {
  race: GitHubRace | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch a specific race by ID from GitHub
 */
export function useRace(raceId: string): UseRaceResult {
  const [race, setRace] = useState<GitHubRace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRace() {
      try {
        setLoading(true);
        const data = await dataService.getRaceById(raceId);

        if (isMounted) {
          setRace(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch race'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRace();

    return () => {
      isMounted = false;
    };
  }, [raceId]);

  return { race, loading, error };
}
