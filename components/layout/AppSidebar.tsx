"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Bookmark,
  GitCompare,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useUserStore } from "@/stores/useUserStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  className?: string;
  isMobile?: boolean;
  onNavigate?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  className,
  isMobile = false,
  onNavigate,
}) => {
  const pathname = usePathname();
  const { isCollapsed: storeCollapsed, toggleCollapsed } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { currentRoutine, selectedCourses, savedSchedules } = useScheduleStore();
  const { user, notifications } = useUserStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "My Routine",
      href: "/dashboard/routine",
      icon: Calendar,
      badge: currentRoutine.length > 0 ? `${currentRoutine.length}` : null,
    },
    {
      title: "Course Explorer",
      href: "/dashboard/courses",
      icon: BookOpen,
      badge: selectedCourses.length > 0 ? `${selectedCourses.length}` : null,
      badgeColor: "bg-purple-500/30 text-purple-200",
    },
    {
      title: "Compare Schedules",
      href: "/dashboard/compare",
      icon: GitCompare,
    },
    {
      title: "Saved Schedules",
      href: "/dashboard/saved",
      icon: Bookmark,
      badge: savedSchedules.length > 0 ? `${savedSchedules.length}` : null,
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? `${unreadCount}` : null,
      badgeColor: "bg-[#FF7A00] text-white",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  // Prevent SSR hydration mismatch while preserving default state
  const isCollapsed = !isMobile && mounted && storeCollapsed;

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-[#1A1033] border-r border-[#2B1B4D] transition-[width] duration-200 ease-in-out z-40 select-none overflow-hidden text-[#B4A9CE]",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-[#2B1B4D] px-3",
          isCollapsed ? "justify-between" : "justify-between px-4"
        )}
      >
        {!isCollapsed ? (
          <>
            {/* Brand leads to Dashboard Overview, never to public marketing page */}
            <Logo href="/dashboard" showText={true} inverted={true} />
            {!isMobile && (
              <button
                type="button"
                onClick={toggleCollapsed}
                className="hidden lg:flex p-1.5 rounded-lg text-[#8B7CA8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-between">
            {/* Separate logo link and separate expand button */}
            <Logo href="/dashboard" showText={false} inverted={true} />
            {!isMobile && (
              <button
                type="button"
                onClick={toggleCollapsed}
                className="p-1.5 rounded-lg text-[#8B7CA8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-1 text-[11px] font-bold text-[#7E6F9D] uppercase tracking-wider">
          {!isCollapsed ? "Navigation" : "•••"}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={isCollapsed ? item.title : undefined}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-[#FF7A00] text-white font-semibold shadow-md shadow-[#FF7A00]/25"
                  : "text-[#B4A9CE] hover:bg-white/10 hover:text-white",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-[#8B7CA8] group-hover:text-white"
                )}
              />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold tracking-tight",
                        isActive
                          ? "bg-white/20 text-white"
                          : item.badgeColor || "bg-white/10 text-white"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Student Profile footer */}
      <div className="p-3 border-t border-[#2B1B4D] bg-[#140C29]/70">
        {!isCollapsed ? (
          <div>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-purple-600/90 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-purple-400/30 shadow-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user.name || "Student"}
                </p>
                <p className="text-[11px] text-[#A699C3] font-mono truncate">
                  ID: {user.studentId || "02212020088"}
                </p>
                <p className="text-[10px] text-[#8675A4] truncate">
                  {user.department || "CSE"} • B{user.batch}-{user.section}
                </p>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-white/5 px-2 flex items-center justify-between text-[10px] text-[#7E6F9D] font-medium">
              <span>Leading University</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                Fall 2026
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div
              className="w-9 h-9 rounded-xl bg-purple-600/90 text-white flex items-center justify-center font-bold text-sm border border-purple-400/30"
              title={`${user.name || "Student"} (ID: ${user.studentId || "02212020088"} • ${user.department || "CSE"} B${user.batch}-${user.section})`}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "S"}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
