import { Search, MapPin, X, ArrowLeft, Lightbulb, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface WastePoint {
  id: number;
  x: number;
  y: number;
  type: "valorisation" | "collection" | "distribution";
  category: "restaurant" | "lab" | "recycler" | "community";
  name: string;
  wasteType: string;
  amount: string;
  distance: string;
  updatedAt: string;
}

interface TooltipCardProps {
  point: WastePoint;
  onClose: () => void;
  onViewDetails: () => void;
}

function TooltipCard({ point, onClose, onViewDetails }: TooltipCardProps) {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "restaurant": return "🏪";
      case "lab": return "🔬";
      case "recycler": return "🏭";
      case "community": return "🏠";
      default: return "📍";
    }
  };

  const openGoogleMaps = () => {
    // Simulate opening Google Maps with a search query
    const query = encodeURIComponent(point.name);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%]"
    >
      <div className="bg-white dark:bg-[#1a2332] rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryEmoji(point.category)}</span>
            <div>
              <h4 className="text-gray-900 dark:text-white">{point.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{point.distance} away</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available Waste</p>
          <p className="text-gray-900 dark:text-white">{point.amount} {point.wasteType}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated {point.updatedAt}</p>
        </div>
        <div className="space-y-2">
          <button 
            onClick={openGoogleMaps}
            className="w-full bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white py-2.5 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            View in Google Maps
          </button>
          <button 
            onClick={onViewDetails}
            className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] text-white py-2.5 px-4 rounded-xl hover:shadow-lg transition-shadow text-center"
          >
            View Full Details →
          </button>
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
}

function PartnerOpportunity({ image, name, amount, wasteType, category, distance, updatedAt }: PartnerOpportunityProps) {
  return (
    <div className="min-w-[300px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0">
      <div className="h-32 bg-gray-200 relative">
        <ImageWithFallback src={image} alt={name} className="w-full h-full object-cover" />
        <div className="bg-gradient-to-br from-white via-white to-[#F0F7F2] backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-white/50 absolute top-2 left-2">
          <span className="text-xs text-gray-900 font-medium">{category}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-gray-900 mb-1">{name}</h4>
        <p className="text-sm text-gray-700 mb-2">{amount} {wasteType} available</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>Updated {updatedAt}</span>
          <span>•</span>
          <span>{distance} away</span>
        </div>
        <button className="w-full bg-gray-900 text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors text-center">
          Request Pickup / Collaborate
        </button>
      </div>
    </div>
  );
}

interface MapPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onLocationSelect?: (location: any) => void;
}

export function MapPage({ onBack, onNavigate, onLocationSelect }: MapPageProps) {
  const [selectedPoint, setSelectedPoint] = useState<WastePoint | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [mapView, setMapView] = useState<"nearby" | "global">("nearby");
  const [opportunityIndex, setOpportunityIndex] = useState(0);

  const wastePoints: WastePoint[] = [
    { id: 1, x: 28, y: 35, type: "collection", category: "restaurant", name: "Green Café", wasteType: "coffee grounds", amount: "5kg", distance: "1.2km", updatedAt: "2h ago" },
    { id: 2, x: 58, y: 25, type: "valorisation", category: "lab", name: "GreenLab Bio", wasteType: "mixed organics", amount: "12kg", distance: "2.5km", updatedAt: "1h ago" },
    { id: 3, x: 72, y: 58, type: "distribution", category: "community", name: "Community Kitchen", wasteType: "prepared meals", amount: "8 portions", distance: "3.2km", updatedAt: "4h ago" },
    { id: 4, x: 42, y: 68, type: "collection", category: "restaurant", name: "SeaSoul Kitchen", wasteType: "fish bones", amount: "3kg", distance: "1.8km", updatedAt: "30min ago" },
    { id: 5, x: 78, y: 38, type: "valorisation", category: "lab", name: "Bio Extract Co.", wasteType: "citrus peels", amount: "7kg", distance: "4.1km", updatedAt: "3h ago" },
    { id: 6, x: 20, y: 52, type: "distribution", category: "recycler", name: "EcoCompost", wasteType: "compost", amount: "15kg", distance: "2.8km", updatedAt: "5h ago" },
  ];

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
    },
    {
      image: "https://images.unsplash.com/photo-1653491948869-cea123870879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwa2l0Y2hlbiUyMGNvb2tpbmd8ZW58MXx8fHwxNzYwNDUxODEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Urban Café",
      amount: "5kg",
      wasteType: "coffee grounds",
      category: "Café",
      distance: "1.2km",
      updatedAt: "2h ago",
    },
    {
      image: "https://images.unsplash.com/photo-1707944745860-4615eb585a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MXx8fHwxNzYwNDUyMjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "GreenLab Bio",
      amount: "12kg",
      wasteType: "citrus peels",
      category: "R&D Lab",
      distance: "2.5km",
      updatedAt: "1h ago",
    },
  ];

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "valorisation": return "#8BC34A";
      case "collection": return "#F6B93B";
      case "distribution": return "#9C27B0";
      default: return "#888";
    }
  };

  const nextOpportunity = () => {
    setOpportunityIndex((prev) => (prev + 1) % opportunities.length);
  };

  const prevOpportunity = () => {
    setOpportunityIndex((prev) => (prev - 1 + opportunities.length) % opportunities.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">Circular Network Map</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track waste flows, pickups, and impact</p>
            </div>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, partner, or waste stream..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[#2d3a4d] rounded-xl text-gray-600 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
        </div>

        {/* Main Content */}
        <div className="px-5 py-6 space-y-6">
          {/* Interactive Map Section */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Map View Toggle */}
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setMapView("nearby")}
                className={`flex-1 py-3.5 text-sm transition-colors ${
                  mapView === "nearby"
                    ? "text-[#8BC34A] dark:text-[#6ba03f] border-b-2 border-[#8BC34A] dark:border-[#6ba03f]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Nearby
              </button>
              <button
                onClick={() => setMapView("global")}
                className={`flex-1 py-3.5 text-sm transition-colors ${
                  mapView === "global"
                    ? "text-[#8BC34A] dark:text-[#6ba03f] border-b-2 border-[#8BC34A] dark:border-[#6ba03f]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Global
              </button>
            </div>

            {/* Map Container */}
            <div className="h-[320px] relative bg-[#e8ebe4] dark:bg-[#2d3a4d]">
              {/* Map Background */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  {/* Street grid pattern */}
                  <pattern id="street-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <rect width="60" height="60" fill="#e8ebe4" className="dark:fill-[#2d3a4d]" />
                    <line x1="0" y1="0" x2="0" y2="60" stroke="#d0d4cc" strokeWidth="1" className="dark:stroke-[#3d4a5d]" />
                    <line x1="0" y1="0" x2="60" y2="0" stroke="#d0d4cc" strokeWidth="1" className="dark:stroke-[#3d4a5d]" />
                  </pattern>
                  
                  {/* Green zone overlay */}
                  <radialGradient id="greenZone">
                    <stop offset="0%" stopColor="#8BC34A" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#8BC34A" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Building pattern */}
                  <pattern id="building-texture" width="4" height="4" patternUnits="userSpaceOnUse">
                    <rect width="4" height="4" fill="#b8bdb5" className="dark:fill-[#1a2332]" />
                    <rect x="1" y="1" width="1" height="1" fill="#9a9f96" className="dark:fill-[#121a26]" />
                  </pattern>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#street-grid)" />
                
                {/* Water/River */}
                <path d="M 0 200 Q 150 180, 250 200 T 500 200 L 500 240 Q 350 220, 250 240 T 0 240 Z" 
                  fill="#a8d5f7" opacity="0.3" className="dark:opacity-20" />
                
                {/* Parks and green spaces */}
                <ellipse cx="15%" cy="55%" rx="45" ry="30" fill="#b8d4a8" opacity="0.6" className="dark:opacity-30" />
                <ellipse cx="80%" cy="28%" rx="40" ry="25" fill="#b8d4a8" opacity="0.6" className="dark:opacity-30" />
                <rect x="60%" y="70%" width="60" height="40" rx="8" fill="#b8d4a8" opacity="0.5" className="dark:opacity-25" />
                
                {/* Major Roads */}
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffd966" strokeWidth="8" opacity="0.7" className="dark:opacity-50" />
                <line x1="0" y1="51%" x2="100%" y2="51%" stroke="#ffffff" strokeWidth="1" opacity="0.4" strokeDasharray="10,10" />
                
                <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#e5e5dc" strokeWidth="6" opacity="0.6" className="dark:opacity-40" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#e5e5dc" strokeWidth="5" opacity="0.5" className="dark:opacity-35" />
                
                {/* Secondary roads */}
                <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#d4d4cc" strokeWidth="4" opacity="0.4" className="dark:opacity-25" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#d4d4cc" strokeWidth="4" opacity="0.4" className="dark:opacity-25" />
                
                {/* Buildings */}
                <rect x="10%" y="10%" width="40" height="30" rx="2" fill="url(#building-texture)" opacity="0.6" />
                <rect x="25%" y="15%" width="35" height="45" rx="2" fill="url(#building-texture)" opacity="0.7" />
                <rect x="40%" y="8%" width="30" height="35" rx="2" fill="url(#building-texture)" opacity="0.65" />
                
                <rect x="75%" y="55%" width="45" height="35" rx="2" fill="url(#building-texture)" opacity="0.6" />
                <rect x="85%" y="48%" width="30" height="40" rx="2" fill="url(#building-texture)" opacity="0.7" />
                
                <rect x="5%" y="80%" width="35" height="25" rx="2" fill="url(#building-texture)" opacity="0.65" />
                <rect x="45%" y="75%" width="40" height="30" rx="2" fill="url(#building-texture)" opacity="0.6" />
                
                {/* Green zones (waste collection clusters) */}
                <circle cx="28%" cy="35%" r="70" fill="url(#greenZone)" />
                <circle cx="72%" cy="58%" r="55" fill="url(#greenZone)" />
                <circle cx="42%" cy="68%" r="45" fill="url(#greenZone)" />
              </svg>

              {/* Animated Waste Points */}
              {filteredPoints.map((point) => (
                <div
                  key={point.id}
                  className="absolute transform -translate-x-1/2 -translate-y-full z-10"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedPoint(point)}
                  >
                    {/* Pulsing ring animation */}
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: getMarkerColor(point.type) }}
                    />
                    <MapPin
                      className="w-8 h-8 drop-shadow-lg relative z-10"
                      style={{ color: getMarkerColor(point.type), fill: getMarkerColor(point.type) }}
                    />
                  </motion.div>
                </div>
              ))}

              {/* Tooltip */}
              <AnimatePresence>
                {selectedPoint && (
                  <>
                    <div
                      className="absolute inset-0 bg-black/40 z-40"
                      onClick={() => setSelectedPoint(null)}
                    />
                    <TooltipCard 
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
          </div>

          {/* ESG Snapshot - Scrollable Analytics Strip */}
          <div>
            <h3 className="text-gray-700 mb-3">Impact Analytics 📊</h3>
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
          <div className="bg-gradient-to-br from-[#DDEBD1] to-[#e8f5d9] rounded-2xl p-5 shadow-sm border border-[#8BC34A]/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-[#8BC34A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">Next Week's Waste Forecast</h3>
                <p className="text-sm text-gray-700">AI-powered sustainability insights</p>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-4 mb-3">
              <p className="text-sm text-gray-900 mb-2">
                <span className="text-[#8BC34A]">Projected:</span> +2.3kg citrus peels expected
              </p>
              <p className="text-sm text-gray-900 mb-2">
                <span className="text-[#8BC34A]">Potential savings:</span> 1.1kg CO₂
              </p>
              <p className="text-sm text-gray-900">
                <span className="text-[#8BC34A]">Suggested Action:</span> Partner with EcoJuice Lab for reuse
              </p>
            </div>
            <button className="w-full bg-gray-900 text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
              💡 View Recommendations
            </button>
          </div>

          {/* Nearby Opportunities Section */}
          <div>
            <h3 className="text-gray-700 mb-3">Nearby Opportunities 🤝</h3>
            <div className="relative">
              {/* Carousel */}
              <div className="overflow-hidden">
                <motion.div
                  animate={{ x: -opportunityIndex * 316 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex gap-4"
                >
                  {opportunities.map((opp, idx) => (
                    <PartnerOpportunity key={idx} {...opp} />
                  ))}
                </motion.div>
              </div>
              
              {/* Navigation Arrows */}
              {opportunities.length > 1 && (
                <>
                  <button
                    onClick={prevOpportunity}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={opportunityIndex === 0}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextOpportunity}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={opportunityIndex === opportunities.length - 1}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-3">
              {opportunities.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === opportunityIndex ? "w-6 bg-[#8BC34A]" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="map" onNavigate={onNavigate} />
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
