import type {
  OpenFECCandidate,
  OpenFECFinancialData,
  FinancialSummary,
} from "../types/financial";

const API_KEY = import.meta.env.VITE_OPENFEC_API_KEY;
const BASE_URL = "https://api.open.fec.gov/v1";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class OpenFECService {
  private cache = new Map<string, CacheItem<any>>();

  private async fetchWithCache<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<T> {
    const cacheKey = `${endpoint}?${JSON.stringify(params)}`;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for ${cacheKey}`);
      return cached.data;
    }

    // Build URL with params
    const urlParams = new URLSearchParams({
      api_key: API_KEY,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    const url = `${BASE_URL}${endpoint}?${urlParams}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`OpenFEC API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: Date.now() });

      return data;
    } catch (error) {
      console.error("Error fetching from OpenFEC:", error);
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
  ): Promise<OpenFECCandidate[]> {
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

    const response = await this.fetchWithCache<{ results: OpenFECCandidate[] }>(
      "/candidates/search/",
      params
    );

    return response.results || [];
  }

  /**
   * Get candidate by FEC ID
   */
  async getCandidateById(candidateId: string): Promise<OpenFECCandidate | null> {
    try {
      const response = await this.fetchWithCache<{
        results: OpenFECCandidate[];
      }>(`/candidate/${candidateId}/`, {});

      return response.results?.[0] || null;
    } catch (error) {
      console.error(`Error fetching candidate ${candidateId}:`, error);
      return null;
    }
  }

  /**
   * Get financial totals for a candidate
   */
  async getCandidateFinancials(
    candidateId: string,
    cycle: number = 2026
  ): Promise<OpenFECFinancialData | null> {
    try {
      const response = await this.fetchWithCache<{
        results: OpenFECFinancialData[];
      }>(`/candidate/${candidateId}/totals/`, {
        cycle,
        sort_hide_null: "false",
      });

      return response.results?.[0] || null;
    } catch (error) {
      console.error(
        `Error fetching financials for ${candidateId}:`,
        error
      );
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
  ): Promise<FinancialSummary | null> {
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
  ): Promise<OpenFECCandidate[]> {
    const response = await this.fetchWithCache<{
      results: OpenFECCandidate[];
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
  ): Promise<OpenFECCandidate[]> {
    const response = await this.fetchWithCache<{
      results: OpenFECCandidate[];
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
    this.cache.clear();
    console.log("OpenFEC cache cleared");
  }
}

export const openFECService = new OpenFECService();
