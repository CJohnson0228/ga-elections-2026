// Financial data types for OpenFEC and TransparencyUSA

export interface FinancialSummary {
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

export interface OpenFECCandidate {
  candidate_id: string;
  name: string;
  party: string;
  office: string;
  state: string;
  district?: string;
  incumbent_challenge?: string;
  cycles: number[];
}

export interface OpenFECFinancialData {
  candidate_id: string;
  cycle: number;
  receipts: number;
  disbursements: number;
  cash_on_hand_end_period: number;
  coverage_end_date: string;
  last_updated: string;
}

export interface TransparencyUSAFinancialData {
  candidateName: string;
  office: string;
  totalContributions: number;
  totalExpenditures: number;
  cashOnHand: number;
  lastReportDate: string;
  reportingPeriod: string;
}

export interface RaceFinancialSummary {
  raceId: string;
  raceName: string;
  candidates: FinancialSummary[];
  isUnopposed: boolean;
  lastUpdated: string;
}
