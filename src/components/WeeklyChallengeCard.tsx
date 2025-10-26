import { motion } from "motion/react";
import { Sparkles, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WeeklyChallengeCard({ onAccept }: { onAccept?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-[#E6F5E1] via-[#FFFBEF] to-[#FFF6CC] dark:from-[#2a3f2b] dark:via-[#1e2738] dark:to-[#3d3420] rounded-[20px] p-5 shadow-lg relative overflow-hidden border border-[#8BC34A]/10 dark:border-[#6ba03f]/10"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#8BC34A]/5 dark:bg-[#6ba03f]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F6C83B]/5 dark:bg-[#d4a635]/5 rounded-full blur-2xl"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-[#7BB661] dark:text-[#6ba03f]" />
          </motion.div>
          <h3 className="text-[#2C3A2B] dark:text-white flex-1">Weekly Challenge</h3>
          <div className="flex items-center gap-1.5 bg-[#FBE4B2] dark:bg-[#d4a635]/30 px-3 py-1.5 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-[#8B5A00] dark:text-[#F6C83B]" />
            <span className="text-xs text-[#8B5A00] dark:text-[#F6C83B]">3 days left</span>
          </div>
        </div>

        {/* Challenge Description */}
        <div className="bg-white/70 dark:bg-[#1a2332]/50 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-[#8BC34A]/20 dark:border-[#6ba03f]/20">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8BC34A] to-[#7BB661] dark:from-[#6ba03f] dark:to-[#4a8357] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">♻️</span>
            </div>
            <div className="flex-1">
              <p className="text-[#2C3A2B] dark:text-white mb-1">Zero-Waste Kitchen Challenge</p>
              <p className="text-sm text-[#5A6B5A] dark:text-gray-400">
                Transform your kitchen waste into something valuable and share your creation with the community
              </p>
            </div>
          </div>

          {/* Before/After Waste Images */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-xl overflow-hidden group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760445529166-1184fc7bb808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwc2NyYXBzJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjEzOTY4NzR8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Kitchen waste before"
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                <span className="text-xs text-white">Before</span>
              </div>
              <div className="absolute top-2 left-2 bg-[#F6C83B] dark:bg-[#d4a635] text-[#2C3A2B] dark:text-white text-[10px] px-2 py-0.5 rounded-full">
                Waste
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1756716518925-8af9e272da86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwd2FzdGUlMjBjb21wb3N0JTIwb3JnYW5pY3xlbnwxfHx8fDE3NjEzOTY4NzR8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Composted waste after"
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                <span className="text-xs text-white">After</span>
              </div>
              <div className="absolute top-2 left-2 bg-[#8BC34A] dark:bg-[#6ba03f] text-white text-[10px] px-2 py-0.5 rounded-full">
                Value
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#5A6B5A] dark:text-gray-400">Community Progress</span>
            <span className="text-sm text-[#2C3A2B] dark:text-white">67%</span>
          </div>
          <div className="bg-[#E6F5E1] dark:bg-[#3d4a5d] rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-[#8BC34A] to-[#7BB661] dark:from-[#6ba03f] dark:to-[#4a8357] h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "67%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Reward */}
        <div className="bg-gradient-to-r from-[#F6C83B]/10 to-[#FFE082]/10 dark:from-[#d4a635]/10 dark:to-[#e0b035]/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-[#F6C83B]/20 dark:border-[#d4a635]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F6C83B] to-[#F4B942] dark:from-[#d4a635] dark:to-[#c29530] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🏆</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#5A6B5A] dark:text-gray-400 mb-0.5">Reward</p>
              <p className="text-sm text-[#2C3A2B] dark:text-white">+500 Points + Zero-Waste Hero Badge</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onAccept}
          className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7BB661] dark:from-[#6ba03f] dark:to-[#4a8357] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <span className="text-sm">Accept Challenge</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
