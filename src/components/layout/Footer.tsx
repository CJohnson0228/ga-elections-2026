import { useState, useEffect } from "react";
import Container from "../ui/Container";
import { dataService } from "../../services/dataService";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    dataService
      .getLastUpdated()
      .then((data) => setLastUpdated(data.lastUpdated))
      .catch((err) => console.error("Error fetching last updated:", err));
  }, []);

  return (
    <footer className="bg-gray-900 mt-auto">
      <Container>
        <div className="py-10 sm:py-12">
          {/* Main Footer Content */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5">
                  <img
                    src="/Seal_of_Georgia.svg"
                    alt="Georgia State Seal"
                    className="w-full h-full"
                  />
                </div>
                <span className="font-display font-bold text-white text-lg">
                  Georgia Elections 2026
                </span>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4">
                A Democratic organizing resource tracking open seats, candidate
                campaigns, and fundraising across Georgia's 2026 elections.
                Houston County focus on SD-20 and HD-146.
              </p>

              {/* Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
                <span className="text-gray-700">•</span>
                <a
                  href="https://www.houstoncountydemocrats.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Houston County Democrats
                </a>
                <span className="text-gray-700">•</span>
                <a
                  href="mailto:contact@example.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm mb-2">
                &copy; {currentYear} Georgia Elections 2026.
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Grassroots organizing for progressive change.
              </p>
              <p className="text-gray-600 text-xs">Built by C. M. Johnson</p>
            </div>
          </div>

          {/* Data Update Info - Bottom Left */}
          <div className="border-t border-gray-800 pt-4">
            <div className="text-left">
              {lastUpdated ? (
                <p className="text-xs text-gray-600">
                  Data updated:{" "}
                  {new Date(lastUpdated).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              ) : (
                <p className="text-xs text-gray-600">Loading data info...</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
