/**
 * Financial data types for OpenFEC and TransparencyUSA
 * Supports both federal (OpenFEC) and state (TransparencyUSA) campaign finance data
 */

/**
 * Standardized financial summary
 * Common format used across both OpenFEC and TransparencyUSA sources
 */
export interface FinancialSummaryType {
  candidateId: string;
  candidateName: string;
  totalRaised: number;
  totalSpent: number;
  cashOnHand: number;
  lastUpdated: string;
  source: "openFEC" | "transparencyUSA";
  cycleYear?: number;
  filingPeriod?: string;
}

/**
 * OpenFEC candidate data structure
 * Raw candidate information from the Federal Election Commission API
 */
export interface OpenFECCandidateType {
  candidate_id: string;
  name: string;
  party: string;
  office: string;
  state: string;
  district?: string;
  incumbent_challenge?: string;
  cycles: number[];
}

/**
 * OpenFEC financial data structure
 * Raw financial totals from the Federal Election Commission API
 */
export interface OpenFECFinancialDataType {
  candidate_id: string;
  cycle: number;
  receipts: number;
  disbursements: number;
  cash_on_hand_end_period: number;
  coverage_end_date: string;
  last_updated: string;
}

/**
 * TransparencyUSA financial data structure
 * Financial data scraped from Georgia state campaign finance records
 */
export interface TransparencyUSAFinancialDataType {
  candidateName: string;
  office: string;
  totalContributions: number;
  totalExpenditures: number;
  cashOnHand: number;
  lastReportDate: string;
  reportingPeriod: string;
}

/**
 * Race-level financial summary
 * Aggregates financial data for all candidates in a specific race
 */
export interface RaceFinancialSummaryType {
  raceId: string;
  raceName: string;
  candidates: FinancialSummaryType[];
  isUnopposed: boolean;
  lastUpdated: string;
}
