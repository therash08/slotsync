"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  Layers,
  Sparkles,
  Bookmark,
  GitCompare,
  BookOpen,
  Bell,
  Settings,
  Shield,
  ArrowRight,
} from "lucide-react";
import { MOCK_COURSES } from "@/lib/mock-data/courses";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled outside or toggled
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (path: string) => {
    onClose();
    setQuery("");
    router.push(path);
  };

  const pages = [
    { title: "Dashboard Overview", path: "/dashboard", icon: Layers, category: "Navigation" },
    { title: "My Routine (Timetable)", path: "/dashboard/routine", icon: Calendar, category: "Navigation" },
    { title: "Plan Retake & Improvement Courses", path: "/dashboard/plan", icon: BookOpen, category: "Navigation" },
    { title: "Schedule Generator & Optimizer", path: "/dashboard/generate", icon: Sparkles, category: "Navigation" },
    { title: "Saved Schedules", path: "/dashboard/saved", icon: Bookmark, category: "Navigation" },
    { title: "Compare Schedules", path: "/dashboard/compare", icon: GitCompare, category: "Navigation" },
    { title: "Course Catalog", path: "/dashboard/courses", icon: BookOpen, category: "Navigation" },
    { title: "Notifications", path: "/dashboard/notifications", icon: Bell, category: "Navigation" },
    { title: "Settings & Preferences", path: "/dashboard/settings", icon: Settings, category: "Navigation" },
    { title: "Admin Routine Manager", path: "/admin/routines", icon: Shield, category: "Admin" },
    { title: "Admin Routine Versions", path: "/admin/routine-versions", icon: Shield, category: "Admin" },
  ];

  const filteredPages = pages.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCourses = MOCK_COURSES.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, course code (e.g. CSE 2203), or page..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Courses section */}
          {filteredCourses.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Courses
              </div>
              <div className="mt-1 space-y-1">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigateTo(`/dashboard/courses/${c.code.toLowerCase().replace(/\s+/g, "-")}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded">
                        {c.code}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-500 flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation & Tools */}
          {filteredPages.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Commands & Pages
              </div>
              <div className="mt-1 space-y-1">
                {filteredPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.path}
                      onClick={() => navigateTo(page.path)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                        <span>{page.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Jump to
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && filteredCourses.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500">
              No results found for &ldquo;<span className="font-medium text-slate-700 dark:text-slate-300">{query}</span>&rdquo;
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↓</kbd>
            <span>to select</span>
          </div>
          <span>SlotSync Quick Search</span>
        </div>
      </div>
    </div>
  );
};
