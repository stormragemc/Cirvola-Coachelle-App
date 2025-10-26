import { Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  image: string;
  title: string;
  story: string;
  price: string;
}

function ProductCard({ image, title, story, price }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="h-40 bg-gray-200 overflow-hidden">
        <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h4 className="text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-3">{story}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-800">{price}</span>
          <button className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShopStoryFeedProps {
  onViewAll?: () => void;
}

export function ShopStoryFeed({ onViewAll }: ShopStoryFeedProps) {
  const products = [
    {
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBwdWRkaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjA0NTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Chocolate Pudding",
      story: "Made from cocoa husks - once waste, now dessert",
      price: "$3.99",
    },
    {
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3JhY2tlcnMlMjBzbmFja3xlbnwxfHx8fDE3NjA0NTA0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Fish Crackers",
      story: "Crunchy snacks from upcycled fish bones",
      price: "$2.99",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-700">Second Bite Shop</h3>
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
