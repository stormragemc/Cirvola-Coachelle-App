import { ArrowLeft, MapPin, Clock, Package, TrendingUp, Phone, Mail, Globe, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LocationDetailsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  locationData: {
    name: string;
    category: string;
    wasteType: string;
    amount: string;
    distance: string;
    updatedAt: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
}

export function LocationDetailsPage({ onBack, onNavigate, locationData }: LocationDetailsPageProps) {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "restaurant": return "🏪";
      case "lab": return "🔬";
      case "recycler": return "🏭";
      case "community": return "🏠";
      default: return "📍";
    }
  };

  const getCategoryImage = (category: string) => {
    switch (category) {
      case "restaurant":
        return "https://images.unsplash.com/photo-1636401870585-a8852371e84a?w=800";
      case "lab":
        return "https://images.unsplash.com/photo-1707944745860-4615eb585a41?w=800";
      case "recycler":
        return "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800";
      case "community":
        return "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800";
      default:
        return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800";
    }
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(locationData.name);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const openDirections = () => {
    const query = encodeURIComponent(locationData.name);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header Image */}
        <div className="relative h-56 bg-gray-200 dark:bg-gray-700">
          <ImageWithFallback 
            src={getCategoryImage(locationData.category)} 
            alt={locationData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full px-3 py-1.5 shadow-lg">
            <span className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
              <span>{getCategoryEmoji(locationData.category)}</span>
              {locationData.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-6 space-y-6">
          {/* Title Section */}
          <div>
            <h2 className="text-gray-900 dark:text-white mb-2">{locationData.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{locationData.distance} away</span>
              <span>•</span>
              <Clock className="w-4 h-4" />
              <span>Updated {locationData.updatedAt}</span>
            </div>
          </div>

          {/* Waste Information Card */}
          <div className="bg-gradient-to-br from-[#EAF6E3] dark:from-[#2a3f2b] to-white dark:to-[#2d3a4d] rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-1">Available Waste</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ready for collection or valorisation</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-gray-700/40 rounded-xl p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Type</p>
                <p className="text-gray-900 dark:text-white capitalize">{locationData.wasteType}</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-700/40 rounded-xl p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Amount</p>
                <p className="text-gray-900 dark:text-white">{locationData.amount}</p>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#8BC34A] dark:text-[#6ba03f]" />
              <h3 className="text-gray-900 dark:text-white">Partnership Impact</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl text-[#8BC34A] dark:text-[#6ba03f] mb-1">127kg</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Diverted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#F6B93B] mb-1">23</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pickups</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#4FC3F7] mb-1">98%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {(locationData.phone || locationData.email || locationData.website) && (
            <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                {locationData.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${locationData.phone}`} className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#8BC34A] dark:hover:text-[#6ba03f]">
                      {locationData.phone}
                    </a>
                  </div>
                )}
                {locationData.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a href={`mailto:${locationData.email}`} className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#8BC34A] dark:hover:text-[#6ba03f]">
                      {locationData.email}
                    </a>
                  </div>
                )}
                {locationData.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a href={locationData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#8BC34A] dark:hover:text-[#6ba03f]">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={openDirections}
              className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] text-white py-3.5 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </button>
            <button 
              onClick={openGoogleMaps}
              className="w-full bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              View in Google Maps
            </button>
            <button className="w-full bg-gray-900 dark:bg-[#1a2332] text-white py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-[#0f1621] transition-colors">
              Request Pickup / Collaborate
            </button>
          </div>

          {/* Additional spacing */}
          <div className="h-4"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="map" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
