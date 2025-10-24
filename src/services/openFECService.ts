import type {
  OpenFECCandidateType,
  OpenFECFinancialDataType,
  FinancialSummaryType,
} from "../types/financial";
import { CacheManager } from "../utils/cacheManager";
import { logger } from "../utils/logger";
import { API_CONFIG, CACHE_DURATIONS, CACHE_KEYS } from "../config";

const API_KEY = import.meta.env.VITE_OPENFEC_API_KEY;

class OpenFECService {
  private cache = new CacheManager({
    duration: CACHE_DURATIONS.API,
    storage: "memory",
  });

  private async fetchWithCache<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<T> {
    const cacheKey = `${CACHE_KEYS.OPENFEC_PREFIX}${endpoint}?${JSON.stringify(params)}`;

    // Check cache
    const cached = this.cache.get<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Build URL with params
    const urlParams = new URLSearchParams({
      api_key: API_KEY,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    const url = `${API_CONFIG.OPENFEC_BASE}${endpoint}?${urlParams}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`OpenFEC API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, data);

      return data;
    } catch (error) {
      logger.error("Error fetching from OpenFEC", error);
      throw error;
    }
  }

  /**
   * Search for a candidate by name and state
   */
  async searchCandidate(
    name: string,
    state: string = "GA",
    office?: "H" | "S"
  ): Promise<OpenFECCandidateType[]> {
    const params: Record<string, string | number> = {
      state,
      per_page: 20,
    };

    if (name) {
      params.name = name;
    }

    if (office) {
      params.office = office;
    }

    const response = await this.fetchWithCache<{ results: OpenFECCandidateType[] }>(
      "/candidates/search/",
      params
    );

    return response.results || [];
  }

  /**
   * Get candidate by FEC ID
   */
  async getCandidateById(candidateId: string): Promise<OpenFECCandidateType | null> {
    try {
      const response = await this.fetchWithCache<{
        results: OpenFECCandidateType[];
      }>(`/candidate/${candidateId}/`, {});

      return response.results?.[0] || null;
    } catch (error) {
      logger.error(`Error fetching candidate ${candidateId}`, error);
      return null;
    }
  }

  /**
   * Get financial totals for a candidate
   */
  async getCandidateFinancials(
    candidateId: string,
    cycle: number = 2026
  ): Promise<OpenFECFinancialDataType | null> {
    try {
      const response = await this.fetchWithCache<{
        results: OpenFECFinancialDataType[];
      }>(`/candidate/${candidateId}/totals/`, {
        cycle,
        sort_hide_null: "false",
      });

      return response.results?.[0] || null;
    } catch (error) {
      logger.error(`Error fetching financials for ${candidateId}`, error);
      return null;
    }
  }

  /**
   * Get financial summary for a candidate
   */
  async getFinancialSummary(
    candidateId: string,
    candidateName: string,
    cycle: number = 2026
  ): Promise<FinancialSummaryType | null> {
    const financials = await this.getCandidateFinancials(candidateId, cycle);

    if (!financials) {
      return null;
    }

    return {
      candidateId,
      candidateName,
      totalRaised: financials.receipts || 0,
      totalSpent: financials.disbursements || 0,
      cashOnHand: financials.cash_on_hand_end_period || 0,
      lastUpdated: financials.coverage_end_date || new Date().toISOString(),
      source: "openFEC",
      cycleYear: cycle,
      filingPeriod: financials.coverage_end_date,
    };
  }

  /**
   * Get candidates running for US House in a specific district
   */
  async getHouseCandidates(
    state: string = "GA",
    district: string,
    cycle: number = 2026
  ): Promise<OpenFECCandidateType[]> {
    const response = await this.fetchWithCache<{
      results: OpenFECCandidateType[];
    }>("/candidates/search/", {
      state,
      district,
      office: "H",
      cycle,
      per_page: 50,
    });

    return response.results || [];
  }

  /**
   * Get candidates running for US Senate
   */
  async getSenateCandidates(
    state: string = "GA",
    cycle: number = 2026
  ): Promise<OpenFECCandidateType[]> {
    const response = await this.fetchWithCache<{
      results: OpenFECCandidateType[];
    }>("/candidates/search/", {
      state,
      office: "S",
      cycle,
      per_page: 50,
    });

    return response.results || [];
  }

  /**
   * Check if a race is unopposed based on financial data
   * A race is considered unopposed if only one candidate has raised money
   */
  async isRaceUnopposed(
    candidateIds: string[],
    cycle: number = 2026
  ): Promise<boolean> {
    const summaries = await Promise.all(
      candidateIds.map((id) => this.getCandidateFinancials(id, cycle))
    );

    // Count candidates who have raised money (receipts > 0)
    const activeCandidates = summaries.filter(
      (s) => s && s.receipts > 0
    ).length;

    return activeCandidates <= 1;
  }

  clearCache(): void {
    this.cache.clearByPrefix(CACHE_KEYS.OPENFEC_PREFIX, { storage: "memory" });
    logger.info("OpenFEC cache cleared");
  }
}

export const openFECService = new OpenFECService();
