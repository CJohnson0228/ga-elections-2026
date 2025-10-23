import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import PageHero from "../../components/ui/PageHero";
import NewsFeed from "../news/NewsFeed";
import RaceCard from "../../components/ui/RaceCard";
import type { GitHubRace } from "../../types";

interface CategoryPageTemplateProps {
  title: string;
  subtitle: string;
  descriptionHeading: string;
  description: string;
  newsTitle: string;
  categoryRaces: GitHubRace[];
  categoryTags: string[]; // Tags for filtering news
}

export default function CategoryPageTemplate({
  title,
  subtitle,
  descriptionHeading,
  description,
  newsTitle,
  categoryRaces,
  categoryTags,
}: CategoryPageTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <PageHero title={title} subtitle={subtitle} />

      {/* Content */}
      <Container className="py-12">
        <Card className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            {descriptionHeading}
          </h2>
          <p className="text-gray-700 mb-4">{description}</p>
        </Card>

        {/* Races Section */}

        <div className="grid md:grid-cols-2 gap-6">
          {categoryRaces.map(
            ({
              id,
              title,
              aboutContent,
              electionInfo,
              raceFilter,
              openSeat,
            }) => (
              <RaceCard
                key={id}
                openSeat={openSeat}
                raceFilter={raceFilter}
                title={title}
                description={aboutContent}
                term={electionInfo.termLength}
                primary={electionInfo.primary}
                general={electionInfo.general}
                link={`/races/${id}`}
              />
            )
          )}
        </div>

        {/* News Feed - filtered by category tags */}
        <div className="my-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
            {newsTitle}
          </h2>
          <NewsFeed raceFilter={categoryTags} showAllNews={true} />
        </div>
      </Container>
    </>
  );
}
