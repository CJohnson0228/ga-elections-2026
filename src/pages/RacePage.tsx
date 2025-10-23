import { useParams, Navigate } from 'react-router';
import { RacePageTemplate } from '../features/race/components';
import { useRace } from '../hooks/useRaces';
import { useCandidates } from '../hooks/useCandidates';

export default function RacePage() {
  const { raceId } = useParams<{ raceId: string }>();

  if (!raceId) {
    return <Navigate to="/" replace />;
  }

  const { race, loading: raceLoading, error: raceError } = useRace(raceId);
  const { candidates, loading: candidatesLoading } = useCandidates(race?.raceFilter || '');

  if (raceError) {
    return <Navigate to="/" replace />;
  }

  if (raceLoading || !race) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <RacePageTemplate
      title={race.title}
      subtitle={race.subtitle}
      aboutContent={<p className="mb-4">{race.aboutContent}</p>}
      candidatesContent={race.candidatesContent ? <p>{race.candidatesContent}</p> : undefined}
      newsTitle={race.newsTitle}
      raceFilter={race.raceFilter}
      electionInfo={race.electionInfo}
      candidates={candidates}
      candidatesLoading={candidatesLoading}
    />
  );
}
