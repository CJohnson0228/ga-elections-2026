import { Star } from "lucide-react";

interface IncumbentBadgeProps {
  size?: "sm" | "md";
}

export default function IncumbentBadge({ size = "md" }: IncumbentBadgeProps) {
  const circleSize = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        className={`${circleSize[size]} rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center`}
      >
        <Star className={`${iconSize[size]} fill-amber-500 text-amber-500`} />
      </div>
      {/* Desktop: Show text */}
      <span className="hidden md:inline text-xs font-semibold text-amber-700">
        Incumbent
      </span>
    </div>
  );
}
