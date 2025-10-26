import { X, Check, Upload, Award, Sparkles, PartyPopper } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ChallengeSubmissionPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  challengeTitle?: string;
}

export function ChallengeSubmissionPage({ 
  onBack, 
  onNavigate,
  challengeTitle = "Zero-Waste Kitchen Challenge"
}: ChallengeSubmissionPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock photo gallery
  const mockPhotos = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400",
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400",
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400",
    "https://images.unsplash.com/photo-1625938145312-804a56d874e0?w=400",
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
  ];

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto-navigate after celebration
      setTimeout(() => {
        onNavigate("community-stories");
      }, 3500);
    }, 1500);
  };

  const isValid = selectedImage && title.trim().length > 0 && description.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-50 flex flex-col">
      <div className="max-w-md mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-gray-800">
          <button
            onClick={onBack}
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-white">Challenge Submission</h2>
            <p className="text-xs text-gray-400 mt-0.5">{challengeTitle}</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="text-[#8BC34A] px-4 py-2 rounded-lg hover:bg-[#8BC34A]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#8BC34A] border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image Selection Section */}
          <div className="px-4 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Upload className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-white">Upload Your Valorisation Result</p>
            </div>
            
            {selectedImage ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900">
                <ImageWithFallback
                  src={selectedImage}
                  alt="Selected valorisation"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <>
                {/* Upload Button */}
                <label className="block mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-[#8BC34A] hover:bg-[#8BC34A]/5 transition-all">
                    <Upload className="w-12 h-12 text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">Tap to upload from device</p>
                  </div>
                </label>

                {/* Photo Grid */}
                <div className="grid grid-cols-3 gap-1">
                  {mockPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(photo)}
                      className="aspect-square rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`Gallery photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Title Input */}
          <div className="px-4 py-4 border-b border-gray-800">
            <label className="block mb-2">
              <span className="text-sm text-gray-400">Title</span>
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name your valorisation creation..."
              maxLength={60}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8BC34A] focus:ring-1 focus:ring-[#8BC34A] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1.5 text-right">
              {title.length}/60 characters
            </p>
          </div>

          {/* Description Input */}
          <div className="px-4 py-4 border-b border-gray-800">
            <label className="block mb-2">
              <span className="text-sm text-gray-400">Description</span>
              <span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your valorisation journey... What waste did you transform? How did you do it? What inspired you?"
              rows={6}
              maxLength={500}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8BC34A] focus:ring-1 focus:ring-[#8BC34A] transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1.5 text-right">
              {description.length}/500 characters
            </p>
          </div>

          {/* Challenge Reward Preview */}
          <div className="px-4 py-4">
            <div className="bg-gradient-to-r from-[#8BC34A]/20 to-[#F6C83B]/20 rounded-2xl p-4 border border-[#8BC34A]/30">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8BC34A] to-[#F6C83B] rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white mb-1">Challenge Reward</h4>
                  <p className="text-xs text-gray-300">
                    Complete this challenge to earn:
                  </p>
                  <ul className="text-xs text-gray-300 mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-[#F6C83B]" />
                      <span>+500 Impact Points</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-3 h-3 text-[#F6C83B]" />
                      <span>"Zero-Waste Hero" Badge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PartyPopper className="w-3 h-3 text-[#F6C83B]" />
                      <span>Featured in Community Stories</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-6"></div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                className="max-w-sm mx-4 relative"
              >
                {/* Confetti Effect */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 1, 
                      y: 0, 
                      x: 0,
                      rotate: 0
                    }}
                    animate={{ 
                      opacity: 0, 
                      y: Math.random() * -200 - 100,
                      x: (Math.random() - 0.5) * 300,
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['#8BC34A', '#F6C83B', '#FFFFFF', '#DDEBD1'][i % 4]
                    }}
                  />
                ))}

                {/* Success Card */}
                <div className="bg-gradient-to-br from-[#1a2332] via-[#2d3a4d] to-[#1a2332] rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden border-2 border-[#F6C83B]/30">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F6C83B]/10 to-transparent"></div>
                  
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    className="w-24 h-24 bg-gradient-to-br from-[#F6C83B] to-[#FFE082] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10"
                  >
                    <Award className="w-12 h-12 text-[#1a2332]" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative z-10"
                  >
                    <h2 className="text-white mb-2">Challenge Completed!</h2>
                    <p className="text-white/90 text-sm mb-6">
                      You've successfully completed the {challengeTitle}
                    </p>

                    <div className="space-y-3 mb-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-2 text-white bg-white/20 backdrop-blur rounded-xl px-4 py-3"
                      >
                        <Sparkles className="w-5 h-5 text-[#F6C83B]" />
                        <span>+500 Impact Points</span>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center justify-center gap-2 text-white bg-white/20 backdrop-blur rounded-xl px-4 py-3"
                      >
                        <Award className="w-5 h-5 text-[#F6C83B]" />
                        <span>Zero-Waste Hero Badge Unlocked</span>
                      </motion.div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-xs text-white/80"
                    >
                      Redirecting to Community Stories...
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
