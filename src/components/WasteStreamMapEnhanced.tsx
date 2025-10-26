import { MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface WasteStreamMapEnhancedProps {
  onViewAll?: () => void;
}

export function WasteStreamMapEnhanced({ onViewAll }: WasteStreamMapEnhancedProps) {
  const [mapView, setMapView] = useState<"nearby" | "global">("nearby");

  const nearbyPoints = [
    { id: 1, x: 28, y: 35, type: "collection", color: "#F6B93B", icon: "🏪" },
    { id: 2, x: 58, y: 25, type: "valorisation", color: "#8BC34A", icon: "🔬" },
    { id: 3, x: 72, y: 58, type: "distribution", color: "#9C27B0", icon: "♻️" },
    { id: 4, x: 42, y: 68, type: "collection", color: "#F6B93B", icon: "👨‍🍳" },
    { id: 5, x: 78, y: 38, type: "valorisation", color: "#8BC34A", icon: "🔬" },
  ];

  const globalPoints = [
    { id: 1, x: 20, y: 25, type: "valorisation", color: "#8BC34A", icon: "🔬" },
    { id: 2, x: 50, y: 30, type: "collection", color: "#F6B93B", icon: "🏪" },
    { id: 3, x: 70, y: 40, type: "distribution", color: "#9C27B0", icon: "♻️" },
    { id: 4, x: 35, y: 55, type: "valorisation", color: "#8BC34A", icon: "🔬" },
    { id: 5, x: 60, y: 65, type: "collection", color: "#F6B93B", icon: "👨‍🍳" },
    { id: 6, x: 85, y: 50, type: "distribution", color: "#9C27B0", icon: "♻️" },
  ];

  const points = mapView === "nearby" ? nearbyPoints : globalPoints;

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/food+waste+recycling+near+me', '_blank');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Dynamic Waste Network 🗺️</h3>
        <button onClick={onViewAll} className="text-[11px] font-medium text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a]">View All →</button>
      </div>
      <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl shadow-sm overflow-hidden">
        {/* Toggle tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-700 justify-center">
          <button
            onClick={() => setMapView("nearby")}
            className={`px-8 py-2.5 text-[13px] font-medium transition-colors ${
              mapView === "nearby"
                ? "text-[#8BC34A] dark:text-[#6ba03f] border-b-2 border-[#8BC34A] dark:border-[#6ba03f]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Nearby
          </button>
          <button
            onClick={() => setMapView("global")}
            className={`px-8 py-2.5 text-[13px] font-medium transition-colors ${
              mapView === "global"
                ? "text-[#8BC34A] dark:text-[#6ba03f] border-b-2 border-[#8BC34A] dark:border-[#6ba03f]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Global
          </button>
        </div>

        {/* Map container */}
        <div className="h-[240px] relative bg-[#f5f5f0] dark:bg-[#1e2738]">
          {/* Realistic map background */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="street-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="#f5f5f0" />
                <line x1="0" y1="40" x2="80" y2="40" stroke="#d4d4d0" strokeWidth="2" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="#d4d4d0" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#street-grid)" />
            
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffd966" strokeWidth="6" opacity="0.6" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#c4c4c0" strokeWidth="5" opacity="0.5" />
            
            <ellipse cx="20%" cy="60%" rx="50" ry="35" fill="#c8e6c9" opacity="0.5" />
            <ellipse cx="75%" cy="30%" rx="45" ry="30" fill="#c8e6c9" opacity="0.5" />
            
            <rect x="10%" y="20%" width="15" height="15" fill="#e0e0e0" opacity="0.4" />
            <rect x="50%" y="15%" width="20" height="20" fill="#e0e0e0" opacity="0.4" />
            <rect x="65%" y="70%" width="18" height="18" fill="#e0e0e0" opacity="0.4" />
          </svg>

          {/* Waste points with profile icons */}
          {points.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="absolute transform -translate-x-1/2 -translate-y-full z-10 group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                className="relative"
              >
                <MapPin 
                  className="w-8 h-8 drop-shadow-lg transition-transform group-hover:scale-110" 
                  style={{ color: point.color, fill: point.color }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
                  {point.icon}
                </div>
                {/* Pulse animation */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: point.color }}
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Google Maps button */}
          <button
            onClick={openGoogleMaps}
            className="absolute top-3 right-3 bg-white rounded-lg px-3 py-2 shadow-md flex items-center gap-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors z-20"
          >
            <ExternalLink className="w-3 h-3" />
            Open Maps
          </button>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-lg p-2 shadow-md">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F6B93B" }}></div>
                <span className="text-gray-700">Collection</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#8BC34A" }}></div>
                <span className="text-gray-700">Valorisation</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#9C27B0" }}></div>
                <span className="text-gray-700">Distribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities label */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#DDEBD1] to-white border-t border-gray-100">
          <p className="text-sm text-gray-700">
            🍋 <span className="text-[#8BC34A]">5 new</span> valorisation opportunities near you
          </p>
        </div>
      </div>
    </div>
  );
}
