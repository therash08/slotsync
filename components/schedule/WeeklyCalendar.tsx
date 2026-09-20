"use client";

import React, { useState } from "react";
import { ClassSession, ConflictDetail } from "@/types";
import { WEEKDAYS, DayOfWeek, timeToMinutes, formatTimeString, cn } from "@/lib/utils";
import { CalendarCourseBlock } from "./CalendarCourseBlock";
import { CourseDetailDrawer } from "@/components/courses/CourseDetailDrawer";
import { LayoutGrid, List, AlertTriangle } from "lucide-react";
import { useScheduleStore } from "@/stores/useScheduleStore";

interface WeeklyCalendarProps {
  sessions: ClassSession[];
  conflicts?: ConflictDetail[];
  title?: string;
  defaultView?: "week" | "list";
  showViewToggle?: boolean;
  className?: string;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  sessions,
  conflicts = [],
  title,
  defaultView = "week",
  showViewToggle = true,
  className,
}) => {
  const [viewMode, setViewMode] = useState<"week" | "list">(defaultView);
  const [selectedMobileDay, setSelectedMobileDay] = useState<DayOfWeek>("Sunday");
  const [activeSession, setActiveSession] = useState<ClassSession | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { lockedSections } = useScheduleStore();

  const handleBlockClick = (session: ClassSession) => {
    setActiveSession(session);
    setDrawerOpen(true);
  };

  // Check which days have active classes
  const dayClassCounts = WEEKDAYS.reduce((acc, day) => {
    acc[day] = sessions.filter((s) => s.day === day).length;
    return acc;
  }, {} as Record<DayOfWeek, number>);

  return (
    <div className={cn("w-full bg-[#FFFDFA] dark:bg-[#121522] rounded-2xl border border-[#E6E0D8] dark:border-white/10 shadow-xs overflow-hidden", className)}>
      {/* Top Header / View controls */}
      <div className="p-4 sm:px-6 border-b border-[#E6E0D8]/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#F0ECE5]/30 dark:bg-white/[0.01]">
        <div>
          <div className="flex items-center gap-2">
            {title && (
              <h3 className="font-bold text-[#20232E] dark:text-[#F4F5FA] text-base">
                {title}
              </h3>
            )}
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#EEF2FF] dark:bg-[#1A1F35] text-[#6554D9] dark:text-[#8B8CFF] border border-[#6554D9]/20 dark:border-[#8B8CFF]/20">
              Leading University • Sample Timetable
            </span>
          </div>
          <p className="text-xs text-[#667085] dark:text-[#9DA7BB] mt-0.5">
            {sessions.length} class sessions scheduled across the week (Sunday – Thursday)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {conflicts.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{conflicts.length} Conflict{conflicts.length > 1 ? "s" : ""}</span>
            </div>
          )}

          {showViewToggle && (
            <div className="flex items-center rounded-xl border border-[#E6E0D8] dark:border-white/10 p-0.5 bg-[#F0ECE5]/80 dark:bg-white/5">
              <button
                type="button"
                onClick={() => setViewMode("week")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer select-none",
                  viewMode === "week"
                    ? "bg-[#FFFDFA] dark:bg-[#1A1F31] text-[#20232E] dark:text-[#F4F5FA] shadow-2xs font-semibold"
                    : "text-[#667085] hover:text-[#20232E] dark:text-[#9DA7BB] dark:hover:text-[#F4F5FA]"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Week</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer select-none",
                  viewMode === "list"
                    ? "bg-[#FFFDFA] dark:bg-[#1A1F31] text-[#20232E] dark:text-[#F4F5FA] shadow-2xs font-semibold"
                    : "text-[#667085] hover:text-[#20232E] dark:text-[#9DA7BB] dark:hover:text-[#F4F5FA]"
                )}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Day Selector Tabs (for Week View on mobile) */}
      {viewMode === "week" && (
        <div className="lg:hidden flex border-b border-[#E6E0D8]/80 dark:border-white/10 bg-[#F0ECE5]/40 dark:bg-white/[0.02] overflow-x-auto p-1.5 gap-1 scrollbar-none">
          {WEEKDAYS.map((day) => {
            const count = dayClassCounts[day] || 0;
            const isSelected = selectedMobileDay === day;
            const hasDayConflict = conflicts.some((c) => c.day === day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedMobileDay(day)}
                className={cn(
                  "flex-1 min-w-[72px] py-1.5 px-2 rounded-xl text-xs font-medium text-center transition-all flex flex-col items-center gap-0.5 cursor-pointer",
                  isSelected
                    ? "bg-[#FFFDFA] dark:bg-[#1A1F31] text-[#6554D9] dark:text-[#8B8CFF] shadow-2xs font-semibold border border-[#E6E0D8]/80 dark:border-white/10"
                    : "text-[#667085] dark:text-[#9DA7BB] hover:bg-[#F0ECE5] dark:hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-1">
                  <span>{day.slice(0, 3)}</span>
                  {hasDayConflict && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                </div>
                <span
                  className={cn(
                    "text-[10px] px-1.5 rounded-full font-mono",
                    count > 0
                      ? "bg-[#F0ECE5] dark:bg-white/10 text-[#475467] dark:text-[#CBD5E1]"
                      : "text-[#667085] dark:text-[#9DA7BB]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* WEEK VIEW */}
      {viewMode === "week" && (
        <>
          <div className="overflow-x-auto">
          {/* Desktop 5-Column Grid */}
          <div className="hidden lg:grid grid-cols-5 divide-x divide-[#E6E0D8]/70 dark:divide-white/10 min-h-[520px] min-w-[760px]">
            {WEEKDAYS.map((day) => {
              const daySessions = sessions
                .filter((s) => s.day === day)
                .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
              const hasDayConflict = conflicts.some((c) => c.day === day);

              return (
                <div key={day} className="flex flex-col">
                  {/* Column Header */}
                  <div className={cn(
                    "p-3 text-center border-b border-[#E6E0D8]/70 dark:border-white/10 transition-colors",
                    hasDayConflict 
                      ? "bg-red-50/50 dark:bg-red-950/20" 
                      : "bg-[#F0ECE5]/30 dark:bg-white/[0.02]"
                  )}>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="font-semibold text-xs text-[#20232E] dark:text-[#F4F5FA] uppercase tracking-wider block">
                        {day}
                      </span>
                      {hasDayConflict && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="Day has conflict" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#667085] dark:text-[#9DA7BB] mt-0.5 block">
                      {daySessions.length === 0 ? "Free Day" : `${daySessions.length} Classes`}
                    </span>
                  </div>

                  {/* Day Content Area */}
                  <div className="flex-1 p-2.5 space-y-2 bg-[#F7F4EF]/20 dark:bg-white/[0.01]">
                    {daySessions.map((session) => (
                      <CalendarCourseBlock
                        key={session.id}
                        session={session}
                        conflicts={conflicts}
                        isLocked={
                          lockedSections[session.courseCode]?.batch === session.batch &&
                          lockedSections[session.courseCode]?.section === session.section
                        }
                        onClick={handleBlockClick}
                      />
                    ))}

                    {daySessions.length === 0 && (
                      <div className="h-44 flex items-center justify-center text-xs text-[#667085] dark:text-[#9DA7BB] italic">
                        No classes scheduled
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Single Day Active View */}
        <div className="lg:hidden p-4 space-y-2.5 min-h-[350px]">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6E0D8]/80 dark:border-white/10">
            <span className="font-semibold text-sm text-[#20232E] dark:text-[#F4F5FA]">
              {selectedMobileDay} Schedule
            </span>
            <span className="text-xs text-[#667085] dark:text-[#9DA7BB] font-mono">
              {dayClassCounts[selectedMobileDay] || 0} classes
            </span>
          </div>

          {sessions
            .filter((s) => s.day === selectedMobileDay)
            .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
            .map((session) => (
              <CalendarCourseBlock
                key={session.id}
                session={session}
                conflicts={conflicts}
                isLocked={
                  lockedSections[session.courseCode]?.batch === session.batch &&
                  lockedSections[session.courseCode]?.section === session.section
                }
                onClick={handleBlockClick}
              />
            ))}

          {dayClassCounts[selectedMobileDay] === 0 && (
            <div className="p-8 text-center text-sm text-[#667085] dark:text-[#9DA7BB]">
              No classes scheduled for {selectedMobileDay}. Enjoy your day off!
            </div>
          )}
        </div>
      </>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="divide-y divide-[#E6E0D8]/80 dark:divide-white/10">
          {WEEKDAYS.map((day) => {
            const daySessions = sessions
              .filter((s) => s.day === day)
              .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

            if (daySessions.length === 0) return null;

            return (
              <div key={day} className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#6554D9] dark:text-[#8B8CFF] bg-[#EEF2FF] dark:bg-white/5 border border-[#6554D9]/20 dark:border-white/10 px-2.5 py-0.5 rounded-lg">
                    {day}
                  </span>
                  <span className="text-xs text-[#667085] dark:text-[#9DA7BB]">
                    {daySessions.length} session{daySessions.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {daySessions.map((session) => (
                    <CalendarCourseBlock
                      key={session.id}
                      session={session}
                      conflicts={conflicts}
                      isLocked={
                        lockedSections[session.courseCode]?.batch === session.batch &&
                        lockedSections[session.courseCode]?.section === session.section
                      }
                      onClick={handleBlockClick}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Course Detail Drawer */}
      <CourseDetailDrawer
        session={activeSession}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        conflicts={conflicts}
      />
    </div>
  );
};
