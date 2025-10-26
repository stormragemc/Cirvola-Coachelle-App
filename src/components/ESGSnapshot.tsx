import { Leaf, Droplets, TrendingUp } from "lucide-react";

interface ESGCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function ESGCard({ icon, value, label }: ESGCardProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-gray-700 text-sm">{label}</span>
      </div>
      <div className="text-gray-900">{value}</div>
    </div>
  );
}

export function ESGSnapshot() {
  return (
    <div>
      <h3 className="text-gray-700 mb-3">ESG Impact</h3>
      <div className="flex gap-3">
        <ESGCard
          icon={<Leaf className="w-5 h-5 text-[#8BC34A]" />}
          value="12kg"
          label="CO₂ Saved"
        />
        <ESGCard
          icon={<Droplets className="w-5 h-5 text-blue-500" />}
          value="45L"
          label="Water Saved"
        />
        <ESGCard
          icon={<TrendingUp className="w-5 h-5 text-yellow-500" />}
          value="2.3kg"
          label="Next Week"
        />
      </div>
    </div>
  );
}
