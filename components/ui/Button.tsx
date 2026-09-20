import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6554D9] dark:focus-visible:ring-[#8B8CFF] focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none text-sm";

    const variants = {
      primary:
        "bg-[#6554D9] hover:bg-[#5444C5] text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_8px_rgba(101,84,217,0.22)] border border-[#5444C5]/60 dark:bg-[#8B8CFF] dark:hover:bg-[#7576FF] dark:text-[#090B12] dark:border-[#7576FF]/40 dark:shadow-[0_2px_12px_rgba(139,140,255,0.25)] font-semibold",
      secondary:
        "bg-[#F0ECE5] hover:bg-[#E6E0D8] text-[#20232E] border border-[#E6E0D8] dark:bg-[#1A1F31] dark:hover:bg-[#22293F] dark:text-[#F4F5FA] dark:border-white/10 shadow-2xs font-medium",
      outline:
        "border border-[#E6E0D8] dark:border-white/15 bg-[#FFFDFA] dark:bg-[#121522] text-[#20232E] dark:text-[#F4F5FA] hover:bg-[#F0ECE5] dark:hover:bg-white/5 shadow-2xs font-medium",
      ghost:
        "bg-transparent text-[#667085] hover:text-[#20232E] hover:bg-[#F0ECE5]/80 dark:text-[#9DA7BB] dark:hover:text-[#F4F5FA] dark:hover:bg-white/5",
      destructive:
        "bg-red-600 hover:bg-red-700 text-white shadow-xs border border-red-700/80 dark:bg-rose-600 dark:hover:bg-rose-500 font-medium",
      subtle:
        "bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#6554D9] dark:bg-[#1A1F35] dark:hover:bg-[#222945] dark:text-[#8B8CFF] border border-[#6554D9]/25 dark:border-[#8B8CFF]/25 font-medium",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5",
      icon: "h-9 w-9 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
