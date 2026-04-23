// Positive-only analysis engine for CrossFit Bakesi Team Series
import { TeamData, Badge, Workout } from "@/data/teams";

/**
 * Compute positive highlights and badges for each team.
 * Only badge awarded: Team Synergy (close scores among all 4 members).
 */
export function analyzeTeams(teams: TeamData[]): TeamData[] {
  const analyzed = teams.map((t) => ({ ...t, highlights: [] as string[], badges: [] as Badge[] }));

  for (const team of analyzed) {
    const scores = team.members.map((m) => m.score);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const range = max - min;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const cv = range / avg;

    if (cv < 0.6) {
      team.badges.push({
        type: "synergy",
        label: "Team Synergy",
        detail: `Only ${range} pts between all four members — great chemistry!`,
        icon: "flame",
      });
    }
  }

  return analyzed;
}

/**
 * Find the next upcoming workout and compute days until it starts.
 */
export function getNextWorkout(workouts: Workout[]): { workout: Workout; days: number; label: string } | null {
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  const upcoming = workouts.filter((w) => w.status === "upcoming");
  if (upcoming.length === 0) return null;

  // Parse the start date from the date string (e.g. "May 17 - May 30" or "Nov 29")
  function parseStartDate(dateStr: string): Date {
    const start = dateStr.split(" - ")[0].trim();
    const parts = start.split(" ");
    const month = monthMap[parts[0]] ?? 0;
    const day = parseInt(parts[1]) || 1;
    return new Date(2026, month, day);
  }

  // Sort by start date, pick the earliest upcoming
  const sorted = [...upcoming].sort(
    (a, b) => parseStartDate(a.date).getTime() - parseStartDate(b.date).getTime()
  );
  const next = sorted[0];
  const target = parseStartDate(next.date);
  const now = new Date();
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    return { workout: next, days: diff, label: `${diff} days to go` };
  } else if (diff === 0) {
    return { workout: next, days: 0, label: "Game day!" };
  } else {
    return null; // already past, shouldn't happen for "upcoming" but just in case
  }
}
