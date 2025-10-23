export interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  descriptionHeading: string;
  description: string;
  newsTitle: string;
  raceTags: string[]; // Tags to match against race.raceTags for filtering
}

export const categories: Record<string, CategoryData> = {
  "georgia-executive": {
    id: "georgia-executive",
    title: "Georgia Executive",
    subtitle: "Four open seats in Georgia's executive branch for 2026",
    descriptionHeading: "The Georgia State Executive Branch",
    description:
      "The Georgia Executive branch includes the Governor, Lieutenant Governor, Secretary of State, and other statewide officers who oversee the day-to-day administration of state government. These races shape Georgia's leadership and statewide policy direction for the next four years.",
    newsTitle: "Georgia Executive Races News",
    raceTags: ["ga_executive"],
  },
  "state-legislature": {
    id: "state-legislature",
    title: "Georgia State Legislature",
    subtitle: "Houston County's representation in the Georgia General Assembly",
    descriptionHeading: "Georgia State Legislative Branch",
    description:
      "Georgia's State House and State Senate members represent local districts and create the laws that guide the state. These elections determine who speaks for Houston County and surrounding areas at the Capitol in Atlanta.",
    newsTitle: "Georgia State Legislature Races News",
    raceTags: ["state_legislature"],
  },
  "federal-legislature": {
    id: "federal-legislature",
    title: "Federal Legislature",
    subtitle: "Georgia's federal representation in the United States Congress",
    descriptionHeading: "Georgia's Federal Legislative Representation",
    description:
      "Georgia's U.S. Senators and Representatives serve in Congress, shaping national laws, budgets, and policies. These elections decide who will represent our district — and Georgia — in Washington, D.C.",
    newsTitle: "Georgia Federal Legislature Races News",
    raceTags: ["federal_legislature"],
  },
};
