import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

export interface Story {
  id: string;
  title: string;
  before: string;
  after: string;
  beforeImage: string;
  afterImage: string;
  creator: string;
  likes: number;
  comments: number;
  featured?: boolean;
  description?: string;
  timestamp?: string;
  impact?: {
    wasteReduced: string;
    co2Saved: string;
    productsCreated: string;
  };
}

interface CommunityValorisationFeedProps {
  onViewAll: () => void;
  onPostClick?: (story: Story) => void;
}

export function CommunityValorisationFeed({ onViewAll, onPostClick }: CommunityValorisationFeedProps) {
  const [likedStories, setLikedStories] = useState<string[]>([]);

  const stories: Story[] = [
    {
      id: "1",
      title: "Fish bones → Crackers",
      before: "Fish Bones",
      after: "Crunchy Crackers",
      beforeImage: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300",
      afterImage: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=300",
      creator: "OceanCycle",
      likes: 234,
      comments: 45,
      featured: true,
      description: "Transformed fish bones from our local seafood market into these amazing calcium-rich crackers! Zero waste, maximum nutrition 🐟✨",
      timestamp: "2 hours ago",
      impact: {
        wasteReduced: "2.5kg",
        co2Saved: "1.2kg",
        productsCreated: "120",
      },
    },
    {
      id: "2",
      title: "Coffee husks → Scrub",
      before: "Coffee Husks",
      after: "Exfoliating Scrub",
      beforeImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300",
      afterImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300",
      creator: "BrewCycle",
      likes: 189,
      comments: 32,
      description: "Our coffee shop waste turned into natural skincare! Mixed with coconut oil for the perfect body scrub ☕💆‍♀️",
      timestamp: "5 hours ago",
      impact: {
        wasteReduced: "1.8kg",
        co2Saved: "0.9kg",
        productsCreated: "75",
      },
    },
    {
      id: "3",
      title: "Mango peels → Energy bars",
      before: "Mango Peels",
      after: "Energy Bars",
      beforeImage: "https://images.unsplash.com/photo-1553279968-7510ea16d4e3?w=300",
      afterImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300",
      creator: "TropicalWaste",
      likes: 156,
      comments: 28,
      description: "Mango season means tons of peels! Dried and combined with dates and nuts for these delicious energy bars 🥭💪",
      timestamp: "1 day ago",
      impact: {
        wasteReduced: "3.2kg",
        co2Saved: "1.5kg",
        productsCreated: "95",
      },
    },
    {
      id: "4",
      title: "Banana peels → Flour",
      before: "Banana Peels",
      after: "Nutrient Flour",
      beforeImage: "https://images.unsplash.com/photo-1603833797131-3c0a7d5b0c4e?w=300",
      afterImage: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=300",
      creator: "GreenGrounds",
      likes: 142,
      comments: 19,
      description: "Banana peels are packed with nutrients! Dried and ground into flour for gluten-free baking 🍌🍞",
      timestamp: "2 days ago",
      impact: {
        wasteReduced: "2.1kg",
        co2Saved: "1.0kg",
        productsCreated: "60",
      },
    },
  ];

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent triggering post click
    setLikedStories((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handlePostClick = (story: Story) => {
    if (onPostClick) {
      onPostClick(story);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Community Transformations ✨</h3>
        <button onClick={onViewAll} className="text-[11px] font-medium text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a]">
          View All →
        </button>
      </div>

      {/* Pinterest-style masonry grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handlePostClick(story)}
            className="bg-white/70 dark:bg-[#2d3a4d]/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-gray-200/40 dark:border-gray-600/30 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            {/* Before/After Split Image */}
            <div className="relative aspect-square">
              <div className="grid grid-cols-2 h-full">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={story.beforeImage}
                    alt={story.before}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-xs text-white bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md px-3 py-1 rounded-full shadow-lg font-medium border border-white/20">
                    Before
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={story.afterImage}
                    alt={story.after}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 right-2 text-xs text-white bg-gradient-to-br from-[#8BC34A] to-[#7CB342] backdrop-blur-md px-3 py-1 rounded-full shadow-lg font-medium border border-white/30">
                    After
                  </span>
                </div>
              </div>

              {/* Featured Badge */}
              {story.featured && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-[#F6C83B] to-[#f4a12e] text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg font-medium border border-[#f4a12e]/30">
                  <TrendingUp className="w-3 h-3" />
                  Featured
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3">
              <h4 className="text-xs text-gray-900 dark:text-white mb-1">{story.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">by {story.creator}</p>

              {/* Interactions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => toggleLike(e, story.id)}
                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedStories.includes(story.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {story.likes + (likedStories.includes(story.id) ? 1 : 0)}
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePostClick(story);
                  }}
                  className="flex items-center gap-1 hover:text-[#8BC34A] dark:hover:text-[#6ba03f] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{story.comments}</span>
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="ml-auto"
                >
                  <Share2 className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 hover:text-[#8BC34A] dark:hover:text-[#6ba03f] transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
