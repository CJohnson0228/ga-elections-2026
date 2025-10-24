import Card from "./Card";
import PartyBadge from "./PartyBadge";
import type { CandidateType } from "../../types";
import type { FinancialSummaryType } from "../../types/financial";

interface RaceFinancialComparisonProps {
  candidates: CandidateType[];
  financialData: Map<string, FinancialSummaryType>;
}

export default function RaceFinancialComparison({
  candidates,
  financialData,
}: RaceFinancialComparisonProps) {
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  // Calculate the maximum value across all metrics for relative sizing
  const allAmounts = Array.from(financialData.values()).flatMap((f) => [
    f.totalRaised,
    f.totalSpent,
    f.cashOnHand,
  ]);
  const maxAmount = Math.max(...allAmounts, 0);

  const getBarWidth = (amount: number): number => {
    if (maxAmount === 0) return 0;
    return Math.min((amount / maxAmount) * 100, 100);
  };

  // Check if we have any financial data
  const hasFinancialData = financialData.size > 0;

  if (!hasFinancialData) {
    return null;
  }

  // Sort candidates by total raised and take top 4
  const topCandidates = candidates
    .map((candidate) => ({
      candidate,
      financial: financialData.get(candidate.id),
    }))
    .filter((item) => item.financial !== undefined)
    .sort(
      (a, b) =>
        (b.financial?.totalRaised || 0) - (a.financial?.totalRaised || 0)
    )
    .slice(0, 4)
    .map((item) => item.candidate);

  return (
    <Card className="mb-8">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-gray-900">
            Campaign Finance Comparison
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Top {topCandidates.length} candidates by funds raised
          </p>
        </div>
        {/* Legend */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Raised</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Spent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Cash</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {topCandidates.map((candidate) => {
          const financial = financialData.get(candidate.id);
          if (!financial) return null;

          return (
            <div
              key={candidate.id}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-2 border-b border-gray-100 last:border-0"
            >
              {/* Candidate Name */}
              <div className="w-full md:w-48 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {candidate.name}
                  </span>
                  <PartyBadge party={candidate.party} size="sm" />
                </div>
              </div>

              {/* Stacked Bars */}
              <div className="w-full md:flex-1 space-y-1">
                {/* Raised Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{
                        width: `${getBarWidth(financial.totalRaised)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-16 text-right">
                    {formatCurrency(financial.totalRaised)}
                  </span>
                </div>

                {/* Spent Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{ width: `${getBarWidth(financial.totalSpent)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-16 text-right">
                    {formatCurrency(financial.totalSpent)}
                  </span>
                </div>

                {/* Cash Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${getBarWidth(financial.cashOnHand)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-16 text-right">
                    {formatCurrency(financial.cashOnHand)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Source Note */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Data from{" "}
          {Array.from(financialData.values())[0]?.source === "openFEC"
            ? "OpenFEC"
            : "Georgia Ethics Commission"}
          . Last updated:{" "}
          {new Date(
            Array.from(financialData.values())[0]?.lastUpdated || ""
          ).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
}
