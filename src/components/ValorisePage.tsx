import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";

const cirvolaLogo = "https://i.ibb.co/ZpfbJxGS/Cirvola-logo.png";

interface ValorisePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onViewRecommendations?: () => void;
}

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  preview: React.ReactNode;
  onClick: () => void;
}

function ModuleCard({ icon, title, description, gradient, preview, onClick }: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`${gradient} rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden relative`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white dark:bg-[#2d3a4d] rounded-full flex items-center justify-center shadow-sm">
            {icon}
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
      </div>

      {/* Preview Content */}
      <div className="mt-4">
        {preview}
      </div>
    </motion.div>
  );
}

export function ValorisePage({ onBack, onNavigate, onViewRecommendations }: ValorisePageProps) {
  const handleAIChatOpen = () => {
    onNavigate("ai-assistant");
  };

  const handleViewRecommendations = () => {
    if (onViewRecommendations) {
      onViewRecommendations();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">Second-Bite Room</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Discover, create, and collaborate</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 py-6 space-y-4">
          {/* Hero Message */}
          <div className="bg-gradient-to-r from-[#8BC34A] dark:from-[#4a8357] to-[#7CB342] dark:to-[#5a8c3a] rounded-2xl p-5 text-white text-center shadow-md">
            <h3 className="mb-2">Turn Waste into Wonder ✨</h3>
            <p className="text-sm text-white/90">
              Explore AI-powered ideas to valorise food waste
            </p>
          </div>

          {/* Module 1: AI Valorisation Chatbot */}
          <ModuleCard
            icon={<Sparkles className="w-6 h-6 text-[#F6B93B]" />}
            title="AI Valorisation Recommender"
            description="Chat with AI for personalized suggestions"
            gradient="bg-gradient-to-br from-[#FFF8E1] dark:from-[#3d3420] to-white dark:to-[#2d3a4d]"
            onClick={handleAIChatOpen}
            preview={
              <div className="space-y-2">
                <div className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        "Upload waste material or describe it to get instant valorisation ideas!"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/60 dark:bg-[#2d3a4d]/60 backdrop-blur rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-700 dark:text-gray-300">☕ Coffee Grounds</p>
                  </div>
                  <div className="flex-1 bg-white/60 dark:bg-[#2d3a4d]/60 backdrop-blur rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-700 dark:text-gray-300">🍊 Citrus Peels</p>
                  </div>
                  <div className="flex-1 bg-white/60 dark:bg-[#2d3a4d]/60 backdrop-blur rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-700 dark:text-gray-300">🐟 Fish Bones</p>
                  </div>
                </div>
              </div>
            }
          />

          {/* Weekly Recommendations Card */}
          <div className="bg-gradient-to-br from-[#234F2B] dark:from-[#1e2f1f] to-[#2d6537] dark:to-[#2a3f2b] rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                  <img src={cirvolaLogo} alt="Cirvola" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white">Weekly Recommendations</h3>
                  <p className="text-sm text-white/80">AI-powered waste reduction tips</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-3">
              <p className="text-sm text-white/90 leading-relaxed">
                Based on your waste data, we've identified 3 key opportunities to reduce waste by 45kg this week and generate €280 in valorisation revenue.
              </p>
            </div>
            <button 
              onClick={handleViewRecommendations}
              className="w-full bg-white text-gray-900 py-3 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              View Recommendations
            </button>
          </div>

          {/* Quick Stats Section */}
          <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Community Impact 🌍</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl text-[#8BC34A] dark:text-[#6ba03f] mb-1 font-semibold">127</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">AI Ideas Generated</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#F6B93B] mb-1 font-semibold">89</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Stories Shared</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#4FC3F7] mb-1 font-semibold">156</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Active Discussions</p>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Trending This Week 🔥</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">☕</span>
                  <p className="text-sm text-gray-900 dark:text-white">Coffee Grounds</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">43 new ideas</p>
              </div>
              <div className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍊</span>
                  <p className="text-sm text-gray-900 dark:text-white">Citrus Peels</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">38 new ideas</p>
              </div>
              <div className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🐟</span>
                  <p className="text-sm text-gray-900 dark:text-white">Fish Bones</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">29 new ideas</p>
              </div>
              <div className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍫</span>
                  <p className="text-sm text-gray-900 dark:text-white">Cocoa Husks</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">24 new ideas</p>
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="bg-gradient-to-br from-[#234F2B] to-[#2d6537] rounded-2xl p-6 text-center shadow-lg">
            <p className="text-white mb-4">
              Ready to make an impact? Start your valorisation journey today!
            </p>
            <button 
              onClick={handleAIChatOpen}
              className="w-full bg-white text-gray-900 py-3 rounded-xl hover:shadow-md transition-shadow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Chat with AI Now
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="valorise" onNavigate={onNavigate} />
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
