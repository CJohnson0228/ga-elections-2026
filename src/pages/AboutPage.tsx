import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import PageHero from "../components/ui/PageHero";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="About This Project"
        subtitle="Empowering Houston County Democrats for 2026"
      />

      <Container className="py-12">
        {/* Our Mission */}
        <Card className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4">
            Georgia Elections 2026 is a grassroots organizing tool built to help
            Houston County Democrats win in 2026. This platform provides
            Democratic voters and organizers with the data-driven insights they
            need to make informed decisions, prioritize races, and mobilize
            effectively across Georgia's 2026 election cycle.
          </p>
          <p className="text-gray-700">
            By combining real-time campaign finance data, curated news coverage,
            and comprehensive candidate information, we aim to give Democratic
            organizers in Houston County and across Georgia the strategic
            advantage they need to flip seats and defend Democratic victories.
          </p>
        </Card>

        {/* What We Provide */}
        <Card className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            What We Provide
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>
                <strong>Comprehensive Race Coverage:</strong> All major federal
                and state races in Georgia for 2026, with focus on competitive
                districts and organizing opportunities
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>
                <strong>Candidate Profiles:</strong> Detailed profiles for all
                candidates on the ballot, including Democratic candidates'
                backgrounds, policy positions, and campaign information
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>
                <strong>Campaign Finance Data:</strong> Real-time fundraising
                and spending data from OpenFEC and TransparencyUSA to help
                identify viable candidates and target races
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>
                <strong>Curated News Feed:</strong> Race-specific news
                aggregation from trusted Georgia media outlets to stay informed
                on campaign developments
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>
                <strong>Financial Comparisons:</strong> Side-by-side campaign
                finance comparisons to quickly assess competitive dynamics in
                each race
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>
                <strong>Mobile-Optimized Design:</strong> Access all organizing
                data on any device, from canvassing with your phone to
                strategizing on your laptop
              </span>
            </li>
          </ul>
        </Card>

        {/* Our Approach */}
        <Card className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Our Approach
          </h2>
          <p className="text-gray-700 mb-4">
            While we present information about all candidates on the ballot, our
            mission is explicitly Democratic organizing. We believe transparency
            and data-driven strategy are essential to winning elections, and
            this platform is built to serve Democratic voters, volunteers, and
            organizers in Houston County and across Georgia.
          </p>
          <p className="text-gray-700">
            By making campaign finance data accessible and sortable, curating
            relevant news feeds for each race, and providing comprehensive
            candidate information, we aim to help Democratic organizers make
            strategic decisions about where to invest time, energy, and
            resources to maximize electoral impact in 2026.
          </p>
        </Card>

        {/* Technology */}
        <Card className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Technology
          </h2>
          <p className="text-gray-700 mb-4">
            This platform is built with modern web technologies to ensure a
            fast, responsive, and accessible experience across all devices. The
            frontend is built with React 18, TypeScript, and Tailwind CSS v4,
            using Vite for optimal build performance and React Router 7 for
            client-side routing.
          </p>
          <p className="text-gray-700">
            Campaign finance data is sourced from OpenFEC (federal races) and
            TransparencyUSA (state races). News feeds are curated from trusted
            Georgia media outlets via RSS, with tag-based filtering to ensure
            relevance. Candidate and race data is maintained in structured JSON
            files hosted on GitHub, allowing for rapid updates and version
            control. All data is cached intelligently to provide fast load times
            while staying current with the latest campaign developments.
          </p>
        </Card>

        {/* About the Creator */}
        <Card>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            About the Creator
          </h2>
          <p className="text-gray-700 mb-4">
            This project was built by <strong>C.M. Johnson</strong>, a Navy
            veteran, federal mechanic at Robins Air Force Base, and self-taught
            developer. Driven by a passion for Democratic organizing and a
            belief that access to data is power, C.M. built this platform to
            help Houston County Democrats and organizers across Georgia compete
            more effectively in the 2026 election cycle.
          </p>
          <p className="text-gray-700">
            Mr. Johnson recognized the need for a centralized, mobile-friendly
            tool that could help volunteers and voters quickly understand the
            competitive landscape, identify viable candidates, and prioritize
            organizing efforts. This platform is the result of that vision—a
            Democratic organizing tool built by a Democrat, for Democrats.
          </p>
        </Card>
      </Container>
    </>
  );
}
