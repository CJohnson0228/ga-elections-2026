import Container from "../../../components/ui/Container";
import RaceCard from "../../../components/ui/RaceCard";

export default function FeaturedRaces() {
  return (
    <div
      id="races"
      className="bg-white border-t-4 border-primary-500/30 py-12 sm:py-16"
    >
      <Container>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center sm:text-left">
          Featured Races
        </h2>

        {/* First Row - Statewide Races */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <RaceCard
            title="Governor"
            description="The race for Georgia's highest office. Multiple Democratic candidates expected to compete for the nomination."
            raceFilter="ga_governor"
            openSeat
            primary="May 19, 2026"
            general="Nov 3, 2026"
            term={4}
            link="/races/governor"
          />

          <RaceCard
            title="Lt. Governor"
            description="Georgia's second-highest executive office. Presides over the State Senate and serves as governor's successor."
            raceFilter="ga_lt_governor"
            openSeat
            primary="May 19, 2026"
            general="Nov 3, 2026"
            term={4}
            link="/races/lt-governor"
          />

          <RaceCard
            title="Attorney General"
            description="The state's chief legal officer and law enforcement official, representing Georgia in legal matters."
            raceFilter="ga_attorneygeneral"
            openSeat
            primary="May 19, 2026"
            general="Nov 3, 2026"
            term={4}
            link="/races/attorney-general"
          />

          <RaceCard
            title="Secretary of State"
            description="Oversees elections, business registrations, professional licensing, and state records."
            raceFilter="ga_secretaryofstate"
            openSeat
            primary="May 19, 2026"
            general="Nov 3, 2026"
            term={4}
            link="/races/secretary-of-state"
          />
        </div>

        {/* Second Row - Local Races */}
        <div className="grid md:grid-cols-2 gap-6">
          <RaceCard
            title="GA Senate SD-20"
            description="Houston County's representative to the Georgia State Senate. Open seat as Senator John F. Kennedy runs for Lieutenant Governor."
            raceFilter="ga_senate"
            openSeat
            primary="May 19, 2026"
            general="Nov 3, 2026"
            term={2}
            link="/races/ga-senate-sd20"
          />

          <RaceCard
            title="GA House HD-146"
            description="Houston County's representative to the Georgia House of Representatives. Shaw Blackmon (R) is the incumbent. Democrats need to recruit and elect a strong challenger for this seat."
            raceFilter="ga_house"
            primary="May 19, 2026"
            general="Nov 3, 2026"
            term={2}
            link="/races/ga-house-hd146"
          />
        </div>
      </Container>
    </div>
  );
}
