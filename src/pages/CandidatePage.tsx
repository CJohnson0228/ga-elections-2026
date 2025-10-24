import { useParams, Navigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import CandidateCard from "../components/ui/CandidateCard";
import NewsFeed from "../features/news/NewsFeed";
import { useAllCandidates } from "../hooks/useCandidates";
import { useRaces } from "../hooks/useRaces";
import { financialService } from "../services/financialService";
import type { FinancialSummaryType } from "../types/financial";

export default function CandidatePage() {
  const { candidateId } = useParams<{ candidateId: string }>();
  const { candidates, loading: candidatesLoading } = useAllCandidates();
  const { races, loading: racesLoading } = useRaces();
  const [financialData, setFinancialData] = useState<FinancialSummaryType | null>(null);
  const [financialLoading, setFinancialLoading] = useState(true);

  const candidate = candidates.find((c) => c.id === candidateId);
  const race = candidate ? races[Object.keys(races).find(
    (key) => races[key].raceFilter === candidate.race
  ) || ""] : undefined;

  useEffect(() => {
    if (candidate) {
      setFinancialLoading(true);
      financialService
        .getCandidateFinancials(candidate)
        .then((data) => setFinancialData(data))
        .catch((err) => console.error("Error loading financial data:", err))
        .finally(() => setFinancialLoading(false));
    }
  }, [candidate]);

  if (candidatesLoading || racesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!candidate) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageHero
        title={candidate.name}
        subtitle={race ? `Candidate for ${race.title}` : candidate.race}
      />

      <Container className="py-12">
        {/* Back to Race Link */}
        {race && (
          <Link
            to={`/races/${Object.keys(races).find(
              (key) => races[key].raceFilter === candidate.race
            )}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {race.title}
          </Link>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Full Candidate Card */}
          <div className="lg:col-span-2">
            <CandidateCard candidate={candidate} />

            {/* Financial Data Section */}
            {financialLoading ? (
              <div className="mt-8 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  <span className="ml-3 text-gray-600">Loading financial data...</span>
                </div>
              </div>
            ) : financialData ? (
              <div className="mt-8 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                  Campaign Finance
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-sm font-semibold text-green-700 mb-2">
                      Total Raised
                    </h3>
                    <p className="text-3xl font-bold text-green-900">
                      {financialService.formatCurrency(financialData.totalRaised)}
                    </p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 className="text-sm font-semibold text-red-700 mb-2">
                      Total Spent
                    </h3>
                    <p className="text-3xl font-bold text-red-900">
                      {financialService.formatCurrency(financialData.totalSpent)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-700 mb-2">
                      Cash on Hand
                    </h3>
                    <p className="text-3xl font-bold text-blue-900">
                      {financialService.formatCurrency(financialData.cashOnHand)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Data from {financialData.source === "openFEC" ? "OpenFEC" : "Georgia Ethics Commission"}.
                  Last updated: {new Date(financialData.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            ) : null}

            {/* News Feed */}
            <div className="mt-8">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                News About {candidate.name}
              </h2>
              <NewsFeed candidateId={candidate.id} showAllNews={true} limit={6} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {race && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  About the Race
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Race</h4>
                    <p className="text-gray-700">{race.title}</p>
                  </div>
                  {race.electionInfo.primary && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Primary</h4>
                      <p className="text-gray-700">{race.electionInfo.primary}</p>
                    </div>
                  )}
                  {race.electionInfo.general && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">General Election</h4>
                      <p className="text-gray-700">{race.electionInfo.general}</p>
                    </div>
                  )}
                  {race.electionInfo.district && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">District</h4>
                      <p className="text-gray-700">{race.electionInfo.district}</p>
                    </div>
                  )}
                  <Link
                    to={`/races/${Object.keys(races).find(
                      (key) => races[key].raceFilter === candidate.race
                    )}`}
                    className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mt-4"
                  >
                    View All Candidates
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
