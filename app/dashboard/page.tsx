"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { formatTimeString } from "@/lib/utils";
import { hasDepartmentRoutineData, DEPARTMENTS } from "@/lib/constants/departments";
import { getProvenanceNotice } from "@/lib/mock-data/academic-catalog";
import { detectAllConflicts } from "@/lib/schedule/conflict";
import { ClassSession } from "@/types";
import {
  CheckCircle2,
  AlertTriangle,
  Calendar,
  BookPlus,
  ArrowRight,
  Sparkles,
  BookOpen,
  RotateCcw,
  Plus,
  Trash2,
  GitCompare,
  Layers,
  GraduationCap,
  Clock,
  ExternalLink,
  HelpCircle,
  Info,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

interface GroupedCourse {
  courseCode: string;
  courseName: string;
  section: string;
  type: "Theory" | "Lab";
  sessionCount: number;
  summary: string;
}

export default function OverviewPage() {
  const { user, updateUserProfile } = useUserStore();
  const {
    currentRoutine,
    selectedCourses,
    removeSelectedCourse,
    removeCurrentCourse,
    restoreDefaultCurrentRoutine,
    syncCohortRoutine,
    availableOfferings,
  } = useScheduleStore();
  const { showToast } = useToast();

  const [confirmedCourses, setConfirmedCourses] = useState<Record<string, boolean>>({});

  const hasData = hasDepartmentRoutineData(user.department);
  const provenance = getProvenanceNotice(user.department, user.batch, user.section);

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

  // Group current regular routine courses
  const currentCoursesGrouped = useMemo(() => {
    const map = new Map<string, GroupedCourse>();
    for (const s of currentRoutine) {
      const code = s.courseCode.toUpperCase();
      if (!map.has(code)) {
        map.set(code, {
          courseCode: s.courseCode,
          courseName: s.courseName,
          section: s.section,
          type: s.type,
          sessionCount: 0,
          summary: "",
        });
      }
      const item = map.get(code)!;
      item.sessionCount++;
    }

    for (const item of map.values()) {
      const sessions = currentRoutine.filter(
        (s) => s.courseCode.toUpperCase() === item.courseCode.toUpperCase()
      );
      item.summary = sessions
        .map((s) => `${s.day.slice(0, 3)} ${formatTimeString(s.startTime)}`)
        .join(", ");
    }

    return Array.from(map.values());
  }, [currentRoutine]);

  // Check clashes across current routine + selected retake/improvement courses
  const allCurrentSessions = useMemo(() => {
    const list = [...currentRoutine];
    for (const sc of selectedCourses) {
      if (sc.selectedSection) {
        list.push(...sc.selectedSection.sessions);
      }
    }
    return list;
  }, [currentRoutine, selectedCourses]);

  const conflicts = useMemo(() => {
    return detectAllConflicts(allCurrentSessions);
  }, [allCurrentSessions]);

  const hasClashes = conflicts.length > 0;

  // Toggle routine course confirmation
  const handleToggleConfirm = (courseCode: string) => {
    setConfirmedCourses((prev) => ({
      ...prev,
      [courseCode]: !prev[courseCode],
    }));
  };

  const handleSetDepartmentCSE = () => {
    updateUserProfile({ department: "CSE", batch: "62", section: "A" });
    restoreDefaultCurrentRoutine();
    showToast("Switched department to Computer Science & Engineering (CSE).", "success");
  };

  // If the user's department has no seeded routine data, show empty state notice
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-8 border border-purple-100 dark:border-purple-950/60 shadow-xs">
          <div className="max-w-xl mx-auto text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-4 border border-purple-200 dark:border-purple-800">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Routine Data Pending for {user.department}
            </h2>
            <p className="text-sm text-stone-600 dark:text-purple-200/80 mt-2 leading-relaxed">
              Routine data has not been added for this department yet. Currently,
              class timetable and cross-section routine data are actively seeded for
              the <strong>Computer Science & Engineering (CSE)</strong> department.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                onClick={handleSetDepartmentCSE}
                className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white"
              >
                Switch to CSE Routine Demo
              </Button>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="border-purple-200 dark:border-purple-800">
                  Manage Profile in Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 sm:p-8 border border-purple-100/80 dark:border-purple-950/60 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200/60 dark:border-purple-800/60">
              <span>Leading University</span>
              <span>•</span>
              <span>Semester Planner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
              Welcome back, {user.name || "Student"}! 👋
            </h1>
            <p className="text-sm text-stone-600 dark:text-purple-200/80 max-w-2xl">
              Build your semester schedule without timetable clashes. Compare cross-batch
              sections for your retake and improvement courses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/courses">
              <Button
                variant="primary"
                size="lg"
                className="bg-[#FF7A00] hover:bg-[#E66E00] text-white shadow-md shadow-[#FF7A00]/25 font-semibold"
              >
                <BookPlus className="w-4 h-4 mr-2" />
                Add Retake / Improvement
              </Button>
            </Link>
            <Link href="/dashboard/routine">
              <Button
                variant="outline"
                size="lg"
                className="bg-purple-50/60 dark:bg-white/5 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-white/10"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View My Routine
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Regular Routine */}
        <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Current Cohort
              </span>
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300">
                <Calendar className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-stone-900 dark:text-white">
                {currentCoursesGrouped.length} Courses
              </div>
              <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-1">
                Batch {user.batch}, Section {user.section} ({currentRoutine.length} weekly sessions)
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-50 dark:border-purple-950/40">
            <Link
              href="/dashboard/routine"
              className="text-xs font-semibold text-[#6B46C1] dark:text-purple-300 hover:text-[#5B36B1] inline-flex items-center gap-1 group"
            >
              Open routine calendar
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card 2: Retake & Improvement Courses */}
        <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Added Courses
              </span>
              <span className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-[#FF7A00]">
                <BookPlus className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-stone-900 dark:text-white">
                {selectedCourses.length} Added
              </div>
              <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-1">
                {selectedCourses.length === 0
                  ? "No extra retake or improvement courses added yet"
                  : `${selectedCourses.filter((c) => c.enrollmentType === "Retake").length} Retake, ${
                      selectedCourses.filter((c) => c.enrollmentType === "Improvement").length
                    } Improvement`}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-50 dark:border-purple-950/40">
            <Link
              href="/dashboard/courses"
              className="text-xs font-semibold text-[#FF7A00] hover:text-[#E66E00] inline-flex items-center gap-1 group"
            >
              Browse course offerings
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card 3: Clash Status */}
        <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Clash Status
              </span>
              <span
                className={`p-2 rounded-xl ${
                  hasClashes
                    ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600"
                    : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600"
                }`}
              >
                {hasClashes ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </span>
            </div>
            <div className="mt-3">
              <div
                className={`text-2xl font-extrabold ${
                  hasClashes
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {hasClashes
                  ? `${conflicts.length} Clash${conflicts.length > 1 ? "es" : ""} Detected`
                  : "All Clear"}
              </div>
              <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-1">
                {hasClashes
                  ? "Section timing overlaps with your current classes"
                  : "Zero timetable overlaps in your current plan"}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-50 dark:border-purple-950/40">
            {hasClashes ? (
              <Link
                href="/dashboard/courses"
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                Resolve section conflicts &rarr;
              </Link>
            ) : (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                No time overlaps found in the selected routine data.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Routine Confirmation Checklist Section */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-purple-50 dark:border-purple-950/60">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <span>Your Current Semester Routine</span>
              <span className="text-xs font-normal text-stone-500 dark:text-purple-300/70">
                (Batch {user.batch}-{user.section})
              </span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
              Review and confirm the courses you are registered for this semester. Uncheck any course you are dropping.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              restoreDefaultCurrentRoutine(user.department, user.batch, user.section);
              showToast(`Restored default routine for ${user.department} B${user.batch}-${user.section}.`, "info");
            }}
            className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Restore Defaults
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentCoursesGrouped.map((course) => {
            const isConfirmed = confirmedCourses[course.courseCode] ?? true;

            return (
              <div
                key={course.courseCode}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isConfirmed
                    ? "bg-purple-50/50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/60"
                    : "bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 opacity-60"
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-purple-950 dark:text-purple-200">
                      {course.courseCode}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        course.type === "Lab"
                          ? "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300"
                          : "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      {course.type}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-purple-300/60">
                      Sec {course.section}
                    </span>
                  </div>
                  <p className="text-xs text-stone-800 dark:text-purple-100 font-medium truncate">
                    {course.courseName}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-purple-300/70 truncate flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400 shrink-0" />
                    {course.summary}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleToggleConfirm(course.courseCode)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      isConfirmed
                        ? "bg-purple-600 text-white"
                        : "border border-stone-300 dark:border-purple-800 text-transparent hover:border-purple-500"
                    }`}
                    title={isConfirmed ? "Confirmed taking" : "Click to confirm"}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      removeCurrentCourse(course.courseCode);
                      showToast(`Removed ${course.courseCode} from current routine.`, "info");
                    }}
                    className="p-1 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Remove from routine"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Added Retake/Improvement Plan Section */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-purple-50 dark:border-purple-950/60">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <span>Retake & Improvement Course Plan</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF7A00]">
                {selectedCourses.length} planned
              </span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
              These are the courses from other batches/sections you want to take this semester.
            </p>
          </div>
          <Link href="/dashboard/courses">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Find More Sections
            </Button>
          </Link>
        </div>

        {selectedCourses.length === 0 ? (
          <div className="text-center py-8 px-4 border-2 border-dashed border-purple-100 dark:border-purple-950 rounded-2xl">
            <BookOpen className="w-8 h-8 text-purple-300 dark:text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800 dark:text-purple-200">
              No retake or improvement courses added yet
            </p>
            <p className="text-xs text-stone-500 dark:text-purple-300/60 mt-1 max-w-sm mx-auto">
              Use the Course Explorer to find sections from other batches that fit around your regular routine.
            </p>
            <div className="mt-4">
              <Link href="/dashboard/courses">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs"
                >
                  Browse Course Directory &rarr;
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedCourses.map((sc) => {
              const sec = sc.selectedSection;
              return (
                <div
                  key={sc.courseCode}
                  className="p-4 rounded-2xl bg-purple-50/40 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 dark:text-white">
                        {sc.courseCode}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          sc.enrollmentType === "Retake"
                            ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                            : "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {sc.enrollmentType}
                      </span>
                      <span className="text-xs font-mono text-purple-600 dark:text-purple-300 font-semibold">
                        Selected: Batch {sec?.batch || sc.targetBatch || "61"} Sec {sec?.section || sc.targetSection || "A"}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-purple-200 font-medium">
                      {sc.courseName} ({sc.credits} Credits • {sc.type})
                    </p>
                    {sec && (
                      <p className="text-[11px] text-stone-500 dark:text-purple-300/70">
                        Sessions:{" "}
                        {sec.sessions
                          .map((s: ClassSession) => `${s.day} ${formatTimeString(s.startTime)}–${formatTimeString(s.endTime)} (${s.room})`)
                          .join(" | ")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/dashboard/courses?q=${encodeURIComponent(sc.courseCode)}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-purple-200 dark:border-purple-800"
                      >
                        Change Section
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeSelectedCourse(sc.courseCode);
                        showToast(`Removed ${sc.courseCode} from plan.`, "info");
                      }}
                      className="text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Routine Notice Footer */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
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
        <span className="text-[11px] font-mono font-semibold shrink-0">
          Fall 2026 • {user.department} B{user.batch}-{user.section}
        </span>
      </div>
    </div>
  );
}
