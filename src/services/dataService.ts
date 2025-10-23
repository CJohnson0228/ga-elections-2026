import type {
  CandidateData,
  RSSFeedConfig,
  LastUpdated,
  GitHubCandidate,
  GitHubRace,
  RacesData,
} from "../types";

const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/CJohnson0228/georgia-2026-election-data/main";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class DataService {
  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    // Check cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const cacheItem: CacheItem<T> = JSON.parse(cached);
      const now = Date.now();
      if (now - cacheItem.timestamp < CACHE_DURATION) {
        console.log(`Cache hit for ${cacheKey}`);
        return cacheItem.data;
      }
    }

    // Fetch fresh data
    console.log(`Fetching fresh data for ${cacheKey}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const data: T = await response.json();

    // Cache the result
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheItem));

    return data;
  }

  /**
   * Fetch all candidates from the GitHub repo
   * @returns All candidates
   */
  async getAllCandidates(): Promise<CandidateData> {
    const indexUrl = `${GITHUB_BASE_URL}/candidates/index.json`;
    const index = await this.fetchWithCache<{ id: string; filename: string }[]>(
      indexUrl,
      "candidates-index"
    );

    const candidatePromises = index.map(async (entry) => {
      const candidateUrl = `${GITHUB_BASE_URL}/candidates/${entry.filename}`;
      const candidate = await this.fetchWithCache<GitHubCandidate>(
        candidateUrl,
        `candidate-${entry.id}`
      );
      return candidate;
    });

    const allCandidates = await Promise.all(candidatePromises);

    return {
      candidates: allCandidates,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Fetch candidates for a specific race using raceFilter
   * @param raceFilter - The race filter (e.g., "ga_governor", "ga_senate_sd18")
   * @returns Filtered candidates
   */
  async getCandidatesByRace(raceFilter: string): Promise<CandidateData> {
    const allData = await this.getAllCandidates();

    const filtered = allData.candidates.filter(
      (candidate) => candidate.race === raceFilter
    );

    return {
      candidates: filtered,
      lastUpdated: allData.lastUpdated,
    };
  }

  /**
   * Fetch all races from the GitHub repo
   * @returns All races as a Record object
   */
  async getAllRaces(): Promise<RacesData> {
    const indexUrl = `${GITHUB_BASE_URL}/races/index.json`;
    const index = await this.fetchWithCache<{ id: string; filename: string }[]>(
      indexUrl,
      "races-index"
    );

    const racePromises = index.map(async (entry) => {
      const raceUrl = `${GITHUB_BASE_URL}/races/${entry.filename}`;
      const race = await this.fetchWithCache<GitHubRace>(
        raceUrl,
        `race-${entry.id}`
      );
      return { key: entry.id, race };
    });

    const allRaces = await Promise.all(racePromises);

    // Convert array to Record object
    const racesRecord: Record<string, GitHubRace> = {};
    allRaces.forEach(({ key, race }) => {
      racesRecord[key] = race;
    });

    return {
      races: racesRecord,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Fetch a specific race by ID
   * @param raceId - The race ID (e.g., "governor", "ga-senate-sd18")
   * @returns The race data
   */
  async getRaceById(raceId: string): Promise<GitHubRace> {
    const allData = await this.getAllRaces();
    const race = allData.races[raceId];

    if (!race) {
      throw new Error(`Race not found: ${raceId}`);
    }

    return race;
  }

  async getRSSFeeds(): Promise<RSSFeedConfig> {
    const url = `${GITHUB_BASE_URL}/news/rss-feeds.json`;
    return this.fetchWithCache<RSSFeedConfig>(url, "rss-feeds");
  }

  async getLastUpdated(): Promise<LastUpdated> {
    const url = `${GITHUB_BASE_URL}/metadata/last-updated.json`;
    return this.fetchWithCache<LastUpdated>(url, "last-updated");
  }

  async getFeaturedArticles(): Promise<any> {
    const url = `${GITHUB_BASE_URL}/news/featured-articles.json`;
    return this.fetchWithCache(url, "featured-articles");
  }

  clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (
        key.startsWith("candidate-") ||
        key === "candidates-index" ||
        key.startsWith("race-") ||
        key === "races-index"
      ) {
        localStorage.removeItem(key);
      }
    });
    console.log("Cache cleared");
  }
}

export const dataService = new DataService();
