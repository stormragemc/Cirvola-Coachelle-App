import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, Smile } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

export interface Post {
  id: string;
  title: string;
  before: string;
  after: string;
  beforeImage: string;
  afterImage: string;
  creator: string;
  creatorAvatar?: string;
  likes: number;
  comments: number;
  featured?: boolean;
  description?: string;
  timestamp?: string;
  wasteType?: string;
  impact?: {
    wasteReduced: string;
    co2Saved: string;
    productsCreated: string;
  };
}

interface Comment {
  id: string;
  user: string;
  avatar?: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface PostDetailPageProps {
  post: Post;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function PostDetailPage({ post, onBack, onNavigate }: PostDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [currentLikes, setCurrentLikes] = useState(post.likes);

  const comments: Comment[] = [
    {
      id: "1",
      user: "EcoWarrior",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EcoWarrior",
      text: "This is amazing! I never thought about using fish bones this way. Definitely trying this! 🐟",
      timestamp: "2h ago",
      likes: 12,
    },
    {
      id: "2",
      user: "GreenChef",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GreenChef",
      text: "We've been doing this at our restaurant for months. The customers love it!",
      timestamp: "5h ago",
      likes: 8,
    },
    {
      id: "3",
      user: "SustainableSara",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SustainableSara",
      text: "Can you share the full recipe? What equipment do you need?",
      timestamp: "1d ago",
      likes: 15,
    },
    {
      id: "4",
      user: "ZeroWasteZen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZeroWasteZen",
      text: "Love seeing the circular economy in action! 🌍♻️",
      timestamp: "1d ago",
      likes: 6,
    },
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      // Handle comment submission
      setCommentText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9F6] dark:from-[#1a2332] to-white dark:to-[#1e2738] flex flex-col transition-colors duration-300"
    >
      <div className="max-w-md mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-4 py-3 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <h2 className="text-gray-900 dark:text-white">Post</h2>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Creator Info */}
          <div className="bg-white dark:bg-[#1a2332] px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8BC34A] to-[#7CB342] flex items-center justify-center text-white">
                {post.creatorAvatar ? (
                  <ImageWithFallback src={post.creatorAvatar} alt={post.creator} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-sm font-semibold">{post.creator.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white font-semibold">{post.creator}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp || "2 hours ago"}</p>
              </div>
              <button className="px-4 py-1.5 bg-[#8BC34A] dark:bg-[#6ba03f] text-white rounded-lg text-sm hover:bg-[#7CB342] dark:hover:bg-[#5a8c3a] transition-colors">
                Follow
              </button>
            </div>
          </div>

          {/* Before/After Images - Instagram Style */}
          <div className="bg-black border-b border-gray-100 dark:border-gray-700">
            <div className="relative aspect-square">
              <div className="grid grid-cols-2 h-full gap-1">
                {/* Before Image */}
                <div className="relative overflow-hidden bg-gray-900">
                  <ImageWithFallback
                    src={post.beforeImage}
                    alt={post.before}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs text-white bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md px-4 py-1.5 rounded-full font-medium shadow-lg border border-white/20">
                      Before: {post.before}
                    </span>
                  </div>
                </div>

                {/* After Image */}
                <div className="relative overflow-hidden bg-gray-900">
                  <ImageWithFallback
                    src={post.afterImage}
                    alt={post.after}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs text-white bg-gradient-to-br from-[#8BC34A] to-[#7CB342] backdrop-blur-md px-4 py-1.5 rounded-full font-medium shadow-lg border border-white/30">
                      After: {post.after}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {post.featured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-3 left-3 bg-gradient-to-r from-[#F6C83B] to-[#f4a12e] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-[#f4a12e]/30"
                >
                  ⭐ Featured
                </motion.div>
              )}

              {/* Image Counter */}
              <div className="absolute top-3 right-3 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-white/20">
                1/2
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="bg-white dark:bg-[#1a2332] px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <button onClick={handleLike} className="hover:scale-110 transition-transform">
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="hover:scale-110 transition-transform"
                >
                  <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <button onClick={() => setIsSaved(!isSaved)} className="hover:scale-110 transition-transform">
                <Bookmark
                  className={`w-6 h-6 ${
                    isSaved
                      ? "fill-[#8BC34A] text-[#8BC34A] dark:fill-[#6ba03f] dark:text-[#6ba03f]"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
              </button>
            </div>

            {/* Likes Count */}
            <p className="text-sm text-gray-900 dark:text-white font-semibold mb-2">
              {currentLikes.toLocaleString()} likes
            </p>

            {/* Description */}
            <div className="mb-2">
              <p className="text-sm">
                <span className="text-gray-900 dark:text-white font-semibold mr-2">{post.creator}</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {post.description || `Transformed ${post.before} into delicious ${post.after}! This is what circular economy looks like in action. Zero waste, maximum value! 🌍♻️ #CircularEconomy #ZeroWaste #FoodWaste`}
                </span>
              </p>
            </div>

            {/* View all comments link */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              View all {post.comments} comments
            </button>
          </div>

          {/* Impact Stats */}
          {post.impact && (
            <div className="bg-gradient-to-r from-[#EAF6E3] dark:from-[#2a3f2b] to-[#F0F7F2] dark:to-[#1e2f1f] px-4 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-xs text-gray-700 dark:text-gray-300 font-semibold mb-3 uppercase tracking-wide">
                Environmental Impact
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-[#2d3a4d] rounded-lg p-3 text-center">
                  <p className="text-lg text-[#8BC34A] dark:text-[#6ba03f] font-semibold">
                    {post.impact.wasteReduced}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Waste Reduced</p>
                </div>
                <div className="bg-white dark:bg-[#2d3a4d] rounded-lg p-3 text-center">
                  <p className="text-lg text-[#8BC34A] dark:text-[#6ba03f] font-semibold">
                    {post.impact.co2Saved}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">CO₂ Saved</p>
                </div>
                <div className="bg-white dark:bg-[#2d3a4d] rounded-lg p-3 text-center">
                  <p className="text-lg text-[#8BC34A] dark:text-[#6ba03f] font-semibold">
                    {post.impact.productsCreated}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Products Made</p>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-[#1a2332]"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm text-gray-900 dark:text-white font-semibold mb-4">
                    Comments ({comments.length})
                  </h3>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          {comment.avatar && (
                            <ImageWithFallback
                              src={comment.avatar}
                              alt={comment.user}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="text-gray-900 dark:text-white font-semibold mr-2">
                              {comment.user}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{comment.text}</span>
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {comment.timestamp}
                            </span>
                            <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                              {comment.likes} likes
                            </button>
                            <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                              Reply
                            </button>
                          </div>
                        </div>
                        <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400">
                          <Heart className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Spacing */}
          <div className="h-20"></div>
        </div>

        {/* Comment Input - Fixed at bottom */}
        <div className="bg-white dark:bg-[#1a2332] border-t border-gray-100 dark:border-gray-700 px-4 py-3 sticky bottom-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8BC34A] to-[#7CB342] flex items-center justify-center text-white flex-shrink-0">
              <span className="text-xs font-semibold">You</span>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleComment()}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 bg-gray-50 dark:bg-[#2d3a4d] rounded-full text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f] border border-gray-200 dark:border-gray-600"
              />
            </div>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
              <Smile className="w-5 h-5" />
            </button>
            {commentText.trim() && (
              <button
                onClick={handleComment}
                className="text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a] font-semibold text-sm"
              >
                Post
              </button>
            )}
          </div>
        </div>
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
    </motion.div>
  );
}
