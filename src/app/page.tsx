"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Trophy,
  Flame,
  TrendingUp,
  Star,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  Zap,
  Users,
  Timer,
  Award,
  CircleCheck,
  Medal,
} from "lucide-react";
import { teams as rawTeams, workouts, quotes, TeamData, Badge } from "@/data/teams";
import { analyzeTeams, getNextWorkout } from "@/lib/analysis";

function BadgeIcon({ icon, className }: { icon: Badge["icon"]; className?: string }) {
  const props = { className: className || "w-5 h-5", strokeWidth: 2 };
  switch (icon) {
    case "trophy": return <Trophy {...props} />;
    case "flame": return <Flame {...props} />;
    case "star": return <Star {...props} />;
    case "trending-up": return <TrendingUp {...props} />;
  }
}

function displayName(team: TeamData) {
  return team.groupName || team.teamName;
}

export default function Dashboard() {
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);
  const [quote, setQuote] = useState(quotes[0]);
  const [scheduleOpen, setScheduleOpen] = useState(true);

  const analyzedTeams = useMemo(() => {
    const result = analyzeTeams(rawTeams);
    return result.sort((a, b) => a.totalScore - b.totalScore);
  }, []);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextWorkout = useMemo(() => getNextWorkout(workouts), []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-purple-900/40">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                <span className="text-[#8A2BE2]">CROSSFIT</span>{" "}
                <span className="text-white">BAKESI</span>
              </h1>
              <p className="text-lg text-purple-300 font-semibold mt-1">
                2026 TEAM SERIES DASHBOARD
              </p>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-purple-400/80 italic text-sm transition-all duration-500">
              &ldquo;{quote}&rdquo;
            </p>
            {nextWorkout && nextWorkout.days > 0 && (
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-gray-400">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>
                  Countdown to Next Workout:{" "}
                  <span className="font-bold text-[#8A2BE2]">{nextWorkout.days}</span> days
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Schedule */}
      <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-[#1a1a2e] border border-purple-800/40 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                2026 Schedule
              </h2>
              <button
                onClick={() => setScheduleOpen(!scheduleOpen)}
                className="p-1.5 rounded-lg hover:bg-purple-900/30 text-gray-500 hover:text-purple-300 transition-colors"
              >
                {scheduleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            {scheduleOpen && (
            <div className="grid gap-3 mt-4">
              {workouts.map((w) => {
                const isNext = nextWorkout?.workout.id === w.id;
                return (
                <div
                  key={w.id}
                  className={`p-4 rounded-xl border transition-all ${
                    w.status === "completed"
                      ? "bg-green-900/10 border-green-800/30"
                      : isNext
                      ? "bg-purple-900/20 border-purple-600/50 shadow-[0_0_20px_rgba(138,43,226,0.15)]"
                      : "bg-[#121212] border-gray-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {w.status === "completed" ? (
                      <CircleCheck className="w-5 h-5 text-green-400 shrink-0" />
                    ) : isNext ? (
                      <Zap className="w-5 h-5 text-yellow-400 animate-pulse shrink-0" />
                    ) : (
                      <Timer className="w-5 h-5 text-gray-500 shrink-0" />
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-3">
                      <div>
                        <p className="font-bold text-lg">{w.name}</p>
                        <p className="text-sm text-gray-400">{w.date}</p>
                        <p className="text-sm text-gray-500">{w.type}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className="text-xs bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full font-medium">
                          {w.format}
                        </span>
                        {isNext && nextWorkout && nextWorkout.days > 0 && (
                          <span className="text-xs bg-yellow-900/40 text-yellow-300 px-3 py-1 rounded-full font-bold animate-pulse flex items-center gap-1">
                            <Flame className="w-3 h-3" /> {nextWorkout.label}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
            )}
          </div>
        </div>

      {/* Leaderboard */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#8A2BE2]" />
            LEADERBOARD
          </h2>
          <p className="text-sm text-gray-500 mt-1 pl-11">(lowest score wins)</p>
        </div>

        <div className="grid gap-4">
          {analyzedTeams.map((team, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            const medalColors = [
              "from-yellow-500/20 to-yellow-900/10 border-yellow-500/50",
              "from-gray-300/15 to-gray-700/10 border-gray-400/40",
              "from-orange-600/15 to-orange-900/10 border-orange-500/40",
            ];

            return (
              <button
                key={team.teamName}
                onClick={() => setSelectedTeam(team)}
                className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer group ${
                  isTop3
                    ? `bg-gradient-to-r ${medalColors[rank - 1]} shadow-[0_0_25px_rgba(138,43,226,0.2)]`
                    : "bg-[#1a1a2e] border-gray-800/40 hover:border-purple-700/50"
                }`}
              >
                {/* Grid: fixed columns for rank, logo, name (flex), score */}
                <div className="grid items-center gap-3" style={{ gridTemplateColumns: "3rem 3rem 1fr auto" }}>
                  {/* Rank */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-black text-lg md:text-xl ${
                      rank === 1
                        ? "bg-yellow-500/30 text-yellow-300"
                        : rank === 2
                        ? "bg-gray-400/20 text-gray-300"
                        : rank === 3
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-gray-800/50 text-gray-500"
                    }`}
                  >
                    {`#${rank}`}
                  </div>

                  {/* Logo */}
                  {team.logo ? (
                    <img
                      src={team.logo}
                      alt={`${displayName(team)} logo`}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain bg-white/10 p-1"
                    />
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-900/30 flex items-center justify-center">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                    </div>
                  )}

                  {/* Name + Members */}
                  <div className="min-w-0">
                    <h3 className="text-sm md:text-xl font-black group-hover:text-purple-300 transition-colors truncate">
                      {displayName(team)}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {team.members.map((m) => m.name).join(" · ")}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-2xl md:text-3xl font-black text-white">{team.totalScore}</p>
                    <p className="text-xs text-gray-500">pts</p>
                  </div>
                </div>

                {/* Badges row */}
                {team.badges.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap" style={{ gridColumn: "2 / -1" }}>
                    {team.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-xs bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full"
                        title={badge.detail}
                      >
                        <BadgeIcon icon={badge.icon} className="w-3 h-3" />
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-purple-800/50 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(138,43,226,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-purple-900/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {selectedTeam.logo ? (
                    <img
                      src={selectedTeam.logo}
                      alt={`${displayName(selectedTeam)} logo`}
                      className="w-16 h-16 rounded-xl object-contain bg-white/10 p-1"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-purple-900/30 flex items-center justify-center">
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-black">{displayName(selectedTeam)}</h3>
                    <p className="text-purple-400 text-sm mt-1">
                      Total: <span className="font-bold text-white text-lg">{selectedTeam.totalScore}</span>
                      <span className="text-gray-500 ml-2">
                        · Rank #{analyzedTeams.findIndex((t) => t.teamName === selectedTeam.teamName) + 1}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="p-2 hover:bg-purple-900/30 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Members */}
            <div className="p-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Individual Scores
              </h4>
              <div className="grid gap-2">
                {[...selectedTeam.members]
                  .sort((a, b) => a.score - b.score)
                  .map((member, i) => {
                    const isTeamBest = i === 0;
                    return (
                      <div
                        key={member.name}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          isTeamBest
                            ? "bg-purple-900/30 border border-purple-700/40"
                            : "bg-[#121212] border border-gray-800/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isTeamBest && <Star className="w-4 h-4 text-yellow-400" />}
                          <span className={`font-bold ${isTeamBest ? "text-purple-200" : ""}`}>
                            {member.name}
                          </span>
                          {isTeamBest && (
                            <span className="text-xs bg-yellow-900/40 text-yellow-300 px-2 py-0.5 rounded-full">
                              Top Performer
                            </span>
                          )}
                        </div>
                        <span className="font-black text-lg">{member.score}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Badges */}
            {selectedTeam.badges.length > 0 && (
              <div className="px-6 pb-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Awards
                </h4>
                <div className="grid gap-2">
                  {selectedTeam.badges.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-purple-900/20 border border-purple-800/30 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-purple-900/40 rounded-xl flex items-center justify-center">
                        <BadgeIcon icon={badge.icon} className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="font-bold text-purple-200">{badge.label}</p>
                        <p className="text-sm text-gray-400">{badge.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-purple-900/30 py-6 text-center text-sm text-gray-600">
        <p>CrossFit Bakesi · 2026 Team Series · Positive Vibes Only</p>
      </footer>
    </div>
  );
}
