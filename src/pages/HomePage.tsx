import Container from "../components/ui/Container";
import NewsFeed from "../features/news/NewsFeed";
import {
  Hero,
  ImportantDates,
  FeaturedRaces,
  VoterResources,
} from "../features/home/components";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImportantDates />

      {/* Election News Section - Gray background */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <Container>
          <NewsFeed raceFilter="all" />
        </Container>
      </div>

      <FeaturedRaces />
      <VoterResources />
    </>
  );
}
