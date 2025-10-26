import { Search, MessageCircle, Heart, Share2, Plus, X, Bookmark, TrendingUp, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry from "react-responsive-masonry";

interface CommunityStoriesPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onAIIdeas?: () => void;
}

interface StoryCardProps {
  id: string;
  image: string;
  images?: string[];
  title: string;
  creator: {
    name: string;
    avatar: string;
    affiliation: string;
  };
  wasteSource: string;
  description: string;
  process?: string[];
  impact: {
    wasteReused: string;
    co2Saved: string;
  };
  likes: number;
  comments: number;
  featured?: boolean;
  trending?: boolean;
  height?: "short" | "medium" | "tall";
}

interface CommentProps {
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface StoryDetailModalProps {
  story: StoryCardProps;
  onClose: () => void;
}

function StoryDetailModal({ story, onClose }: StoryDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const images = story.images || [story.image];

  const previewComments: CommentProps[] = [
    { author: "Maria Chen", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100", text: "This is amazing! Can't wait to try it at our café.", timestamp: "2h ago" },
    { author: "Alex Kumar", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100", text: "Love the sustainability angle. What's the shelf life?", timestamp: "5h ago" },
    { author: "Sofia Tan", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100", text: "Beautiful work! The texture looks perfect.", timestamp: "1 day ago" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1a2332] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Image Carousel */}
        <div className="relative h-80 bg-gray-200">
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-900" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-900" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title & Tags */}
          <div className="mb-4">
            <div className="flex gap-2 mb-3">
              <span className="text-xs bg-[#DDEBD1]/70 dark:bg-[#3d5a2d]/70 backdrop-blur-sm text-gray-900 dark:text-gray-200 px-3 py-1 rounded-full border border-[#8BC34A]/20 dark:border-[#6ba03f]/30">
                {story.wasteSource}
              </span>
              {story.featured && (
                <span className="text-xs bg-[#F6B93B]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-[#f4a12e]/30">
                  Featured
                </span>
              )}
              {story.trending && (
                <span className="text-xs bg-[#4FC3F7]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 border border-[#29B6F6]/30">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
            </div>
            <h2 className="text-gray-900 dark:text-white mb-2">{story.title}</h2>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <ImageWithFallback
                  src={story.creator.avatar}
                  alt={story.creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">{story.creator.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{story.creator.affiliation}</p>
              </div>
            </div>
          </div>

          {/* Original Source */}
          <div className="mb-4 bg-[#F8FBF7]/70 dark:bg-[#2d3a4d]/60 backdrop-blur-sm rounded-xl p-3 border border-gray-200/40 dark:border-gray-600/30">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Original Source</p>
            <p className="text-sm text-gray-900 dark:text-white">{story.wasteSource}</p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">{story.description}</p>
          </div>

          {/* Valorisation Process */}
          {story.process && (
            <div className="mb-4">
              <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3">Valorisation Process</h4>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {story.process.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                    <div className="bg-[#E6F5E1]/60 dark:bg-[#3d5a2d]/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-gray-200 whitespace-nowrap border border-[#8BC34A]/20 dark:border-[#6ba03f]/30">
                      {step}
                    </div>
                    {idx < story.process!.length - 1 && (
                      <div className="text-gray-400">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Stats */}
          <div className="mb-4 bg-gradient-to-r from-[#EAF3ED]/60 to-white/70 dark:from-[#2a3f2b]/60 dark:to-[#1e2738]/60 backdrop-blur-sm rounded-xl p-4 border border-[#8BC34A]/15 dark:border-[#6ba03f]/25">
            <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3">Environmental Impact</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">♻️</span>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{story.impact.wasteReused}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">waste reused</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{story.impact.co2Saved}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">CO₂ saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-1 py-2.5 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                isLiked
                  ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                  : "bg-white dark:bg-[#2d3a4d] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-600 dark:fill-red-400" : ""}`} />
              <span className="text-sm">{story.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button className="flex-1 bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#3d4a5d] transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{story.comments}</span>
            </button>
            <button className="flex-1 bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#3d4a5d] transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`px-4 py-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? "bg-[#DDEBD1] dark:bg-[#3d5a2d] border-[#8BC34A] dark:border-[#6ba03f] text-gray-900 dark:text-gray-200"
                  : "bg-white dark:bg-[#2d3a4d] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-gray-900 dark:fill-gray-200" : ""}`} />
            </button>
          </div>

          {/* Comments Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm text-gray-700 dark:text-gray-300">Comments ({story.comments})</h4>
              <button className="text-xs text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a]">View All</button>
            </div>
            <div className="space-y-3">
              {previewComments.map((comment, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#F8FBF7]/70 dark:bg-[#2d3a4d]/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-3 py-2 border border-gray-200/40 dark:border-gray-600/30">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-gray-900 dark:text-white">{comment.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StoryCard({ story, onClick }: { story: StoryCardProps; onClick: () => void }) {
  const [isLiked, setIsLiked] = useState(false);

  const heightMap = {
    short: "h-40",
    medium: "h-56",
    tall: "h-72",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white/70 dark:bg-[#2d3a4d]/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-gray-200/40 dark:border-gray-600/30 cursor-pointer"
    >
      {/* Image Section */}
      <div className={`${heightMap[story.height || "medium"]} bg-gray-200 relative overflow-hidden`}>
        <ImageWithFallback src={story.image} alt={story.title} className="w-full h-full object-cover" />
        
        {/* Tag Ribbon */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
          <div className="bg-gradient-to-br from-white via-white to-[#F0F7F2] backdrop-blur-md rounded-full px-4 py-1.5 shadow-lg border border-white/50 hover:shadow-xl transition-all">
            <p className="text-xs text-gray-900 font-medium">{story.wasteSource}</p>
          </div>
          {story.featured && (
            <div className="bg-gradient-to-r from-[#F6C83B] to-[#f4a12e] rounded-full px-3 py-1.5 shadow-md border border-[#f4a12e]/30">
              <p className="text-xs text-white font-semibold">✨ Featured</p>
            </div>
          )}
          {story.trending && (
            <div className="bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md border border-[#29B6F6]/30">
              <TrendingUp className="w-3 h-3 text-white" />
              <p className="text-xs text-white font-semibold">Trending</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <h4 className="text-gray-900 mb-1">{story.title}</h4>
        <p className="text-sm text-gray-600 mb-3">by {story.creator.affiliation}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{story.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{story.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface FilterChipProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ icon, label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
        active
          ? "bg-[#8BC34A] dark:bg-[#6ba03f] text-white shadow-md"
          : "bg-white dark:bg-[#2d3a4d] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function SuggestedCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="min-w-[160px] bg-white/70 dark:bg-[#2d3a4d]/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/40 dark:border-gray-600/30 shadow-sm flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <span className="text-3xl mb-2">{icon}</span>
        <p className="text-sm text-gray-900 dark:text-white">{title}</p>
      </div>
    </div>
  );
}

export function CommunityStoriesPage({ onBack, onNavigate, onAIIdeas }: CommunityStoriesPageProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [selectedStory, setSelectedStory] = useState<StoryCardProps | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFabHint, setShowFabHint] = useState(true);

  const filters = [
    { icon: "🍎", label: "Food Waste" },
    { icon: "☕", label: "Beverage" },
    { icon: "🧴", label: "Packaging" },
    { icon: "🌿", label: "Eco-Materials" },
    { icon: "🧪", label: "R&D Innovations" },
  ];

  const sortOptions = ["Trending", "Newest", "Nearby"];

  const stories: StoryCardProps[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBwdWRkaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjA0NTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1673551491291-5b17d2842988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBwdWRkaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjA0NTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1080",
        "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=1080"
      ],
      title: "Cocoa Husk Chocolate Pudding",
      creator: {
        name: "Dr. Sarah Lin",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "Cirvola R&D Lab"
      },
      wasteSource: "Made from Cocoa Husks",
      description: "This rich, sustainable dessert transforms discarded cocoa husks into a premium chocolate pudding. By extracting natural flavors and compounds from processing waste, we've created a product that's both delicious and environmentally conscious.",
      process: ["Clean", "Extract", "Reformulate", "Test", "Package"],
      impact: {
        wasteReused: "2.1 kg",
        co2Saved: "1.3 kg"
      },
      likes: 124,
      comments: 24,
      featured: true,
      trending: true,
      height: "tall",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3JhY2tlcnMlMjBzbmFja3xlbnwxfHx8fDE3NjA0NTA0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Crunchy Fish Bone Crackers",
      creator: {
        name: "Chef Marcus",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "SeaSoul Kitchen"
      },
      wasteSource: "Made from Fish Bones",
      description: "High-protein snacks made from fish processing waste. These calcium-rich crackers turn kitchen waste into a nutritious, sustainable snack option.",
      process: ["Clean", "Grind", "Season", "Bake"],
      impact: {
        wasteReused: "1.8 kg",
        co2Saved: "0.9 kg"
      },
      likes: 98,
      comments: 18,
      height: "medium",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1657220644506-77fa47a3487b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZWxhdG8lMjBpY2UlMjBjcmVhbXxlbnwxfHx8fDE3NjAzNTg1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Coffee Grounds Gelato",
      creator: {
        name: "Anna Rossi",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "Urban Café"
      },
      wasteSource: "Made from Coffee Grounds",
      description: "Creamy artisanal gelato with zero waste. We extract rich flavors from spent coffee grounds to create this sustainable dessert.",
      process: ["Extract", "Infuse", "Churn", "Freeze"],
      impact: {
        wasteReused: "3.2 kg",
        co2Saved: "1.7 kg"
      },
      likes: 156,
      comments: 31,
      trending: true,
      height: "short",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1626759292870-5813c8c647c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBjYXNjYXJhJTIwZHJpbmt8ZW58MXx8fHwxNzYwNDUxNjc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Cascara Coffee Cherry Tea",
      creator: {
        name: "Dr. Sarah Lin",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "Cirvola R&D Lab"
      },
      wasteSource: "Made from Coffee Husks",
      description: "Fruity, antioxidant-rich tea from coffee processing waste. A sustainable alternative that celebrates the whole coffee cherry.",
      process: ["Dry", "Roast", "Package"],
      impact: {
        wasteReused: "2.5 kg",
        co2Saved: "1.4 kg"
      },
      likes: 87,
      comments: 12,
      featured: true,
      height: "medium",
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1663904458920-f153c162fa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYwNDA2NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Banana Peel Nice Cream",
      creator: {
        name: "Emma Green",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "Green Kitchen Co."
      },
      wasteSource: "Made from Banana Peels",
      description: "Healthy frozen dessert made from banana peels. Rich in fiber and naturally sweet, this recipe reduces kitchen waste significantly.",
      process: ["Wash", "Blend", "Freeze", "Serve"],
      impact: {
        wasteReused: "1.2 kg",
        co2Saved: "0.6 kg"
      },
      likes: 143,
      comments: 27,
      height: "tall",
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGFja2FnaW5nJTIwY29udGFpbmVyfGVufDF8fHx8MTc2MDQ1MjQwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Edible Starch Packaging",
      creator: {
        name: "Dr. James Wong",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "BioPack Labs"
      },
      wasteSource: "Made from Starch Waste",
      description: "Biodegradable food containers from industrial starch waste. These edible packages dissolve in hot water and are fully compostable.",
      process: ["Collect", "Process", "Mold", "Dry", "Test"],
      impact: {
        wasteReused: "5.4 kg",
        co2Saved: "3.2 kg"
      },
      likes: 201,
      comments: 42,
      height: "short",
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MDQ1MjYyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Okara Protein Burger Patty",
      creator: {
        name: "Chef Priya",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "Plant Power Kitchen"
      },
      wasteSource: "Made from Okara (Soy Waste)",
      description: "Plant-based burger patties from tofu production waste. High in protein and fiber, these patties are sustainable and delicious.",
      process: ["Drain", "Season", "Form", "Grill"],
      impact: {
        wasteReused: "2.8 kg",
        co2Saved: "1.5 kg"
      },
      likes: 167,
      comments: 35,
      height: "medium",
    },
    {
      id: "8",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnklMjBzbmFja3N8ZW58MXx8fHwxNzYwNDUyNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Mango Peel Chips",
      creator: {
        name: "Sofia Martinez",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
        affiliation: "Tropical Bites"
      },
      wasteSource: "Made from Mango Peels",
      description: "Crispy, vitamin-rich snacks from fruit processing waste. These chips retain the natural sweetness and nutrients of mango peels.",
      process: ["Wash", "Slice", "Dry", "Season"],
      impact: {
        wasteReused: "1.5 kg",
        co2Saved: "0.8 kg"
      },
      likes: 92,
      comments: 16,
      height: "short",
    },
  ];

  const suggestedStories = [
    { title: "Banana Peel Ice Cream", icon: "🍌" },
    { title: "Okara Protein Chips", icon: "🌾" },
    { title: "Spent Grain Biscuits", icon: "🍪" },
    { title: "Citrus Peel Candy", icon: "🍊" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] to-white dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">Community Valorisation Stories ✨</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explore how others transform food waste</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ingredient, partner, or process..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[#2d3a4d] rounded-xl text-gray-600 dark:text-gray-300 placeholder:text-gray-400"
            />
          </div>

          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            <FilterChip
              icon="✨"
              label="All"
              active={activeFilter === "All"}
              onClick={() => setActiveFilter("All")}
            />
            {filters.map((filter) => (
              <FilterChip
                key={filter.label}
                icon={filter.icon}
                label={filter.label}
                active={activeFilter === filter.label}
                onClick={() => setActiveFilter(filter.label)}
              />
            ))}
          </div>

          {/* Sorting Options */}
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  sortBy === option
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest Grid */}
        <div className="px-5 py-6">
          <Masonry columnsCount={2} gutter="12px">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onClick={() => setSelectedStory(story)}
              />
            ))}
          </Masonry>
        </div>

        {/* Suggested for You */}
        <div className="px-5 pb-6">
          <h3 className="text-gray-700 mb-3">Inspired by What You Viewed 💡</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {suggestedStories.map((story, idx) => (
              <SuggestedCard key={idx} {...story} />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-6">
          <div className="bg-gradient-to-r from-[#8BC34A] to-[#7CB342] rounded-2xl p-6 text-center shadow-lg">
            <p className="text-white mb-4">
              Join the circular movement — share your upcycling success!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate("create-post")}
                className="flex-1 bg-white text-gray-900 py-3 rounded-xl hover:shadow-md transition-shadow flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Post Your Story
              </button>
              <button
                onClick={() => {
                  if (onAIIdeas) {
                    onAIIdeas();
                  } else {
                    onNavigate("ai-chat");
                  }
                }}
                className="flex-1 bg-gradient-to-r from-[#1a2332] to-[#2d3a4d] text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Ideas
              </button>
            </div>
          </div>
        </div>

        {/* Floating Action Button with Hint */}
        <div className="fixed bottom-24 right-5 z-30">
          {/* Hint Bubble */}
          <AnimatePresence>
            {showFabHint && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="absolute bottom-16 right-0 mb-2"
              >
                <div className="relative bg-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-gray-100">
                  {/* Arrow pointing to FAB */}
                  <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
                  
                  <p className="text-sm text-gray-700 whitespace-nowrap">Post something...</p>
                  <button
                    onClick={() => setShowFabHint(false)}
                    className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB Button */}
          <button
            onClick={() => {
              setShowFabHint(false);
              onNavigate("create-post");
            }}
            className="w-14 h-14 bg-[#8BC34A] rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-[#7CB342] transition-all hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="community" onNavigate={onNavigate} />
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <StoryDetailModal
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
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
