"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SyncOrbProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  isOptimizing?: boolean;
}

export const SyncOrb: React.FC<SyncOrbProps> = ({
  size = "md",
  className,
  isOptimizing = false,
}) => {
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-28 h-28",
    lg: "w-40 h-40",
    xl: "w-56 h-56",
  };

  const coreSizeMap = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none perspective-container",
        sizeMap[size],
        className
      )}
      style={{ perspective: "600px" }}
    >
      {/* Outer ambient glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-indigo-500/20 dark:bg-indigo-500/30 blur-xl pointer-events-none transition-transform duration-700",
          isOptimizing ? "scale-125 opacity-80" : "scale-100 opacity-50"
        )}
      />

      {/* Ring 1: Primary X-axis orbit */}
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [15, 45, 15],
        }}
        transition={{
          rotateX: { duration: isOptimizing ? 4 : 10, repeat: Infinity, ease: "linear" },
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-1 rounded-full border-2 border-dashed border-indigo-400/40 dark:border-indigo-400/60 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Ring 2: Secondary Y-axis orbit */}
      <motion.div
        animate={{
          rotateY: [360, 0],
          rotateZ: [25, -25, 25],
        }}
        transition={{
          rotateY: { duration: isOptimizing ? 3.5 : 8, repeat: Infinity, ease: "linear" },
          rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-2.5 rounded-full border-2 border-dotted border-violet-400/40 dark:border-purple-400/60 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Ring 3: Tilted tertiary equatorial ring */}
      <motion.div
        animate={{
          rotateZ: [0, 360],
          rotateX: [65, 75, 65],
        }}
        transition={{
          rotateZ: { duration: isOptimizing ? 5 : 12, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 rounded-full border border-sky-400/30 dark:border-sky-400/40 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Central Illuminated Synchronization Core */}
      <motion.div
        animate={{
          scale: isOptimizing ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: isOptimizing ? 1.2 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg flex items-center justify-center relative z-10",
          coreSizeMap[size],
          "shadow-indigo-500/40 dark:shadow-indigo-500/60"
        )}
      >
        {/* Core highlight reflection */}
        <div className="w-1/3 h-1/3 rounded-full bg-white/70 blur-[1px] -translate-y-0.5 -translate-x-0.5" />
      </motion.div>
    </div>
  );
};
