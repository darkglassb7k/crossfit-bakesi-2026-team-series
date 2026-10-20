// CrossFit Bakesi 2026 Team Series - Data
// Based on whiteboard photo (authoritative source for rosters & scores)

export interface Member {
  name: string;
  score: number; // Workout 1 (Individual) placement points
  individualScores?: Record<number, number>; // later individual workouts (W3, ...), keyed by workout id
  workoutNames?: Record<number, string>; // who actually did a given workout, when it differs from `name`
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
  totalScore: number; // cumulative across all completed workouts (lowest wins), recomputed in analysis.ts
  members: Member[]; // individual workout scores (W1, W3, ...)
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
  { id: 3, name: "Workout 3", date: "Aug 17 - Aug 29", type: "In person/Remote", format: "Individual", status: "completed",
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
  { id: 4, name: "Workout 4", date: "Oct 20 - Oct 31", type: "In person/Remote", format: "Individual", status: "upcoming",
    description: [
      {
        title: "",
        level: "individual",
        timeScheme: "Option 1: For Time",
        movements: [
          "50 Shuttle Runs (25 ft x2)",
          "50 Burpee Box Jump Overs (24/20\")",
        ],
      },
      {
        title: "",
        level: "individual",
        timeScheme: "Option 2: 2 Rounds for Time",
        movements: [
          "25 Shuttle Runs (25 ft x2)",
          "25 Burpee Box Jump Overs (24/20\")",
        ],
      },
      {
        title: "",
        level: "individual",
        timeScheme: "Option 3: For Time",
        movements: [
          "25 Shuttle Runs (25 ft x2)",
          "50 Burpee Box Jump Overs (24/20\")",
          "25 Shuttle Runs (25 ft x2)",
        ],
      },
      {
        title: "",
        level: "individual",
        timeScheme: "Option 4: 5 Rounds for Time",
        movements: [
          "10 Shuttle Runs (25 ft x2)",
          "10 Burpee Box Jump Overs (24/20\")",
        ],
      },
    ],
    notes: [
      "Each teammate completes ONE of the four options",
      "Step over OK on the Burpee Box Jump Overs",
    ],
  },
  { id: 5, name: "Workout 5 / 6", date: "Nov 29", type: "In person", format: "Team Series", status: "upcoming" },
  { id: 6, name: "Workout 7 / 8", date: "Dec 5", type: "In person", format: "Team Series", status: "upcoming" },
];

// 13 teams. W1 + W3 individual scores from the Team series.xlsx Individual Leader Board
// Logo mapping from Google Doc HTML export
export const teams: TeamData[] = [
  {
    teamName: "Team Howard",
    captainName: "Howard",
    groupName: "Thigh Masters",
    logo: "/logos/image6.png",
    totalScore: 383,
    members: [
      { name: "Howard", score: 27, individualScores: { 3: 2 } },
      { name: "Steph", score: 19, individualScores: { 3: 12 } },
      { name: "Stan", score: 105, individualScores: { 3: 25 } },
      { name: "Kirstyn", score: 150, individualScores: { 3: 39 } },
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
    totalScore: 381,
    members: [
      { name: "Will", score: 46, individualScores: { 3: 4 } },
      { name: "Kat", score: 34, individualScores: { 3: 13 } },
      { name: "Keishi", score: 83, individualScores: { 3: 28 } },
      { name: "Amy", score: 141, individualScores: { 3: 16 } },
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
    totalScore: 380,
    members: [
      { name: "Derong", score: 21, individualScores: { 3: 1 } },
      { name: "Amber", score: 109, individualScores: { 3: 33 } },
      { name: "Jerry", score: 62, individualScores: { 3: 15 } },
      { name: "Xena", score: 116, individualScores: { 3: 6 } },
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
    totalScore: 427,
    members: [
      { name: "Kingson", score: 6, individualScores: { 3: 8 } },
      { name: "Sherry/Regina", score: 81, individualScores: { 3: 20 }, workoutNames: { 1: "Sherry", 3: "Regina" } },
      { name: "Jason", score: 154, individualScores: { 3: 48 } },
      { name: "Flora", score: 69, individualScores: { 3: 34 } },
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
    totalScore: 445,
    members: [
      { name: "Marcus", score: 11, individualScores: { 3: 10 } },
      { name: "Cindy", score: 88, individualScores: { 3: 32 } },
      { name: "Steve L", score: 91, individualScores: { 3: 19 } },
      { name: "Wendy", score: 133, individualScores: { 3: 47 } },
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
    totalScore: 425,
    members: [
      { name: "Seb", score: 3, individualScores: { 3: 3 } },
      { name: "Chantal", score: 119, individualScores: { 3: 46 } },
      { name: "Kevin", score: 93, individualScores: { 3: 14 } },
      { name: "Yvette", score: 113, individualScores: { 3: 31 } },
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
    totalScore: 520,
    members: [
      { name: "Eddie C", score: 31, individualScores: { 3: 5 } },
      { name: "Stev", score: 55, individualScores: { 3: 41 } },
      { name: "Roger", score: 144, individualScores: { 3: 49 } },
      { name: "Jess", score: 140, individualScores: { 3: 43 } },
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
    totalScore: 472,
    members: [
      { name: "Eddie L", score: 49, individualScores: { 3: 9 } },
      { name: "Emma", score: 54, individualScores: { 3: 23 } },
      { name: "Danny", score: 103, individualScores: { 3: 38 } },
      { name: "Helen", score: 139, individualScores: { 3: 45 } },
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
    totalScore: 515,
    members: [
      { name: "Tyler", score: 22, individualScores: { 3: 27 } },
      { name: "Karen", score: 117, individualScores: { 3: 40 } },
      { name: "Bruce", score: 112, individualScores: { 3: 44 } },
      { name: "Roxanne", score: 105, individualScores: { 3: 30 } },
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
    totalScore: 527,
    members: [
      { name: "Tony", score: 51, individualScores: { 3: 24 } },
      { name: "Cathy", score: 25, individualScores: { 3: 17 } },
      { name: "Ben", score: 154, individualScores: { 3: 49 } },
      { name: "Sharon", score: 138, individualScores: { 3: 49 } },
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
    totalScore: 493,
    members: [
      { name: "Pohan", score: 130, individualScores: { 3: 18 } },
      { name: "June", score: 89, individualScores: { 3: 37 } },
      { name: "Al", score: 75, individualScores: { 3: 29 } },
      { name: "Chiaki", score: 81, individualScores: { 3: 11 } },
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
    totalScore: 520,
    members: [
      { name: "Rob", score: 35, individualScores: { 3: 22 } },
      { name: "Nancy", score: 65, individualScores: { 3: 35 } },
      { name: "Isabel", score: 125, individualScores: { 3: 42 } },
      { name: "Louis", score: 149, individualScores: { 3: 26 } },
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
    totalScore: 515,
    members: [
      { name: "TJ", score: 154, individualScores: { 3: 49 } },
      { name: "Niki", score: 26, individualScores: { 3: 7 } },
      { name: "Steve Chu", score: 66, individualScores: { 3: 21 } },
      { name: "Lillian", score: 135, individualScores: { 3: 36 } },
    ],
    teamScores: [{ workoutId: 2, score: 21 }],
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
