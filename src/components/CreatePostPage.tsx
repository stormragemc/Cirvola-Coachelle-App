import { X, Image as ImageIcon, Camera } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface CreatePostPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function CreatePostPage({ onBack, onNavigate }: CreatePostPageProps) {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [selectMultiple, setSelectMultiple] = useState(false);
  const [postType, setPostType] = useState<"post" | "story" | "reel">("post");

  // Mock recent photos
  const recentPhotos = [
    "https://images.unsplash.com/photo-1673551491291-5b17d2842988?w=400",
    "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=400",
    "https://images.unsplash.com/photo-1657220644506-77fa47a3487b?w=400",
    "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=400",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=400",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
    "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=400",
    "https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=400",
  ];

  const toggleImageSelection = (index: number) => {
    if (selectMultiple) {
      if (selectedImages.includes(index)) {
        setSelectedImages(selectedImages.filter(i => i !== index));
      } else {
        setSelectedImages([...selectedImages, index]);
      }
    } else {
      setSelectedImages([index]);
    }
  };

  const handleNext = () => {
    // Navigate to post composition page (to be created)
    console.log("Selected images:", selectedImages);
    console.log("Post type:", postType);
    // For now, just go back
    onBack();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-[#0A0A0A] px-4 py-4 border-b border-gray-800 flex items-center justify-between sticky top-0 z-20">
          <button onClick={onBack} className="p-1">
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white">New post</h2>
          <button 
            onClick={handleNext}
            className={`text-sm px-1 ${selectedImages.length > 0 ? 'text-[#4A9EFF]' : 'text-gray-500'}`}
            disabled={selectedImages.length === 0}
          >
            Next
          </button>
        </div>

        {/* Preview Area - Show selected image */}
        <div className="relative bg-black aspect-square">
          {selectedImages.length > 0 ? (
            <img
              src={recentPhotos[selectedImages[0]]}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Select a photo to preview</p>
              </div>
            </div>
          )}
          
          {/* Camera button overlay */}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Camera className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Gallery Section */}
        <div className="flex-1 bg-[#0A0A0A] overflow-y-auto">
          {/* Recents Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-800">
            <button className="flex items-center gap-2">
              <span className="text-sm">Recents</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setSelectMultiple(!selectMultiple)}
              className={`text-xs px-3 py-2 rounded-full border flex items-center gap-2 ${
                selectMultiple 
                  ? 'bg-[#4A9EFF] border-[#4A9EFF] text-white' 
                  : 'border-gray-700 text-gray-300'
              }`}
            >
              <div className="flex gap-0.5">
                <div className="w-3 h-3 border-2 border-current rounded"></div>
                <div className="w-3 h-3 border-2 border-current rounded -ml-1"></div>
              </div>
              SELECT MULTIPLE
            </button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {recentPhotos.map((photo, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleImageSelection(index)}
                className="relative aspect-square cursor-pointer"
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Selection indicator */}
                {selectedImages.includes(index) && (
                  <div className="absolute inset-0 bg-black/30 border-2 border-[#4A9EFF]">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#4A9EFF] rounded-full flex items-center justify-center text-xs">
                      {selectMultiple ? selectedImages.indexOf(index) + 1 : '✓'}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom spacing */}
          <div className="h-24"></div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-[#0A0A0A] border-t border-gray-800 px-4 py-4 sticky bottom-0">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setPostType("post")}
              className={`px-6 py-2.5 rounded-full transition-colors ${
                postType === "post" 
                  ? 'bg-white text-black' 
                  : 'bg-transparent text-gray-400'
              }`}
            >
              POST
            </button>
            <button
              onClick={() => setPostType("story")}
              className={`px-6 py-2.5 rounded-full transition-colors ${
                postType === "story" 
                  ? 'bg-white text-black' 
                  : 'bg-transparent text-gray-400'
              }`}
            >
              STORY
            </button>
            <button
              onClick={() => setPostType("reel")}
              className={`px-6 py-2.5 rounded-full transition-colors ${
                postType === "reel" 
                  ? 'bg-white text-black' 
                  : 'bg-transparent text-gray-400'
              }`}
            >
              REEL
            </button>
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
    </div>
  );
}
