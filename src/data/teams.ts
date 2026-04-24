// CrossFit Bakesi 2026 Team Series - Data
// Based on whiteboard photo (authoritative source for rosters & scores)

export interface Member {
  name: string;
  score: number;
}

export interface WorkoutDetail {
  label: string;
  url: string;
}

export interface Workout {
  id: number;
  name: string;
  date: string;
  type: string;
  format: string;
  status: "completed" | "upcoming";
  details?: WorkoutDetail[];
}

export interface TeamData {
  teamName: string;
  captainName: string;
  groupName: string;
  logo: string | null;
  totalScore: number;
  members: Member[];
  highlights: string[];
  badges: Badge[];
}

export interface Badge {
  type: "mvp" | "synergy" | "rising-star" | "climber";
  label: string;
  detail: string;
  icon: "trophy" | "flame" | "star" | "trending-up";
}

// Schedule
export const workouts: Workout[] = [
  { id: 1, name: "Workout 1", date: "Feb 28 - Mar 3", type: "In person/Remote", format: "Individual", status: "completed", details: [
    { label: "2026 CrossFit Open 26.1", url: "https://games.crossfit.com/workouts/open/2026/1" },
    { label: "2026 CrossFit Open 26.2", url: "https://games.crossfit.com/workouts/open/2026/2" },
    { label: "2026 CrossFit Open 26.3", url: "https://games.crossfit.com/workouts/open/2026/3" },
  ] },
  { id: 2, name: "Workout 2", date: "May 17 - May 30", type: "In person/Remote", format: "MF-MF", status: "upcoming" },
  { id: 3, name: "Workout 3", date: "Aug 16 - Aug 29", type: "In person/Remote", format: "Individual", status: "upcoming" },
  { id: 4, name: "Workout 4", date: "Oct 18 - Oct 31", type: "In person/Remote", format: "Individual", status: "upcoming" },
  { id: 5, name: "Workout 5 / 6", date: "Nov 29", type: "In person", format: "Team Series", status: "upcoming" },
  { id: 6, name: "Workout 7 / 8", date: "Dec 5", type: "In person", format: "Team Series", status: "upcoming" },
];

// All 14 teams with Workout 1 individual scores from the whiteboard photo
// Logo mapping from Google Doc HTML export
export const teams: TeamData[] = [
  {
    teamName: "Team Howard",
    captainName: "Howard",
    groupName: "Thigh Masters",
    logo: "/logos/image6.png",
    totalScore: 301,
    members: [
      { name: "Howard", score: 27 },
      { name: "Steph", score: 19 },
      { name: "Stan", score: 105 },
      { name: "Kirstyn", score: 150 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Will",
    captainName: "Will",
    groupName: "DRAGONFRUIT",
    logo: "/logos/image4.png",
    totalScore: 304,
    members: [
      { name: "Will", score: 46 },
      { name: "Kat", score: 34 },
      { name: "Keishi", score: 83 },
      { name: "Amy", score: 141 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Derong",
    captainName: "Derong",
    groupName: "YEEHAW",
    logo: "/logos/image12.png",
    totalScore: 306,
    members: [
      { name: "Derong", score: 21 },
      { name: "Amber", score: 108 },
      { name: "Jerry", score: 62 },
      { name: "Xena", score: 115 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Kingson",
    captainName: "Kingson",
    groupName: "Barkesi",
    logo: "/logos/image1.png",
    totalScore: 310,
    members: [
      { name: "Kingson", score: 6 },
      { name: "Sherry", score: 81 },
      { name: "Jason", score: 154 },
      { name: "Flora", score: 69 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Marcus",
    captainName: "Marcus",
    groupName: "Rabbit Rapids",
    logo: "/logos/image5.png",
    totalScore: 323,
    members: [
      { name: "Marcus", score: 11 },
      { name: "Cindy", score: 88 },
      { name: "Steve L", score: 91 },
      { name: "Wendy", score: 133 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Seb",
    captainName: "Seb",
    groupName: "Buffalo Swoldiers",
    logo: "/logos/image8.png",
    totalScore: 328,
    members: [
      { name: "Seb", score: 3 },
      { name: "Chantal", score: 119 },
      { name: "Kevin", score: 93 },
      { name: "Yvette", score: 113 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Eddie C",
    captainName: "Eddie C",
    groupName: "",
    logo: "/logos/image2.png",
    totalScore: 337,
    members: [
      { name: "Eddie C", score: 31 },
      { name: "Stev", score: 22 },
      { name: "Roger", score: 144 },
      { name: "Jess", score: 140 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Eddie. L",
    captainName: "Eddie L",
    groupName: "Oink",
    logo: "/logos/image11.png",
    totalScore: 343,
    members: [
      { name: "Eddie L", score: 49 },
      { name: "Emma", score: 54 },
      { name: "Danny", score: 102 },
      { name: "Helen", score: 138 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Tyler",
    captainName: "Tyler",
    groupName: "Eye of the Barbell",
    logo: "/logos/image9.png",
    totalScore: 356,
    members: [
      { name: "Tyler", score: 22 },
      { name: "Karen", score: 117 },
      { name: "Bruce", score: 112 },
      { name: "Roxanne", score: 105 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Tony",
    captainName: "Tony",
    groupName: "",
    logo: null,
    totalScore: 368,
    members: [
      { name: "Tony", score: 51 },
      { name: "Cathy", score: 25 },
      { name: "Ben", score: 154 },
      { name: "Sharon", score: 138 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Pohan",
    captainName: "Pohan",
    groupName: "Jenni.佛",
    logo: "/logos/image3.png",
    totalScore: 373,
    members: [
      { name: "Pohan", score: 130 },
      { name: "June", score: 88 },
      { name: "Al", score: 75 },
      { name: "Chiaki", score: 80 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Rob",
    captainName: "Rob",
    groupName: "SLYTHERIN",
    logo: "/logos/image10.png",
    totalScore: 374,
    members: [
      { name: "Rob", score: 35 },
      { name: "Nancy", score: 65 },
      { name: "Isabel", score: 149 },
      { name: "Louis", score: 125 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team TJ",
    captainName: "TJ",
    groupName: "BARBELL MONKEYS",
    logo: "/logos/image7.png",
    totalScore: 381,
    members: [
      { name: "TJ", score: 154 },
      { name: "Niki", score: 26 },
      { name: "Steve Chu", score: 66 },
      { name: "Lillian", score: 135 },
    ],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Ed",
    captainName: "Ed",
    groupName: "",
    logo: null,
    totalScore: 410,
    members: [
      { name: "Ed", score: 45 },
      { name: "Pei Li", score: 93 },
      { name: "Ping", score: 149 },
      { name: "Tina", score: 123 },
    ],
    highlights: [],
    badges: [],
  },
];

// Motivational quotes
export const quotes: string[] = [
  "Better than yesterday.",
  "Community first.",
  "Stronger together.",
  "Every rep counts.",
  "Trust the process.",
  "Your only limit is you.",
  "Show up. Work hard. Be kind.",
  "Progress, not perfection.",
  "Embrace the grind.",
  "Effort is a choice.",
];
