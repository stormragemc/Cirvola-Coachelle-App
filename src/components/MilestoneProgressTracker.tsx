import { motion } from "motion/react";
import { Trophy, TrendingUp, Zap } from "lucide-react";

interface MilestoneLevel {
  title: string;
  emoji: string;
  required: number;
  color: string;
}

export function MilestoneProgressTracker() {
  // Define milestone levels
  const milestoneLevels: MilestoneLevel[] = [
    { title: "Eco Starter", emoji: "🌱", required: 0, color: "#9E9E9E" },
    { title: "Waste Warrior", emoji: "🥇", required: 10, color: "#FFB74D" },
    { title: "Circular Chef", emoji: "🧑‍🍳", required: 25, color: "#64B5F6" },
    { title: "Carbon Cutter", emoji: "🌍", required: 50, color: "#81C784" },
    { title: "Explorer", emoji: "🧃", required: 75, color: "#9575CD" },
    { title: "Eco Champion", emoji: "🏆", required: 100, color: "#F6C83B" },
  ];

  // Current user stats
  const currentActivities = 72; // activities completed
  const currentWaste = 5.2; // kg waste valorised

  // Find current and next level
  let currentLevel = milestoneLevels[0];
  let nextLevel = milestoneLevels[1];
  
  for (let i = milestoneLevels.length - 1; i >= 0; i--) {
    if (currentActivities >= milestoneLevels[i].required) {
      currentLevel = milestoneLevels[i];
      nextLevel = milestoneLevels[i + 1] || milestoneLevels[i];
      break;
    }
  }

  const activitiesNeeded = nextLevel.required - currentActivities;
  const progressPercent = nextLevel.required > 0 
    ? ((currentActivities - currentLevel.required) / (nextLevel.required - currentLevel.required)) * 100 
    : 0;

  return (
    <div>
      <h3 className="text-gray-700 mb-3">Your Progress 🚀</h3>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        {/* Current Level Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md"
              style={{
                background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}dd)`,
              }}
            >
              {currentLevel.emoji}
            </div>
            <div>
              <p className="text-xs text-gray-600">Current Level</p>
              <p className="text-gray-900">{currentLevel.title}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl text-[#8BC34A] font-semibold">{currentActivities}</p>
            <p className="text-xs text-gray-600">activities</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-700">Progress to {nextLevel.title}</p>
            <p className="text-sm text-[#8BC34A]">{Math.round(progressPercent)}%</p>
          </div>
          
          {/* Track */}
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            {/* Progress fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8BC34A] to-[#7CB342] rounded-full"
            />
            
            {/* Milestone markers */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {milestoneLevels.slice(0, -1).map((level, idx) => {
                const position = ((level.required - currentLevel.required) / (nextLevel.required - currentLevel.required)) * 100;
                if (position < 0 || position > 100) return null;
                
                return (
                  <div
                    key={idx}
                    className="absolute w-1 h-3 bg-white/50 rounded-full"
                    style={{ left: `${position}%` }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Runner Icon */}
          <motion.div
            initial={{ left: "0%" }}
            animate={{ left: `${Math.min(progressPercent, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative -mt-1"
            style={{ width: "fit-content" }}
          >
            <div className="w-6 h-6 bg-white border-2 border-[#8BC34A] rounded-full flex items-center justify-center shadow-md -ml-3">
              <Zap className="w-3 h-3 text-[#8BC34A] fill-[#8BC34A]" />
            </div>
          </motion.div>
        </div>

        {/* Next Level Info */}
        <div className="bg-gradient-to-br from-[#EAF6E3] to-white rounded-xl p-4 border border-[#8BC34A]/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl">{nextLevel.emoji}</div>
              <div>
                <p className="text-xs text-gray-600">Next Level</p>
                <p className="text-sm text-gray-900">{nextLevel.title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-[#8BC34A]">{activitiesNeeded}</p>
              <p className="text-xs text-gray-600">more activities</p>
            </div>
          </div>

          {/* Unlock Preview */}
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <TrendingUp className="w-4 h-4 text-[#8BC34A] flex-shrink-0 mt-0.5" />
            <p>
              Complete <span className="text-[#8BC34A]">{activitiesNeeded} more activities</span> to unlock the <span className="text-gray-900">{nextLevel.title}</span> title and exclusive rewards!
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl text-gray-900 mb-1">{currentWaste}kg</p>
            <p className="text-xs text-gray-600">waste valorised</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl text-gray-900 mb-1">{nextLevel.required}</p>
            <p className="text-xs text-gray-600">target activities</p>
          </div>
        </div>

        {/* All Milestones Preview */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full text-sm text-[#8BC34A] hover:text-[#7CB342] flex items-center justify-center gap-2 py-2">
            <Trophy className="w-4 h-4" />
            View All Milestones
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 195, 74, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(139, 195, 74, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
