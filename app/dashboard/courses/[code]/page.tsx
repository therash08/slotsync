"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ACADEMIC_CATALOG, getDepartmentCatalog } from "@/lib/mock-data/academic-catalog";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useUserStore } from "@/stores/useUserStore";
import { checkCandidateClashes } from "@/lib/schedule/conflict";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { formatTimeString } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Plus,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUserStore();
  const { currentRoutine, selectedCourses, addSelectedCourse, lockSection, lockedSections } =
    useScheduleStore();
  const { showToast } = useToast();

  const codeSlug = Array.isArray(params.code) ? params.code[0] : params.code || "";
  const normalizedCode = decodeURIComponent(codeSlug).replace(/-/g, " ").toUpperCase();

  const catalog = useMemo(() => getDepartmentCatalog(user.department), [user.department]);

  const course = useMemo(() => {
    // Check active department catalog first
    let found = catalog.courses.find(
      (c) =>
        c.code.toUpperCase() === normalizedCode ||
        c.id.toLowerCase() === codeSlug.toLowerCase()
    );
    // If not found in current department, check all departments in ACADEMIC_CATALOG
    if (!found) {
      for (const deptCat of Object.values(ACADEMIC_CATALOG)) {
        found = deptCat.courses.find(
          (c) =>
            c.code.toUpperCase() === normalizedCode ||
            c.id.toLowerCase() === codeSlug.toLowerCase()
        );
        if (found) break;
      }
    }
    return found || catalog.courses[0];
  }, [catalog, codeSlug, normalizedCode]);

  // All offerings for this course
  const courseSessions = useMemo(() => {
    const routineSessions = Object.values(catalog.routines).flat();
    const all = [...routineSessions, ...catalog.offerings];
    return all.filter((s) => s.courseCode.toUpperCase() === course.code.toUpperCase());
  }, [catalog, course.code]);

  // Group by batch + section
  const sectionGroups = useMemo(() => {
    const map: Record<string, { batch: string; section: string; sessions: typeof courseSessions }> = {};
    for (const s of courseSessions) {
      const key = `${s.batch}-${s.section}`;
      if (!map[key]) {
        map[key] = { batch: s.batch, section: s.section, sessions: [] };
      }
      map[key].sessions.push(s);
    }

    return Object.values(map).map((group) => {
      const clashes = checkCandidateClashes(group.sessions, currentRoutine);
      return {
        ...group,
        clashes,
        isCompatible: clashes.length === 0,
      };
    });
  }, [courseSessions, currentRoutine]);

  const isAlreadyAdded = selectedCourses.some(
    (c) => c.courseCode.toUpperCase() === course.code.toUpperCase()
  );

  const handleAddCourse = (type: "Retake" | "Improvement") => {
    addSelectedCourse(course, type);
    showToast(`Added ${course.code} as ${type} to course planner.`, "success");
  };

  const handleLockSection = (batch: string, section: string) => {
    lockSection(course.code, batch, section);
    if (!isAlreadyAdded) {
      addSelectedCourse(course, "Improvement");
    }
    showToast(`Locked ${course.code} to Batch ${batch} Section ${section}.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Course Directory</span>
        </Link>
      </div>

      {/* Course Overview Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">
                {course.code}
              </span>
              <Badge variant="regular">{course.type}</Badge>
              <Badge variant="neutral">Semester {course.semester}</Badge>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {course.name}
            </h2>
            <p className="text-xs text-slate-500">
              Department of {course.department} • {course.credits} Credits
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isAlreadyAdded ? (
              <>
                <Button size="sm" variant="outline" onClick={() => handleAddCourse("Retake")}>
                  + Add as Retake
                </Button>
                <Button size="sm" onClick={() => handleAddCourse("Improvement")} className="shadow-xs">
                  + Add as Improvement
                </Button>
              </>
            ) : (
              <Badge variant="improvement" size="md" className="py-1 px-3">
                <CheckCircle2 className="w-4 h-4 mr-1 text-indigo-500" />
                Active in Course Planner
              </Badge>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl pt-2 border-t border-slate-100 dark:border-slate-800">
          {course.description ||
            "Comprehensive university curriculum module covering theoretical frameworks, algorithmic structures, laboratory exercises, and exam evaluations."}
        </p>
      </div>

      {/* Available Sections Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Available Scheduled Sections ({sectionGroups.length})
        </h3>
        <p className="text-xs text-slate-500">
          Cross-matched in real-time against your Fall 2026 Batch 61 Section A routine.
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sectionGroups.map((group) => {
          const isLocked =
            lockedSections[course.code]?.batch === group.batch &&
            lockedSections[course.code]?.section === group.section;

          return (
            <div
              key={`${group.batch}-${group.section}`}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                group.isCompatible
                  ? "border-emerald-200 dark:border-emerald-800/60 bg-white dark:bg-slate-900"
                  : "border-red-200 dark:border-red-900/40 bg-red-50/20 dark:bg-red-950/10"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      Batch {group.batch} — Section {group.section}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {group.sessions.length} class session(s) / week
                    </span>
                  </div>

                  {group.isCompatible ? (
                    <Badge variant="success" size="sm" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Compatible</span>
                    </Badge>
                  ) : (
                    <Badge variant="conflict" size="sm" className="gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <span>{group.clashes.length} Clash</span>
                    </Badge>
                  )}
                </div>

                {/* Clash details notice */}
                {!group.isCompatible && (
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-[11px] text-red-700 dark:text-red-300">
                    <span>
                      Collides with {group.clashes[0]?.sessionB.courseCode} on {group.clashes[0]?.day} ({group.clashes[0]?.overlapStart}–{group.clashes[0]?.overlapEnd}).
                    </span>
                  </div>
                )}

                {/* Session times */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {group.sessions.map((s) => (
                    <div
                      key={s.id}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1"
                    >
                      <div className="flex justify-between font-medium">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {s.day}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px]">
                          {formatTimeString(s.startTime)} – {formatTimeString(s.endTime)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {s.room}
                        </span>
                        <span>{s.faculty || "TBA"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant={isLocked ? "secondary" : "outline"}
                  onClick={() => handleLockSection(group.batch, group.section)}
                  className="w-full text-xs gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isLocked ? "Section Pinned" : "Pin Section"}</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
