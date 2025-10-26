import { Brain, MapPin, Camera, MessageCircle } from "lucide-react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 flex-1"
    >
      <div className="w-12 h-12 bg-[#8BC34A] rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow">
        {icon}
      </div>
      <span className="text-xs text-gray-700">{label}</span>
    </button>
  );
}

interface QuickActionBarProps {
  onNavigate?: (page: string) => void;
}

export function QuickActionBar({ onNavigate }: QuickActionBarProps) {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-30">
      <div className="max-w-md mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-3">
          <div className="flex justify-between items-center gap-2">
            <ActionButton 
              icon={<Brain className="w-5 h-5" />} 
              label="AI Recommender"
              onClick={() => onNavigate?.("valorise")}
            />
            <ActionButton 
              icon={<MapPin className="w-5 h-5" />} 
              label="Track Waste"
              onClick={() => onNavigate?.("map")}
            />
            <ActionButton 
              icon={<Camera className="w-5 h-5" />} 
              label="Upload Waste"
              onClick={() => onNavigate?.("valorise")}
            />
            <ActionButton 
              icon={<MessageCircle className="w-5 h-5" />} 
              label="Discussion"
              onClick={() => onNavigate?.("valorise")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
