import { ArrowLeft, Download, ChevronDown, TrendingUp, Lightbulb, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ESGReportPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onViewRecommendations?: () => void;
}

interface KPICardProps {
  icon: string;
  value: string;
  label: string;
  trend: string;
  data: { value: number }[];
  color: string;
}

function KPICard({ icon, value, label, trend, data, color }: KPICardProps) {
  return (
    <div className="flex-1 bg-white dark:bg-[#2d3a4d] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-green-600 dark:text-green-400">{trend}</span>
      </div>
      <p className="text-gray-900 dark:text-white mb-1 font-semibold">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{label}</p>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface CategoryCardProps {
  icon: string;
  title: string;
  metric: string;
  progress: number;
  color: string;
}

function CategoryCard({ icon, title, metric, progress, color }: CategoryCardProps) {
  return (
    <div className="min-w-[260px] bg-white dark:bg-[#2d3a4d] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h4 className="text-gray-900 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{metric}</p>
        </div>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{progress}% complete</p>
    </div>
  );
}

export function ESGReportPage({ onBack, onNavigate, onViewRecommendations }: ESGReportPageProps) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 280; // card width + gap
      const scrollLeft = categoryScrollRef.current.scrollLeft;
      categoryScrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // KPI Data
  const kpiData = {
    waste: [
      { value: 25 },
      { value: 27 },
      { value: 28 },
      { value: 30 },
      { value: 32.4 },
    ],
    co2: [
      { value: 14 },
      { value: 15.5 },
      { value: 16 },
      { value: 17 },
      { value: 18.7 },
    ],
    water: [
      { value: 10 },
      { value: 10.8 },
      { value: 11 },
      { value: 11.5 },
      { value: 12.1 },
    ],
  };

  // Waste Composition Data (Pie Chart)
  const wasteComposition = [
    { name: "Fruit Peels", value: 40, color: "#8BC34A" },
    { name: "Coffee Grounds", value: 25, color: "#F6B93B" },
    { name: "Fish Bones", value: 20, color: "#4FC3F7" },
    { name: "Cocoa Husks", value: 15, color: "#9C27B0" },
  ];

  // Impact Trends Data (Dual Line Chart)
  const impactTrends = [
    { period: "Week 1", waste: 20, co2: 12 },
    { period: "Week 2", waste: 24, co2: 14 },
    { period: "Week 3", waste: 28, co2: 16 },
    { period: "Week 4", waste: 32.4, co2: 18.7 },
  ];

  // Forecast Data
  const forecastData = [
    { period: "Week 1", value: 20 },
    { period: "Week 2", value: 24 },
    { period: "Week 3", value: 28 },
    { period: "Week 4", value: 32.4 },
    { period: "Next Week", value: 34.7 },
  ];

  // Category Performance Data
  const categories = [
    {
      icon: "🍽",
      title: "Food Waste",
      metric: "60% reduction goal achieved",
      progress: 60,
      color: "#8BC34A",
    },
    {
      icon: "🔋",
      title: "Energy Efficiency",
      metric: "45% progress toward target",
      progress: 45,
      color: "#F6B93B",
    },
    {
      icon: "🚚",
      title: "Distribution Emissions",
      metric: "22% reduced",
      progress: 22,
      color: "#4FC3F7",
    },
    {
      icon: "🧃",
      title: "Valorisation Projects",
      metric: "14 active collaborations",
      progress: 78,
      color: "#9C27B0",
    },
  ];

  const exportPDF = () => {
    // Placeholder for PDF export functionality
    alert("Export to PDF functionality will be implemented");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] to-white dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">ESG Report Dashboard</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your sustainability performance summary</p>
            </div>
            <button
              onClick={exportPDF}
              className="bg-gradient-to-r from-[#1a2332] to-[#2d3a4d] text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
              title="Export PDF"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs">Export</span>
            </button>
          </div>

          {/* Date Range Selector */}
          <button className="w-full flex items-center justify-between bg-gray-100 dark:bg-[#2d3a4d] rounded-xl px-4 py-2.5 text-gray-700 dark:text-gray-300">
            <span className="text-sm">{dateRange}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="px-5 py-6 space-y-6">
          {/* 1. Overview KPIs */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Overview Metrics 📊</h3>
            <div className="grid grid-cols-3 gap-3">
              <KPICard
                icon="♻️"
                value="32.4kg"
                label="Waste Diverted"
                trend="↑12%"
                data={kpiData.waste}
                color="#8BC34A"
              />
              <KPICard
                icon="🌿"
                value="18.7kg"
                label="CO₂ Saved"
                trend="↑8%"
                data={kpiData.co2}
                color="#7CB342"
              />
              <KPICard
                icon="💧"
                value="12.1L"
                label="Water Saved"
                trend="↑5%"
                data={kpiData.water}
                color="#4FC3F7"
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

          {/* 2. Environmental Breakdown */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Environmental Performance Breakdown 🌍</h3>
            <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6">
                {/* Pie Chart */}
                <div className="flex-shrink-0">
                  <ResponsiveContainer width={140} height={140}>
                    <PieChart>
                      <Pie
                        data={wasteComposition}
                        cx={70}
                        cy={70}
                        innerRadius={35}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {wasteComposition.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-3">
                  {wasteComposition.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

          {/* 3. Impact Trends */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">CO₂ & Waste Reduction Over Time 📈</h3>
            <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={impactTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-600" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#888" }}
                    axisLine={{ stroke: "#e0e0e0" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#888" }}
                    axisLine={{ stroke: "#e0e0e0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="waste"
                    stroke="#8BC34A"
                    strokeWidth={3}
                    dot={{ fill: "#8BC34A", r: 4 }}
                    name="Waste (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="co2"
                    stroke="#4FC3F7"
                    strokeWidth={3}
                    dot={{ fill: "#4FC3F7", r: 4 }}
                    name="CO₂ (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#8BC34A]" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Waste Diverted (kg)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4FC3F7]" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved (kg)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

          {/* 4. Forecast & Recommendations */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-3">Next Week's Forecast 🔮</h3>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewRecommendations && onViewRecommendations()}
              className="bg-gradient-to-br from-[#DDEBD1] to-[#e8f5d9] dark:from-[#2a3f2b] dark:to-[#3d5a2d] rounded-2xl p-5 shadow-md border border-[#8BC34A]/20 dark:border-[#6ba03f]/20 cursor-pointer hover:shadow-lg transition-shadow"
            >
              {/* Forecast Chart */}
              <div className="bg-white/60 dark:bg-black/20 rounded-xl p-3 mb-4">
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-600" />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: 10, fill: "#666" }}
                      axisLine={{ stroke: "#d0d0d0" }}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#666" }} axisLine={{ stroke: "#d0d0d0" }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8BC34A"
                      strokeWidth={2}
                      dot={{ fill: "#8BC34A", r: 3 }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Insights */}
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
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

          {/* 5. Category Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-700 dark:text-gray-300">Performance by Category 📋</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCategories("left")}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-700 hover:border-[#8BC34A] dark:hover:border-[#6ba03f] hover:bg-[#F0F7F2] dark:hover:bg-[#3d5a2d] flex items-center justify-center transition-all shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => scrollCategories("right")}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-700 hover:border-[#8BC34A] dark:hover:border-[#6ba03f] hover:bg-[#F0F7F2] dark:hover:bg-[#3d5a2d] flex items-center justify-center transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <div ref={categoryScrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category, idx) => (
                <CategoryCard key={idx} {...category} />
              ))}
            </div>
          </div>

          {/* 6. Export Section */}
          <div className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[#234F2B] dark:bg-[#6ba03f] rounded-full flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white mb-1">Export Full Report</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ideal for partners, investors, and sustainability reporting
                </p>
              </div>
            </div>
            <button
              onClick={exportPDF}
              className="w-full bg-gradient-to-r from-[#234F2B] to-[#2d6537] dark:from-[#6ba03f] dark:to-[#4a8357] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
            >
              <Download className="w-4 h-4" />
              Export ESG Report (PDF)
            </button>
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
