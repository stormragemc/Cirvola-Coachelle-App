import { Search, MessageCircle, ThumbsUp, Plus, TrendingUp, Share2, Camera, Tag, MessageSquare, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DiscussionForumPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface DiscussionCardProps {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  previewText: string;
  upvotes: number;
  comments: number;
  tags: string[];
  timestamp: string;
  trending?: boolean;
  pinned?: boolean;
  hasImage?: boolean;
}

interface CommentProps {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  upvotes: number;
  replies?: CommentProps[];
}

function DiscussionCard({ discussion, onClick, onAskAI }: { 
  discussion: DiscussionCardProps; 
  onClick: () => void;
  onAskAI: () => void;
}) {
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(discussion.upvotes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1);
      setUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setUpvoted(true);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`bg-white dark:bg-[#2d3a4d] rounded-xl p-4 border shadow-sm cursor-pointer ${
        discussion.pinned 
          ? "border-[#F6C83B] bg-gradient-to-r from-[#FFF9E6] dark:from-[#3d3420] to-white dark:to-[#2d3a4d]" 
          : "border-gray-100 dark:border-gray-700"
      }`}
    >
      {/* Pinned/Trending Badge */}
      {(discussion.pinned || discussion.trending) && (
        <div className="flex items-center gap-2 mb-3">
          {discussion.pinned && (
            <div className="flex items-center gap-1 text-xs bg-[#F6C83B] text-white px-2 py-1 rounded-full">
              🔥 Hot This Week
            </div>
          )}
          {discussion.trending && (
            <div className="flex items-center gap-1 text-xs bg-[#4FC3F7] text-white px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <ImageWithFallback src={discussion.author.avatar} alt={discussion.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-white">@{discussion.author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{discussion.timestamp}</p>
          </div>
        </div>
        {discussion.hasImage && (
          <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <Camera className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </div>
        )}
      </div>

      {/* Title */}
      <h4 className="text-gray-900 dark:text-white mb-2">{discussion.title}</h4>
      
      {/* Preview Text */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{discussion.previewText}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {discussion.tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-[#DDEBD1] dark:bg-[#2a3f2b] text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Engagement Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          {/* Upvote */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 transition-colors ${
              upvoted ? "text-[#8BC34A] dark:text-[#6ba03f]" : "text-gray-500 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#6ba03f]"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${upvoted ? "fill-[#8BC34A] dark:fill-[#6ba03f]" : ""}`} />
            <span className="text-sm">{upvoteCount}</span>
          </button>
          
          {/* Comments */}
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{discussion.comments}</span>
          </div>
          
          {/* Share */}
          <button className="flex items-center gap-1 text-gray-500 hover:text-[#8BC34A] transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Ask AI Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAskAI();
          }}
          className="text-xs text-[#8BC34A] hover:text-[#7CB342] flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#EAF6E3] transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          Ask AI
        </button>
      </div>
    </motion.div>
  );
}

function CommentThread({ comment, depth = 0 }: { comment: CommentProps; depth?: number }) {
  const [upvoted, setUpvoted] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [upvoteCount, setUpvoteCount] = useState(comment.upvotes);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1);
      setUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setUpvoted(true);
    }
  };

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-gray-100 pl-3" : ""}`}>
      <div className="py-3">
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <ImageWithFallback src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm text-gray-900">@{comment.author}</p>
              <p className="text-xs text-gray-500">{comment.timestamp}</p>
            </div>
            <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  upvoted ? "text-[#8BC34A]" : "text-gray-500 hover:text-[#8BC34A]"
                }`}
              >
                <ThumbsUp className={`w-3 h-3 ${upvoted ? "fill-[#8BC34A]" : ""}`} />
                <span>{upvoteCount}</span>
              </button>
              <button className="text-xs text-gray-500 hover:text-[#8BC34A]">Reply</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-xs text-gray-500 hover:text-[#8BC34A] mb-2 flex items-center gap-1"
          >
            {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showReplies ? "Hide" : "Show"} {comment.replies.length} replies
          </button>
          {showReplies && (
            <div>
              {comment.replies.map((reply) => (
                <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
        active
          ? "bg-[#8BC34A] text-white shadow-md"
          : "bg-white text-gray-700 border border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

export function DiscussionForumPage({ onBack, onNavigate }: DiscussionForumPageProps) {
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const filters = ["Trending", "New", "Unanswered", "Nearby"];

  const discussions: DiscussionCardProps[] = [
    {
      id: "1",
      author: { name: "GreenLab", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" },
      title: "Can coffee husks be used in skincare products?",
      previewText: "I've been researching the antioxidant properties of coffee husks and wondering if anyone has experience incorporating them into natural skincare formulations. Any insights on extraction methods?",
      upvotes: 42,
      comments: 18,
      tags: ["FoodWaste", "Skincare", "CoffeeHusks"],
      timestamp: "2h ago",
      trending: true,
      pinned: true,
    },
    {
      id: "2",
      author: { name: "CircularChef", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" },
      title: "Best fermentation method for citrus peel enzymes?",
      previewText: "Looking for reliable recipes and timing for making eco-friendly cleaning solutions from citrus peels. How long should I ferment them? Temperature recommendations?",
      upvotes: 35,
      comments: 12,
      tags: ["CircularDesign", "Fermentation", "CitrusPeels"],
      timestamp: "4h ago",
      hasImage: true,
    },
    {
      id: "3",
      author: { name: "EcoInnovator", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" },
      title: "Successfully turned banana peels into fertilizer pellets!",
      previewText: "After weeks of experimentation, I've developed a process to convert banana peels into nutrient-rich fertilizer pellets. Happy to share the process and answer questions.",
      upvotes: 67,
      comments: 24,
      tags: ["Success", "BananaPeels", "Fertilizer"],
      timestamp: "1 day ago",
      trending: true,
    },
    {
      id: "4",
      author: { name: "FishWasteResearch", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" },
      title: "Fish bone collagen extraction - equipment recommendations?",
      previewText: "Starting a small-scale fish bone valorisation project. What equipment do you recommend for collagen extraction? Looking for cost-effective solutions.",
      upvotes: 28,
      comments: 9,
      tags: ["FishBones", "Collagen", "Equipment"],
      timestamp: "2 days ago",
    },
    {
      id: "5",
      author: { name: "SustainableSips", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" },
      title: "Cascara tea market potential - thoughts?",
      previewText: "I'm considering starting a cascara tea business using coffee cherry husks. What's the market like? Any advice on sourcing and processing?",
      upvotes: 31,
      comments: 15,
      tags: ["BusinessIdea", "CoffeeCherries", "Beverage"],
      timestamp: "3 days ago",
      pinned: true,
    },
    {
      id: "6",
      author: { name: "OkaraKitchen", avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" },
      title: "Okara in pasta making - texture tips needed",
      previewText: "I've been adding okara to pasta dough but struggling with the texture. Too crumbly. Any suggestions on ratios or binding agents?",
      upvotes: 19,
      comments: 7,
      tags: ["Okara", "Cooking", "PastaMaking"],
      timestamp: "4 days ago",
    },
  ];

  const mockComments: CommentProps[] = [
    {
      id: "c1",
      author: "DrSkinCare",
      avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
      text: "Absolutely! Coffee husk extracts are rich in chlorogenic acid and caffeine, both excellent for anti-aging formulations. I recommend cold pressing followed by alcohol extraction.",
      timestamp: "1h ago",
      upvotes: 12,
      replies: [
        {
          id: "c1-1",
          author: "GreenLab",
          avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
          text: "Thanks! What alcohol percentage do you recommend?",
          timestamp: "45min ago",
          upvotes: 3,
        },
        {
          id: "c1-2",
          author: "DrSkinCare",
          avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
          text: "70% ethanol works best. Let it sit for 2-3 weeks, shaking daily.",
          timestamp: "30min ago",
          upvotes: 8,
        },
      ],
    },
    {
      id: "c2",
      author: "NaturalBeauty",
      avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
      text: "We've been using coffee husk oil in our face serums for 6 months. Customer feedback has been fantastic! The antioxidants really make a difference.",
      timestamp: "2h ago",
      upvotes: 18,
    },
    {
      id: "c3",
      author: "BioChemist",
      avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100",
      text: "Important note: make sure to test for allergens and do patch tests. Some people can be sensitive to coffee compounds.",
      timestamp: "3h ago",
      upvotes: 24,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">Discussion Forum 💬</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ask, share, and collaborate</p>
            </div>
          </div>

          {/* Post Creation Bar */}
          <div className="bg-gray-50 dark:bg-[#2d3a4d] rounded-xl p-3 mb-3 border border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setShowPostModal(true)}
              className="w-full text-left text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Start a Discussion...
            </button>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#6ba03f] transition-colors px-2 py-1 rounded bg-white dark:bg-[#1a2332]">
                <Camera className="w-3 h-3" />
                Photo
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#6ba03f] transition-colors px-2 py-1 rounded bg-white dark:bg-[#1a2332]">
                <Tag className="w-3 h-3" />
                Tag Material
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#6ba03f] transition-colors px-2 py-1 rounded bg-white dark:bg-[#1a2332]">
                <MessageSquare className="w-3 h-3" />
                Text
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions, topics, or questions..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[#2d3a4d] rounded-xl text-gray-600 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Sort Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
        </div>

        {/* Discussion Feed or Thread View */}
        {!selectedDiscussion ? (
          /* Feed View */
          <div className="px-5 py-6 space-y-3">
            {discussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                onClick={() => setSelectedDiscussion(discussion.id)}
                onAskAI={() => {
                  // Navigate to AI chat with pre-filled query
                  onNavigate("ai-chat");
                }}
              />
            ))}
          </div>
        ) : (
          /* Thread View */
          <div className="px-5 py-6">
            <button
              onClick={() => setSelectedDiscussion(null)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to discussions
            </button>
            
            {/* Original Post */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?w=100" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">@GreenLab</p>
                  <p className="text-xs text-gray-500">2h ago</p>
                </div>
              </div>
              <h3 className="text-gray-900 mb-3">Can coffee husks be used in skincare products?</h3>
              <p className="text-sm text-gray-700 mb-4">
                I've been researching the antioxidant properties of coffee husks and wondering if anyone has experience incorporating them into natural skincare formulations. Any insights on extraction methods?
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-[#DDEBD1] text-gray-700 px-2 py-1 rounded-full">#FoodWaste</span>
                <span className="text-xs bg-[#DDEBD1] text-gray-700 px-2 py-1 rounded-full">#Skincare</span>
                <span className="text-xs bg-[#DDEBD1] text-gray-700 px-2 py-1 rounded-full">#CoffeeHusks</span>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">42</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">18 comments</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h4 className="text-gray-900 mb-4">Comments</h4>
              <div className="divide-y divide-gray-100">
                {mockComments.map((comment) => (
                  <CommentThread key={comment.id} comment={comment} />
                ))}
              </div>
              
              {/* Add Comment */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] border border-gray-200 resize-none"
                  rows={3}
                />
                <button className="mt-2 bg-[#8BC34A] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#7CB342] transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setShowPostModal(true)}
          className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-[#8BC34A] to-[#7CB342] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all z-30"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="community" onNavigate={onNavigate} />
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
