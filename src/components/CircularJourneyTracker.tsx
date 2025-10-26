import { motion } from "motion/react";
import { Trophy, Sparkles, Leaf, Target } from "lucide-react";

export function CircularJourneyTracker() {
  const userLevel = "Carbon Cutter";
  const currentActivities = 72;
  const nextMilestone = 75;
  const progress = (currentActivities / nextMilestone) * 100;

  const milestones = [
    { id: 1, name: "Eco Starter", emoji: "🌱", activities: 0, unlocked: true },
    { id: 2, name: "Waste Warrior", emoji: "🥇", activities: 10, unlocked: true },
    { id: 3, name: "Circular Chef", emoji: "🧑‍🍳", activities: 25, unlocked: true },
    { id: 4, name: "Carbon Cutter", emoji: "🌍", activities: 50, unlocked: true, current: true },
    { id: 5, name: "Explorer", emoji: "🧃", activities: 75, unlocked: false },
    { id: 6, name: "Eco Champion", emoji: "🏆", activities: 100, unlocked: false },
  ];

  const badges = [
    { name: "First Valorisation", icon: "🎯", earned: true },
    { name: "Community Star", icon: "⭐", earned: true },
    { name: "Week Streak", icon: "🔥", earned: true },
    { name: "Innovator", icon: "💡", earned: false },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8BC34A] to-[#4FAE68] dark:from-[#6ba03f] dark:to-[#4a8357] flex items-center justify-center shadow-md">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Your Circular Journey</h3>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">Track your eco-progress</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-gradient-to-r from-[#F6C83B] to-[#FFB74D] px-3 py-1.5 rounded-full shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-semibold text-white">{userLevel}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-[#F8F9F6] dark:from-[#2d3a4d] dark:to-[#1e2738] rounded-2xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
        {/* Circular Path Visualization */}
        <div className="relative mb-3">
          {/* Progress Circle */}
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-28 h-28">
              {/* Background circle */}
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#E5E7EB"
                  strokeWidth="7"
                  fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="url(#gradient)"
                  strokeWidth="7"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 302" }}
                  animate={{ strokeDasharray: `${(progress / 100) * 302} 302` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8BC34A" />
                    <stop offset="100%" stopColor="#4FAE68" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl mb-0.5">🌍</span>
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Level 4</span>
              </div>
            </div>
          </div>

          {/* Milestone Path */}
          <div className="space-y-1.5 mb-3">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${
                    milestone.unlocked
                      ? "bg-gradient-to-br from-[#8BC34A] dark:from-[#6ba03f] to-[#4FAE68] dark:to-[#4a8357] text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                  } ${milestone.current ? "ring-2 ring-[#F6C83B] ring-offset-1 dark:ring-offset-[#2d3a4d]" : ""}`}
                >
                  {milestone.emoji}
                </div>
                <div className="flex-1">
                  <p className={`text-[11px] font-medium ${milestone.current ? "text-[#3C6E47] dark:text-[#6ba03f]" : "text-gray-700 dark:text-gray-300"}`}>
                    {milestone.name}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{milestone.activities} activities</p>
                </div>
                {milestone.current && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-4 h-4 text-[#F6C83B]" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Next Milestone */}
          <div className="bg-gradient-to-r from-[#EAF6E3] dark:from-[#2a3f2b] to-[#F0F7F2] dark:to-[#1e2f1f] rounded-xl p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#3C6E47] dark:text-[#6ba03f]" />
              <p className="text-xs text-gray-700 dark:text-gray-300">Next: Explorer</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-[#8BC34A] dark:from-[#6ba03f] to-[#4FAE68] dark:to-[#4a8357] h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">{currentActivities}/{nextMilestone}</span>
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Recent Badges</p>
            <div className="grid grid-cols-4 gap-2">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                    badge.earned
                      ? "bg-gradient-to-br from-[#F6C83B]/20 to-[#FFE082]/20 dark:from-[#F6C83B]/30 dark:to-[#e0b035]/30 border border-[#F6C83B]/30 dark:border-[#F6C83B]/50"
                      : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <span className={`text-xl ${!badge.earned && "grayscale opacity-40"}`}>
                    {badge.icon}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center px-1 line-clamp-1">
                    {badge.name.split(" ")[0]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
