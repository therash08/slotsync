"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Layers,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Hero3DScheduleProps {
  className?: string;
}

export const Hero3DSchedule: React.FC<Hero3DScheduleProps> = ({ className }) => {
  // 7-Stage sequence:
  // 1: Blocks enter
  // 2: Overlap occurs
  // 3: Conflict indicator appears
  // 4: Searching alternative sections
  // 5: Replacement block moves in
  // 6: Conflict cleared
  // 7: Optimized success
  const [stage, setStage] = useState<number>(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev >= 7 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Subtle mouse tilt (max 3 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const isConflict = stage >= 2 && stage <= 3;
  const isResolving = stage === 4 || stage === 5;
  const isOptimized = stage >= 6;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full max-w-lg mx-auto select-none perspective-container",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Ambient background glow behind 3D visual */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#7C6CFF]/20 via-[#A78BFA]/10 to-amber-500/5 dark:from-[#7C6CFF]/30 dark:via-[#8B5CF6]/15 dark:to-transparent rounded-3xl blur-3xl pointer-events-none transition-opacity duration-700" />

      {/* Main 3D Tilted Card Stage */}
      <motion.div
        animate={{
          rotateX: mousePos.y,
          rotateY: mousePos.x,
          translateZ: 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative rounded-3xl border border-stone-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#131024]/90 backdrop-blur-xl p-5 sm:p-6 shadow-2xl dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] card-3d-tilt"
      >
        {/* Stage Header Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 dark:border-white/[0.06] mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C6CFF] animate-pulse shadow-[0_0_8px_rgba(124,108,255,0.6)]" />
            <span className="text-xs font-semibold text-stone-700 dark:text-[#F6F2FF] tracking-tight">
              Leading University • Routine Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/[0.06] border border-stone-200/60 dark:border-white/[0.06] text-stone-600 dark:text-[#B3ACC8]">
              Step {stage} of 7
            </span>
            <button
              type="button"
              onClick={() => setStage(1)}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:text-[#80769A] dark:hover:text-[#F6F2FF] transition-colors cursor-pointer"
              title="Restart sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Status Pill */}
        <div className="mb-4">
          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100/90 dark:bg-[#1B1735] border border-stone-200/70 dark:border-white/[0.06] text-xs text-stone-600 dark:text-[#B3ACC8]"
              >
                <Layers className="w-3.5 h-3.5 text-[#7C6CFF]" />
                <span>Synchronizing cross-batch schedule blocks...</span>
              </motion.div>
            )}

            {isConflict && (
              <motion.div
                key="conflict"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 font-medium shadow-xs shadow-rose-500/5"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-pulse" />
                  <span>Conflict Detected: 30-min overlap on Sunday</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-200/60 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200">
                  Clash
                </span>
              </motion.div>
            )}

            {isResolving && (
              <motion.div
                key="resolving"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/90 dark:bg-[#1B1735] border border-indigo-200/70 dark:border-[#7C6CFF]/30 text-xs text-indigo-700 dark:text-[#A78BFA] font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7C6CFF] animate-spin" />
                <span>Evaluating Batch 62 Section C alternative slot...</span>
              </motion.div>
            )}

            {isOptimized && (
              <motion.div
                key="optimized"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-medium shadow-xs shadow-emerald-500/5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Optimized: 0 Clashes • 4 Campus Days Achieved</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                  Score: 96/100
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Course Cards Grid */}
        <div className="space-y-2.5 relative">
          {/* Card 1: Regular Semester Core Class (CSE 3301) */}
          <motion.div
            layout
            className="relative p-3.5 rounded-2xl border border-stone-200/80 dark:border-white/[0.06] bg-stone-50/80 dark:bg-[#18142E] shadow-xs transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900 dark:text-[#F6F2FF] font-mono">
                    CSE 3301
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-200/70 dark:bg-white/[0.06] text-stone-700 dark:text-[#B3ACC8]">
                    Sec A • Regular
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-[#B3ACC8] font-medium mt-0.5">
                  Operating Systems & System Programming
                </p>
              </div>
              <span className="text-[10px] font-medium text-[#7C6CFF] dark:text-[#A78BFA] bg-indigo-50 dark:bg-[#7C6CFF]/15 px-2 py-0.5 rounded-full border border-indigo-200/60 dark:border-[#7C6CFF]/30">
                Core
              </span>
            </div>

            <div className="flex items-center gap-4 mt-2.5 text-[11px] text-stone-500 dark:text-[#80769A]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                Sunday 11:00 AM – 12:30 PM
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                Room 402
              </span>
            </div>
          </motion.div>

          {/* Card 2: Conflicting Backlog / Alternative Swap Card (CSE 2203) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {stage <= 4 ? (
                /* Conflicting Section A */
                <motion.div
                  key="clash-section"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={cn(
                    "p-3.5 rounded-2xl border transition-all relative overflow-hidden",
                    isConflict
                      ? "border-rose-400/80 dark:border-rose-500/40 bg-rose-50/80 dark:bg-rose-950/30 shadow-md shadow-rose-500/10"
                      : "border-stone-200/80 dark:border-white/[0.06] bg-stone-50/80 dark:bg-[#18142E]"
                  )}
                >
                  {isConflict && (
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500" />
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900 dark:text-[#F6F2FF] font-mono">
                          CSE 2203
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">
                          Sec A • Retake
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-[#B3ACC8] font-medium mt-0.5">
                        Data Structures & Algorithms
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                      Overlap
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2.5 text-[11px] text-stone-500 dark:text-[#80769A]">
                    <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                      <Clock className="w-3 h-3 text-rose-500" />
                      Sunday 10:00 AM – 11:30 AM
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                      Room 305
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* Compatible Section C */
                <motion.div
                  key="resolved-section"
                  initial={{ opacity: 0, x: 30, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-3.5 rounded-2xl border border-emerald-400/80 dark:border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-md shadow-emerald-500/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500" />
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900 dark:text-[#F6F2FF] font-mono">
                          CSE 2203
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                          Sec C • Retake Swap
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-[#B3ACC8] font-medium mt-0.5">
                        Data Structures & Algorithms
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      Resolved
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2.5 text-[11px] text-stone-500 dark:text-[#80769A]">
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      Tuesday 2:30 PM – 4:00 PM
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                      Room 508
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card 3: Improvement Course (MAT 1201) */}
          <motion.div
            layout
            className="relative p-3.5 rounded-2xl border border-stone-200/80 dark:border-white/[0.06] bg-stone-50/80 dark:bg-[#18142E] shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900 dark:text-[#F6F2FF] font-mono">
                    MAT 1201
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-200/70 dark:bg-white/[0.06] text-stone-700 dark:text-[#B3ACC8]">
                    Sec B • Improvement
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-[#B3ACC8] font-medium mt-0.5">
                  Differential & Integral Calculus
                </p>
              </div>
              <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/40">
                Elective
              </span>
            </div>

            <div className="flex items-center gap-4 mt-2.5 text-[11px] text-stone-500 dark:text-[#80769A]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                Wednesday 10:00 AM – 11:30 AM
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                Room 201
              </span>
            </div>
          </motion.div>
        </div>

        {/* Interactive Bottom Trigger */}
        <div className="mt-5 pt-4 border-t border-stone-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-600 dark:text-[#B3ACC8] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#7C6CFF]" />
            <span>4-Day Compact Week</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 dark:text-[#80769A]">
              Live Simulation
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
