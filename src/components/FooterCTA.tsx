import { ShoppingBag, MessageSquare, Sparkles } from "lucide-react";

interface FooterCTAProps {
  onExploreShop: () => void;
  onJoinDiscussions: () => void;
}

export function FooterCTA({ onExploreShop, onJoinDiscussions }: FooterCTAProps) {
  return (
    <div className="space-y-3">
      {/* Shop CTA */}
      <button
        onClick={onExploreShop}
        className="w-full bg-gradient-to-r from-[#3C6E47] dark:from-[#2d5038] to-[#4FAE68] dark:to-[#4a8357] text-white py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <ShoppingBag className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Explore Second-Bite Shop</span>
        <Sparkles className="w-4 h-4 relative z-10" />
      </button>

      {/* Discussion CTA */}
      <button
        onClick={onJoinDiscussions}
        className="w-full bg-white dark:bg-[#2d3a4d] border-2 border-[#8BC34A] dark:border-[#6ba03f] text-[#3C6E47] dark:text-[#6ba03f] py-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Join Community Discussions</span>
      </button>

      {/* Community Stats */}
      <div className="bg-gradient-to-r from-[#EAF6E3] dark:from-[#2a3f2b] to-[#F0F7F2] dark:to-[#1e2f1f] rounded-xl p-4">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-white">1.2k+</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Active Members</p>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-white">350+</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Stories Shared</p>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-white">890+</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}
