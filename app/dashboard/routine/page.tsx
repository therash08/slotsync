"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { WeeklyCalendar } from "@/components/schedule/WeeklyCalendar";
import { Button } from "@/ui/Button";
import { detectAllConflicts } from "@/lib/schedule/conflict";
import { hasDepartmentRoutineData } from "@/lib/constants/departments";
import { getProvenanceNotice } from "@/lib/mock-data/academic-catalog";
import {
  Calendar,
  BookPlus,
  Bookmark,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function MyRoutinePage() {
  const { user, updateUserProfile } = useUserStore();
  const {
    currentRoutine,
    selectedCourses,
    restoreDefaultCurrentRoutine,
    syncCohortRoutine,
    saveSchedule,
  } = useScheduleStore();
  const { showToast } = useToast();

  const [showCombined, setShowCombined] = useState(true);

  // Synchronize routine if current routine does not match active student cohort
  useEffect(() => {
    const firstSession = currentRoutine[0];
    if (
      !firstSession ||
      firstSession.batch !== user.batch ||
      firstSession.section !== user.section
    ) {
      syncCohortRoutine(user.department, user.batch, user.section);
    }
  }, [user.department, user.batch, user.section, currentRoutine, syncCohortRoutine]);

  const provenance = useMemo(
    () => getProvenanceNotice(user.department, user.batch, user.section),
    [user.department, user.batch, user.section]
  );

  // Determine which sessions to show
  const displayedSessions = useMemo(() => {
    if (!showCombined) {
      return currentRoutine;
    }
    const list = [...currentRoutine];
    for (const sc of selectedCourses) {
      if (sc.selectedSection) {
        list.push(...sc.selectedSection.sessions);
      }
    }
    return list;
  }, [currentRoutine, selectedCourses, showCombined]);

  const conflicts = useMemo(() => {
    return detectAllConflicts(displayedSessions);
  }, [displayedSessions]);

  // Routine metrics
  const theoryCount = displayedSessions.filter((s) => s.type === "Theory").length;
  const labCount = displayedSessions.filter((s) => s.type === "Lab").length;
  const activeDays = new Set(displayedSessions.map((s) => s.day)).size;

  const handleSaveRoutine = () => {
    const title = `Routine (${user.department} B${user.batch}-${user.section}${
      selectedCourses.length > 0 ? ` + ${selectedCourses.length} Retakes` : ""
    })`;
    const genSched = {
      id: `sched-routine-${Date.now()}`,
      title,
      score: conflicts.length === 0 ? 98 : 65,
      metrics: {
        score: conflicts.length === 0 ? 98 : 65,
        conflictCount: conflicts.length,
        campusDays: activeDays,
        weeklyGapMinutes: 120,
        earlyMorningCount: 0,
        eveningClassCount: 0,
        totalCourses: displayedSessions.length,
        totalCredits: displayedSessions.length * 3,
        offDays: [],
        conflictScore: conflicts.length === 0 ? 100 : 30,
        gapEfficiencyScore: 90,
        campusDayEfficiency: 95,
        preferenceMatchScore: 95,
      },
      sessions: displayedSessions,
      conflicts,
      selectedSections: {},
      reasons: ["Saved from My Routine"],
    };
    saveSchedule(genSched, title);
    showToast(`Saved schedule: "${title}"`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Provenance Notice Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
          provenance.isVerified
            ? "bg-purple-50/70 dark:bg-purple-950/30 border-purple-200/60 dark:border-purple-900/60 text-stone-700 dark:text-purple-300"
            : "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/60 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {provenance.isVerified ? (
            <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          )}
          <span>
            <strong>Leading University Academic Notice:</strong> {provenance.message}
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold shrink-0">
          {user.department} B{user.batch}-{user.section} Timetable
        </span>
      </div>
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
            <span>Leading University Routine</span>
            <span>•</span>
            <span>Batch {user.batch}-{user.section}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Weekly Class Timetable
          </h1>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
            {showCombined && selectedCourses.length > 0
              ? `Showing regular classes plus ${selectedCourses.length} retake/improvement course sections`
              : "Showing regular cohort timetable (Sunday through Thursday)"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {selectedCourses.length > 0 && (
            <button
              onClick={() => setShowCombined(!showCombined)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showCombined
                  ? "bg-purple-100 dark:bg-purple-900/60 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200"
                  : "bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-600 dark:text-purple-300"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1.5" />
              {showCombined ? "Combined View" : "Regular Only"}
            </button>
          )}

          <Link href="/dashboard/courses">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs"
            >
              <BookPlus className="w-3.5 h-3.5 mr-1.5" />
              Add Courses
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveRoutine}
            className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs"
          >
            <Bookmark className="w-3.5 h-3.5 mr-1.5" />
            Save Schedule
          </Button>
        </div>
      </div>

      {/* Routine Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1033] border border-purple-100 dark:border-purple-950/60">
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Total Sessions
          </span>
          <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">
            {displayedSessions.length}
          </p>
          <span className="text-[10px] text-stone-500 dark:text-purple-300/60">per week</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1033] border border-purple-100 dark:border-purple-950/60">
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Theory & Lab
          </span>
          <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">
            {theoryCount}T / {labCount}L
          </p>
          <span className="text-[10px] text-stone-500 dark:text-purple-300/60">sessions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1033] border border-purple-100 dark:border-purple-950/60">
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Campus Days
          </span>
          <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">
            {activeDays} Days
          </p>
          <span className="text-[10px] text-stone-500 dark:text-purple-300/60">Sun – Thu active</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1033] border border-purple-100 dark:border-purple-950/60">
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Clashes
          </span>
          <p
            className={`text-2xl font-black mt-1 ${
              conflicts.length > 0
                ? "text-amber-600 dark:text-amber-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {conflicts.length === 0 ? "0 Clashes" : `${conflicts.length} Overlaps`}
          </p>
          <span className="text-[10px] text-stone-500 dark:text-purple-300/60">
            {conflicts.length === 0 ? "Flawless timetable" : "Action needed"}
          </span>
        </div>
      </div>

      {/* Main Weekly Timetable */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-4 sm:p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs">
        <WeeklyCalendar
          sessions={displayedSessions}
          conflicts={conflicts}
          title={`Timetable — ${user.department} Batch ${user.batch}-${user.section}`}
          defaultView="week"
          showViewToggle={true}
        />
      </div>

      {/* Routine Notice Footer */}
      <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/60 flex items-center justify-between text-xs text-stone-600 dark:text-purple-300">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-500 shrink-0" />
          <span>
            <strong>Leading University Academic Notice:</strong> Sample routine data — verify before registration.
          </span>
        </div>
        <span className="text-[11px] font-mono text-purple-700 dark:text-purple-300 font-semibold shrink-0">
          Fall 2026
        </span>
      </div>
    </div>
  );
}
