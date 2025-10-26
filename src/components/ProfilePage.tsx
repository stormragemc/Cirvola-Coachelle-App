import { 
  Edit, 
  FileText, 
  Award, 
  ShoppingBag, 
  MessageCircle, 
  TrendingUp,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  Trophy,
  Zap,
  Lock,
  Check,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

interface BadgeData {
  id: string;
  emoji: string;
  title: string;
  description: string;
  unlockCriteria: string;
  achieved: boolean;
  color: string;
}

interface BadgeDetailModalProps {
  badge: BadgeData;
  onClose: () => void;
  onSelectAsTitle: () => void;
  isCurrentTitle: boolean;
}

function BadgeDetailModal({ badge, onClose, onSelectAsTitle, isCurrentTitle }: BadgeDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden"
      >
        {/* Header with colored background */}
        <div
          className="p-6 text-center"
          style={{
            background: badge.achieved 
              ? `linear-gradient(135deg, ${badge.color}, ${badge.color}dd)`
              : "#e5e7eb"
          }}
        >
          <div className="text-6xl mb-3">{badge.emoji}</div>
          <h3 className={`mb-2 ${badge.achieved ? "text-white" : "text-gray-500"}`}>
            {badge.title}
          </h3>
          <p className={`text-sm ${badge.achieved ? "text-white/90" : "text-gray-500"}`}>
            {badge.description}
          </p>
        </div>

        {/* Content */}
        <div className="p-5">
          {badge.achieved ? (
            <>
              <div className="bg-[#EAF6E3] rounded-xl p-4 mb-4 flex items-start gap-3">
                <Check className="w-5 h-5 text-[#8BC34A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">Achievement Unlocked!</p>
                  <p className="text-xs text-gray-600">{badge.unlockCriteria}</p>
                </div>
              </div>
              
              {isCurrentTitle ? (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Current Title
                </button>
              ) : (
                <button
                  onClick={() => {
                    onSelectAsTitle();
                    onClose();
                  }}
                  className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                >
                  <Trophy className="w-4 h-4" />
                  Select as Title
                </button>
              )}
            </>
          ) : (
            <>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-start gap-3">
                <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">Unlock Criteria</p>
                  <p className="text-xs text-gray-600">{badge.unlockCriteria}</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-full bg-gray-900 text-white py-3 rounded-xl"
              >
                Close
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AchievementBadge({ badge, onClick, progress }: { badge: BadgeData; onClick: () => void; progress?: number }) {
  return (
    <motion.div
      whileHover={{ scale: badge.achieved ? 1.05 : 1.02 }}
      whileTap={{ scale: badge.achieved ? 0.98 : 1 }}
      onClick={onClick}
      className={`min-w-[160px] rounded-2xl p-4 flex-shrink-0 cursor-pointer transition-all ${
        badge.achieved 
          ? "border-2 shadow-md"
          : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600"
      }`}
      style={{
        background: badge.achieved 
          ? `linear-gradient(135deg, ${badge.color}, ${badge.color}dd)`
          : undefined,
        borderColor: badge.achieved ? badge.color : undefined
      }}
    >
      <div className="relative">
        <div className={`text-4xl mb-2 text-center ${!badge.achieved && 'grayscale opacity-60'}`}>{badge.emoji}</div>
        {badge.achieved && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-[#1a2332] rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-4 h-4 text-[#8BC34A] dark:text-[#6ba03f]" />
          </div>
        )}
        {!badge.achieved && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <Lock className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </div>
        )}
      </div>
      <h4 className={`text-center mb-1 ${badge.achieved ? "text-white" : "text-gray-500 dark:text-gray-400"}`}>
        {badge.title}
      </h4>
      <p className={`text-xs text-center mb-3 ${badge.achieved ? "text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
        {badge.description}
      </p>
      {/* Progress bar for locked badges */}
      {!badge.achieved && progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ActivityItem({ icon, text, timestamp, category }: { 
  icon: string; 
  text: string; 
  timestamp: string; 
  category: string;
}) {
  const categoryColors: Record<string, string> = {
    Purchase: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Discussion: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Idea: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Donation: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[category]}`}>
              {category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>
          </div>
          <p className="text-sm text-gray-900 dark:text-gray-200">{text}</p>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [selectedTitle, setSelectedTitle] = useState("Waste Warrior");
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);

  const badges: BadgeData[] = [
    {
      id: "1",
      emoji: "🥇",
      title: "Waste Warrior",
      description: "Saved 10kg of waste from landfill",
      unlockCriteria: "Save 10kg of waste from landfill",
      achieved: true,
      color: "#FFB74D",
    },
    {
      id: "2",
      emoji: "🥗",
      title: "Circular Chef",
      description: "Created 5 valorisation recipes",
      unlockCriteria: "Create 5 unique valorisation recipes",
      achieved: true,
      color: "#81C784",
    },
    {
      id: "3",
      emoji: "🌍",
      title: "Carbon Saver",
      description: "Reduced 20kg CO₂ emissions",
      unlockCriteria: "Reduce 20kg of CO₂ emissions through valorisation",
      achieved: true,
      color: "#64B5F6",
    },
    {
      id: "4",
      emoji: "🧪",
      title: "Valorisation Pioneer",
      description: "Tried 10 upcycled products",
      unlockCriteria: "Purchase or try 10 different upcycled products",
      achieved: true,
      color: "#9575CD",
    },
    {
      id: "5",
      emoji: "🏆",
      title: "Eco Champion",
      description: "Reach 50kg waste offset",
      unlockCriteria: "Valorise a total of 50kg of food waste",
      achieved: false,
      color: "#F6C83B",
    },
    {
      id: "6",
      emoji: "🌟",
      title: "Community Leader",
      description: "Get 100 upvotes on ideas",
      unlockCriteria: "Receive 100+ upvotes across all valorisation ideas",
      achieved: false,
      color: "#FF8A65",
    },
  ];

  const unlockedBadges = badges.filter(b => b.achieved);
  const nextBadge = badges.find(b => !b.achieved);
  
  const currentProgress = 72; // activities completed
  const nextMilestone = 100; // activities needed
  const progressPercent = (currentProgress / nextMilestone) * 100;

  const activities = [
    {
      icon: "🛒",
      text: "You purchased Fish Crackers — 200g waste saved",
      timestamp: "2 hours ago",
      category: "Purchase",
    },
    {
      icon: "💬",
      text: "You joined the Second-Bite Room discussion",
      timestamp: "Yesterday",
      category: "Discussion",
    },
    {
      icon: "🌱",
      text: "Your valorisation idea got 12 upvotes!",
      timestamp: "3 days ago",
      category: "Idea",
    },
    {
      icon: "📦",
      text: "You contributed 2kg of coffee grounds to GreenLab",
      timestamp: "1 week ago",
      category: "Donation",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9F6] to-white dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header Section - Profile Card */}
        <div className="bg-gradient-to-br from-[#3C6E47] to-[#96C19A] dark:from-[#234F2B] dark:to-[#3d5a2d] px-5 pt-12 pb-6 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="flex flex-col items-center text-center relative z-10">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1724435811349-32d27f4d5806?w=300"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Username */}
            <h2 className="text-white mb-2">@greenkitchen</h2>
            
            {/* Editable Title Selector */}
            <div className="relative mb-3">
              <button
                onClick={() => setShowTitleDropdown(!showTitleDropdown)}
                className="bg-white/20 backdrop-blur border-2 border-white/40 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors"
              >
                <span className="text-sm text-white">
                  {badges.find(b => b.title === selectedTitle)?.emoji} {selectedTitle}
                </span>
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${showTitleDropdown ? "rotate-180" : ""}`} />
              </button>
              
              {/* Dropdown */}
              <AnimatePresence>
                {showTitleDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#2d3a4d] rounded-xl shadow-2xl overflow-hidden min-w-[200px] z-50"
                  >
                    {unlockedBadges.map((badge) => (
                      <button
                        key={badge.id}
                        onClick={() => {
                          setSelectedTitle(badge.title);
                          setShowTitleDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-[#1a2332] transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                          selectedTitle === badge.title ? "bg-[#EAF6E3] dark:bg-[#2a3f2b]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{badge.emoji}</span>
                          <span className="text-sm text-gray-900 dark:text-white">{badge.title}</span>
                          {selectedTitle === badge.title && (
                            <Check className="w-4 h-4 text-[#8BC34A] dark:text-[#6ba03f] ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Role Badge */}
            <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full mb-3">
              <span className="text-sm text-white">F&B Partner</span>
            </div>
            
            {/* Bio */}
            <p className="text-white/90 text-sm mb-4 max-w-xs">
              Turning waste into value since 2025 🌱
            </p>
            
            {/* Edit Button */}
            <button className="bg-white text-[#3C6E47] px-6 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition-shadow">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 py-6 space-y-6">
          {/* Impact Summary Section */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Your Impact 📊</h3>
            <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#EAF6E3] to-white dark:from-[#2a3f2b] dark:to-[#1e2738] rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">♻️</div>
                  <p className="text-lg text-gray-900 dark:text-white mb-1 font-semibold">5.2kg</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Waste Offset</p>
                </div>
                <div className="bg-gradient-to-br from-[#E3F2FD] to-white dark:from-[#1e3a4d] dark:to-[#1e2738] rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🌍</div>
                  <p className="text-lg text-gray-900 dark:text-white mb-1 font-semibold">12.4kg</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">CO₂ Saved</p>
                </div>
                <div className="bg-gradient-to-br from-[#FFF9E6] to-white dark:from-[#3d3420] dark:to-[#1e2738] rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🧃</div>
                  <p className="text-lg text-gray-900 dark:text-white mb-1 font-semibold">8</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Products</p>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate("esg-report")}
                className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] dark:from-[#6ba03f] dark:to-[#4a8357] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
              >
                <FileText className="w-4 h-4" />
                View Full ESG Report
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Achievements & Milestones */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Achievements & Milestones 🏆</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{unlockedBadges.length}/{badges.length}</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
              {badges.map((badge, index) => {
                // Calculate mock progress for locked badges
                const mockProgress = badge.achieved ? 100 : [65, 42][index - 4] || 0;
                return (
                  <AchievementBadge
                    key={badge.id}
                    badge={badge}
                    onClick={() => setSelectedBadge(badge)}
                    progress={mockProgress}
                  />
                );
              })}
            </div>
          </div>

          {/* Progress Tracker */}
          {nextBadge && (
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 mb-3">Progress Tracker 🪜</h3>
              <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: `linear-gradient(135deg, ${nextBadge.color}, ${nextBadge.color}dd)` }}
                  >
                    {nextBadge.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next Title</p>
                    <p className="text-gray-900 dark:text-white">{nextBadge.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-[#8BC34A] dark:text-[#6ba03f]">{nextMilestone - currentProgress}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">left</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{currentProgress} / {nextMilestone} activities</p>
                    <p className="text-sm text-[#8BC34A] dark:text-[#6ba03f]">{Math.round(progressPercent)}%</p>
                  </div>
                  <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8BC34A] to-[#7CB342] dark:from-[#6ba03f] dark:to-[#4a8357] rounded-full"
                    />
                  </div>
                </div>

                <div className="bg-[#FFF9E6] dark:bg-[#3d3420] rounded-xl p-3 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#F6C83B] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Complete <span className="text-[#8BC34A] dark:text-[#6ba03f]">{nextMilestone - currentProgress} more activities</span> to unlock <span className="text-gray-900 dark:text-white">{nextBadge.title}</span>!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Recent Activities 🕒</h3>
              <button className="text-sm text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a]">View All</button>
            </div>
            <div>
              {activities.map((activity, idx) => (
                <ActivityItem key={idx} {...activity} />
              ))}
            </div>
          </div>

          {/* Settings & Account Options */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Settings ⚙️</h3>
            <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#1a2332] transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-200">Account Settings</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#1a2332] transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-200">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#1a2332] transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-200">Help Center</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400">Log Out</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-4 pb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by Cirvola — Circular Food Innovation
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="profile" onNavigate={onNavigate} />
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <BadgeDetailModal
            badge={selectedBadge}
            onClose={() => setSelectedBadge(null)}
            onSelectAsTitle={() => setSelectedTitle(selectedBadge.title)}
            isCurrentTitle={selectedTitle === selectedBadge.title}
          />
        )}
      </AnimatePresence>

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
