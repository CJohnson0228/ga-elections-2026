import { ExternalLink, Users, Briefcase, CheckCircle2, User } from "lucide-react";
import Card from "./Card";
import type { CandidateType } from "../../types";
import { getPartyColor } from "../../utils/colorMaps";

interface CandidateCardProps {
  candidate: CandidateType;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {/* Header with Photo */}
      <div className="flex items-start gap-4 mb-4">
        {/* Photo */}
        <div className="flex-shrink-0">
          {candidate.photoUrl ? (
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Name and Badges */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
            {candidate.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPartyColor(candidate.party)}`}
            >
              {candidate.party}
            </span>
            {candidate.isIncumbent && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Incumbent
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Background */}
      {candidate.background && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Background
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {candidate.background}
          </p>
        </div>
      )}

      {/* Experience */}
      {candidate.experience && candidate.experience.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Experience
          </h4>
          <ul className="space-y-1">
            {candidate.experience.map((exp, index) => (
              <li key={index} className="text-gray-600 text-sm flex items-start">
                <span className="mr-2 text-primary-600">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Issues */}
      {candidate.keyIssues && candidate.keyIssues.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Key Issues
          </h4>
          <div className="flex flex-wrap gap-2">
            {candidate.keyIssues.map((issue, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md border border-primary-200"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Endorsements */}
      {candidate.endorsements && candidate.endorsements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Endorsements
          </h4>
          <div className="flex flex-wrap gap-2">
            {candidate.endorsements.slice(0, 5).map((endorsement, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-md border border-gray-200"
              >
                {endorsement}
              </span>
            ))}
            {candidate.endorsements.length > 5 && (
              <span className="px-2 py-1 text-gray-600 text-xs">
                +{candidate.endorsements.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        {candidate.website && (
          <a
            href={candidate.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Website
          </a>
        )}

        {candidate.socialMedia.twitter && (
          <a
            href={`https://twitter.com/${candidate.socialMedia.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            Twitter
          </a>
        )}

        {candidate.socialMedia.facebook && (
          <a
            href={candidate.socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            Facebook
          </a>
        )}

        {candidate.socialMedia.instagram && (
          <a
            href={candidate.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            Instagram
          </a>
        )}
      </div>
    </Card>
  );
}
