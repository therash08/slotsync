import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  showTagline?: boolean;
  taglineText?: string;
  showText?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  href = "/",
  showTagline = true,
  taglineText = "For Leading University",
  showText = true,
  inverted = false,
}) => {
  const content = (
    <div className={cn("inline-flex items-center gap-2.5 select-none group", className)}>
      <div className="relative w-8 h-8 rounded-xl bg-purple-600 dark:bg-purple-500 flex items-center justify-center shadow-xs overflow-hidden transition-transform duration-200 group-hover:scale-105 shrink-0">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />

        {/* Syncing time slots icon */}
        <svg
          className="w-4 h-4 text-white relative z-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Top slot */}
          <rect x="3" y="4" width="13" height="7" rx="1.5" />
          {/* Bottom synced slot */}
          <rect x="8" y="13" width="13" height="7" rx="1.5" />
          {/* Sync indicator arrows */}
          <path d="M17 7.5h2a2 2 0 0 1 2 2v1" strokeDasharray="2 2" opacity="0.8" />
          <path d="M7 16.5H5a2 2 0 0 1-2-2v-1" strokeDasharray="2 2" opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight text-lg leading-none",
              inverted ? "text-white" : "text-[var(--text-primary)]"
            )}
          >
            Slot<span className={inverted ? "text-purple-300" : "text-purple-600 dark:text-purple-400"}>Sync</span>
          </span>
          {showTagline && (
            <span
              className={cn(
                "text-[10px] font-medium tracking-wide mt-0.5",
                inverted ? "text-purple-200/70" : "text-[var(--text-muted)]"
              )}
            >
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
