import { Award, Sparkles } from "lucide-react";

export function PersonalMilestones() {
  return (
    <div className="bg-gradient-to-br from-[#8BC34A] to-[#7CB342] rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-white" />
        <h4 className="text-white">Your Achievements</h4>
      </div>
      <div className="flex gap-3 mb-3">
        <div className="flex-1 bg-white/20 backdrop-blur rounded-xl p-3 text-center">
          <Award className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
          <p className="text-xs text-white">Waste Warrior</p>
        </div>
        <div className="flex-1 bg-white/20 backdrop-blur rounded-xl p-3 text-center">
          <Award className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
          <p className="text-xs text-white">Circular Chef</p>
        </div>
        <div className="flex-1 bg-white/20 backdrop-blur rounded-xl p-3 text-center">
          <Award className="w-6 h-6 text-gray-300 mx-auto mb-1" />
          <p className="text-xs text-white opacity-70">Eco Hero</p>
        </div>
      </div>
      <p className="text-sm text-white text-center">
        You've offset <span className="font-medium">5kg</span> of waste! 🎉
      </p>
    </div>
  );
}
