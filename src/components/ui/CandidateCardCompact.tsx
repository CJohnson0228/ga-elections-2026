import { Link } from "react-router";
import { User, TrendingUp, DollarSign, Wallet } from "lucide-react";
import Card from "./Card";
import PartyBadge from "./PartyBadge";
import IncumbentBadge from "./IncumbentBadge";
import type { CandidateType } from "../../types";
import type { FinancialSummaryType } from "../../types/financial";

interface CandidateCardCompactProps {
  candidate: CandidateType;
  financialData?: FinancialSummaryType | null;
  maxFinancialAmount?: number;
}

export default function CandidateCardCompact({
  candidate,
  financialData,
  maxFinancialAmount = 0,
}: CandidateCardCompactProps) {
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const getProgressWidth = (amount: number, max: number): number => {
    if (max === 0) return 0;
    return Math.min((amount / max) * 100, 100);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow hover:border-primary-400">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {/* Photo and Name Section - Mobile: Row, Desktop: Separate */}
        <div className="flex items-center gap-4 md:gap-0">
          {/* Photo */}
          <div className="flex-shrink-0">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
              </div>
            )}
          </div>

          {/* Name and Party - Mobile Only */}
          <div className="flex-1 min-w-0 md:hidden">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-display font-bold text-gray-900">
                {candidate.name}
              </h3>
              <PartyBadge party={candidate.party} size="sm" />
              {candidate.isIncumbent && <IncumbentBadge size="sm" />}
            </div>
          </div>
        </div>

        {/* Name and Party - Desktop Only */}
        <div className="hidden md:block md:flex-1 md:min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-display font-bold text-gray-900">
              {candidate.name}
            </h3>
            <PartyBadge party={candidate.party} showFullName />
            {candidate.isIncumbent && <IncumbentBadge />}
          </div>
          {candidate.background && (
            <p className="text-sm text-gray-600 line-clamp-1">
              {candidate.background}
            </p>
          )}
        </div>

        {/* Financial Data */}
        <div className="flex-shrink-0 w-full md:w-80">
          {financialData ? (
            <div className="space-y-2">
              {/* Raised */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Raised</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {formatCurrency(financialData.totalRaised)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{
                        width: `${getProgressWidth(
                          financialData.totalRaised,
                          maxFinancialAmount
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Spent */}
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-red-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Spent</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {formatCurrency(financialData.totalSpent)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{
                        width: `${getProgressWidth(
                          financialData.totalSpent,
                          maxFinancialAmount
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Cash on Hand */}
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Cash</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {formatCurrency(financialData.cashOnHand)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{
                        width: `${getProgressWidth(
                          financialData.cashOnHand,
                          maxFinancialAmount
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-gray-500">
                Financial data not yet available
              </p>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <div className="flex-shrink-0 w-full md:w-auto">
          <Link
            to={`/candidate/${candidate.id}`}
            className="block md:inline-block text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold whitespace-nowrap"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Card>
  );
}
