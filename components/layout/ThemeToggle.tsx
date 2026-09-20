"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon, Check, Sparkles } from "lucide-react";
import { useThemeStore, Theme } from "@/stores/useThemeStore";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "segmented" | "dropdown";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  variant = "segmented",
}) => {
  const { theme, setTheme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    if (theme === "motion-black") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "motion-black");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "warm-light");
    }
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-8 w-28 rounded-full border border-stone-200 dark:border-white/10 bg-stone-100/60 dark:bg-white/5", className)} />
    );
  }

  const isMotionBlack = theme === "motion-black";

  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-0.5 rounded-full border border-stone-300/80 dark:border-white/15 bg-stone-100/90 dark:bg-[#0E111B] shadow-inner gap-0.5",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme("warm-light")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer select-none",
            !isMotionBlack
              ? "bg-white text-stone-900 shadow-2xs border border-stone-200/90 font-semibold"
              : "text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-slate-200"
          )}
          title="Switch to ☀ Warm Light"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-300" />
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Warm Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("motion-black")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer select-none",
            isMotionBlack
              ? "bg-[#181C2B] text-white shadow-2xs border border-indigo-500/40 font-semibold"
              : "text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-slate-200"
          )}
          title="Switch to ◐ Motion Black"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.9)]" />
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Motion Black</span>
        </button>
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={cn("relative inline-block text-left", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer",
          isMotionBlack
            ? "border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 shadow-inner"
            : "border-stone-300/80 bg-white hover:bg-stone-50 text-stone-800 shadow-2xs"
        )}
        title="Switch theme"
        aria-expanded={isOpen}
      >
        {isMotionBlack ? (
          <>
            <div className="w-4 h-4 rounded-full bg-[#07080D] border border-indigo-500/60 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_5px_rgba(139,92,246,0.9)]" />
            </div>
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Motion Black</span>
          </>
        ) : (
          <>
            <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border border-amber-300/80 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            </div>
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Warm Light</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-stone-300/90 dark:border-white/15 bg-white/95 dark:bg-[#0D101A]/95 backdrop-blur-md shadow-xl py-2 z-50 overflow-hidden"
          >
            <div className="px-3 py-1.5 border-b border-stone-200/80 dark:border-white/10 text-[11px] font-semibold text-stone-400 dark:text-slate-500 uppercase tracking-wider">
              Select Theme
            </div>

            <div className="p-1.5 space-y-1">
              {/* Warm Light Option */}
              <button
                type="button"
                onClick={() => {
                  setTheme("warm-light");
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer",
                  !isMotionBlack
                    ? "bg-amber-500/10 text-stone-900 dark:text-slate-100 font-semibold"
                    : "text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-stone-900 dark:hover:text-slate-200"
                )}
              >
                <div className="flex items-center gap-2.5">
                  {/* Live preview swatch */}
                  <div className="w-5 h-5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] flex items-center justify-center shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>Warm Light</span>
                  </div>
                </div>
                {!isMotionBlack && <Check className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* Motion Black Option */}
              <button
                type="button"
                onClick={() => {
                  setTheme("motion-black");
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer",
                  isMotionBlack
                    ? "bg-indigo-500/15 text-white font-semibold"
                    : "text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-stone-900 dark:hover:text-slate-200"
                )}
              >
                <div className="flex items-center gap-2.5">
                  {/* Live preview swatch */}
                  <div className="w-5 h-5 rounded-lg bg-[#07080D] border border-indigo-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_rgba(139,92,246,0.9)]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Motion Black</span>
                  </div>
                </div>
                {isMotionBlack && <Check className="w-4 h-4 text-indigo-400" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
