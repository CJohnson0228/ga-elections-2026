import Container from "../components/ui/Container";
import NewsFeed from "../features/news/NewsFeed";
import PageHero from "../components/ui/PageHero";

export default function NewsPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Election News"
        subtitle="Stay informed with curated coverage and the latest developments in
              Georgia's 2026 elections"
      />

      {/* News Feed */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <Container>
          <NewsFeed raceFilter="all" showAllNews={true} />
        </Container>
      </div>
    </>
  );
}
