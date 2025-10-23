import { openFECService } from "./openFECService";
import { transparencyUSAService } from "./transparencyUSAService";
import type {
  FinancialSummary,
  RaceFinancialSummary,
} from "../types/financial";
import type { GitHubCandidate } from "../types";

/**
 * Unified Financial Service
 * Combines OpenFEC (federal) and TransparencyUSA (state) data
 */
class FinancialService {
  /**
   * Get financial summary for a candidate
   * Automatically determines whether to use OpenFEC or TransparencyUSA based on race type
   */
  async getCandidateFinancials(
    candidate: GitHubCandidate
  ): Promise<FinancialSummary | null> {
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
   */
  async getRaceFinancials(
    raceFilter: string,
    candidates: GitHubCandidate[]
  ): Promise<RaceFinancialSummary> {
    const candidateFinancials = await Promise.all(
      candidates.map((c) => this.getCandidateFinancials(c))
    );

    const validFinancials = candidateFinancials.filter(
      (f): f is FinancialSummary => f !== null
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
   */
  async isRaceUnopposed(
    raceFilter: string,
    candidates: GitHubCandidate[]
  ): Promise<boolean> {
    const summary = await this.getRaceFinancials(raceFilter, candidates);
    return summary.isUnopposed;
  }

  /**
   * Extract FEC ID from candidate data
   * This assumes you add externalIds.openFEC to your candidate JSON
   */
  private extractFECId(_candidate: GitHubCandidate): string | null {
    // TODO: Add externalIds to GitHubCandidate type and candidate JSON
    // For now, return null - you'll need to add this field
    return null;
  }

  /**
   * Format currency for display
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
   */
  getFinancialSummaryText(summary: FinancialSummary | null): string {
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
