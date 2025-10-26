interface ImpactCardProps {
  value: string;
  label: string;
}

function ImpactCard({ value, label }: ImpactCardProps) {
  return (
    <div className="flex-1 bg-[#8BC34A] rounded-2xl p-4 shadow-sm min-w-[100px]">
      <div className="text-gray-800 text-center">{value}</div>
      <div className="text-gray-700 text-center text-sm mt-1">{label}</div>
    </div>
  );
}

export function ImpactOverview() {
  return (
    <div>
      <h3 className="text-gray-700 mb-3">Your Impact</h3>
      <div className="flex gap-3">
        <ImpactCard value="5kg" label="Waste Saved" />
        <ImpactCard value="12" label="CO₂ Reduced" />
        <ImpactCard value="8" label="Products Valorised" />
      </div>
    </div>
  );
}
