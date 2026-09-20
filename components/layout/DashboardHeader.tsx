"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Calendar,
  UserPlus,
  BookOpen,
} from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPalette } from "./CommandPalette";

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void;
  title?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMobileMenuToggle,
  title = "Dashboard",
}) => {
  const router = useRouter();
  const { user, notifications, logoutProfile } = useUserStore();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logoutProfile();
    router.push("/onboarding");
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-stone-200/80 dark:border-white/10 bg-[#F6F4FB]/85 dark:bg-[#0E091B]/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-purple-200 hover:text-stone-900 hover:bg-stone-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold text-stone-900 dark:text-purple-50 tracking-tight">
              {title}
            </h1>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Leading University • {user.department || "CSE"} B{user.batch}-{user.section}
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick search button */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-600 dark:text-purple-300 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 rounded-xl border border-stone-200/80 dark:border-white/10 transition-colors cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-purple-500" />
            <span className="hidden sm:inline">Search courses, sections...</span>
            <kbd className="font-mono text-[10px] bg-stone-100 dark:bg-purple-950/60 px-1.5 py-0.5 rounded border border-stone-200 dark:border-purple-800 text-stone-500 dark:text-purple-300">
              ⌘K
            </kbd>
          </button>

          {/* Notifications bell */}
          <Link
            href="/dashboard/notifications"
            className="relative p-2 rounded-xl text-stone-600 dark:text-purple-200 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-white/10 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF7A00] ring-2 ring-white dark:ring-[#0E091B]" />
            )}
          </Link>

          {/* Theme switcher */}
          <ThemeToggle />

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-stone-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-expanded={isUserMenuOpen}
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
            </button>

            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#1A1033] border border-stone-200 dark:border-purple-900/60 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-sm">
                  <div className="px-4 py-2.5 border-b border-stone-100 dark:border-purple-900/40">
                    <p className="font-semibold text-stone-900 dark:text-white truncate">
                      {user.name || "Student"}
                    </p>
                    <p className="text-xs font-mono text-purple-600 dark:text-purple-300 mt-0.5 truncate">
                      ID: {user.studentId || "02212020088"}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-purple-300/80">
                      <span>Leading University</span>
                      <span>•</span>
                      <span>{user.department || "CSE"} B{user.batch}-{user.section}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard/routine"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-stone-700 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-purple-500" />
                      My Regular Routine
                    </Link>
                    <Link
                      href="/dashboard/courses"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-stone-700 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      Courses & Sections
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-stone-700 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-purple-500" />
                      Settings & Profile
                    </Link>
                    <Link
                      href="/onboarding"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-stone-700 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 text-purple-500" />
                      Switch / Create Profile
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-stone-100 dark:border-purple-900/40">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Switch Student Profile
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
};
