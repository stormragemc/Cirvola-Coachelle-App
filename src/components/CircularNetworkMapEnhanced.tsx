import { Search, MapPin, X, Locate, Filter, Navigation, Clock, AlertCircle, Sparkles, FlaskConical, ShoppingBasket, Package, Leaf, TrendingUp, Lightbulb, ChevronLeft, ChevronRight, Calendar, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { toast } from "sonner@2.0.3";

interface WastePoint {
  id: number;
  lat: number;
  lng: number;
  type: "valorisation" | "collection" | "distribution";
  category: string;
  name: string;
  wasteType: string;
  amount: string;
  distance: string;
  updatedAt: string;
  image: string;
  urgent?: boolean;
  description: string;
}

interface MapPopupProps {
  point: WastePoint;
  onClose: () => void;
  onViewDetails: () => void;
}

function MapPopup({ point, onClose, onViewDetails }: MapPopupProps) {
  const getTypeIcon = () => {
    switch (point.type) {
      case "valorisation":
        return <FlaskConical className="w-4 h-4 text-[#8BC34A]" />;
      case "collection":
        return <ShoppingBasket className="w-4 h-4 text-[#F6B93B]" />;
      case "distribution":
        return <Package className="w-4 h-4 text-[#9C27B0]" />;
    }
  };

  const getTypeEmoji = () => {
    switch (point.type) {
      case "valorisation":
        return "🔬";
      case "collection":
        return "🚚";
      case "distribution":
        return "🍃";
    }
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(point.name);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute z-50 left-1/2 bottom-6 -translate-x-1/2 w-[90%] max-w-sm"
    >
      <div className="bg-white dark:bg-[#1a2332] rounded-2xl shadow-2xl overflow-hidden border-l-4 border-l-[#8BC34A]">
        {/* Image Header */}
        <div className="relative h-32">
          <ImageWithFallback 
            src={point.image} 
            alt={point.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-gray-900 dark:text-white" />
          </button>

          {/* Urgent Badge */}
          {point.urgent && (
            <div className="absolute top-2 left-2 bg-[#F6B93B] text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs animate-pulse">
              <AlertCircle className="w-3 h-3" />
              Expires in 3 hrs!
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1.5">
            {getTypeIcon()}
            <span className="text-xs text-gray-900 dark:text-white capitalize">{point.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-2 mb-3">
            <span className="text-2xl">{getTypeEmoji()}</span>
            <div className="flex-1">
              <h4 className="text-gray-900 dark:text-white mb-1">{point.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{point.description}</p>
            </div>
          </div>

          {/* Waste Info */}
          <div className="bg-[#F8FBF8] dark:bg-[#2a3f2b] rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 dark:text-gray-400">Available</span>
              <span className="text-xs text-[#8BC34A] dark:text-[#6ba03f]">{point.amount}</span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white">{point.wasteType}</p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{point.distance}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{point.updatedAt}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={openGoogleMaps}
              className="bg-gray-100 dark:bg-[#2d3a4d] text-gray-900 dark:text-white py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-4 h-4" />
              Open in Maps
            </button>
            <button 
              onClick={onViewDetails}
              className="bg-gradient-to-r from-[#8BC34A] to-[#7CB342] text-white py-2.5 rounded-xl hover:shadow-lg transition-shadow text-sm flex items-center justify-center"
            >
              View Details →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface FilterChipProps {
  icon: string;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ icon, label, count, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
        active
          ? "bg-[#8BC34A] dark:bg-[#6ba03f] text-white shadow-md"
          : "bg-white dark:bg-[#2d3a4d] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
      }`}
    >
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
        active ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700"
      }`}>
        {count}
      </span>
    </button>
  );
}

interface AnalyticsCardProps {
  icon: string;
  value: string;
  label: string;
  trend: string;
  data: { value: number }[];
  color: string;
}

function AnalyticsCard({ icon, value, label, trend, data, color }: AnalyticsCardProps) {
  return (
    <div className="min-w-[140px] bg-white dark:bg-[#2d3a4d] rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-green-600 dark:text-green-400">{trend}</span>
      </div>
      <div className="mb-1">
        <p className="text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
      </div>
      <ResponsiveContainer width="100%" height={30}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PartnerOpportunityProps {
  image: string;
  name: string;
  amount: string;
  wasteType: string;
  category: string;
  distance: string;
  updatedAt: string;
  wasteImage: string;
  onRequestPickup: () => void;
}

function PartnerOpportunity({ image, name, amount, wasteType, category, distance, updatedAt, wasteImage, onRequestPickup }: PartnerOpportunityProps) {
  return (
    <div className="w-full bg-white dark:bg-[#2d3a4d] rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Image with 16:9 Aspect Ratio */}
      <div className="relative w-full bg-gray-200 dark:bg-gray-700" style={{ paddingTop: '56.25%' }}>
        <ImageWithFallback 
          src={image} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute top-3 left-3 bg-gradient-to-br from-white/95 via-white/95 to-[#F0F7F2]/95 dark:from-gray-800/95 dark:via-gray-800/95 dark:to-gray-700/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-white/50 dark:border-gray-600/50">
          <span className="text-xs text-gray-900 dark:text-white">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-gray-900 dark:text-white mb-3">{name}</h4>
        
        {/* Waste Preview with Image */}
        <div className="flex items-center gap-3 mb-3 bg-[#F6F8F5] dark:bg-[#1e2f1f] rounded-xl p-3 shadow-sm">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback src={wasteImage} alt={wasteType} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Available</p>
            <p className="text-sm text-gray-900 dark:text-white truncate">{amount} {wasteType}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>Updated {updatedAt}</span>
          <span>•</span>
          <span>{distance} away</span>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onRequestPickup}
          className="w-full bg-[#7DBF4E] dark:bg-[#6ba03f] text-white py-3.5 px-4 rounded-xl hover:bg-[#6fb03f] dark:hover:bg-[#5a8c3a] hover:shadow-lg transition-all duration-200"
        >
          Request Pickup / Collaborate
        </button>
      </div>
    </div>
  );
}

interface CircularNetworkMapEnhancedProps {
  onBack?: () => void;
  onNavigate: (page: string) => void;
  onLocationSelect?: (location: any) => void;
  onViewRecommendations?: () => void;
}

export function CircularNetworkMapEnhanced({ onBack, onNavigate, onLocationSelect, onViewRecommendations }: CircularNetworkMapEnhancedProps) {
  const [selectedPoint, setSelectedPoint] = useState<WastePoint | null>(null);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [mapView, setMapView] = useState<"nearby" | "global">("nearby");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDistance, setFilterDistance] = useState("5km");
  const [showFilters, setShowFilters] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [opportunityIndex, setOpportunityIndex] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Pan/Drag state
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const animationFrame = useRef<number>();

  // Extended waste points across the larger map area (coordinates are % based, now spanning full 100% area)
  const wastePoints: WastePoint[] = [
    // Center area (original visible area - 33-66% range)
    {
      id: 1,
      lat: 45,
      lng: 48,
      type: "collection",
      category: "Restaurant",
      name: "Urban Grounds Café",
      wasteType: "Spent coffee grounds",
      amount: "5kg",
      distance: "1.2km",
      updatedAt: "2h ago",
      image: "https://images.unsplash.com/photo-1653491948869-cea123870879?w=400",
      description: "Waste pickup ready 🚚",
      urgent: true,
    },
    {
      id: 2,
      lat: 52,
      lng: 40,
      type: "valorisation",
      category: "R&D Lab",
      name: "GreenLab Bio",
      wasteType: "Mixed organic waste",
      amount: "12kg",
      distance: "2.5km",
      updatedAt: "1h ago",
      image: "https://images.unsplash.com/photo-1707944745860-4615eb585a41?w=400",
      description: "Valorisation ongoing 🔬",
    },
    {
      id: 3,
      lat: 57,
      lng: 55,
      type: "distribution",
      category: "Community",
      name: "Green Community Kitchen",
      wasteType: "Prepared plant-based meals",
      amount: "8 portions",
      distance: "3.2km",
      updatedAt: "4h ago",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
      description: "Join community kitchen 🍳",
    },
    {
      id: 4,
      lat: 48,
      lng: 60,
      type: "collection",
      category: "Restaurant",
      name: "SeaSoul Kitchen",
      wasteType: "Fresh fish bones & scraps",
      amount: "3kg",
      distance: "1.8km",
      updatedAt: "30min ago",
      image: "https://images.unsplash.com/photo-1636401870585-a8852371e84a?w=400",
      description: "Waste pickup ready 🚚",
      urgent: true,
    },
    // Upper area (0-33% lat range)
    {
      id: 5,
      lat: 15,
      lng: 45,
      type: "valorisation",
      category: "Biotech Lab",
      name: "Bio Extract Co.",
      wasteType: "Citrus peels & rinds",
      amount: "7kg",
      distance: "6.3km",
      updatedAt: "3h ago",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400",
      description: "Valorisation ongoing 🔬",
    },
    {
      id: 6,
      lat: 22,
      lng: 35,
      type: "collection",
      category: "Café",
      name: "Northern Brew Co.",
      wasteType: "Tea leaves & grounds",
      amount: "4kg",
      distance: "5.8km",
      updatedAt: "2h ago",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      description: "Fresh waste available ☕",
    },
    {
      id: 7,
      lat: 28,
      lng: 65,
      type: "distribution",
      category: "Community",
      name: "Uptown Food Share",
      wasteType: "Prepared meals",
      amount: "12 portions",
      distance: "5.2km",
      updatedAt: "3h ago",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
      description: "Community distribution 🍱",
    },
    // Lower area (66-100% lat range)
    {
      id: 8,
      lat: 72,
      lng: 50,
      type: "collection",
      category: "Restaurant",
      name: "South Side Bistro",
      wasteType: "Vegetable scraps",
      amount: "8kg",
      distance: "4.5km",
      updatedAt: "1h ago",
      image: "https://images.unsplash.com/photo-1636401870585-a8852371e84a?w=400",
      description: "Waste pickup ready 🥬",
    },
    {
      id: 9,
      lat: 80,
      lng: 42,
      type: "valorisation",
      category: "R&D Lab",
      name: "Southern BioTech",
      wasteType: "Fruit waste",
      amount: "10kg",
      distance: "6.7km",
      updatedAt: "4h ago",
      image: "https://images.unsplash.com/photo-1707944745860-4615eb585a41?w=400",
      description: "Research in progress 🔬",
    },
    {
      id: 10,
      lat: 85,
      lng: 58,
      type: "distribution",
      category: "Recycler",
      name: "EcoCompost Hub South",
      wasteType: "Rich compost blend",
      amount: "20kg",
      distance: "7.1km",
      updatedAt: "5h ago",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      description: "Community distribution 🌱",
    },
    // Left area (0-33% lng range)
    {
      id: 11,
      lat: 50,
      lng: 18,
      type: "collection",
      category: "Market",
      name: "West End Market",
      wasteType: "Produce waste",
      amount: "15kg",
      distance: "5.5km",
      updatedAt: "2h ago",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      description: "Daily collection 🛒",
    },
    {
      id: 12,
      lat: 42,
      lng: 25,
      type: "valorisation",
      category: "Biotech Lab",
      name: "WestLab Innovations",
      wasteType: "Mixed organics",
      amount: "9kg",
      distance: "6.0km",
      updatedAt: "3h ago",
      image: "https://images.unsplash.com/photo-1707944745860-4615eb585a41?w=400",
      description: "Processing waste 🧪",
    },
    // Right area (66-100% lng range)
    {
      id: 13,
      lat: 48,
      lng: 75,
      type: "distribution",
      category: "Community",
      name: "East Community Hub",
      wasteType: "Meals & compost",
      amount: "18kg",
      distance: "5.3km",
      updatedAt: "2h ago",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
      description: "Serving community 🍲",
    },
    {
      id: 14,
      lat: 55,
      lng: 82,
      type: "collection",
      category: "Café",
      name: "Mango Dreams Juice Bar",
      wasteType: "Mango skins & seeds",
      amount: "4kg",
      distance: "5.8km",
      updatedAt: "1h ago",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      description: "Fresh waste available 🥭",
    },
    {
      id: 15,
      lat: 38,
      lng: 88,
      type: "valorisation",
      category: "R&D Lab",
      name: "East Coast BioLab",
      wasteType: "Seafood waste",
      amount: "6kg",
      distance: "6.9km",
      updatedAt: "4h ago",
      image: "https://images.unsplash.com/photo-1707944745860-4615eb585a41?w=400",
      description: "Marine research 🐟",
    },
  ];

  // Inertia effect for smooth deceleration with bounds
  useEffect(() => {
    if (!isDragging && (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1)) {
      const animate = () => {
        setVelocity(prev => ({
          x: prev.x * 0.95,
          y: prev.y * 0.95,
        }));
        setMapPosition(prev => {
          let newX = prev.x + velocity.x;
          let newY = prev.y + velocity.y;
          
          // Apply soft bounds
          const maxOffset = 400;
          const resistance = 0.3;
          
          if (Math.abs(newX) > maxOffset) {
            newX = maxOffset * Math.sign(newX) + (newX - maxOffset * Math.sign(newX)) * resistance;
            setVelocity(v => ({ ...v, x: v.x * 0.7 })); // Reduce velocity when hitting bounds
          }
          if (Math.abs(newY) > maxOffset) {
            newY = maxOffset * Math.sign(newY) + (newY - maxOffset * Math.sign(newY)) * resistance;
            setVelocity(v => ({ ...v, y: v.y * 0.7 }));
          }
          
          return { x: newX, y: newY };
        });
        
        if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
          animationFrame.current = requestAnimationFrame(animate);
        }
      };
      animationFrame.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
      };
    }
  }, [isDragging, velocity]);

  // Reset position when switching between Nearby and Global
  useEffect(() => {
    setMapPosition({ x: 0, y: 0 });
    setVelocity({ x: 0, y: 0 });
  }, [mapView]);

  const handleRecenter = () => {
    setMapZoom(1);
    setMapPosition({ x: 0, y: 0 });
    setVelocity({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
    lastPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    setVelocity({ x: 0, y: 0 });
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;
    
    // Soft bounds - allow some overscroll but with resistance
    const maxOffset = 400; // Maximum pixels you can drag beyond the extended area
    const resistance = 0.3; // How much resistance when near edges
    
    // Apply soft bounds with ease effect
    if (Math.abs(newX) > maxOffset) {
      newX = maxOffset * Math.sign(newX) + (newX - maxOffset * Math.sign(newX)) * resistance;
    }
    if (Math.abs(newY) > maxOffset) {
      newY = maxOffset * Math.sign(newY) + (newY - maxOffset * Math.sign(newY)) * resistance;
    }
    
    // Calculate velocity for inertia
    const now = Date.now();
    const dt = now - lastPos.current.time;
    if (dt > 0) {
      const vx = (e.clientX - lastPos.current.x) / dt * 16;
      const vy = (e.clientY - lastPos.current.y) / dt * 16;
      setVelocity({ x: vx, y: vy });
    }
    
    lastPos.current = { x: e.clientX, y: e.clientY, time: now };
    setMapPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - mapPosition.x, y: touch.clientY - mapPosition.y });
    lastPos.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    setVelocity({ x: 0, y: 0 });
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    let newX = touch.clientX - dragStart.x;
    let newY = touch.clientY - dragStart.y;
    
    // Soft bounds - allow some overscroll but with resistance
    const maxOffset = 400;
    const resistance = 0.3;
    
    if (Math.abs(newX) > maxOffset) {
      newX = maxOffset * Math.sign(newX) + (newX - maxOffset * Math.sign(newX)) * resistance;
    }
    if (Math.abs(newY) > maxOffset) {
      newY = maxOffset * Math.sign(newY) + (newY - maxOffset * Math.sign(newY)) * resistance;
    }
    
    const now = Date.now();
    const dt = now - lastPos.current.time;
    if (dt > 0) {
      const vx = (touch.clientX - lastPos.current.x) / dt * 16;
      const vy = (touch.clientY - lastPos.current.y) / dt * 16;
      setVelocity({ x: vx, y: vy });
    }
    
    lastPos.current = { x: touch.clientX, y: touch.clientY, time: now };
    setMapPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "valorisation":
        return { bg: "#8BC34A", ring: "#7CB342" };
      case "collection":
        return { bg: "#F6B93B", ring: "#f5a623" };
      case "distribution":
        return { bg: "#9C27B0", ring: "#7B1FA2" };
      default:
        return { bg: "#888", ring: "#666" };
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "valorisation":
        return <FlaskConical className="w-5 h-5 text-white" />;
      case "collection":
        return <ShoppingBasket className="w-5 h-5 text-white" />;
      case "distribution":
        return <Leaf className="w-5 h-5 text-white" />;
    }
  };

  const filterCounts = {
    all: wastePoints.length,
    collection: wastePoints.filter(p => p.type === "collection").length,
    valorisation: wastePoints.filter(p => p.type === "valorisation").length,
    distribution: wastePoints.filter(p => p.type === "distribution").length,
  };

  const filteredPoints = wastePoints.filter(point => {
    if (activeFilter === "all") return true;
    return point.type === activeFilter;
  });

  const analyticsData = {
    waste: [{ value: 25 }, { value: 28 }, { value: 30 }, { value: 32.4 }],
    co2: [{ value: 14 }, { value: 16 }, { value: 17 }, { value: 18.7 }],
    water: [{ value: 10 }, { value: 11 }, { value: 11.5 }, { value: 12.1 }],
  };

  const opportunities = [
    {
      image: "https://images.unsplash.com/photo-1636401870585-a8852371e84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGZvb2R8ZW58MXx8fHwxNzYwMzUxNDM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "SeaSoul Kitchen",
      amount: "3kg",
      wasteType: "fish bones",
      category: "Restaurant",
      distance: "1.8km",
      updatedAt: "30min ago",
      wasteImage: "https://images.unsplash.com/photo-1601618280556-3d7ccc3c10d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwYm9uZXMlMjBzZWFmb29kJTIwd2FzdGV8ZW58MXx8fHwxNzYxMzk3MTUyfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      image: "https://images.unsplash.com/photo-1653491948869-cea123870879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwa2l0Y2hlbiUyMGNvb2tpbmd8ZW58MXx8fHwxNzYwNDUxODEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Urban Café",
      amount: "5kg",
      wasteType: "coffee grounds",
      category: "Café",
      distance: "1.2km",
      updatedAt: "2h ago",
      wasteImage: "https://images.unsplash.com/photo-1615928597176-376b4b12fa70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBncm91bmRzJTIwZXNwcmVzc298ZW58MXx8fHwxNzYxMzk3MTUxfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      image: "https://images.unsplash.com/photo-1707944745860-4615eb585a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MXx8fHwxNzYwNDUyMjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "GreenLab Bio",
      amount: "12kg",
      wasteType: "citrus peels",
      category: "R&D Lab",
      distance: "2.5km",
      updatedAt: "1h ago",
      wasteImage: "https://images.unsplash.com/photo-1703108158913-00aceda41370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXRydXMlMjBwZWVscyUyMG9yYW5nZXxlbnwxfHx8fDE3NjEzOTcxNTF8MA&ixlib=rb-4.1.0&q=80&w=400",
    },
  ];

  const nextOpportunity = () => {
    setOpportunityIndex((prev) => (prev + 1) % opportunities.length);
  };

  const prevOpportunity = () => {
    setOpportunityIndex((prev) => (prev - 1 + opportunities.length) % opportunities.length);
  };

  const urgentCount = wastePoints.filter(p => p.urgent).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FBF8] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-4 py-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-gray-900 dark:text-white">Circular Network Map</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Discover waste sources & partners</p>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-10 h-10 bg-[#F8FBF8] dark:bg-[#2d3a4d] rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className={`w-5 h-5 ${showFilters ? 'text-[#8BC34A]' : 'text-gray-600 dark:text-gray-400'}`} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants, labs, recyclers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FBF8] dark:bg-[#2d3a4d] rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-3">
            <FilterChip
              icon="♻️"
              label="All"
              count={filterCounts.all}
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            <FilterChip
              icon="🚛"
              label="Collection"
              count={filterCounts.collection}
              active={activeFilter === "collection"}
              onClick={() => setActiveFilter("collection")}
            />
            <FilterChip
              icon="🍋"
              label="Valorisation"
              count={filterCounts.valorisation}
              active={activeFilter === "valorisation"}
              onClick={() => setActiveFilter("valorisation")}
            />
            <FilterChip
              icon="🔬"
              label="Distribution"
              count={filterCounts.distribution}
              active={activeFilter === "distribution"}
              onClick={() => setActiveFilter("distribution")}
            />
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-3"
              >
                <div className="bg-[#F8FBF8] dark:bg-[#2d3a4d] rounded-xl p-3 space-y-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Distance Filter</p>
                  <div className="flex gap-2">
                    {["Nearby", "5 km", "10 km", "20 km"].map((dist) => (
                      <button
                        key={dist}
                        onClick={() => setFilterDistance(dist)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          filterDistance === dist
                            ? "bg-[#8BC34A] dark:bg-[#6ba03f] text-white"
                            : "bg-white dark:bg-[#1a2332] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        {dist}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Map Container */}
        <div className="bg-white dark:bg-[#2d3a4d] mx-4 mt-4 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Map View Toggle */}
          <div className="flex border-b border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setMapView("nearby")}
              className={`flex-1 py-3.5 text-sm text-center transition-all ${
                mapView === "nearby"
                  ? "text-[#8BC34A] dark:text-[#6ba03f] border-b-2 border-[#8BC34A] dark:border-[#6ba03f]"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Nearby
            </button>
            <button
              onClick={() => setMapView("global")}
              className={`flex-1 py-3.5 text-sm text-center transition-all ${
                mapView === "global"
                  ? "text-[#8BC34A] dark:text-[#6ba03f] border-b-2 border-[#8BC34A] dark:border-[#6ba03f]"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Global
            </button>
          </div>

          {/* Interactive Map */}
          <div 
            ref={mapRef}
            className="h-[400px] relative bg-[#e8ebe4] dark:bg-[#2d3a4d] overflow-hidden"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* Draggable Map Content - Extended 3x size for seamless exploration */}
            <div
              className="absolute"
              style={{ 
                width: '300%',
                height: '300%',
                left: '-100%',
                top: '-100%',
                transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`,
                transformOrigin: "center center",
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
            {/* Google Maps-style Background - Tiling Pattern */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                {/* Terrain texture */}
                <pattern id="terrain" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="#f5f3ed" className="dark:fill-[#2d3a4d]" />
                  <circle cx="20" cy="20" r="1" fill="#e8e6dc" opacity="0.3" className="dark:fill-[#3d4a5d]" />
                  <circle cx="60" cy="40" r="1" fill="#e8e6dc" opacity="0.3" className="dark:fill-[#3d4a5d]" />
                  <circle cx="80" cy="80" r="1" fill="#e8e6dc" opacity="0.3" className="dark:fill-[#3d4a5d]" />
                </pattern>
                
                {/* Green zone gradient */}
                <radialGradient id="greenZone">
                  <stop offset="0%" stopColor="#8BC34A" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#8BC34A" stopOpacity="0" />
                </radialGradient>

                {/* Water gradient */}
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a8d5f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7fb3d5" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Base terrain */}
              <rect width="100%" height="100%" fill="url(#terrain)" />

              {/* Water bodies (rivers and streams) - distributed across map */}
              <path 
                d="M 0 220 Q 120 200, 200 220 T 350 220 Q 450 230, 500 220 L 500 260 Q 420 250, 350 260 T 200 260 Q 100 270, 0 260 Z" 
                fill="url(#waterGradient)" 
                className="dark:opacity-20"
              />
              {/* Additional water streams */}
              <ellipse cx="25%" cy="18%" rx="60" ry="25" fill="url(#waterGradient)" opacity="0.7" className="dark:opacity-15" />
              <ellipse cx="78%" cy="82%" rx="70" ry="30" fill="url(#waterGradient)" opacity="0.7" className="dark:opacity-15" />
              <path 
                d="M 85% 10% Q 90% 30%, 88% 50% T 92% 70%" 
                stroke="url(#waterGradient)" 
                strokeWidth="18" 
                fill="none" 
                opacity="0.6" 
                className="dark:opacity-12"
              />

              {/* Parks and green spaces - distributed across extended map */}
              <ellipse cx="18%" cy="58%" rx="50" ry="35" fill="#b8d4a8" opacity="0.5" className="dark:opacity-25" />
              <ellipse cx="82%" cy="30%" rx="45" ry="30" fill="#b8d4a8" opacity="0.5" className="dark:opacity-25" />
              <rect x="58%" y="68%" width="65" height="45" rx="10" fill="#b8d4a8" opacity="0.4" className="dark:opacity-20" />
              <ellipse cx="35%" cy="15%" rx="40" ry="28" fill="#b8d4a8" opacity="0.45" className="dark:opacity-20" />
              <ellipse cx="65%" cy="85%" rx="55" ry="38" fill="#b8d4a8" opacity="0.5" className="dark:opacity-25" />
              <ellipse cx="90%" cy="75%" rx="35" ry="25" fill="#b8d4a8" opacity="0.4" className="dark:opacity-20" />
              <rect x="8%" y="22%" width="50" height="35" rx="8" fill="#b8d4a8" opacity="0.42" className="dark:opacity-22" />

              {/* Major roads - highway style (horizontal) */}
              <line x1="0" y1="52%" x2="100%" y2="52%" stroke="#ffd966" strokeWidth="10" opacity="0.6" className="dark:opacity-40" />
              <line x1="0" y1="52%" x2="100%" y2="52%" stroke="#ffffff" strokeWidth="2" opacity="0.5" strokeDasharray="15,10" />
              
              {/* Vertical major roads */}
              <line x1="38%" y1="0" x2="38%" y2="100%" stroke="#e5e5dc" strokeWidth="7" opacity="0.5" className="dark:opacity-30" />
              <line x1="72%" y1="0" x2="72%" y2="100%" stroke="#e5e5dc" strokeWidth="6" opacity="0.45" className="dark:opacity-25" />
              <line x1="58%" y1="0" x2="58%" y2="100%" stroke="#e5e5dc" strokeWidth="6" opacity="0.48" className="dark:opacity-28" />

              {/* Secondary horizontal streets */}
              <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#d4d4cc" strokeWidth="4" opacity="0.35" className="dark:opacity-20" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#d4d4cc" strokeWidth="4" opacity="0.35" className="dark:opacity-20" />
              <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#d4d4cc" strokeWidth="3.5" opacity="0.32" className="dark:opacity-18" />
              <line x1="0" y1="88%" x2="100%" y2="88%" stroke="#d4d4cc" strokeWidth="3.5" opacity="0.32" className="dark:opacity-18" />
              
              {/* Secondary vertical streets */}
              <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#d4d4cc" strokeWidth="3" opacity="0.3" className="dark:opacity-15" />
              <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#d4d4cc" strokeWidth="3" opacity="0.3" className="dark:opacity-15" />
              <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#d4d4cc" strokeWidth="2.5" opacity="0.28" className="dark:opacity-14" />

              {/* Buildings - distributed across extended map */}
              <rect x="8%" y="12%" width="45" height="35" rx="3" fill="#b8bdb5" opacity="0.5" className="dark:fill-[#1a2332] dark:opacity-40" />
              <rect x="28%" y="18%" width="38" height="48" rx="3" fill="#b8bdb5" opacity="0.6" className="dark:fill-[#1a2332] dark:opacity-50" />
              <rect x="45%" y="10%" width="35" height="40" rx="3" fill="#b8bdb5" opacity="0.55" className="dark:fill-[#1a2332] dark:opacity-45" />
              <rect x="78%" y="56%" width="48" height="38" rx="3" fill="#b8bdb5" opacity="0.5" className="dark:fill-[#1a2332] dark:opacity-40" />
              <rect x="88%" y="50%" width="32" height="42" rx="3" fill="#b8bdb5" opacity="0.6" className="dark:fill-[#1a2332] dark:opacity-50" />
              <rect x="3%" y="78%" width="38" height="28" rx="3" fill="#b8bdb5" opacity="0.55" className="dark:fill-[#1a2332] dark:opacity-45" />
              <rect x="48%" y="74%" width="42" height="32" rx="3" fill="#b8bdb5" opacity="0.5" className="dark:fill-[#1a2332] dark:opacity-40" />
              <rect x="18%" y="28%" width="40" height="36" rx="3" fill="#b8bdb5" opacity="0.52" className="dark:fill-[#1a2332] dark:opacity-42" />
              <rect x="65%" y="18%" width="36" height="44" rx="3" fill="#b8bdb5" opacity="0.58" className="dark:fill-[#1a2332] dark:opacity-48" />
              <rect x="52%" y="88%" width="38" height="30" rx="3" fill="#b8bdb5" opacity="0.54" className="dark:fill-[#1a2332] dark:opacity-44" />
              <rect x="12%" y="85%" width="42" height="35" rx="3" fill="#b8bdb5" opacity="0.5" className="dark:fill-[#1a2332] dark:opacity-40" />
              <rect x="82%" y="8%" width="35" height="38" rx="3" fill="#b8bdb5" opacity="0.56" className="dark:fill-[#1a2332] dark:opacity-46" />
              <rect x="92%" y="80%" width="30" height="33" rx="3" fill="#b8bdb5" opacity="0.52" className="dark:fill-[#1a2332] dark:opacity-42" />

              {/* Green valorisation zones - distributed across extended map */}
              <circle cx="30%" cy="38%" r="85" fill="url(#greenZone)" />
              <circle cx="74%" cy="60%" r="65" fill="url(#greenZone)" />
              <circle cx="45%" cy="70%" r="55" fill="url(#greenZone)" />
              <circle cx="20%" cy="20%" r="70" fill="url(#greenZone)" />
              <circle cx="85%" cy="25%" r="60" fill="url(#greenZone)" />
              <circle cx="55%" cy="85%" r="75" fill="url(#greenZone)" />
              <circle cx="15%" cy="75%" r="50" fill="url(#greenZone)" />
            </svg>

            {/* Animated Waste Points with Custom Icons */}
            {filteredPoints.map((point, index) => {
              const colors = getMarkerColor(point.type);
              return (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-full z-20"
                  style={{ left: `${point.lng}%`, top: `${point.lat}%` }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="relative cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoint(point);
                    }}
                  >
                    {/* Pulsing ring animation */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.8],
                        opacity: [0.6, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      className="absolute inset-0 rounded-full -top-2 -left-2 w-12 h-12"
                      style={{ backgroundColor: colors.ring }}
                    />

                    {/* Main pin with icon */}
                    <div 
                      className="relative w-10 h-10 rounded-full shadow-xl flex items-center justify-center ring-3 ring-white dark:ring-gray-700"
                      style={{ backgroundColor: colors.bg }}
                    >
                      {getMarkerIcon(point.type)}
                      
                      {/* Urgent indicator */}
                      {point.urgent && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-700"
                        />
                      )}
                    </div>

                    {/* Pin pointer */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                      style={{ borderTopColor: colors.bg }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
            </div>

            {/* Map Controls - Fixed Position (Outside Draggable Area) */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-30 pointer-events-auto">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRecenter}
                className="w-10 h-10 bg-white dark:bg-[#1a2332] rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
              >
                <Locate className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMapZoom(Math.min(mapZoom + 0.2, 2))}
                className="w-10 h-10 bg-white dark:bg-[#1a2332] rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600 text-xl text-gray-700 dark:text-gray-300"
              >
                +
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMapZoom(Math.max(mapZoom - 0.2, 0.8))}
                className="w-10 h-10 bg-white dark:bg-[#1a2332] rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600 text-xl text-gray-700 dark:text-gray-300"
              >
                −
              </motion.button>
            </div>

            {/* Map Popup - Fixed Position */}
            <AnimatePresence>
              {selectedPoint && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/30 z-40 backdrop-blur-sm"
                    onClick={() => setSelectedPoint(null)}
                  />
                  <MapPopup 
                    point={selectedPoint} 
                    onClose={() => setSelectedPoint(null)}
                    onViewDetails={() => {
                      if (onLocationSelect) {
                        onLocationSelect({
                          name: selectedPoint.name,
                          category: selectedPoint.category,
                          wasteType: selectedPoint.wasteType,
                          amount: selectedPoint.amount,
                          distance: selectedPoint.distance,
                          updatedAt: selectedPoint.updatedAt,
                          address: `${Math.floor(Math.random() * 500) + 1} Green Street, EcoCity`,
                          phone: "+1 (555) 123-4567",
                          email: `${selectedPoint.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
                          website: `https://${selectedPoint.name.toLowerCase().replace(/\s+/g, '')}.com`,
                        });
                      }
                      setSelectedPoint(null);
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Map Legend */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-[#F8FBF8] dark:bg-[#1a2332]">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Map Legend</p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#8BC34A] flex items-center justify-center">
                  <FlaskConical className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300">Valorisation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#F6B93B] flex items-center justify-center">
                  <ShoppingBasket className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300">Collection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#9C27B0] flex items-center justify-center">
                  <Leaf className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300">Distribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 space-y-6">
          {/* ESG Snapshot - Scrollable Analytics Strip */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Impact Analytics 📊</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <AnalyticsCard
                icon="♻️"
                value="32.4kg"
                label="Waste Diverted"
                trend="↑12%"
                data={analyticsData.waste}
                color="#8BC34A"
              />
              <AnalyticsCard
                icon="🌿"
                value="18.7kg"
                label="CO₂ Saved"
                trend="↑8%"
                data={analyticsData.co2}
                color="#7CB342"
              />
              <AnalyticsCard
                icon="💧"
                value="12.1L"
                label="Water Saved"
                trend="↑5%"
                data={analyticsData.water}
                color="#4FC3F7"
              />
            </div>
            <button 
              onClick={() => onNavigate("esg-report")}
              className="w-full mt-3 bg-gradient-to-r from-[#234F2B] to-[#2d6537] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
            >
              <TrendingUp className="w-4 h-4" />
              Open Full ESG Report →
            </button>
          </div>

          {/* Forecast & Insights Panel */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewRecommendations && onViewRecommendations()}
            className="bg-gradient-to-br from-[#DDEBD1] to-[#e8f5d9] dark:from-[#2a3f2b] dark:to-[#3d5a2d] rounded-2xl p-5 shadow-md border border-[#8BC34A]/20 dark:border-[#6ba03f]/20 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-[#8BC34A] dark:text-[#6ba03f]" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-1">Next Week's Waste Forecast</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">AI-powered sustainability insights</p>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/40 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                <span className="text-[#8BC34A] dark:text-[#6ba03f]">Forecasted:</span> +2.3kg citrus peels expected
              </p>
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                <span className="text-[#8BC34A] dark:text-[#6ba03f]">Potential CO₂ savings:</span> +1.1kg
              </p>
              <div className="bg-gradient-to-r from-[#234F2B] to-[#2d6537] dark:from-[#1e2f1f] dark:to-[#2a3f2b] rounded-lg p-3 flex items-start gap-2">
                <div className="w-6 h-6 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-semibold">Recommendation:</span> Partner with EcoJuice Lab to valorise surplus peels
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm">Tap to view full AI recommendations</p>
            </div>
          </motion.div>

          {/* Nearby Opportunities Section */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Nearby Opportunities 🤝</h3>
            
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: -opportunityIndex * 100 + '%' }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                >
                  {opportunities.map((opp, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 px-[5%]">
                      <PartnerOpportunity 
                        {...opp} 
                        onRequestPickup={() => {
                          setSelectedOpportunity(opp);
                          setShowPickupModal(true);
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevOpportunity}
                disabled={opportunityIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#2d3a4d] shadow-lg flex items-center justify-center transition-all duration-200 z-10 ${
                  opportunityIndex === 0 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-gray-50 dark:hover:bg-[#3d4a5d] hover:scale-110'
                }`}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={nextOpportunity}
                disabled={opportunityIndex === opportunities.length - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#2d3a4d] shadow-lg flex items-center justify-center transition-all duration-200 z-10 ${
                  opportunityIndex === opportunities.length - 1
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-gray-50 dark:hover:bg-[#3d4a5d] hover:scale-110'
                }`}
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {opportunities.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setOpportunityIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === opportunityIndex ? "w-6 bg-[#7DBF4E] dark:bg-[#6ba03f]" : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="map" onNavigate={onNavigate} />
        
        {/* Pickup Request Modal */}
        <AnimatePresence>
          {showPickupModal && selectedOpportunity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
              onClick={() => setShowPickupModal(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white dark:bg-[#1a2332] rounded-t-[24px] shadow-2xl max-h-[85vh] overflow-y-auto"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-900 dark:text-white">Request Pickup / Collaboration</h3>
                    <button
                      onClick={() => setShowPickupModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2d3a4d] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3d4a5d] transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Partner Info */}
                  <div className="bg-[#F8FBF8] dark:bg-[#2d3a4d] rounded-xl p-4 mb-6 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={selectedOpportunity.image} 
                        alt={selectedOpportunity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-1">{selectedOpportunity.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOpportunity.amount} {selectedOpportunity.wasteType}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowPickupModal(false);
                      toast.success(`Your pickup request has been sent to ${selectedOpportunity.name}! They'll be in touch soon.`, {
                        duration: 4000,
                        position: 'top-center',
                      });
                    }}
                    className="space-y-4"
                  >
                    {/* Waste Type */}
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Waste Type
                      </label>
                      <select className="w-full px-4 py-3 bg-[#F8FBF8] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f]">
                        <option value={selectedOpportunity.wasteType}>{selectedOpportunity.wasteType}</option>
                        <option value="coffee grounds">Coffee grounds</option>
                        <option value="fish bones">Fish bones</option>
                        <option value="citrus peels">Citrus peels</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Quantity (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.0"
                        className="w-full px-4 py-3 bg-[#F8FBF8] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f]"
                        required
                      />
                    </div>

                    {/* Preferred Pickup Time */}
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Pickup Time
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="datetime-local"
                          className="w-full pl-11 pr-4 py-3 bg-[#F8FBF8] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f]"
                          required
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Notes / Instructions (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any special instructions or notes..."
                        className="w-full px-4 py-3 bg-[#F8FBF8] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f] resize-none"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="bg-[#E6F5E1] dark:bg-[#2a3f2b] rounded-xl p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Contact Info</p>
                      <p className="text-sm text-gray-900 dark:text-white">john.doe@email.com • +1 (555) 123-4567</p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7BB661] dark:from-[#6ba03f] dark:to-[#4a8357] text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Request</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
