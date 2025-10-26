import { ArrowRight, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StoryCardProps {
  image: string;
  title: string;
  author: string;
}

function StoryCard({ image, title, author }: StoryCardProps) {
  return (
    <div className="min-w-[280px] bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0 border border-gray-100">
      <div className="h-40 bg-gray-200 overflow-hidden">
        <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h4 className="text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-3">Shared by {author}</p>
        <button className="text-sm text-[#8BC34A] flex items-center gap-1 hover:gap-2 transition-all">
          See Story <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AddStoryCard() {
  return (
    <div className="min-w-[280px] bg-gradient-to-br from-[#DDEBD1] to-[#e8f5d9] rounded-2xl shadow-sm overflow-hidden flex-shrink-0 border-2 border-dashed border-[#8BC34A] flex items-center justify-center h-[280px]">
      <div className="text-center p-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Plus className="w-6 h-6 text-[#8BC34A]" />
        </div>
        <p className="text-gray-900 mb-1">Share Your Story</p>
        <p className="text-sm text-gray-600">Inspire the community</p>
      </div>
    </div>
  );
}

interface ValorisationStoriesProps {
  onViewAll?: () => void;
}

export function ValorisationStories({ onViewAll }: ValorisationStoriesProps) {
  const stories = [
    {
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBwdWRkaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjA0NTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "From Waste to Wonder: Cocoa Husk Pudding",
      author: "Cirvola R&D",
    },
    {
      image: "https://images.unsplash.com/photo-1657220644506-77fa47a3487b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZWxhdG8lMjBpY2UlMjBjcmVhbXxlbnwxfHx8fDE3NjAzNTg1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Coffee Husk Gelato Innovation",
      author: "Urban Café",
    },
    {
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3JhY2tlcnMlMjBzbmFja3xlbnwxfHx8fDE3NjA0NTA0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Fish Bone Crackers: A Sustainable Snack",
      author: "SeaSoul Kitchen",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-700">Share Your Valorisation Stories 💡</h3>
        <button onClick={onViewAll} className="text-sm text-gray-500">View All</button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {stories.map((story, idx) => (
          <StoryCard key={idx} {...story} />
        ))}
        <AddStoryCard />
      </div>
    </div>
  );
}
