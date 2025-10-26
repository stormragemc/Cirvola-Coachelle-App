import { motion } from "motion/react";
import { Plus, Share2, TrendingUp, Users, Recycle } from "lucide-react";
import { useState, useEffect } from "react";

interface CircularLivingHeroProps {
  onAddWaste: () => void;
  onShareStory: () => void;
}

function AnimatedStat({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(value * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, delay]);

  return <span>{count}{suffix}</span>;
}

export function CircularLivingHero({ onAddWaste, onShareStory }: CircularLivingHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Gradient Frame */}
      <div className="relative px-4 py-5">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1758272133417-011aebb36018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080')`,
          }}
        />
        
        {/* Gradient Overlays - Frame Effect */}
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F8F9F6] dark:from-[#1a2332] via-[#F8F9F6]/60 dark:via-[#1a2332]/60 to-transparent"></div>
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-[#1a2332] via-white/60 dark:via-[#1a2332]/60 to-transparent"></div>
        {/* Left gradient */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#F8F9F6] dark:from-[#1a2332] to-transparent"></div>
        {/* Right gradient */}
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#F8F9F6] dark:from-[#1a2332] to-transparent"></div>
        
        {/* Green overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3C6E47]/85 dark:from-[#1a2332]/90 via-[#4FAE68]/80 dark:via-[#2d3a4d]/85 to-[#8BC34A]/75 dark:to-[#3d5a2d]/80"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h1 className="text-white mb-1 text-[22px] font-bold leading-tight">Welcome to the Circular Collective</h1>
            <p className="text-[13px] text-white/90 leading-snug">
              Turning food waste into value — one story, one bite, one idea at a time.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-2.5"
          >
            <button
              onClick={onAddWaste}
              className="flex-1 bg-gradient-to-r from-[#1a2332] to-[#2d3a4d] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[13px] font-medium">Add Waste Data</span>
            </button>
            <button
              onClick={onShareStory}
              className="flex-1 bg-white/20 backdrop-blur-sm text-white py-2.5 rounded-xl flex items-center justify-center gap-2 border border-white/30 hover:bg-white/30 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-[13px] font-medium">Share Story</span>
            </button>
          </motion.div>

          {/* Live Stats - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#F6C83B]" />
              </motion.div>
              <p className="text-[11px] text-white/90 font-semibold">Live Community Impact</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-1.5">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8,
                      ease: "linear"
                    }}
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Recycle className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                </div>
                <p className="text-[17px] text-white font-semibold mb-0.5 leading-tight">
                  <AnimatedStat value={520} suffix="kg" delay={600} />
                </p>
                <p className="text-[11px] text-white/80">Valorised</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-1.5">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Users className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                </div>
                <p className="text-[17px] text-white font-semibold mb-0.5 leading-tight">
                  <AnimatedStat value={112} delay={700} />
                </p>
                <p className="text-[11px] text-white/80">Creators</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-1.5">
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <span className="text-[13px]">🤝</span>
                  </motion.div>
                </div>
                <p className="text-[17px] text-white font-semibold mb-0.5 leading-tight">
                  <AnimatedStat value={45} delay={800} />
                </p>
                <p className="text-[11px] text-white/80">Partners</p>
              </motion.div>
            </div>
            
            {/* Pulse indicator */}
            <motion.div 
              className="mt-2 flex items-center justify-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#F6C83B]"
              />
              <p className="text-[11px] text-white/70">Updated live</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave separator */}
      <svg
        className="w-full h-4 -mt-1"
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 48h1440V0c-147.2 48-293.6 48-440 0S706.4-48 560 0 266.4 48 120 0 0 0 0 0v48z"
          fill="white"
        />
      </svg>
    </div>
  );
}
