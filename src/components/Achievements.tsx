import { Award } from "lucide-react";

interface BadgeProps {
  emoji: string;
  title: string;
  achieved: boolean;
}

function Badge({ emoji, title, achieved }: BadgeProps) {
  return (
    <div className={`flex-1 rounded-xl p-3 text-center transition-all ${
      achieved 
        ? "bg-gradient-to-br from-[#8BC34A] to-[#7CB342] shadow-sm" 
        : "bg-gray-100"
    }`}>
      <div className="text-2xl mb-1">{emoji}</div>
      <p className={`text-xs ${achieved ? "text-white" : "text-gray-500"}`}>
        {title}
      </p>
    </div>
  );
}

export function Achievements() {
  const badges = [
    { emoji: "🥇", title: "Waste Warrior", achieved: true },
    { emoji: "🧑‍🍳", title: "Circular Chef", achieved: true },
    { emoji: "🌍", title: "Carbon Cutter", achieved: true },
    { emoji: "🧃", title: "Valorisation Explorer", achieved: true },
    { emoji: "🏆", title: "Eco Champion", achieved: false },
  ];

  return (
    <div>
      <h3 className="text-gray-700 mb-3">Your Achievements</h3>
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {badges.map((badge, idx) => (
            <Badge key={idx} {...badge} />
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Total Impact</p>
              <p className="text-sm text-gray-600">Keep making a difference!</p>
            </div>
            <div className="text-right">
              <p className="text-[#8BC34A]">5.2kg</p>
              <p className="text-xs text-gray-600">waste offset</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
