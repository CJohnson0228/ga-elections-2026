import { getPartyColor } from "../../utils/colorMaps";

interface PartyBadgeProps {
  party: string;
  size?: "sm" | "md";
  showFullName?: boolean;
}

export default function PartyBadge({
  party,
  size = "md",
  showFullName = false,
}: PartyBadgeProps) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-xs",
  };

  return (
    <span
      className={`rounded-full font-semibold border ${getPartyColor(party)} ${sizeClasses[size]}`}
    >
      {/* Desktop: Full name if showFullName, otherwise letter */}
      <span className="hidden md:inline">
        {showFullName ? party : party.charAt(0)}
      </span>
      {/* Mobile: Always single letter */}
      <span className="md:hidden">{party.charAt(0)}</span>
    </span>
  );
}
