"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Calendar,
  Clock,
  Zap,
  TrendingDown,
  XCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const BeforeAfterSlider: React.FC = () => {
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Selector Switch */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1.5 rounded-2xl border border-stone-200/80 dark:border-white/[0.08] bg-stone-100/90 dark:bg-[#131024] shadow-sm gap-1.5">
          <button
            type="button"
            onClick={() => setView("before")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
              view === "before"
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                : "text-stone-600 dark:text-[#B3ACC8] hover:text-stone-900 dark:hover:text-[#F6F2FF]"
            )}
          >
            <XCircle className="w-4 h-4" />
            <span>Before SlotSync</span>
          </button>

          <button
            type="button"
            onClick={() => setView("after")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
              view === "after"
                ? "bg-[#7C6CFF] text-white shadow-md shadow-[#7C6CFF]/25"
                : "text-stone-600 dark:text-[#B3ACC8] hover:text-stone-900 dark:hover:text-[#F6F2FF]"
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span>After SlotSync</span>
          </button>
        </div>
      </div>

      {/* Dynamic Display Panel */}
      <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait">
          {view === "before" ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl border border-rose-300/60 dark:border-rose-500/20 bg-rose-50/40 dark:bg-rose-950/15 p-6 sm:p-8 shadow-xl dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-rose-200/80 dark:border-rose-900/30 mb-6 gap-3">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span>Manual Advising Scramble</span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-200/60 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 self-start sm:self-auto">
                  5 Days • 4h Gaps • High Stress
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#161228] border border-rose-200/60 dark:border-rose-500/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Juggling 6 Different PDF Routines</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Opening Batch 61, 62, and 63 PDFs simultaneously on WhatsApp while manually cross-referencing times.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#161228] border border-rose-200/60 dark:border-rose-500/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Last-Minute Advising Clashes</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Discovering during your advising session that your retake slot overlaps with your department core lecture.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#161228] border border-rose-200/60 dark:border-rose-500/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
                    <Clock className="w-4 h-4" />
                    <span>3–4 Hour Dead Idle Breaks</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Stuck on campus with morning classes at 8:30 AM and evening labs at 5:00 PM with nowhere productive to wait.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#161228] border border-rose-200/60 dark:border-rose-500/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
                    <Calendar className="w-4 h-4" />
                    <span>Scattered 5-Day Weeks</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Forced to commute to university 5 days a week just for a single 1.5-hour class.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative rounded-3xl border border-indigo-200/60 dark:border-[#7C6CFF]/20 bg-indigo-50/30 dark:bg-[#131024] p-6 sm:p-8 shadow-xl dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              {/* Subtle top glow highlight */}
              <div className="absolute top-0 right-1/3 w-64 h-32 bg-[#7C6CFF]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-indigo-200/60 dark:border-white/[0.06] mb-6 gap-3">
                <div className="flex items-center gap-2 text-[#7C6CFF] dark:text-[#A78BFA] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#7C6CFF] shrink-0" />
                  <span>The SlotSync Synchronized Routine</span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/40 self-start sm:self-auto">
                  4 Days • 1h Max Gap • Score 94/100
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#18142E] border border-stone-200/80 dark:border-white/[0.06] space-y-2 hover:border-[#7C6CFF]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7C6CFF] dark:text-[#A78BFA]">
                    <Zap className="w-4 h-4 text-[#7C6CFF]" />
                    <span>Instant Cross-Batch Search</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Pick your courses once. SlotSync checks all sections across batches in milliseconds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#18142E] border border-stone-200/80 dark:border-white/[0.06] space-y-2 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Automatic Clash Detection</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Automated conflict matrix eliminates accidental overlaps between regular courses and backlog credits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#18142E] border border-stone-200/80 dark:border-white/[0.06] space-y-2 hover:border-[#7C6CFF]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7C6CFF] dark:text-[#A78BFA]">
                    <TrendingDown className="w-4 h-4 text-[#7C6CFF]" />
                    <span>Compact Schedules &amp; Free Days</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Build compact 3-day or 4-day routines so you save travel time and focus on studying or projects.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#18142E] border border-stone-200/80 dark:border-white/[0.06] space-y-2 hover:border-[#7C6CFF]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7C6CFF] dark:text-[#A78BFA]">
                    <Calendar className="w-4 h-4 text-[#7C6CFF]" />
                    <span>Advising-Ready Routine Export</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                    Save, print, or export your optimized section list with faculty initials and room numbers ready for advising.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
