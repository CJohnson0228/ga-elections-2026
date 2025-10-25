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
 * Fetches Georgia state-level campaign finance data from the GitHub repository.
 * Data is collected via a Python scraper running in GitHub Actions (ga-elections-26-financial-scrapper)
 * that scrapes TransparencyUSA, then outputs to state-financials.json in the
 * georgia-2026-election-data repository.
 *
 * This service fetches the pre-scraped data from state-financials.json and
 * transforms it into the standardized FinancialSummaryType format.
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
   * Fetches from the unified state-financials.json file in the GitHub repository
   * Handles ID format variations (hyphens vs underscores) automatically
   * @param candidateId - The candidate's ID (e.g., "keisha-l-bottoms")
   * @param candidateName - The candidate's name
   * @returns Standardized financial summary, or null if unavailable
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
   * @param raceFilter - The race identifier (e.g., "ga_governor", "ga_senate_20")
   * @returns Array of financial summaries for all candidates in the race
   * @note Expects a JSON file at /financial/races/{raceFilter}.json
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
   * A race is unopposed if only one or fewer candidates have filed financial reports
   * @param _raceFilter - The race identifier (currently unused)
   * @param candidateIds - Array of candidate IDs to check
   * @returns True if race is unopposed (≤1 candidate with data), false otherwise
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
   * Clear cached TransparencyUSA data
   */
  clearCache(): void {
    this.cache.clearByPrefix(CACHE_KEYS.TRANSPARENCY_PREFIX, { storage: "memory" });
    logger.info("TransparencyUSA cache cleared");
  }
}

export const transparencyUSAService = new TransparencyUSAService();
