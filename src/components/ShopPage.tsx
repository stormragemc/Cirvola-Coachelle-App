import { Search, ShoppingCart, Filter, Heart, X, Star, Plus, Minus, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ShopPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onCheckout?: (items: any[]) => void;
}

interface Product {
  id: string;
  image: string;
  name: string;
  source: string;
  sourceIcon: string;
  creator: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  featured?: boolean;
  discount?: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const categories = ["All", "Food & Snacks", "Beverages", "Ingredients", "Eco-Materials"];
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest First", "Most Popular"];

export function ShopPage({ onBack, onNavigate, onCheckout }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: "1",
      name: "Cocoa Husk Chocolate Pudding",
      source: "Cocoa Husks",
      sourceIcon: "🍫",
      creator: "EcoSweet Co.",
      price: 5.99,
      rating: 4.8,
      reviews: 124,
      category: "Food & Snacks",
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?w=300",
      featured: true,
    },
    {
      id: "2",
      name: "Crunchy Fish Bone Crackers",
      source: "Fish Bones",
      sourceIcon: "🐟",
      creator: "OceanCycle",
      price: 4.99,
      rating: 4.6,
      reviews: 89,
      category: "Food & Snacks",
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=300",
      discount: 15,
    },
    {
      id: "3",
      name: "Coffee Grounds Gelato",
      source: "Coffee Grounds",
      sourceIcon: "☕",
      creator: "BrewCycle",
      price: 6.99,
      rating: 4.9,
      reviews: 203,
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1657220644506-77fa47a3487b?w=300",
      featured: true,
    },
    {
      id: "4",
      name: "Mango Peel Energy Bars",
      source: "Mango Peels",
      sourceIcon: "🥭",
      creator: "TropicalWaste",
      price: 3.99,
      rating: 4.7,
      reviews: 156,
      category: "Food & Snacks",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300",
    },
    {
      id: "5",
      name: "Banana Peel Flour",
      source: "Banana Peels",
      sourceIcon: "🍌",
      creator: "GreenGrounds",
      price: 7.50,
      rating: 4.5,
      reviews: 67,
      category: "Ingredients",
      image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=300",
    },
    {
      id: "6",
      name: "Veggie Scrap Stock Cubes",
      source: "Vegetable Scraps",
      sourceIcon: "🥬",
      creator: "ZeroWaste Kitchen",
      price: 4.50,
      rating: 4.8,
      reviews: 142,
      category: "Ingredients",
      image: "https://images.unsplash.com/photo-1506368670716-1fd0c7a0f814?w=300",
    },
    {
      id: "7",
      name: "Orange Peel Tea Blend",
      source: "Orange Peels",
      sourceIcon: "🍊",
      creator: "CitrusCircle",
      price: 5.25,
      rating: 4.6,
      reviews: 98,
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300",
    },
    {
      id: "8",
      name: "Eggshell Fertilizer Pack",
      source: "Eggshells",
      sourceIcon: "🥚",
      creator: "GardenGold",
      price: 3.50,
      rating: 4.9,
      reviews: 215,
      category: "Eco-Materials",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300",
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }]);
    }
    
    // Show feedback animation
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1000);
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (onCheckout && cartItems.length > 0) {
      const checkoutItems = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
          ...item,
          source: product?.source || "Food Waste",
          wasteOffset: 0.2,
        };
      });
      onCheckout(checkoutItems);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F6] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-40 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-4 pt-6 pb-3 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-gray-900 dark:text-white mb-1">Second-Bite Shop 🛍️</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">Upcycled products from food waste</p>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-[#1a2332] to-[#2d3a4d] text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#F6C83B] text-[#1a2332] text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-[#2d3a4d] rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#8BC34A] dark:bg-[#6ba03f] text-white"
                    : "bg-gray-100 dark:bg-[#2d3a4d] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="bg-white dark:bg-[#1a2332] px-4 py-2 border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300"
          >
            <span>Sort by: {sortBy}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          
          <AnimatePresence>
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-4 right-4 bg-white dark:bg-[#2d3a4d] rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 mt-2 z-10 overflow-hidden"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-xs text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      sortBy === option ? "bg-[#EAF6E3] dark:bg-[#2a3f2b] text-[#3C6E47] dark:text-[#6ba03f]" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Grid */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                justAdded={justAdded === product.id}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="shop" onNavigate={onNavigate} />

        {/* Sticky Cart Bar */}
        {cartCount > 0 && (
          <div className="fixed bottom-16 left-0 right-0 z-30">
            <div className="max-w-md mx-auto px-4">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="bg-white dark:bg-[#2d3a4d] rounded-t-2xl shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Cart Icon & Count */}
                  <button
                    onClick={() => setShowCart(true)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#F6C83B] rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{cartCount}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-900 dark:text-white">{cartCount} items</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">${cartTotal.toFixed(2)}</p>
                    </div>
                  </button>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="bg-gradient-to-r from-[#3C6E47] dark:from-[#2d5038] to-[#4FAE68] dark:to-[#4a8357] text-white px-6 py-2.5 rounded-xl text-sm hover:shadow-lg transition-shadow flex items-center gap-2"
                  >
                    Checkout
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Cart Drawer */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowCart(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1a2332] rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col"
              >
                {/* Cart Header */}
                <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 dark:text-white">My Cart ({cartCount} items)</h3>
                  <button onClick={() => setShowCart(false)} className="text-gray-600 dark:text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-4 py-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-900 dark:text-white mb-1 line-clamp-1">{item.name}</p>
                        <p className="text-sm text-[#3C6E47] dark:text-[#6ba03f] mb-2">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 border border-gray-200 dark:border-gray-600 rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Minus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </button>
                          <span className="text-xs text-gray-900 dark:text-white w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 border border-gray-200 dark:border-gray-600 rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Plus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Footer */}
                <div className="px-4 py-4 border-t border-gray-100 bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-600">Subtotal:</span>
                    <span className="text-xs text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-gray-900">Total:</span>
                    <span className="text-lg text-[#3C6E47]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      handleCheckout();
                    }}
                    className="w-full bg-gradient-to-r from-[#1a2332] to-[#2d3a4d] text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product, onAddToCart, justAdded }: { product: Product; onAddToCart: (product: Product) => void; justAdded?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
      {/* Image */}
      <div className="relative aspect-square bg-gray-200">
        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        {/* Badges */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs">
            -{product.discount}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-[#F6C83B] text-white px-2 py-0.5 rounded text-xs">
            ⭐
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-2.5">
        {/* Source Tag */}
        <div className="flex items-center gap-1 text-xs bg-[#DDEBD1] text-gray-700 px-2 py-0.5 rounded-full mb-2 w-fit">
          <span className="text-xs">{product.sourceIcon}</span>
          <span className="text-xs line-clamp-1">{product.source}</span>
        </div>

        {/* Product Name */}
        <h4 className="text-xs text-gray-900 mb-1 line-clamp-2 h-8">{product.name}</h4>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-[#F6C83B] text-[#F6C83B]" />
          <span className="text-xs text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#3C6E47] font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <motion.button
            onClick={() => onAddToCart(product)}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 bg-[#8BC34A] rounded-lg flex items-center justify-center hover:bg-[#7CB342] transition-colors relative"
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
      
      {/* Added to Cart Animation */}
      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="absolute inset-0 bg-[#8BC34A]/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
          >
            <div className="text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
              >
                <ShoppingCart className="w-8 h-8 mx-auto mb-1" />
              </motion.div>
              <p className="text-xs">Added to cart!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
