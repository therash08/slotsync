"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Layers,
  AlertTriangle,
  Search,
  Sparkles,
  Trophy,
  CheckCircle2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SyncOrb } from "@/components/3d/SyncOrb";

interface GenerationPipelineModalProps {
  currentStep: number; // 1 to 6
}

export const GenerationPipelineModal: React.FC<GenerationPipelineModalProps> = ({
  currentStep,
}) => {
  const pipelineStages = [
    {
      step: 1,
      title: "Current Routine",
      desc: "Loading Fall 2026 Batch 62 regular schedule",
      icon: Calendar,
    },
    {
      step: 2,
      title: "Selected Courses",
      desc: "Parsing backlog & improvement credit requirements",
      icon: Layers,
    },
    {
      step: 3,
      title: "Conflict Analysis",
      desc: "Scanning weekday time intervals for collisions",
      icon: AlertTriangle,
    },
    {
      step: 4,
      title: "Section Matching",
      desc: "Checking open junior batch sections (Batches 62 & 63)",
      icon: Search,
    },
    {
      step: 5,
      title: "Optimization",
      desc: "Calculating 4-day targets, gaps & off-day preferences",
      icon: Sparkles,
    },
    {
      step: 6,
      title: "Schedule Results",
      desc: "Ranking conflict-free combinations by convenience score",
      icon: Trophy,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-300/80 dark:border-white/15 bg-white/95 dark:bg-[#0D101C]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-indigo-500/15 dark:bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6 space-y-2">
          <div className="flex justify-center mb-3">
            <SyncOrb size="sm" isOptimizing={true} />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-slate-100">
            Generating Optimal Routines
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Computing collision-free schedule combinations across all junior batches
          </p>
        </div>

        {/* 6-Stage Visual Pipeline */}
        <div className="space-y-2.5 relative">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = currentStep > stage.step;
            const isActive = currentStep === stage.step;
            const isPending = currentStep < stage.step;

            return (
              <div
                key={stage.title}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-2xl border transition-all duration-300",
                  isActive &&
                  "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm shadow-indigo-500/10 scale-[1.02]",
                  isCompleted &&
                  "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 opacity-85",
                  isPending &&
                  "border-stone-200/60 dark:border-white/5 bg-stone-50/40 dark:bg-white/[0.01] opacity-40"
                )}
              >
                {/* Node icon */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold transition-all",
                    isActive &&
                    "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 animate-pulse",
                    isCompleted &&
                    "bg-emerald-600 text-white shadow-xs",
                    isPending &&
                    "bg-stone-200 dark:bg-white/10 text-stone-400 dark:text-slate-500"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={cn(
                        "font-semibold text-xs truncate",
                        isActive && "text-indigo-700 dark:text-indigo-300 font-bold",
                        isCompleted && "text-stone-700 dark:text-slate-300",
                        isPending && "text-stone-400 dark:text-slate-500"
                      )}
                    >
                      {stage.title}
                    </h4>
                    {isActive && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 animate-pulse">
                        Processing...
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Done
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-slate-400 truncate">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
