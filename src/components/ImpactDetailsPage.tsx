import { ArrowLeft, TrendingUp, Calendar, Award, Target } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ImpactDetailsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function ImpactDetailsPage({ onBack, onNavigate }: ImpactDetailsPageProps) {
  // Waste Diverted Data (Weekly trend)
  const wasteDivertedData = [
    { week: "W1", value: 3.2 },
    { week: "W2", value: 3.8 },
    { week: "W3", value: 4.1 },
    { week: "W4", value: 4.5 },
    { week: "W5", value: 5.2 },
  ];

  // CO2 Saved Data (Monthly trend)
  const co2SavedData = [
    { month: "Oct", value: 89 },
    { month: "Nov", value: 102 },
    { month: "Dec", value: 115 },
    { month: "Jan", value: 124 },
  ];

  // Community Impact Data (Collaboration types)
  const communityImpactData = [
    { name: "Direct", value: 8, color: "#8BC34A" },
    { name: "Shared", value: 6, color: "#4FAE68" },
    { name: "Network", value: 4, color: "#3C6E47" },
  ];

  // Weekly Growth Data
  const weeklyGrowthData = [
    { day: "Mon", last: 18, current: 21 },
    { day: "Tue", last: 20, current: 23 },
    { day: "Wed", last: 19, current: 24 },
    { day: "Thu", last: 21, current: 25 },
    { day: "Fri", last: 22, current: 26 },
    { day: "Sat", last: 20, current: 24 },
    { day: "Sun", last: 19, current: 23 },
  ];

  // Milestones
  const milestones = [
    { title: "First 5kg Diverted", date: "Dec 15, 2024", achieved: true },
    { title: "10 Collaborations", date: "Jan 8, 2025", achieved: true },
    { title: "100g CO₂ Saved", date: "Jan 12, 2025", achieved: true },
    { title: "Next: 10kg Milestone", progress: 52, target: "10kg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] to-white dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-white via-white to-[#f0f7f2] dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#3d4a5d] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
              <h2 className="text-gray-900 dark:text-white">Impact Analytics</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your detailed sustainability metrics</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gradient-to-br from-[#EAF6E3] to-white dark:from-[#2a3f2b] dark:to-[#1e2738] rounded-lg p-2 text-center">
              <p className="text-lg text-[#8BC34A] dark:text-[#6ba03f] font-semibold">5.2kg</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Diverted</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFF9E6] to-white dark:from-[#3d3420] dark:to-[#1e2738] rounded-lg p-2 text-center">
              <p className="text-lg text-[#F6C83B] font-semibold">124g</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">CO₂</p>
            </div>
            <div className="bg-gradient-to-br from-[#E8F5E9] to-white dark:from-[#2a3f2b] dark:to-[#1e2738] rounded-lg p-2 text-center">
              <p className="text-lg text-[#4FAE68] dark:text-[#4a8357] font-semibold">18</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Collabs</p>
            </div>
            <div className="bg-gradient-to-br from-[#DDEBD1] to-white dark:from-[#3d5a2d] dark:to-[#1e2738] rounded-lg p-2 text-center">
              <p className="text-lg text-[#3C6E47] dark:text-[#6ba03f] font-semibold">+23%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Growth</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 py-6 space-y-6">
          {/* Waste Diverted Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Waste Diverted Trend</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last 5 weeks</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#EAF6E3] dark:bg-[#2a3f2b] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#8BC34A] dark:text-[#6ba03f]" />
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={wasteDivertedData}>
                <defs>
                  <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8BC34A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8BC34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#999" />
                <YAxis tick={{ fontSize: 12 }} stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8BC34A" 
                  strokeWidth={3}
                  fill="url(#wasteGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 flex items-center justify-between bg-[#EAF6E3] dark:bg-[#2a3f2b] rounded-lg p-3">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Average weekly growth</p>
                <p className="text-lg text-[#8BC34A] dark:text-[#6ba03f] font-semibold">+0.5kg/week</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total this month</p>
                <p className="text-lg text-[#3C6E47] dark:text-[#6ba03f] font-semibold">18.8kg</p>
              </div>
            </div>
          </motion.div>

          {/* CO2 Savings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">CO₂ Emissions Saved</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly progression</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FFF9E6] dark:bg-[#3d3420] flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={co2SavedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
                <YAxis tick={{ fontSize: 12 }} stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" fill="#F6C83B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 bg-[#FFF9E6] dark:bg-[#3d3420] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🌍</span>
                <p className="text-sm text-gray-900 dark:text-white">Environmental Impact</p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your efforts have saved the equivalent CO₂ of driving <span className="text-[#F6C83B] font-semibold">0.5km</span> less
              </p>
            </div>
          </motion.div>

          {/* Community Collaborations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Community Collaborations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Breakdown by type</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] dark:bg-[#2a3f2b] flex items-center justify-center">
                <span className="text-xl">🤝</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={communityImpactData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {communityImpactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {communityImpactData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-xs text-gray-900 dark:text-white font-semibold">{item.value}</p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Growth Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#2d3a4d] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Week-over-Week Growth</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This week vs last week</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#DDEBD1] dark:bg-[#3d5a2d] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#3C6E47] dark:text-[#6ba03f]" />
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#999" />
                <YAxis tick={{ fontSize: 12 }} stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="last" fill="#DDEBD1" radius={[4, 4, 0, 0]} name="Last Week" />
                <Bar dataKey="current" fill="#3C6E47" radius={[4, 4, 0, 0]} name="This Week" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 bg-gradient-to-r from-[#DDEBD1] to-[#EAF6E3] dark:from-[#3d5a2d] dark:to-[#2a3f2b] rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Average improvement</p>
                  <p className="text-lg text-[#3C6E47] dark:text-[#6ba03f] font-semibold">+23%</p>
                </div>
                <div className="flex items-center gap-1 bg-white dark:bg-[#1a2332] rounded-full px-3 py-1">
                  <TrendingUp className="w-3 h-3 text-[#8BC34A] dark:text-[#6ba03f]" />
                  <span className="text-xs text-gray-900 dark:text-white">On Track</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Milestones & Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#1a2332] to-[#2d3a4d] dark:from-[#234F2B] dark:to-[#3d5a2d] rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#F6C83B]" />
              <h3 className="text-white">Milestones</h3>
            </div>

            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-white mb-1">{milestone.title}</p>
                      {milestone.date && (
                        <p className="text-xs text-white/70">{milestone.date}</p>
                      )}
                    </div>
                    {milestone.achieved ? (
                      <div className="w-6 h-6 rounded-full bg-[#F6C83B] flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                    ) : (
                      <Target className="w-5 h-5 text-[#F6C83B]" />
                    )}
                  </div>
                  
                  {milestone.progress !== undefined && (
                    <div>
                      <div className="bg-white/20 rounded-full h-2 overflow-hidden mb-1">
                        <motion.div
                          className="bg-[#F6C83B] h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${milestone.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <p className="text-xs text-white/70 text-right">{milestone.progress}% to {milestone.target}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h3 className="text-gray-900 mb-3">📊 Key Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-[#EAF6E3] rounded-lg">
                <span className="text-xl">🎯</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">Strong momentum</p>
                  <p className="text-xs text-gray-600">
                    You're on track to divert <span className="text-[#8BC34A] font-semibold">25kg</span> of waste this month!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-[#FFF9E6] rounded-lg">
                <span className="text-xl">⚡</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">Peak activity days</p>
                  <p className="text-xs text-gray-600">
                    You're most active on <span className="text-[#F6C83B] font-semibold">Fridays & Saturdays</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#E8F5E9] rounded-lg">
                <span className="text-xl">🌟</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">Community impact</p>
                  <p className="text-xs text-gray-600">
                    Your collaborations influenced <span className="text-[#4FAE68] font-semibold">47 people</span> this week
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom spacing */}
          <div className="h-8"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="home" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
