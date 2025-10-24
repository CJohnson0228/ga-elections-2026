import { useState, useEffect, type ReactNode } from "react";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import NewsFeed from "../../../features/news/NewsFeed";
import PageHero from "../../../components/ui/PageHero";
import CandidateCardCompact from "../../../components/ui/CandidateCardCompact";
import RaceFinancialComparison from "../../../components/ui/RaceFinancialComparison";
import type { CandidateType } from "../../../types";
import type { FinancialSummaryType } from "../../../types/financial";
import { financialService } from "../../../services/financialService";

interface RacePageTemplateProps {
  title: string;
  subtitle: string;
  aboutContent: ReactNode;
  candidatesContent?: ReactNode;
  newsTitle: string;
  raceFilter: string | string[]; // Can be a specific filter, array of tags, or "all"
  electionInfo: {
    primary?: string;
    general?: string;
    termLength?: number;
    district?: string;
    [key: string]: string | number | undefined;
  };
  candidates?: CandidateType[];
  candidatesLoading?: boolean;
}

export default function RacePageTemplate({
  title,
  subtitle,
  aboutContent,
  candidatesContent,
  newsTitle,
  raceFilter,
  electionInfo,
  candidates = [],
  candidatesLoading = false,
}: RacePageTemplateProps) {
  const [financialData, setFinancialData] = useState<
    Map<string, FinancialSummaryType>
  >(new Map());
  const [financialLoading, setFinancialLoading] = useState(true);
  const [maxFinancialAmount, setMaxFinancialAmount] = useState(0);

  useEffect(() => {
    if (candidates.length > 0) {
      setFinancialLoading(true);
      Promise.all(
        candidates.map(async (candidate) => {
          try {
            const data = await financialService.getCandidateFinancials(
              candidate
            );
            return { candidateId: candidate.id, data };
          } catch (err) {
            console.error(
              `Error loading financial data for ${candidate.name}:`,
              err
            );
            return null;
          }
        })
      )
        .then((results) => {
          const dataMap = new Map<string, FinancialSummaryType>();
          const allAmounts: number[] = [];

          results.forEach((result) => {
            if (result && result.data) {
              dataMap.set(result.candidateId, result.data);
              allAmounts.push(
                result.data.totalRaised,
                result.data.totalSpent,
                result.data.cashOnHand
              );
            }
          });

          setFinancialData(dataMap);
          setMaxFinancialAmount(Math.max(...allAmounts, 0));
        })
        .finally(() => setFinancialLoading(false));
    } else {
      setFinancialLoading(false);
    }
  }, [candidates]);

  // Sort candidates by fundraising (most to least)
  const sortedCandidates = [...candidates].sort((a, b) => {
    const aFinancial = financialData.get(a.id);
    const bFinancial = financialData.get(b.id);

    // Candidates with financial data come first, sorted by totalRaised
    if (aFinancial && bFinancial) {
      return bFinancial.totalRaised - aFinancial.totalRaised;
    }
    // Candidates with financial data come before those without
    if (aFinancial) return -1;
    if (bFinancial) return 1;

    // If neither has financial data, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      {/* Hero Section */}
      <PageHero title={title} subtitle={subtitle} electionInfo={electionInfo} />

      <Container className="py-12">
        <Card className="relative mb-8 z-0 overflow-clip border-primary-200">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
            style={{ backgroundImage: "url(/flag-backdrop.jpg)" }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-primary-300/80" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            About the Race
          </h2>
          <div className="text-gray-700">{aboutContent}</div>
        </Card>

        {/* Financial Comparison */}
        {!candidatesLoading && !financialLoading && candidates.length > 0 && (
          <RaceFinancialComparison
            candidates={candidates}
            financialData={financialData}
          />
        )}

        {/* Candidates Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
            2026 Candidates
          </h2>

          {candidatesLoading || financialLoading ? (
            <Card>
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-gray-600">
                  {candidatesLoading
                    ? "Loading candidates..."
                    : "Loading financial data..."}
                </span>
              </div>
            </Card>
          ) : candidates.length > 0 ? (
            <div className="space-y-4">
              {sortedCandidates.map((candidate) => (
                <CandidateCardCompact
                  key={candidate.id}
                  candidate={candidate}
                  financialData={financialData.get(candidate.id) ?? null}
                  maxFinancialAmount={maxFinancialAmount}
                />
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8 text-gray-500">
                {candidatesContent ? (
                  <div className="text-gray-600">{candidatesContent}</div>
                ) : (
                  <>
                    <p>
                      No candidates have officially announced for this race yet.
                    </p>
                    <p className="text-sm mt-2">
                      Check back for updates as campaigns are announced.
                    </p>
                  </>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* News Feed */}
        <div className="mb-8 mt-16">
          <NewsFeed
            raceFilter={raceFilter}
            sectionTitle={newsTitle}
            showAllNews={true}
            limit={6}
          />
        </div>
      </Container>
    </>
  );
}
