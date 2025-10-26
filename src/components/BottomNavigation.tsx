import { Home, Map, Sparkles, ShoppingBag, Users } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? "text-[#1a2332] dark:text-[#6ba03f]" : "text-gray-400 dark:text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

interface BottomNavigationProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export function BottomNavigation({ activePage = "home", onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a2332] border-t border-gray-200 dark:border-gray-700 pb-safe transition-colors duration-300">
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <NavItem 
            icon={<Home className="w-6 h-6" />} 
            label="Home" 
            active={activePage === "home"}
            onClick={() => onNavigate?.("home")}
          />
          <NavItem 
            icon={<Map className="w-6 h-6" />} 
            label="Map" 
            active={activePage === "map"}
            onClick={() => onNavigate?.("map")}
          />
          <NavItem 
            icon={<Sparkles className="w-6 h-6" />} 
            label="Valorise" 
            active={activePage === "valorise"}
            onClick={() => onNavigate?.("valorise")}
          />
          <NavItem 
            icon={<ShoppingBag className="w-6 h-6" />} 
            label="Shop" 
            active={activePage === "shop"}
            onClick={() => onNavigate?.("shop")}
          />
          <NavItem 
            icon={<Users className="w-6 h-6" />} 
            label="Community" 
            active={activePage === "community"}
            onClick={() => onNavigate?.("community")}
          />
        </div>
      </div>
    </div>
  );
}
