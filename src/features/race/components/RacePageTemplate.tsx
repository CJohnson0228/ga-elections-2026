import type { ReactNode } from "react";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import NewsFeed from "../../../features/news/NewsFeed";
import PageHero from "../../../components/ui/PageHero";
import CandidateCard from "../../../components/ui/CandidateCard";
import type { GitHubCandidate } from "../../../types";

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
  candidates?: GitHubCandidate[];
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
  return (
    <>
      {/* Hero Section */}
      <PageHero title={title} subtitle={subtitle} />

      <Container className="py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                About the Race
              </h2>
              <div className="text-gray-700">{aboutContent}</div>
            </Card>

            {/* Candidates Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                2026 Candidates
              </h2>

              {candidatesLoading ? (
                <Card>
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-gray-600">Loading candidates...</span>
                  </div>
                </Card>
              ) : candidates.length > 0 ? (
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              ) : (
                <Card>
                  <div className="text-center py-8 text-gray-500">
                    {candidatesContent ? (
                      <div className="text-gray-600">{candidatesContent}</div>
                    ) : (
                      <>
                        <p>No candidates have officially announced for this race yet.</p>
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
            <div className="mb-8">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                {newsTitle}
              </h2>
              <NewsFeed raceFilter={raceFilter} showAllNews={true} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6 sticky top-24">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Election Information
              </h3>
              <div className="space-y-4">
                {Object.entries(electionInfo).map(([key, value]) => {
                  if (!value) return null;

                  // Format the key to be human-readable
                  const label = key
                    .split(/(?=[A-Z])/)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                  return (
                    <div key={key}>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {label}
                      </h4>
                      <p className="text-gray-700">
                        {value}
                        {label === "termLength" ? " years" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
