import type {
  TransparencyUSAFinancialDataType,
  FinancialSummaryType,
} from "../types/financial";
import { CacheManager } from "../utils/cacheManager";
import { logger } from "../utils/logger";
import { API_CONFIG, CACHE_DURATIONS, CACHE_KEYS } from "../config";

/**
 * TransparencyUSA Service
 *
 * Note: TransparencyUSA does not have a public API. This service provides
 * a structure for integrating financial data from Georgia state races.
 *
 * Options for implementation:
 * 1. Manual data entry into JSON files in the GitHub repo
 * 2. Server-side scraping (requires backend)
 * 3. Integration with Georgia Ethics Commission API (if available)
 * 4. Use of third-party data aggregators
 *
 * For now, this service can fetch from a JSON file in your GitHub repo
 * similar to how candidates are handled.
 */

class TransparencyUSAService {
  private cache = new CacheManager({
    duration: CACHE_DURATIONS.API,
    storage: "memory",
  });

  /**
   * Fetch financial data from GitHub repo
   * You can manually maintain financial data in JSON files
   */
  private async fetchFromGitHub<T>(path: string): Promise<T> {
    const cacheKey = `${CACHE_KEYS.TRANSPARENCY_PREFIX}${path}`;

    // Check cache
    const cached = this.cache.get<T>(cacheKey, { storage: "memory" });
    if (cached !== null) {
      return cached;
    }

    const url = `${API_CONFIG.GITHUB_DATA_BASE}${path}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const data: T = await response.json();
    this.cache.set(cacheKey, data, { storage: "memory" });

    return data;
  }

  /**
   * Parse currency string to number
   */
  private parseCurrency(amount: string): number {
    if (!amount) return 0;
    // Remove $, commas, and parse as float
    const cleaned = amount.replace(/[$,]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  /**
   * Get financial summary for a state candidate
   * Fetches from the unified state-financials.json file
   */
  async getFinancialSummary(
    candidateId: string,
    candidateName: string
  ): Promise<FinancialSummaryType | null> {
    try {
      const data = await this.fetchFromGitHub<{
        lastUpdated: string;
        candidates: Record<string, {
          name: string;
          race: string;
          party: string;
          contributions: string;
          loans: string;
          expenditures: string;
          status: string;
        }>;
      }>(`/financials/state-financials.json`);

      // Try with the original ID first, then try converting hyphens to underscores
      let candidate = data.candidates[candidateId];
      if (!candidate) {
        const alternateId = candidateId.replace(/-/g, "_");
        candidate = data.candidates[alternateId];
      }

      if (!candidate) {
        logger.warn(`No financial data found for ${candidateId}`);
        return null;
      }

      const contributions = this.parseCurrency(candidate.contributions);
      const loans = this.parseCurrency(candidate.loans);
      const expenditures = this.parseCurrency(candidate.expenditures);

      // Calculate cash on hand: contributions + loans - expenditures
      const cashOnHand = contributions + loans - expenditures;

      return {
        candidateId,
        candidateName,
        totalRaised: contributions + loans,
        totalSpent: expenditures,
        cashOnHand: Math.max(0, cashOnHand), // Ensure non-negative
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        source: "transparencyUSA",
        filingPeriod: "Latest Report",
      };
    } catch (error) {
      logger.warn(`No financial data found for ${candidateId}`, error);
      return null;
    }
  }

  /**
   * Get all financial data for a specific race
   * Expects a JSON file at /financial/races/{raceFilter}.json
   */
  async getRaceFinancials(
    raceFilter: string
  ): Promise<FinancialSummaryType[]> {
    try {
      const data = await this.fetchFromGitHub<{
        candidates: TransparencyUSAFinancialDataType[];
      }>(`/financial/races/${raceFilter}.json`);

      return data.candidates.map((candidate) => ({
        candidateId: candidate.candidateName.toLowerCase().replace(/\s+/g, "_"),
        candidateName: candidate.candidateName,
        totalRaised: candidate.totalContributions || 0,
        totalSpent: candidate.totalExpenditures || 0,
        cashOnHand: candidate.cashOnHand || 0,
        lastUpdated: candidate.lastReportDate || new Date().toISOString(),
        source: "transparencyUSA" as const,
        filingPeriod: candidate.reportingPeriod,
      }));
    } catch (error) {
      logger.warn(`No race financial data found for ${raceFilter}`, error);
      return [];
    }
  }

  /**
   * Check if a race is unopposed based on financial data
   */
  async isRaceUnopposed(
    _raceFilter: string,
    candidateIds: string[]
  ): Promise<boolean> {
    const summaries = await Promise.all(
      candidateIds.map((id) =>
        this.getFinancialSummary(id, "")
      )
    );

    // Count candidates who have filed (have financial data)
    const filedCandidates = summaries.filter((s) => s !== null).length;

    return filedCandidates <= 1;
  }

  /**
   * Manually scrape TransparencyUSA (requires CORS proxy or backend)
   * This is a placeholder - implement based on your infrastructure
   */
  async scrapeCandidate(_candidateName: string, _office: string): Promise<TransparencyUSAFinancialDataType | null> {
    // TODO: Implement server-side scraping or use a CORS proxy
    logger.warn("Direct scraping not implemented. Please use GitHub JSON files or implement server-side scraping.");
    return null;
  }

  clearCache(): void {
    this.cache.clearByPrefix(CACHE_KEYS.TRANSPARENCY_PREFIX, { storage: "memory" });
    logger.info("TransparencyUSA cache cleared");
  }
}

export const transparencyUSAService = new TransparencyUSAService();

/**
 * Example JSON structure for /financial/{candidateId}.json:
 *
 * {
 *   "candidateName": "John Doe",
 *   "office": "Governor",
 *   "totalContributions": 1500000,
 *   "totalExpenditures": 800000,
 *   "cashOnHand": 700000,
 *   "lastReportDate": "2025-09-30",
 *   "reportingPeriod": "Q3 2025"
 * }
 */
