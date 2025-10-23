import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import PageHero from "../components/ui/PageHero";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="About This Project"
        subtitle="Making election information accessible and transparent"
      />

      <Container className="py-12">
        <Card className="mb-6">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4">
            The Georgia 2026 Elections Dashboard is a civic tech project
            dedicated to making election information accessible and transparent
            for all Georgia voters.
          </p>
          <p className="text-gray-700">
            We believe that informed voters make better decisions. Our goal is
            to provide comprehensive, nonpartisan information about candidates,
            their policy positions, campaign finances, and voting resources.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            What We Provide
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Detailed candidate profiles and policy positions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Campaign fundraising data and financial transparency</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Polling location finder and voting resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Side-by-side candidate comparisons</span>
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Technology
          </h2>
          <p className="text-gray-700 mb-4">
            Built with modern web technologies including React 18, TypeScript,
            Vite, React Router 7, and Tailwind CSS v4.
          </p>
          <p className="text-gray-700 text-sm">
            This is an open-source project focused on civic engagement and voter
            education.
          </p>
        </Card>
      </Container>
    </>
  );
}
