"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { SavedSchedule, GeneratedSchedule, ClassSession } from "@/types";
import { Button } from "@/ui/Button";
import { formatTimeString, formatDuration } from "@/lib/utils";
import {
  GitCompare,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Plus,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

interface NormalizedSchedule {
  id: string;
  title: string;
  sessions: ClassSession[];
  daysWithClasses: number;
  weeklyIdleMinutes: number;
  conflictCount: number;
  score: number;
  raw: SavedSchedule | GeneratedSchedule;
}

function normalize(item: SavedSchedule | GeneratedSchedule): NormalizedSchedule {
  const isSaved = "schedule" in item;
  const sched: GeneratedSchedule = isSaved ? (item as SavedSchedule).schedule : (item as GeneratedSchedule);
  const title = item.title || sched.title || "Schedule Option";
  const sessions: ClassSession[] = sched.sessions || [];
  const daysWithClasses = sched.metrics?.campusDays ?? sched.daysWithClasses ?? 4;
  const weeklyIdleMinutes = sched.metrics?.weeklyGapMinutes ?? sched.weeklyIdleMinutes ?? 0;
  const conflictCount = sched.metrics?.conflictCount ?? sched.conflicts?.length ?? 0;
  const score = sched.score ?? 90;

  return {
    id: item.id,
    title,
    sessions,
    daysWithClasses,
    weeklyIdleMinutes,
    conflictCount,
    score,
    raw: item,
  };
}

export default function CompareSchedulesPage() {
  const {
    savedSchedules,
    generatedSchedules,
    comparisonScheduleIds,
    toggleComparisonSchedule,
    clearComparisonSchedules,
    applySavedScheduleAsActive,
  } = useScheduleStore();
  const { showToast } = useToast();

  // Combine all available schedules to compare
  const allAvailable = useMemo(() => {
    const list: (SavedSchedule | GeneratedSchedule)[] = [...savedSchedules];
    for (const gs of generatedSchedules) {
      if (!list.some((s) => s.id === gs.id)) {
        list.push(gs);
      }
    }
    return list;
  }, [savedSchedules, generatedSchedules]);

  // Selected schedules to compare (limit to 2 or 3)
  const comparedSchedules = useMemo(() => {
    if (comparisonScheduleIds.length >= 2) {
      return allAvailable
        .filter((s) => comparisonScheduleIds.includes(s.id))
        .slice(0, 3)
        .map(normalize);
    }
    // Default to first two available if none explicitly selected
    return allAvailable.slice(0, 2).map(normalize);
  }, [allAvailable, comparisonScheduleIds]);

  const handleApplySchedule = (schedule: NormalizedSchedule) => {
    if ("schedule" in schedule.raw) {
      applySavedScheduleAsActive(schedule.raw.id);
    }
    showToast(`Applied "${schedule.title}" to your active planner.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
            <span>Leading University</span>
            <span>•</span>
            <span>Schedule Comparison</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Compare Schedule Alternatives
          </h1>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
            Evaluate timetables side by side based on campus days, gap hours, and course section timings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/saved">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs"
            >
              <Bookmark className="w-3.5 h-3.5 mr-1.5" />
              Saved Schedules ({savedSchedules.length})
            </Button>
          </Link>
          <Link href="/dashboard/courses">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Explore More Sections
            </Button>
          </Link>
        </div>
      </div>

      {/* Schedule Picker Strip */}
      <div className="bg-white dark:bg-[#1A1033] p-5 rounded-3xl border border-purple-100 dark:border-purple-950/60 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Select Schedules to Compare (up to 3):
          </span>
          {comparisonScheduleIds.length > 0 && (
            <button
              onClick={clearComparisonSchedules}
              className="text-xs text-purple-600 dark:text-purple-300 hover:underline cursor-pointer"
            >
              Clear Selection
            </button>
          )}
        </div>

        {allAvailable.length === 0 ? (
          <div className="text-center py-6 text-xs text-stone-500 dark:text-purple-300/60">
            No saved or generated schedules available to compare yet.
            <div className="mt-2">
              <Link href="/dashboard/courses" className="text-purple-600 dark:text-purple-300 font-semibold hover:underline">
                Add courses in the Course Explorer &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allAvailable.map((item) => {
              const s = normalize(item);
              const isSelected = comparisonScheduleIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleComparisonSchedule(s.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#6B46C1] text-white border-transparent shadow-xs"
                      : "bg-purple-50/50 dark:bg-white/5 border-purple-200/60 dark:border-white/10 text-stone-700 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-white/10"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{s.title}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                    {s.daysWithClasses}d
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Side-by-Side Comparison Columns */}
      {comparedSchedules.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {comparedSchedules.map((schedule, idx) => {
            const hasClashes = schedule.conflictCount > 0;

            return (
              <div
                key={schedule.id}
                className="bg-white dark:bg-[#1A1033] rounded-3xl border border-purple-100 dark:border-purple-950/60 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Option Title Bar */}
                  <div className="p-5 border-b border-purple-50 dark:border-purple-950/60 bg-purple-50/40 dark:bg-white/[0.02] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        Option {idx + 1}
                      </span>
                      <h2 className="text-base font-bold text-stone-900 dark:text-white line-clamp-1">
                        {schedule.title}
                      </h2>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        hasClashes
                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                          : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      {hasClashes ? `${schedule.conflictCount} Clash` : "0 Clashes"}
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="p-5 grid grid-cols-2 gap-3 border-b border-purple-50 dark:border-purple-950/60">
                    <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-white/5">
                      <span className="text-[10px] text-stone-500 dark:text-purple-300/60 font-semibold block">
                        Campus Days
                      </span>
                      <span className="text-lg font-black text-stone-900 dark:text-white">
                        {schedule.daysWithClasses} Days
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-white/5">
                      <span className="text-[10px] text-stone-500 dark:text-purple-300/60 font-semibold block">
                        Weekly Gap Time
                      </span>
                      <span className="text-lg font-black text-stone-900 dark:text-white">
                        {formatDuration(schedule.weeklyIdleMinutes)}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-white/5">
                      <span className="text-[10px] text-stone-500 dark:text-purple-300/60 font-semibold block">
                        Total Sessions
                      </span>
                      <span className="text-lg font-black text-stone-900 dark:text-white">
                        {schedule.sessions.length}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-white/5">
                      <span className="text-[10px] text-stone-500 dark:text-purple-300/60 font-semibold block">
                        Score
                      </span>
                      <span className="text-lg font-black text-[#FF7A00]">
                        {schedule.score}%
                      </span>
                    </div>
                  </div>

                  {/* Sessions Breakdown */}
                  <div className="p-5 space-y-2 max-h-80 overflow-y-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">
                      Course Sessions:
                    </span>
                    {schedule.sessions.map((s: ClassSession, sIdx: number) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-xl bg-purple-50/30 dark:bg-white/[0.02] border border-purple-100/60 dark:border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-stone-900 dark:text-purple-200">
                            {s.courseCode}
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-purple-300/60 ml-1.5">
                            B{s.batch}-{s.section}
                          </span>
                        </div>
                        <span className="text-stone-600 dark:text-purple-300/80 font-mono text-[11px]">
                          {s.day.slice(0, 3)} {formatTimeString(s.startTime)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="p-5 border-t border-purple-50 dark:border-purple-950/60 bg-purple-50/20 dark:bg-white/[0.01]">
                  <Button
                    variant="primary"
                    onClick={() => handleApplySchedule(schedule)}
                    className="w-full bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs font-semibold py-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Use This Schedule
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
