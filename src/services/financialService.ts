import { openFECService } from "./openFECService";
import { transparencyUSAService } from "./transparencyUSAService";
import type {
  FinancialSummaryType,
  RaceFinancialSummaryType,
} from "../types/financial";
import type { CandidateType } from "../types";

/**
 * Unified Financial Service
 *
 * Provides a single interface for fetching campaign finance data from multiple sources.
 * Automatically routes requests to the appropriate service based on race type:
 * - Federal races (US Senate, US House): Uses OpenFEC API
 * - State races (Governor, Lt. Governor, State Senate, State House): Uses TransparencyUSA scraped data
 *
 * Returns all data in a standardized FinancialSummaryType format regardless of source.
 */
class FinancialService {
  /**
   * Get financial summary for a candidate
   * Automatically determines whether to use OpenFEC (federal) or TransparencyUSA (state) based on race type
   * @param candidate - The candidate to fetch financial data for
   * @returns Financial summary if available, null otherwise
   */
  async getCandidateFinancials(
    candidate: CandidateType
  ): Promise<FinancialSummaryType | null> {
    const isFederal =
      candidate.race.startsWith("us_senate") ||
      candidate.race.startsWith("us_house");

    if (isFederal) {
      // Try to get OpenFEC data
      // You may need to add externalIds.openFEC to your candidate data
      const fecId = this.extractFECId(candidate);
      if (fecId) {
        return await openFECService.getFinancialSummary(
          fecId,
          candidate.name
        );
      }

      // If no FEC ID, try to search by name
      const results = await openFECService.searchCandidate(
        candidate.name,
        "GA",
        candidate.race.includes("senate") ? "S" : "H"
      );

      if (results.length > 0) {
        return await openFECService.getFinancialSummary(
          results[0].candidate_id,
          candidate.name
        );
      }

      return null;
    } else {
      // State race - use TransparencyUSA
      return await transparencyUSAService.getFinancialSummary(
        candidate.id,
        candidate.name
      );
    }
  }

  /**
   * Get financial data for all candidates in a race
   * @param raceFilter - The race identifier (e.g., "us_senate", "ga_governor", "ga_house_146")
   * @param candidates - Array of candidates in the race
   * @returns Summary of financial data for all candidates in the race, including unopposed status
   */
  async getRaceFinancials(
    raceFilter: string,
    candidates: CandidateType[]
  ): Promise<RaceFinancialSummaryType> {
    const candidateFinancials = await Promise.all(
      candidates.map((c) => this.getCandidateFinancials(c))
    );

    const validFinancials = candidateFinancials.filter(
      (f): f is FinancialSummaryType => f !== null
    );

    // Determine if race is unopposed
    const candidatesWithMoney = validFinancials.filter(
      (f) => f.totalRaised > 0
    );
    const isUnopposed = candidatesWithMoney.length <= 1;

    return {
      raceId: raceFilter,
      raceName: raceFilter,
      candidates: validFinancials,
      isUnopposed,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Check if a race is unopposed based on financial data
   * A race is unopposed if only one candidate has raised funds
   * @param raceFilter - The race identifier
   * @param candidates - Array of candidates in the race
   * @returns True if race is unopposed, false otherwise
   */
  async isRaceUnopposed(
    raceFilter: string,
    candidates: CandidateType[]
  ): Promise<boolean> {
    const summary = await this.getRaceFinancials(raceFilter, candidates);
    return summary.isUnopposed;
  }

  /**
   * Extract FEC ID from candidate data
   * @param _candidate - The candidate to extract FEC ID from
   * @returns The FEC ID if available, null otherwise
   * @note Future enhancement: Add externalIds.openFEC field to candidate JSON for direct FEC ID lookup
   */
  private extractFECId(_candidate: CandidateType): string | null {
    return null;
  }

  /**
   * Format currency for display with abbreviated notation
   * @param amount - The amount to format
   * @returns Formatted string (e.g., "$1.5M", "$250K", "$500")
   */
  formatCurrency(amount: number): string {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }

  /**
   * Get financial summary text for display
   * @param summary - The financial summary to format, or null if unavailable
   * @returns Formatted summary string (e.g., "Raised $1.5M | Spent $800K | Cash $700K")
   */
  getFinancialSummaryText(summary: FinancialSummaryType | null): string {
    if (!summary) {
      return "No financial data available";
    }

    if (summary.totalRaised === 0) {
      return "No funds reported";
    }

    return `Raised ${this.formatCurrency(summary.totalRaised)} | Spent ${this.formatCurrency(summary.totalSpent)} | Cash ${this.formatCurrency(summary.cashOnHand)}`;
  }

  clearCache(): void {
    openFECService.clearCache();
    transparencyUSAService.clearCache();
  }
}

export const financialService = new FinancialService();
