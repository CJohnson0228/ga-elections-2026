import type {
  TransparencyUSAFinancialData,
  FinancialSummary,
} from "../types/financial";

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

const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/CJohnson0228/georgia-2026-election-data/main";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class TransparencyUSAService {
  private cache = new Map<string, CacheItem<any>>();

  /**
   * Fetch financial data from GitHub repo
   * You can manually maintain financial data in JSON files
   */
  private async fetchFromGitHub<T>(path: string): Promise<T> {
    const cacheKey = path;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const url = `${GITHUB_BASE_URL}${path}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  }

  /**
   * Get financial summary for a state candidate
   * Expects a JSON file at /financial/{candidateId}.json
   */
  async getFinancialSummary(
    candidateId: string,
    candidateName: string
  ): Promise<FinancialSummary | null> {
    try {
      const data = await this.fetchFromGitHub<TransparencyUSAFinancialData>(
        `/financial/${candidateId}.json`
      );

      return {
        candidateId,
        candidateName,
        totalRaised: data.totalContributions || 0,
        totalSpent: data.totalExpenditures || 0,
        cashOnHand: data.cashOnHand || 0,
        lastUpdated: data.lastReportDate || new Date().toISOString(),
        source: "transparencyUSA",
        filingPeriod: data.reportingPeriod,
      };
    } catch (error) {
      console.warn(
        `No financial data found for ${candidateId}:`,
        error
      );
      return null;
    }
  }

  /**
   * Get all financial data for a specific race
   * Expects a JSON file at /financial/races/{raceFilter}.json
   */
  async getRaceFinancials(
    raceFilter: string
  ): Promise<FinancialSummary[]> {
    try {
      const data = await this.fetchFromGitHub<{
        candidates: TransparencyUSAFinancialData[];
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
      console.warn(`No financial data found for race ${raceFilter}:`, error);
      return [];
    }
  }

  /**
   * Check if a race is unopposed based on financial filings
   * A race is unopposed if only one candidate has filed financial reports
   */
  async isRaceUnopposed(candidateIds: string[]): Promise<boolean> {
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
  async scrapeCandidate(_candidateName: string, _office: string): Promise<TransparencyUSAFinancialData | null> {
    // TODO: Implement server-side scraping or use a CORS proxy
    console.warn("Direct scraping not implemented. Please use GitHub JSON files or implement server-side scraping.");
    return null;
  }

  clearCache(): void {
    this.cache.clear();
    console.log("TransparencyUSA cache cleared");
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
