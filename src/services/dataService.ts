import type {
  CandidatesResponseType,
  RSSFeedConfigType,
  DataMetadataType,
  CandidateType,
  RaceType,
  RacesResponseType,
  FeaturedArticlesResponseType,
  CategoriesResponseType,
} from "../types";
import { cacheManager } from "../utils/cacheManager";
import { logger } from "../utils/logger";
import { API_CONFIG, CACHE_DURATIONS, CACHE_KEYS } from "../config";

class DataService {
  /**
   * Fetch all candidates from the GitHub repo
   * @returns All candidates
   */
  async getAllCandidates(): Promise<CandidatesResponseType> {
    const indexUrl = `${API_CONFIG.GITHUB_DATA_BASE}/candidates/index.json`;
    const index = await cacheManager.fetchWithCache<
      { id: string; filename: string }[]
    >(indexUrl, CACHE_KEYS.CANDIDATES_INDEX, {
      duration: CACHE_DURATIONS.DATA,
    });

    const candidatePromises = index.map(async (entry) => {
      const candidateUrl = `${API_CONFIG.GITHUB_DATA_BASE}/candidates/${entry.filename}`;
      const candidate = await cacheManager.fetchWithCache<CandidateType>(
        candidateUrl,
        `${CACHE_KEYS.CANDIDATE_PREFIX}${entry.id}`,
        { duration: CACHE_DURATIONS.DATA }
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
  async getCandidatesByRace(raceFilter: string): Promise<CandidatesResponseType> {
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
  async getAllRaces(): Promise<RacesResponseType> {
    const indexUrl = `${API_CONFIG.GITHUB_DATA_BASE}/races/index.json`;
    const index = await cacheManager.fetchWithCache<
      { id: string; filename: string }[]
    >(indexUrl, CACHE_KEYS.RACES_INDEX, { duration: CACHE_DURATIONS.DATA });

    const racePromises = index.map(async (entry) => {
      const raceUrl = `${API_CONFIG.GITHUB_DATA_BASE}/races/${entry.filename}`;
      const race = await cacheManager.fetchWithCache<RaceType>(
        raceUrl,
        `${CACHE_KEYS.RACE_PREFIX}${entry.id}`,
        { duration: CACHE_DURATIONS.DATA }
      );
      return { key: entry.id, race };
    });

    const allRaces = await Promise.all(racePromises);

    // Convert array to Record object
    const racesRecord: Record<string, RaceType> = {};
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
  async getRaceById(raceId: string): Promise<RaceType> {
    const allData = await this.getAllRaces();
    const race = allData.races[raceId];

    if (!race) {
      throw new Error(`Race not found: ${raceId}`);
    }

    return race;
  }

  async getRSSFeeds(): Promise<RSSFeedConfigType> {
    const url = `${API_CONFIG.GITHUB_DATA_BASE}/news/rss-feeds.json`;
    return cacheManager.fetchWithCache<RSSFeedConfigType>(
      url,
      CACHE_KEYS.RSS_FEEDS,
      { duration: CACHE_DURATIONS.DATA }
    );
  }

  async getLastUpdated(): Promise<DataMetadataType> {
    const url = `${API_CONFIG.GITHUB_DATA_BASE}/metadata/last-updated.json`;
    return cacheManager.fetchWithCache<DataMetadataType>(
      url,
      CACHE_KEYS.LAST_UPDATED,
      { duration: CACHE_DURATIONS.DATA }
    );
  }

  async getFeaturedArticles(): Promise<FeaturedArticlesResponseType> {
    const url = `${API_CONFIG.GITHUB_DATA_BASE}/news/featured-articles.json`;
    return cacheManager.fetchWithCache<FeaturedArticlesResponseType>(
      url,
      CACHE_KEYS.FEATURED_ARTICLES,
      { duration: CACHE_DURATIONS.DATA }
    );
  }

  async getCategories(): Promise<CategoriesResponseType> {
    const url = `${API_CONFIG.GITHUB_DATA_BASE}/races/raceCategories.json`;
    return cacheManager.fetchWithCache<CategoriesResponseType>(
      url,
      "categories",
      { duration: CACHE_DURATIONS.DATA }
    );
  }

  clearCache(): void {
    cacheManager.clearByPrefix(CACHE_KEYS.CANDIDATE_PREFIX);
    cacheManager.clearByPrefix(CACHE_KEYS.RACE_PREFIX);
    cacheManager.remove(CACHE_KEYS.CANDIDATES_INDEX);
    cacheManager.remove(CACHE_KEYS.RACES_INDEX);
    cacheManager.remove(CACHE_KEYS.RSS_FEEDS);
    cacheManager.remove(CACHE_KEYS.FEATURED_ARTICLES);
    cacheManager.remove(CACHE_KEYS.LAST_UPDATED);
    logger.info("DataService cache cleared");
  }
}

export const dataService = new DataService();
