import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function VoterResources() {
  return (
    <div className="bg-white shadow-inner py-12 sm:py-16">
      <Container>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center sm:text-left">
          Voter Resources
        </h2>
        <div className="mb-12">
          <Card className="relative group hover:border-primary-500 transition-all duration-300 hover:shadow-xl overflow-clip z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
              style={{ backgroundImage: "url(/polling_people.jpg)" }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-primary-700/80" />
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                Polling Locations
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Find your polling place and early voting locations in Houston
                County. Essential information for making your vote count.
              </p>
            </div>
            <Button variant="secondary" disabled className="w-full">
              Coming Soon
            </Button>
          </Card>
        </div>

        {/* Call to Action Banner */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Get Involved in 2026
              </h3>
              <p className="text-blue-50 leading-relaxed mb-4">
                With five statewide open seats and key local races, 2026 is a
                critical opportunity for Democrats in Georgia. Track candidates,
                monitor campaign finance, and stay engaged as we work to elect
                progressive leaders across the state.
              </p>
              <p className="text-blue-100 text-sm font-semibold">
                Check back regularly for candidate announcements, fundraising
                data, and ways to take action.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
