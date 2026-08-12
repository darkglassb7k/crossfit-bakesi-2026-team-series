// CrossFit Bakesi 2026 Team Series - Data
// Based on whiteboard photo (authoritative source for rosters & scores)

export interface Member {
  name: string;
  score: number; // Workout 1 (Individual) placement points
}

// Team-format workout result (a single score for the whole team, e.g. Workout 2)
export interface TeamWorkoutScore {
  workoutId: number;
  score: number;
}

// Per-workout contribution to the cumulative total (computed in analysis.ts)
export interface WorkoutContribution {
  workoutId: number;
  label: string; // "W1", "W2", ...
  format: "Individual" | "Team";
  score: number;
}

export interface WorkoutDetail {
  label: string;
  url?: string;
}

export interface WorkoutDescription {
  title: string;
  level: string;
  timeScheme: string;
  movements: string[];
  notes?: string[];
}

export interface Workout {
  id: number;
  name: string;
  date: string;
  type: string;
  format: string;
  status: "completed" | "upcoming";
  details?: WorkoutDetail[];
  description?: WorkoutDescription[];
  notes?: string[];
  eventTime?: string;
}

export interface TeamData {
  teamName: string;
  captainName: string;
  groupName: string;
  logo: string | null;
  totalScore: number; // cumulative across all completed workouts (lowest wins)
  members: Member[]; // Workout 1 individual scores
  teamScores: TeamWorkoutScore[]; // team-format workout results (WO2, ...)
  incomplete?: boolean; // team missed a completed workout — total shown as N/A, ranked last
  highlights: string[];
  badges: Badge[];
  // Computed in analysis.ts
  contributions?: WorkoutContribution[];
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
  { id: 2, name: "Workout 2", date: "May 17 - May 30", type: "In person/Remote", format: "MF-MF", status: "completed",
    eventTime: "Saturday May 23, 10:30 AM - 1:00 PM",
    description: [
      {
        title: "",
        level: "combined",
        timeScheme: "MF Partner Workout for Accumulated Repetition",
        movements: [
          "Pair 1: AMRAP 4",
          "3-6-9... Synchro DB Hang Clean to Overhead (50/35#)",
          "20 Total Double Unders after each round",
          "",
          "Pair 2: AMRAP 4",
          "3-6-9... Synchro DB Hang Clean to Overhead (35/20#)",
          "20 Total Single Unders after each round",
        ],
      },
    ],
    notes: [
      "Each team assigns one M/F pair to Pair 1 and the other to Pair 2. It's up to your team to strategize who does which",
      "If you cannot make it on May 23, find a coach to judge when you and your team members are available",
    ],
  },
  { id: 3, name: "Workout 3", date: "Aug 17 - Aug 29", type: "In person/Remote", format: "Individual", status: "upcoming",
    description: [
      {
        title: "",
        level: "individual",
        timeScheme: "10 Minutes Assault Bike",
        movements: [
          "Max Calories in 10 minutes on the Assault Bike",
        ],
      },
    ],
    notes: [
      "Score = Total Calories ÷ Body Weight",
    ],
  },
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
    totalScore: 305,
    members: [
      { name: "Howard", score: 27 },
      { name: "Steph", score: 19 },
      { name: "Stan", score: 105 },
      { name: "Kirstyn", score: 150 },
    ],
    teamScores: [{ workoutId: 2, score: 4 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Will",
    captainName: "Will",
    groupName: "DRAGONFRUIT",
    logo: "/logos/image4.png",
    totalScore: 320,
    members: [
      { name: "Will", score: 46 },
      { name: "Kat", score: 34 },
      { name: "Keishi", score: 83 },
      { name: "Amy", score: 141 },
    ],
    teamScores: [{ workoutId: 2, score: 16 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Derong",
    captainName: "Derong",
    groupName: "YEEHAW",
    logo: "/logos/image12.png",
    totalScore: 323,
    members: [
      { name: "Derong", score: 21 },
      { name: "Amber", score: 108 },
      { name: "Jerry", score: 62 },
      { name: "Xena", score: 115 },
    ],
    teamScores: [{ workoutId: 2, score: 17 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Kingson",
    captainName: "Kingson",
    groupName: "Barkesi",
    logo: "/logos/image1.png",
    totalScore: 317,
    members: [
      { name: "Kingson", score: 6 },
      { name: "Sherry", score: 81 },
      { name: "Jason", score: 154 },
      { name: "Flora", score: 69 },
    ],
    teamScores: [{ workoutId: 2, score: 7 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Marcus",
    captainName: "Marcus",
    groupName: "Rabbit Rapids",
    logo: "/logos/image5.png",
    totalScore: 337,
    members: [
      { name: "Marcus", score: 11 },
      { name: "Cindy", score: 88 },
      { name: "Steve L", score: 91 },
      { name: "Wendy", score: 133 },
    ],
    teamScores: [{ workoutId: 2, score: 14 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Seb",
    captainName: "Seb",
    groupName: "Buffalo Swoldiers",
    logo: "/logos/image8.png",
    totalScore: 331,
    members: [
      { name: "Seb", score: 3 },
      { name: "Chantal", score: 119 },
      { name: "Kevin", score: 93 },
      { name: "Yvette", score: 113 },
    ],
    teamScores: [{ workoutId: 2, score: 3 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Eddie C",
    captainName: "Eddie C",
    groupName: "",
    logo: "/logos/image2.png",
    totalScore: 349,
    members: [
      { name: "Eddie C", score: 31 },
      { name: "Stev", score: 22 },
      { name: "Roger", score: 144 },
      { name: "Jess", score: 140 },
    ],
    teamScores: [{ workoutId: 2, score: 12 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Eddie. L",
    captainName: "Eddie L",
    groupName: "Oink",
    logo: "/logos/image11.png",
    totalScore: 355,
    members: [
      { name: "Eddie L", score: 49 },
      { name: "Emma", score: 54 },
      { name: "Danny", score: 102 },
      { name: "Helen", score: 138 },
    ],
    teamScores: [{ workoutId: 2, score: 12 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Tyler",
    captainName: "Tyler",
    groupName: "Eye of the Barbell",
    logo: "/logos/image9.png",
    totalScore: 374,
    members: [
      { name: "Tyler", score: 22 },
      { name: "Karen", score: 117 },
      { name: "Bruce", score: 112 },
      { name: "Roxanne", score: 105 },
    ],
    teamScores: [{ workoutId: 2, score: 18 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Tony",
    captainName: "Tony",
    groupName: "",
    logo: null,
    totalScore: 388,
    members: [
      { name: "Tony", score: 51 },
      { name: "Cathy", score: 25 },
      { name: "Ben", score: 154 },
      { name: "Sharon", score: 138 },
    ],
    teamScores: [{ workoutId: 2, score: 20 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Pohan",
    captainName: "Pohan",
    groupName: "Jenni.佛",
    logo: "/logos/image3.png",
    totalScore: 410,
    members: [
      { name: "Pohan", score: 144 },
      { name: "June", score: 88 },
      { name: "Al", score: 75 },
      { name: "Chiaki", score: 80 },
    ],
    teamScores: [{ workoutId: 2, score: 23 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Rob",
    captainName: "Rob",
    groupName: "SLYTHERIN",
    logo: "/logos/image10.png",
    totalScore: 395,
    members: [
      { name: "Rob", score: 35 },
      { name: "Nancy", score: 65 },
      { name: "Isabel", score: 149 },
      { name: "Louis", score: 125 },
    ],
    teamScores: [{ workoutId: 2, score: 21 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team TJ",
    captainName: "TJ",
    groupName: "BARBELL MONKEYS",
    logo: "/logos/image7.png",
    totalScore: 402,
    members: [
      { name: "TJ", score: 154 },
      { name: "Niki", score: 26 },
      { name: "Steve Chu", score: 66 },
      { name: "Lillian", score: 135 },
    ],
    teamScores: [{ workoutId: 2, score: 21 }],
    highlights: [],
    badges: [],
  },
  {
    teamName: "Team Ed",
    captainName: "Ed",
    groupName: "",
    logo: null,
    totalScore: 410, // Workout 1 only — did not compete in Workout 2
    incomplete: true,
    members: [
      { name: "Ed", score: 45 },
      { name: "Pei Li", score: 93 },
      { name: "Ping", score: 149 },
      { name: "Tina", score: 123 },
    ],
    teamScores: [],
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
