import { Users, MessageSquare, TrendingUp, Award, Heart, Share2, ArrowRight, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";

interface CommunityPageProps {
  onNavigate: (page: string) => void;
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

export function CommunityPage({ onNavigate }: CommunityPageProps) {
  const communityStats = [
    { label: "Active Members", value: "12.4K", icon: Users, color: "bg-[#8BC34A]" },
    { label: "This Week", value: "248", icon: TrendingUp, color: "bg-[#F6C83B]" },
  ];

  const topContributors = [
    { name: "Sarah Chen", points: 2840, avatar: "SC", stories: 28, rank: 1 },
    { name: "Marcus Green", points: 2650, avatar: "MG", stories: 24, rank: 2 },
    { name: "Elena Rodriguez", points: 2420, avatar: "ER", stories: 22, rank: 3 },
    { name: "Kai Tanaka", points: 2180, avatar: "KT", stories: 19, rank: 4 },
    { name: "Amara Osei", points: 1950, avatar: "AO", stories: 17, rank: 5 },
  ];

  const trendingTopics = [
    { emoji: "☕", name: "Coffee Grounds", ideas: 43 },
    { emoji: "🍊", name: "Citrus Peels", ideas: 38 },
    { emoji: "🐟", name: "Fish Bones", ideas: 29 },
    { emoji: "🍫", name: "Cocoa Husks", ideas: 24 },
  ];

  const recentActivity = [
    {
      user: "Jamie Wilson",
      action: "shared a valorisation story",
      item: "Coffee Grounds to Face Scrub",
      time: "5 mins ago",
      likes: 12,
    },
    {
      user: "Chen Li",
      action: "started a discussion",
      item: "Best practices for composting citrus peels",
      time: "18 mins ago",
      likes: 8,
    },
    {
      user: "Nina Patel",
      action: "completed a challenge",
      item: "Zero Waste Week Champion",
      time: "32 mins ago",
      likes: 24,
    },
    {
      user: "Alex Kumar",
      action: "added a recipe",
      item: "Banana Peel Bacon Alternative",
      time: "1 hour ago",
      likes: 31,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F6] dark:from-[#1a2332] via-white dark:via-[#1e2738] to-[#F0F7F2] dark:to-[#1e2f1f] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white/80 dark:bg-[#1a2332]/80 backdrop-blur-md px-4 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h1 className="text-gray-900 dark:text-white">Community Hub</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Connect, share, and grow together</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 space-y-5">
          {/* Community Stats */}
          <div className="grid grid-cols-2 gap-3">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-2`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Join the Conversation - Module Cards */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-3">Join the Conversation</h3>
            <div className="space-y-4">
              {/* Community Stories Module */}
              <ModuleCard
                icon={<ImageIcon className="w-6 h-6 text-[#8BC34A]" />}
                title="Browse Stories"
                description="Browse Pinterest-style valorisation gallery"
                gradient="bg-gradient-to-br from-[#DDEBD1] dark:from-[#2a3f2b] to-white dark:to-[#2d3a4d]"
                onClick={() => onNavigate("community-stories")}
                preview={
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1673551491291-5b17d2842988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300" 
                        alt="Cocoa Husk Pudding"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1577906096429-f73c2c312435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300" 
                        alt="Fish Crackers"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1657220644506-77fa47a3487b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300" 
                        alt="Coffee Gelato"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                }
              />

              {/* Discussion Forum Module */}
              <ModuleCard
                icon={<MessageSquare className="w-6 h-6 text-[#4FC3F7]" />}
                title="Discussion Forum"
                description="Ask questions and share expertise"
                gradient="bg-gradient-to-br from-[#E3F2FD] to-white"
                onClick={() => onNavigate("discussion-forum")}
                preview={
                  <div className="space-y-2">
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-900 mb-1">Can coffee husks be used in skincare products?</p>
                      <p className="text-xs text-gray-500">18 replies • 42 likes</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-900 mb-1">Best fermentation method for citrus peel enzymes?</p>
                      <p className="text-xs text-gray-500">12 replies • 35 likes</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Top Contributors</h3>
              <Award className="w-5 h-5 text-[#F6C83B]" />
            </div>
            <div className="space-y-3">
              {topContributors.map((contributor) => (
                <div
                  key={contributor.name}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8BC34A] to-[#3C6E47] rounded-full flex items-center justify-center text-white text-xs">
                      {contributor.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-white text-xs">
                      {contributor.rank === 1 ? "🥇" : contributor.rank === 2 ? "🥈" : contributor.rank === 3 ? "🥉" : `#${contributor.rank}`}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900">{contributor.name}</p>
                    <p className="text-xs text-gray-500">{contributor.stories} stories shared</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8BC34A]">{contributor.points}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity & Trending */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-gray-900 mb-4">Recent Activity & Trending</h3>
            
            {/* Trending This Week */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500">🔥 Trending This Week</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {trendingTopics.map((topic, index) => (
                  <button 
                    key={index} 
                    onClick={() => onNavigate("community-stories")}
                    className="bg-gradient-to-br from-[#F8F9F6] to-white rounded-xl p-3 border border-gray-100 hover:border-[#8BC34A] hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{topic.emoji}</span>
                      <p className="text-xs text-gray-900">{topic.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{topic.ideas} new ideas</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#DDEBD1] to-[#8BC34A] rounded-full flex items-center justify-center text-xs text-[#234F2B]">
                    {activity.user.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900">
                      <span className="text-[#234F2B]">{activity.user}</span>
                      {" "}{activity.action}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{activity.item}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400">{activity.time}</span>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-[#8BC34A] transition-colors">
                        <Heart className="w-3.5 h-3.5" />
                        <span className="text-xs">{activity.likes}</span>
                      </button>
                      <button className="text-gray-400 hover:text-[#8BC34A] transition-colors">
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share Your Impact */}
          <div className="bg-gradient-to-r from-[#DDEBD1] to-[#8BC34A]/20 rounded-2xl p-4">
            <h3 className="text-[#234F2B] mb-3">Share Your Impact</h3>
            <p className="text-xs text-gray-600 mb-4 text-center">
              Have a valorisation success story? Share it with the community!
            </p>
            <button
              onClick={() => onNavigate("community-stories")}
              className="bg-[#8BC34A] text-white py-3 px-6 rounded-xl hover:bg-[#7CB342] transition-colors text-xs w-full mb-4"
            >
              Share Your Story
            </button>
            
            {/* Community Impact Stats */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
              <p className="text-xs text-gray-600 mb-3 text-center">🌍 Community Impact This Month</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-[#8BC34A]">127</p>
                  <p className="text-xs text-gray-500">AI Ideas</p>
                </div>
                <div className="text-center">
                  <p className="text-[#F6C83B]">89</p>
                  <p className="text-xs text-gray-500">Stories</p>
                </div>
                <div className="text-center">
                  <p className="text-[#4FC3F7]">156</p>
                  <p className="text-xs text-gray-500">Discussions</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate("community-stories")}
                className="w-full mt-4 text-xs text-[#234F2B] hover:text-[#8BC34A] transition-colors"
              >
                Browse success stories from others →
              </button>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-4"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="community" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
