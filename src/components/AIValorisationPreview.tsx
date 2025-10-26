import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SuggestionCardProps {
  image: string;
  title: string;
  description: string;
}

function SuggestionCard({ image, title, description }: SuggestionCardProps) {
  return (
    <div className="min-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
      <div className="h-32 bg-gray-200 overflow-hidden">
        <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h4 className="text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <button className="flex items-center gap-1 text-sm text-[#8BC34A]">
          See More <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface AIValorisationPreviewProps {
  onViewAll?: () => void;
}

export function AIValorisationPreview({ onViewAll }: AIValorisationPreviewProps) {
  const suggestions = [
    {
      image: "https://images.unsplash.com/photo-1510776537653-6d0da167186c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBncm91bmRzfGVufDF8fHx8MTc2MDQ1MDgzNXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Coffee Grounds → Antioxidant Oil",
      description: "Transform used coffee into valuable extract",
    },
    {
      image: "https://images.unsplash.com/photo-1564948426279-acdb7bbf50dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwYm9uZXMlMjBzZWFmb29kfGVufDF8fHx8MTc2MDQ1MDgzNnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Fish Bones → Collagen Jelly",
      description: "Rich calcium & protein from seafood waste",
    },
    {
      image: "https://images.unsplash.com/photo-1744659745297-39295e84445f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXRydXMlMjBwZWVsJTIwb3JhbmdlfGVufDF8fHx8MTc2MDQ1MDgzNXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Citrus Peels → Eco Enzyme",
      description: "Natural cleaning solution from fruit waste",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-700">AI Valorisation Ideas</h3>
        <button onClick={onViewAll} className="text-sm text-gray-500">View All</button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {suggestions.map((suggestion, idx) => (
          <SuggestionCard key={idx} {...suggestion} />
        ))}
      </div>
    </div>
  );
}
