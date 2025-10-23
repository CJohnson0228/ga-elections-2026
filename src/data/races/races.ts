export interface RaceData {
  id: string;
  title: string;
  openSeat: boolean;
  subtitle: string;
  aboutContent: string;
  candidatesContent?: string;
  newsTitle: string;
  raceFilter: string; // Specific filter for this exact race (e.g., "ga_senate_sd18")
  raceTags: string[]; // Hierarchical tags for broader filtering (e.g., ["ga_senate", "ga_state", "state_legislature"])
  externalIds?: {
    openFEC?: string; // For federal races (US House, US Senate)
    transparencyUSA?: string; // For state races
    ballotpedia?: string; // Optional: for additional data
  };
  electionInfo: {
    primary?: string;
    general?: string;
    termLength?: number;
    district?: string;
    [key: string]: string | number | undefined;
  };
}

export const races: Record<string, RaceData> = {
  governor: {
    id: "governor",
    title: "Governor",
    openSeat: true,
    subtitle: "Georgia's Chief Executive",
    aboutContent: `The Governor serves as Georgia's chief executive, leading the state's government and setting priorities for all Georgians. The Governor proposes the state budget, signs or vetoes legislation, appoints judges and agency heads, and represents Georgia on the national stage. In 2026, this open seat represents a crucial opportunity to shape Georgia's future on issues like education funding, healthcare access, economic development, and voting rights.`,
    candidatesContent:
      "Democratic candidates will be posted as campaigns are announced. Check back for updates on who's running to lead Georgia.",
    newsTitle: "Governor Race News",
    raceFilter: "ga_governor",
    raceTags: ["ga_governor", "ga_executive", "ga_state", "statewide"],
    externalIds: {
      transparencyUSA: "ga-governor-2026",
    },
    electionInfo: {
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 4,
    },
  },
  "lt-governor": {
    id: "lt-governor",
    title: "Lieutenant Governor",
    openSeat: true,
    subtitle: "President of the Georgia Senate",
    aboutContent: `The Lieutenant Governor presides over the Georgia State Senate, wielding significant power over which bills advance and which die in committee. This position determines the legislative agenda and can make or break critical legislation on healthcare, education, and civil rights. The Lt. Governor also serves as acting Governor when the Governor is out of state and is first in the line of succession.`,
    candidatesContent:
      "Democratic candidates will be posted as campaigns are announced. This race is critical for advancing progressive legislation in Georgia.",
    newsTitle: "Lt. Governor Race News",
    raceFilter: "ga_lt_governor",
    raceTags: ["ga_lt_governor", "ga_executive", "ga_state", "statewide"],
    externalIds: {
      transparencyUSA: "ga-lt-governor-2026",
    },
    electionInfo: {
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 4,
    },
  },
  "attorney-general": {
    id: "attorney-general",
    title: "Attorney General",
    openSeat: true,
    subtitle: "Georgia's Top Law Enforcement Officer",
    aboutContent: `The Attorney General serves as Georgia's chief lawyer and law enforcement official, defending state laws in court, prosecuting consumer fraud, and advising state agencies on legal matters. This office has enormous power to protect voting rights, combat price gouging, defend reproductive freedom, and challenge unconstitutional federal actions. The Attorney General can be a champion for justice or an obstacle to progress.`,
    candidatesContent:
      "Democratic candidates will be posted as campaigns are announced. The Attorney General will play a vital role in protecting Georgians' rights.",
    newsTitle: "Attorney General Race News",
    raceFilter: "ga_attorneygeneral",
    raceTags: ["ga_attorneygeneral", "ga_executive", "ga_state", "statewide"],
    externalIds: {
      transparencyUSA: "ga-attorney-general-2026",
    },
    electionInfo: {
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 4,
    },
  },
  "secretary-of-state": {
    id: "secretary-of-state",
    title: "Secretary of State",
    openSeat: true,
    subtitle: "Guardian of Georgia's Democracy",
    aboutContent: `The Secretary of State oversees all elections in Georgia, manages business and professional licensing, and maintains the state's official records. This office administers voter registration, certifies election results, and ensures fair access to the ballot. After the 2020 election challenges, this position has never been more important for protecting democracy, expanding voting access, and ensuring every Georgian's voice is heard.`,
    candidatesContent:
      "Democratic candidates will be posted as campaigns are announced. This race is critical for protecting voting rights in Georgia.",
    newsTitle: "Secretary of State Race News",
    raceFilter: "ga_secretaryofstate",
    raceTags: ["ga_secretaryofstate", "ga_executive", "ga_state", "statewide"],
    externalIds: {
      transparencyUSA: "ga-secretary-of-state-2026",
    },
    electionInfo: {
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 4,
    },
  },
  "ga-senate-sd18": {
    id: "ga-senate-sd18",
    title: "Georgia Senate District 18",
    openSeat: true,
    subtitle: "Your Voice in the State Capitol",
    aboutContent: `State Senate District 18 covers parts of Houston County and surrounding areas. Your State Senator represents you in Atlanta, voting on the state budget, education funding, healthcare policy, criminal justice reform, and local issues that directly impact our community. State Senators serve two-year terms and have significant influence over legislation that affects your daily life.`,
    candidatesContent:
      "Democratic candidates for SD-18 will be posted as campaigns are announced. This is YOUR seat—help elect a senator who shares our values.",
    newsTitle: "SD-18 Race News",
    raceFilter: "ga_senate_sd18",
    raceTags: ["ga_senate", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-senate-sd18-2026",
    },
    electionInfo: {
      district: "SD-18",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-senate-sd20": {
    id: "ga-senate-sd20",
    title: "Georgia Senate District 20",
    openSeat: true,
    subtitle: "Your Voice in the State Capitol",
    aboutContent: `State Senate District 20 covers parts of Houston County and surrounding areas. Your State Senator represents you in Atlanta, voting on the state budget, education funding, healthcare policy, criminal justice reform, and local issues that directly impact our community. State Senators serve two-year terms and have significant influence over legislation that affects your daily life.`,
    candidatesContent:
      "Democratic candidates for SD-20 will be posted as campaigns are announced. This is YOUR seat—help elect a senator who shares our values.",
    newsTitle: "SD-20 Race News",
    raceFilter: "ga_senate_sd20",
    raceTags: ["ga_senate", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-senate-sd20-2026",
    },
    electionInfo: {
      district: "SD-20",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-senate-sd26": {
    id: "ga-senate-sd26",
    title: "Georgia Senate District 26",
    openSeat: true,
    subtitle: "Your Voice in the State Capitol",
    aboutContent: `State Senate District 26 covers parts of Houston County and surrounding areas. Your State Senator represents you in Atlanta, voting on the state budget, education funding, healthcare policy, criminal justice reform, and local issues that directly impact our community. State Senators serve two-year terms and have significant influence over legislation that affects your daily life.`,
    candidatesContent:
      "Democratic candidates for SD-26 will be posted as campaigns are announced. This is YOUR seat—help elect a senator who shares our values.",
    newsTitle: "SD-26 Race News",
    raceFilter: "ga_senate_sd26",
    raceTags: ["ga_senate", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-senate-sd26-2026",
    },
    electionInfo: {
      district: "SD-26",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-house-hd134": {
    id: "ga-house-hd134",
    title: "Georgia House District 134",
    openSeat: true,
    subtitle: "Your Local Representative in Atlanta",
    aboutContent: `House District 134 represents your neighborhood in the Georgia General Assembly. Your State Representative votes on issues that directly affect Houston County families: school funding, healthcare access, infrastructure, and local services. With two-year terms, Representatives are accountable to voters frequently and can be powerful advocates for community needs.`,
    candidatesContent:
      "Democratic candidates for HD-134 will be posted as campaigns are announced. Know who's running to represent YOUR district.",
    newsTitle: "HD-134 Race News",
    raceFilter: "ga_house_hd134",
    raceTags: ["ga_house", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-house-hd134-2026",
    },
    electionInfo: {
      district: "HD-134",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-house-hd143": {
    id: "ga-house-hd143",
    title: "Georgia House District 143",
    openSeat: true,
    subtitle: "Your Local Representative in Atlanta",
    aboutContent: `House District 143 represents your neighborhood in the Georgia General Assembly. Your State Representative votes on issues that directly affect Houston County families: school funding, healthcare access, infrastructure, and local services. With two-year terms, Representatives are accountable to voters frequently and can be powerful advocates for community needs.`,
    candidatesContent:
      "Democratic candidates for HD-143 will be posted as campaigns are announced. Know who's running to represent YOUR district.",
    newsTitle: "HD-143 Race News",
    raceFilter: "ga_house_hd143",
    raceTags: ["ga_house", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-house-hd143-2026",
    },
    electionInfo: {
      district: "HD-143",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-house-hd146": {
    id: "ga-house-hd146",
    title: "Georgia House District 146",
    openSeat: true,
    subtitle: "Your Local Representative in Atlanta",
    aboutContent: `House District 146 represents your neighborhood in the Georgia General Assembly. Your State Representative votes on issues that directly affect Houston County families: school funding, healthcare access, infrastructure, and local services. With two-year terms, Representatives are accountable to voters frequently and can be powerful advocates for community needs.`,
    candidatesContent:
      "Democratic candidates for HD-146 will be posted as campaigns are announced. Know who's running to represent YOUR district.",
    newsTitle: "HD-146 Race News",
    raceFilter: "ga_house_hd146",
    raceTags: ["ga_house", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-house-hd146-2026",
    },
    electionInfo: {
      district: "HD-146",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-house-hd147": {
    id: "ga-house-hd147",
    title: "Georgia House District 147",
    openSeat: true,
    subtitle: "Your Local Representative in Atlanta",
    aboutContent: `House District 147 represents your neighborhood in the Georgia General Assembly. Your State Representative votes on issues that directly affect Houston County families: school funding, healthcare access, infrastructure, and local services. With two-year terms, Representatives are accountable to voters frequently and can be powerful advocates for community needs.`,
    candidatesContent:
      "Democratic candidates for HD-147 will be posted as campaigns are announced. Know who's running to represent YOUR district.",
    newsTitle: "HD-147 Race News",
    raceFilter: "ga_house_hd147",
    raceTags: ["ga_house", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-house-hd147-2026",
    },
    electionInfo: {
      district: "HD-147",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "ga-house-hd148": {
    id: "ga-house-hd148",
    title: "Georgia House District 148",
    openSeat: true,
    subtitle: "Your Local Representative in Atlanta",
    aboutContent: `House District 148 represents your neighborhood in the Georgia General Assembly. Your State Representative votes on issues that directly affect Houston County families: school funding, healthcare access, infrastructure, and local services. With two-year terms, Representatives are accountable to voters frequently and can be powerful advocates for community needs.`,
    candidatesContent:
      "Democratic candidates for HD-148 will be posted as campaigns are announced. Know who's running to represent YOUR district.",
    newsTitle: "HD-148 Race News",
    raceFilter: "ga_house_hd148",
    raceTags: ["ga_house", "ga_state", "state_legislature", "houston_county"],
    externalIds: {
      transparencyUSA: "ga-house-hd148-2026",
    },
    electionInfo: {
      district: "HD-148",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "us-house-ga08": {
    id: "us-house-ga08",
    title: "U.S. House GA-08",
    openSeat: true,
    subtitle: "Houston County's Voice in Congress",
    aboutContent: `Georgia's 8th Congressional District includes all of Houston County and sends one Representative to Washington, D.C. Your Member of Congress votes on federal legislation affecting healthcare, social security, veterans' benefits, farm policy, and national defense. With only 435 House members representing the entire country, your Representative's vote carries significant weight on issues that impact your family's future.`,
    candidatesContent:
      "Democratic candidates for GA-08 will be posted as campaigns are announced. Help elect a Representative who will fight for Middle Georgia in Washington.",
    newsTitle: "GA-08 Race News",
    raceFilter: "us_house_ga08",
    raceTags: ["us_house", "us_federal", "federal_legislature", "houston_county"],
    externalIds: {
      openFEC: "H6GA08",
      ballotpedia: "Georgia's_8th_Congressional_District",
    },
    electionInfo: {
      district: "GA-08",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "us-house-ga02": {
    id: "us-house-ga02",
    title: "U.S. House GA-02",
    openSeat: true,
    subtitle: "Southwest Georgia's Voice in Congress",
    aboutContent: `Georgia's 2nd Congressional District includes portions of Houston County and sends one Representative to Washington, D.C. Your Member of Congress votes on federal legislation affecting healthcare, social security, veterans' benefits, farm policy, and national defense. With only 435 House members representing the entire country, your Representative's vote carries significant weight on issues that impact your family's future.`,
    candidatesContent:
      "Democratic candidates for GA-02 will be posted as campaigns are announced. Help elect a Representative who will fight for Southwest Georgia in Washington.",
    newsTitle: "GA-02 Race News",
    raceFilter: "us_house_ga02",
    raceTags: ["us_house", "us_federal", "federal_legislature", "houston_county"],
    externalIds: {
      openFEC: "H6GA02",
      ballotpedia: "Georgia's_2nd_Congressional_District",
    },
    electionInfo: {
      district: "GA-02",
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 2,
    },
  },
  "us-senate-1": {
    id: "us-senate-1",
    title: "U.S. Senate",
    openSeat: false,
    subtitle: "Georgia's Voice in Washington",
    aboutContent: `One of Georgia's two U.S. Senate seats will be on the ballot in 2026. U.S. Senators serve six-year terms and represent the entire state in Washington, voting on Supreme Court nominees, federal judges, treaties, and major legislation. With only 100 Senators representing all 50 states, Georgia's Senators wield enormous influence over national policy. This race will help determine control of the Senate and the direction of the country.`,
    candidatesContent:
      "Information about candidates for Georgia's U.S. Senate seat will be posted as campaigns are announced. This is one of the most important races in the country.",
    newsTitle: "U.S. Senate Race News",
    raceFilter: "us_senate_ga",
    raceTags: ["us_senate", "us_federal", "federal_legislature", "statewide"],
    externalIds: {
      openFEC: "S6GA",
      ballotpedia: "United_States_Senate_election_in_Georgia,_2026",
    },
    electionInfo: {
      primary: "May 19, 2026",
      general: "November 3, 2026",
      termLength: 6,
    },
  },
};
