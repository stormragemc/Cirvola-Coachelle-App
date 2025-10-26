import { motion } from "motion/react";

interface BadgeProps {
  emoji: string;
  title: string;
  achieved: boolean;
}

function Badge({ emoji, title, achieved }: BadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex-1 rounded-xl p-3 text-center transition-all min-w-[70px] ${
        achieved 
          ? "bg-gradient-to-br from-[#8BC34A] to-[#7CB342] shadow-md" 
          : "bg-gray-100"
      }`}
      style={{
        boxShadow: achieved ? "0 0 20px rgba(139, 195, 74, 0.3)" : "none"
      }}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <p className={`text-xs ${achieved ? "text-white" : "text-gray-500"}`}>
        {title}
      </p>
    </motion.div>
  );
}

export function AchievementsEnhanced() {
  const badges = [
    { emoji: "🥇", title: "Waste Warrior", achieved: true },
    { emoji: "🧑‍🍳", title: "Circular Chef", achieved: true },
    { emoji: "🌍", title: "Carbon Cutter", achieved: true },
    { emoji: "🧃", title: "Explorer", achieved: true },
    { emoji: "🏆", title: "Eco Champion", achieved: false },
  ];

  const progress = 72; // 72% toward next milestone

  return (
    <div>
      <h3 className="text-gray-700 mb-3">Your Achievements 🏆</h3>
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
          {badges.map((badge, idx) => (
            <Badge key={idx} {...badge} />
          ))}
        </div>
        
        {/* Progress section */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-900">Total Impact</p>
              <p className="text-xs text-gray-600">You're <span className="text-[#8BC34A]">{progress}%</span> toward your next milestone</p>
            </div>
            <div className="relative w-16 h-16">
              {/* Circular progress */}
              <svg className="transform -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#8BC34A"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-[#8BC34A]">5.2kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
