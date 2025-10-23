import { Link } from "react-router";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  Landmark,
  Gavel,
  Building,
  PenTool,
  BookUser,
  BookText,
} from "lucide-react";
import type { ReactNode } from "react";

interface RaceCardProps {
  title: string;
  description: string;
  raceFilter: string;
  openSeat?: boolean;
  primary?: string;
  general?: string;
  term?: number;
  link: string;
}

/** Returns the correct icon based on race type */
function getIcon(raceFilter: string): ReactNode {
  // Check for specific races first
  if (raceFilter === "ga_governor") return <Landmark className="w-7 h-7" />;
  if (raceFilter === "ga_lt_governor") return <Building className="w-7 h-7" />;
  if (raceFilter === "ga_secretaryofstate") return <PenTool className="w-7 h-7" />;
  if (raceFilter === "ga_attorneygeneral") return <Gavel className="w-7 h-7" />;

  // Check for House races (state or federal)
  if (raceFilter.includes("house")) return <BookUser className="w-7 h-7" />;

  // Check for Senate races (state or federal)
  if (raceFilter.includes("senate")) return <BookText className="w-7 h-7" />;

  // Default icon
  return <Landmark className="w-7 h-7" />;
}

export default function RaceCard({
  title,
  description,
  raceFilter,
  openSeat,
  primary,
  general,
  term,
  link,
}: RaceCardProps) {
  const icon = getIcon(raceFilter);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary-300 border-2 border-primary-200 bg-primary-50/30 flex flex-col">
      <div className="mb-6 flex-1">
        {/* Icon + Open Seat Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-md text-white">
            {icon}
          </div>

          {openSeat && (
            <span className="px-3 py-1 bg-caution-500 text-white text-xs font-bold rounded-full shadow-sm">
              OPEN SEAT
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

        {/* Election Info */}
        {(primary || general || term) && (
          <div className="space-y-2 text-sm">
            {primary && (
              <div className="flex items-center justify-between py-2 border-t border-primary-200">
                <span className="text-gray-700">Primary</span>
                <span className="font-semibold text-gray-900">{primary}</span>
              </div>
            )}
            {general && (
              <div className="flex items-center justify-between py-2 border-t border-primary-200">
                <span className="text-gray-700">General Election</span>
                <span className="font-semibold text-gray-900">{general}</span>
              </div>
            )}
            {term && (
              <div className="flex items-center justify-between py-2 border-t border-b border-primary-200">
                <span className="text-gray-700">Term Length</span>
                <span className="font-semibold text-gray-900">
                  {term} years
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <Link to={link}>
        <Button className="w-full bg-primary-600 hover:bg-primary-700">
          View Race Details
        </Button>
      </Link>
    </Card>
  );
}
