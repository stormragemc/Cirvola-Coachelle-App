import { MapPin, ExternalLink } from "lucide-react";

interface CircularNetworkMapProps {
  onViewAll?: () => void;
}

export function CircularNetworkMap({ onViewAll }: CircularNetworkMapProps) {
  const wastePoints = [
    { id: 1, x: 28, y: 35, type: "collection", color: "#F6B93B" },
    { id: 2, x: 58, y: 25, type: "valorisation", color: "#8BC34A" },
    { id: 3, x: 72, y: 58, type: "distribution", color: "#9C27B0" },
    { id: 4, x: 42, y: 68, type: "collection", color: "#F6B93B" },
    { id: 5, x: 78, y: 38, type: "valorisation", color: "#8BC34A" },
    { id: 6, x: 22, y: 52, type: "distribution", color: "#9C27B0" },
  ];

  // Open Google Maps with a search for food waste recycling locations
  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/food+waste+recycling+near+me', '_blank');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-700">Waste Stream Map</h3>
        <button onClick={onViewAll} className="text-sm text-gray-500">View All</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Map container with realistic map styling */}
        <div className="h-[240px] relative bg-[#f5f5f0]">
          {/* Realistic map background with streets */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Street grid pattern */}
            <defs>
              <pattern id="street-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="#f5f5f0" />
                <line x1="0" y1="40" x2="80" y2="40" stroke="#d4d4d0" strokeWidth="2" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="#d4d4d0" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#street-grid)" />
            
            {/* Main roads */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffd966" strokeWidth="6" opacity="0.6" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#c4c4c0" strokeWidth="5" opacity="0.5" />
            
            {/* Park areas (green spaces) */}
            <ellipse cx="20%" cy="60%" rx="50" ry="35" fill="#c8e6c9" opacity="0.5" />
            <ellipse cx="75%" cy="30%" rx="45" ry="30" fill="#c8e6c9" opacity="0.5" />
            
            {/* Buildings representation */}
            <rect x="10%" y="20%" width="15" height="15" fill="#e0e0e0" opacity="0.4" />
            <rect x="50%" y="15%" width="20" height="20" fill="#e0e0e0" opacity="0.4" />
            <rect x="65%" y="70%" width="18" height="18" fill="#e0e0e0" opacity="0.4" />
          </svg>

          {/* Waste points with better styling */}
          {wastePoints.map((point) => (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-full z-10"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div className="relative">
                <MapPin 
                  className="w-8 h-8 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer" 
                  style={{ color: point.color, fill: point.color }}
                />
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                ></div>
              </div>
            </div>
          ))}

          {/* Google Maps integration button */}
          <button
            onClick={openGoogleMaps}
            className="absolute top-3 right-3 bg-white rounded-lg px-3 py-2 shadow-md flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors z-20"
          >
            <ExternalLink className="w-4 h-4" />
            Open in Maps
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
      </div>
    </div>
  );
}
