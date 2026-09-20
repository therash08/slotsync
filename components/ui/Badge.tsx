import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "regular" | "retake" | "improvement" | "conflict" | "warning" | "success" | "neutral" | "outline" | "locked";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  children,
  ...props
}) => {
  const base = "inline-flex items-center font-medium rounded-lg tracking-tight select-none border transition-colors";

  const variants = {
    regular:
      "bg-[#F0ECE5] dark:bg-white/5 text-[#20232E] dark:text-[#CBD5E1] border-[#E6E0D8] dark:border-white/10 font-mono",
    retake:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60 font-medium",
    improvement:
      "bg-[#EEF2FF] dark:bg-[#1A1F35] text-[#6554D9] dark:text-[#8B8CFF] border-[#6554D9]/25 dark:border-[#8B8CFF]/30 font-medium",
    conflict:
      "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800/60 font-semibold",
    warning:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 font-medium",
    success:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-medium",
    neutral:
      "bg-[#F0ECE5]/70 dark:bg-white/5 text-[#667085] dark:text-[#9DA7BB] border-[#E6E0D8] dark:border-white/10",
    outline:
      "bg-transparent text-[#20232E] dark:text-[#F4F5FA] border-[#E6E0D8] dark:border-white/15",
    locked:
      "bg-[#EEF2FF] dark:bg-indigo-950/50 text-[#6554D9] dark:text-[#8B8CFF] border-[#6554D9]/30 dark:border-indigo-700/50 font-medium",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
