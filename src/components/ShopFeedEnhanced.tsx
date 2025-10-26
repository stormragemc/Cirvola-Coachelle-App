import { Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  sourceTag: string;
  creator: string;
  wasteSaved: string;
}

function ProductCard({ image, title, price, sourceTag, creator, wasteSaved }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="h-40 bg-gray-200 overflow-hidden relative">
        <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-gradient-to-br from-white via-white to-[#F0F7F2] backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-white/50">
          <p className="text-xs text-gray-900 font-semibold">{price}</p>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-gray-900 mb-1">{title}</h4>
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-xs bg-gradient-to-br from-[#DDEBD1] to-[#c5deb1] text-gray-900 px-3 py-1 rounded-full font-medium shadow-sm">
            {sourceTag}
          </span>
          <span className="text-xs bg-gradient-to-br from-gray-100 to-gray-50 text-gray-700 px-3 py-1 rounded-full font-medium shadow-sm">
            by {creator}
          </span>
        </div>
        <p className="text-xs text-green-600 mb-3">💚 {wasteSaved} waste saved</p>
        <div className="flex items-center gap-2">
          <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-xl text-sm">
            Learn More
          </button>
          <button className="bg-[#8BC34A] text-white rounded-full w-9 h-9 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShopFeedEnhancedProps {
  onViewAll?: () => void;
}

export function ShopFeedEnhanced({ onViewAll }: ShopFeedEnhancedProps) {
  const products = [
    {
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBwdWRkaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjA0NTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Chocolate Pudding",
      price: "$5.99",
      sourceTag: "Made from cocoa husks",
      creator: "Cirvola R&D",
      wasteSaved: "250g",
    },
    {
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3JhY2tlcnMlMjBzbmFja3xlbnwxfHx8fDE3NjA0NTA0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Fish Crackers",
      price: "$4.99",
      sourceTag: "Made from fish bones",
      creator: "SeaSoul Kitchen",
      wasteSaved: "200g",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-700">Discover Upcycled Products 🍫</h3>
        <button onClick={onViewAll} className="text-sm text-gray-500">View All</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </div>
  );
}
