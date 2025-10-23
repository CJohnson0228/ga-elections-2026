import { Link } from "react-router";
import { Calendar } from "lucide-react";
import Container from "../../../components/ui/Container";
import CountdownTimer from "../../../components/ui/CountdownTimer";

export default function Hero() {
  const electionDate = new Date("2026-11-03T07:00:00"); // 7 AM Polls Open

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/georgia_state_capital.jpg)" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/75 to-slate-700/70" />
      </div>

      {/* Content */}
      <Container className="relative w-full py-20">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl font-display font-black mb-4 leading-tight drop-shadow-lg">
            Georgia Elections 2026
            <span className="block text-primary-200">
              Districts SD-18/20/26 & HD-134/143/146/147/148
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-2">
            Covering all 2026 state & federal elections in Houston County.
          </p>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
            A Democratic organizing platform tracking candidates, campaign
            finance, and opportunities across Georgia.
          </p>

          {/* Countdown Badge - Mobile */}
          <div className="px-8 py-6 bg-white/15 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-primary-200" />
              <span className="text-sm font-semibold text-primary-200 uppercase tracking-wide">
                Polls Open
              </span>
            </div>
            <div className="flex justify-center">
              <CountdownTimer targetDate={electionDate} />
            </div>
            <div className="text-sm text-white/80 font-medium mt-4">
              November 3, 2026 • 7:00 AM
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Side - Countdown */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white/15 backdrop-blur-md rounded-3xl border-2 border-white/30 shadow-2xl p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-primary-200" />
                <span className="text-lg font-semibold text-primary-200 uppercase tracking-wide">
                  Polls Open
                </span>
              </div>
              <CountdownTimer targetDate={electionDate} />
              <div className="text-lg text-white/80 font-medium mt-6">
                November 3, 2026 • 7:00 AM
              </div>
            </div>
          </div>

          {/* Right Side - Hero Text */}
          <div className="text-left">
            <h1 className="text-3xl xl:text-4xl font-display font-black mb-6 leading-tight drop-shadow-lg">
              Georgia Elections 2026
              <span className="block text-primary-200">
                Districts SD-18/20/26 & HD-134/143/146/147/148
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-2">
              Covering all 2026 state & federal elections in Houston County.
            </p>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
              A Democratic organizing platform tracking candidates, campaign
              finance, and opportunities across Georgia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/news"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-lg text-center"
              >
                Latest News
              </Link>
              <a
                href="#races"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("races")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-colors border border-white/30 text-center cursor-pointer"
              >
                View Races
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
