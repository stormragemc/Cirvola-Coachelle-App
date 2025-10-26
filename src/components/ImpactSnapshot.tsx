import { motion } from "motion/react";
import { TrendingUp, Leaf, Users, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface ImpactSnapshotProps {
  onViewDetails?: () => void;
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export function ImpactSnapshot({ onViewDetails }: ImpactSnapshotProps = {}) {
  const stats = [
    {
      icon: Leaf,
      value: 5.2,
      suffix: "kg",
      label: "Waste Diverted",
      color: "#8BC34A",
      bgColor: "#EAF6E3",
    },
    {
      icon: Zap,
      value: 124,
      suffix: "",
      label: "CO₂ Saved",
      sublabel: "grams",
      color: "#F6C83B",
      bgColor: "#FFF9E6",
    },
    {
      icon: Users,
      value: 18,
      suffix: "",
      label: "Community Impact",
      sublabel: "collaborations",
      color: "#4FAE68",
      bgColor: "#E8F5E9",
    },
    {
      icon: TrendingUp,
      value: 23,
      suffix: "%",
      label: "This Week",
      sublabel: "vs last week",
      color: "#3C6E47",
      bgColor: "#DDEBD1",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Your Impact 🌍</h3>
        <button 
          onClick={onViewDetails}
          className="text-[11px] font-medium text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a] transition-colors"
        >
          View Details →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: stat.bgColor }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <p className="text-[17px] text-gray-900 dark:text-white mb-0.5 font-semibold leading-tight">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight">{stat.label}</p>
            {stat.sublabel && (
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">{stat.sublabel}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
