"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

export const InteractiveConflictDemo: React.FC = () => {
  // State: 'clash' | 'solving' | 'resolved'
  const [state, setState] = useState<"clash" | "solving" | "resolved">("clash");

  const handleResolve = () => {
    setState("solving");
    setTimeout(() => {
      setState("resolved");
    }, 850);
  };

  const handleReset = () => {
    setState("clash");
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Ambient background glow behind spotlight container */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#7C6CFF]/20 via-[#8B5CF6]/15 to-transparent rounded-3xl blur-3xl pointer-events-none" />

      {/* Main Spotlight Container */}
      <div className="relative rounded-3xl border border-stone-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#131024]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Top Banner & Description */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/60 dark:border-white/[0.06] mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7C6CFF] animate-pulse shadow-[0_0_8px_rgba(124,108,255,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C6CFF] dark:text-[#A78BFA]">
                Interactive Simulation
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              Real-Time Cross-Batch Clash Solver
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-[#B3ACC8] mt-1">
              Experience how SlotSync detects overlaps across batch routines and automatically slots compatible sections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {state === "resolved" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-xs border-stone-200/80 dark:border-white/[0.08] text-stone-700 dark:text-[#F6F2FF] hover:bg-stone-100 dark:hover:bg-white/[0.06]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </Button>
            )}
          </div>
        </div>

        {/* Interactive Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Routine Timetable Slot Visualizer */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-[#80769A] pb-1 font-medium">
              <span className="font-semibold text-stone-700 dark:text-[#F6F2FF]">
                Weekly Routine Grid Preview
              </span>
              <span className="font-mono text-[11px]">Sunday &amp; Tuesday Slots</span>
            </div>

            {/* Slot 1: Regular Course CSE 3301 */}
            <div className="p-3.5 rounded-2xl border border-stone-200/80 dark:border-white/[0.06] bg-stone-50/80 dark:bg-[#18142E] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs font-mono text-stone-900 dark:text-[#F6F2FF]">
                    CSE 3301
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-[#7C6CFF]/15 text-[#7C6CFF] dark:text-[#A78BFA] font-medium border border-indigo-200/60 dark:border-[#7C6CFF]/25">
                    Regular • Sec A
                  </span>
                </div>
                <span className="text-xs text-stone-500 dark:text-[#80769A] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400 dark:text-[#80769A]" />
                  Sunday 11:00 AM – 12:30 PM
                </span>
              </div>
            </div>

            {/* Slot 2: The Backlog Retake Block (CSE 2203) */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {state !== "resolved" ? (
                  /* Conflicting Sunday slot */
                  <motion.div
                    key="clash"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -25, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="p-3.5 rounded-2xl border border-rose-300/80 dark:border-rose-500/35 bg-rose-50/90 dark:bg-rose-950/30 relative overflow-hidden shadow-xs shadow-rose-500/5"
                  >
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs font-mono text-rose-900 dark:text-rose-200">
                          CSE 2203
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-200/60 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 font-bold">
                          Batch 62 • Sec A
                        </span>
                      </div>
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-500" />
                        Sunday 10:00 AM – 11:30 AM
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-rose-700 dark:text-rose-300 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>Clash: Overlaps 11:00 AM – 11:30 AM with CSE 3301!</span>
                    </div>
                  </motion.div>
                ) : (
                  /* Resolved Tuesday slot */
                  <motion.div
                    key="resolved"
                    initial={{ opacity: 0, x: 25, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="p-3.5 rounded-2xl border border-emerald-300/80 dark:border-emerald-500/35 bg-emerald-50/90 dark:bg-emerald-950/30 relative overflow-hidden shadow-xs shadow-emerald-500/5"
                  >
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs font-mono text-emerald-900 dark:text-emerald-200">
                          CSE 2203
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-200/60 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-bold">
                          Batch 62 • Sec C (Swap)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        Tuesday 2:30 PM – 4:00 PM
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Clean Fit: 0 clashes detected. Routine fully compatible!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Interactive Solution Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-white/[0.06] bg-stone-50/90 dark:bg-[#18142E] space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-[#80769A]">
                  Resolution Engine
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider",
                    state === "clash"
                      ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800/40"
                      : state === "solving"
                      ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800/40"
                      : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/40"
                  )}
                >
                  {state === "clash" && "Clash Flagged"}
                  {state === "solving" && "Scanning Sections..."}
                  {state === "resolved" && "Schedule Compatible"}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                {state === "clash" &&
                  "Taking CSE 2203 Section A creates a fatal 30-minute clash with your regular operating systems lecture on Sunday."}
                {state === "solving" &&
                  "SlotSync is scanning 8 alternate sections across Batches 62 & 63..."}
                {state === "resolved" &&
                  "Success! SlotSync swapped to Batch 62 Section C on Tuesday afternoon. Both courses now fit cleanly with zero schedule conflict."}
              </p>

              {state === "clash" && (
                <Button
                  onClick={handleResolve}
                  size="md"
                  className="w-full gap-2 shadow-lg shadow-[#7C6CFF]/20 bg-[#7C6CFF] hover:bg-[#6854F5] text-white font-bold active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Find Alternative Section</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {state === "solving" && (
                <Button disabled size="md" className="w-full gap-2 opacity-85 bg-[#7C6CFF] text-white">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Analyzing Batches 62 &amp; 63...</span>
                </Button>
              )}

              {state === "resolved" && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Conflict Resolved • Ready for Advising</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
