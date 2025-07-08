"use client";

import { GraduationCap, BookOpen, Users, Star, Sparkles} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ScatterIcons from "./ScatterIcons";

interface PageTransitionProps {
  children: React.ReactNode;
}

const marqueeItems = [
  { icon: <GraduationCap className="w-6 h-6 text-sky-400" />, text: "Empowering every student to succeed" },
  { icon: <BookOpen className="w-6 h-6 text-pink-400" />, text: "Interactive lessons & resources" },
  { icon: <Users className="w-6 h-6 text-purple-400" />, text: "Join a vibrant learning community" },
  { icon: <Star className="w-6 h-6 text-yellow-400" />, text: "Track your progress & achievements" },
  { icon: <Sparkles className="w-6 h-6 text-green-400" />, text: "Personalized learning paths" },
];
const marqueeHeight = 48;

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading-overlay"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2
          }}
          className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scatter icons */}
          <ScatterIcons count={35} />
          {/* Center Icon */}
          <div className="animate-fade-in-up">
            <div className="relative inline-block">
                <div 
                className="absolute inset-0 rounded-full blur-xl opacity-60 "
                style={{ 
                    background: 'var(--gradient-logo)',
                    boxShadow: 'var(--glow-cyan), var(--glow-purple)'
                }}
                />
                    <div className="relative bg-gradient-to-br from-neon-cyan to-neon-purple p-6 rounded-full animate-float">
                    <GraduationCap size={64} className="text-white animate-pulse-glow" />
                    </div>
                </div>
            </div>
          <div className="text-white text-3xl font-extrabold tracking-wide mb-1">LMS Egypt</div>
          <div className="text-blue-200 text-lg mb-4 font-medium">Empowering the next generation of learners</div>
          {/* Marquee */}
          <div
            className="relative mt-8 h-[108px] w-full flex items-center justify-center overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)"
            }}
          >
            <motion.div
              animate={{ y: [`0px`, `-${marqueeItems.length * marqueeHeight}px`] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: marqueeItems.length * 1.2,
                ease: "linear"
              }}
              style={{ willChange: "transform" }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-xs gap-3 justify-center h-9 text-gray-200 text-base font-medium"
                  style={{ height: `${marqueeHeight}px` }}
                >
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 