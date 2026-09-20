"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  getDepartmentCatalog,
  getBatchesForDepartment,
  getSectionsForBatch,
  getProvenanceNotice,
} from "@/lib/mock-data/academic-catalog";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useUserStore } from "@/stores/useUserStore";
import { checkCandidateClashes } from "@/lib/schedule/conflict";
import { hasDepartmentRoutineData } from "@/lib/constants/departments";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { formatTimeString } from "@/lib/utils";
import { Course, CourseSection, ClassSession } from "@/types";
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Layers,
  GraduationCap,
  Clock,
  MapPin,
  User,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowRight,
  Info,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function CoursesDirectoryPage() {
  const { user } = useUserStore();
  const { currentRoutine, selectedCourses, addSelectedCourse, removeSelectedCourse } = useScheduleStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"course" | "batch">("course");
  const [query, setQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [expandedCourseCode, setExpandedCourseCode] = useState<string | null>(null);

  const catalog = useMemo(() => getDepartmentCatalog(user.department), [user.department]);
  const availableBatches = useMemo(() => getBatchesForDepartment(user.department), [user.department]);
  
  // Batch browser state
  const [selectedBatch, setSelectedBatch] = useState<string>(availableBatches[0] || "61");
  const availableSections = useMemo(
    () => getSectionsForBatch(user.department, selectedBatch),
    [user.department, selectedBatch]
  );
  const [selectedSection, setSelectedSection] = useState<string>(availableSections[0] || "A");

  useEffect(() => {
    if (!availableBatches.includes(selectedBatch)) {
      setSelectedBatch(availableBatches[0] || "61");
    }
  }, [availableBatches, selectedBatch]);

  useEffect(() => {
    if (!availableSections.includes(selectedSection)) {
      setSelectedSection(availableSections[0] || "A");
    }
  }, [availableSections, selectedSection]);

  const provenance = useMemo(
    () => getProvenanceNotice(user.department, user.batch, user.section),
    [user.department, user.batch, user.section]
  );

  const allOfferings = useMemo(() => {
    const routineSessions = Object.values(catalog.routines).flat();
    return [...routineSessions, ...catalog.offerings];
  }, [catalog]);

  // Filtered courses for Tab A
  const filteredCourses = useMemo(() => {
    let list = [...catalog.courses];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      );
    }

    if (selectedSemester > 0) {
      list = list.filter((c) => c.semester === selectedSemester);
    }

    if (selectedType !== "All") {
      list = list.filter((c) => c.type === selectedType);
    }

    return list;
  }, [catalog.courses, query, selectedSemester, selectedType]);

  // Extract sections available for a given course code
  const getSectionsForCourse = (courseCode: string): CourseSection[] => {
    const sessions = allOfferings.filter(
      (s) => s.courseCode.toUpperCase() === courseCode.toUpperCase()
    );

    const sectionMap = new Map<string, CourseSection>();
    for (const s of sessions) {
      const key = `${s.batch}-${s.section}`;
      if (!sectionMap.has(key)) {
        sectionMap.set(key, {
          sectionId: `${courseCode}-${key}`,
          courseCode: s.courseCode,
          batch: s.batch,
          section: s.section,
          faculty: s.faculty,
          sessions: [],
        });
      }
      sectionMap.get(key)!.sessions.push(s);
    }

    return Array.from(sectionMap.values());
  };

  const batchTimetableSessions = useMemo(() => {
    return allOfferings.filter(
      (s) => s.batch === selectedBatch && s.section === selectedSection
    );
  }, [allOfferings, selectedBatch, selectedSection]);

  const handleAddCourseSection = (
    course: Course,
    section: CourseSection,
    type: "Retake" | "Improvement"
  ) => {
    addSelectedCourse(course, type);
    // Also select the specific section in store
    const { setSelectedCourseSection } = useScheduleStore.getState();
    setSelectedCourseSection(course.code, section);
    showToast(`Added ${course.code} (B${section.batch}-${section.section}) as ${type}.`, "success");
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
          {user.department} Department Catalog
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
            <span>Leading University</span>
            <span>•</span>
            <span>Course & Section Explorer</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Explore Course Offerings ({user.department})
          </h1>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
            Search cross-batch sections, check real-time routine compatibility, and add retake or improvement courses.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-2xl bg-purple-50 dark:bg-white/5 p-1 border border-purple-200/60 dark:border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab("course")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "course"
                ? "bg-[#6B46C1] text-white shadow-xs"
                : "text-stone-600 dark:text-purple-200 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Browse by Course
          </button>
          <button
            onClick={() => setActiveTab("batch")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "batch"
                ? "bg-[#6B46C1] text-white shadow-xs"
                : "text-stone-600 dark:text-purple-200 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Browse by Batch & Section
          </button>
        </div>
      </div>

      {/* Tab A: Browse by Course */}
      {activeTab === "course" && (
        <div className="space-y-4">
          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-[#1A1033] p-4 sm:p-5 rounded-3xl border border-purple-100 dark:border-purple-950/60 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search course by code or name (e.g., CSE 2203, Algorithms, Database)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-purple-50/50 dark:bg-white/5 border border-purple-200/80 dark:border-purple-900/60 rounded-2xl text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              {/* Semester buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-stone-500 dark:text-purple-300/70 font-semibold mr-1">
                  Semester:
                </span>
                {[0, 1, 2, 3, 4, 5, 6].map((sem) => (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemester(sem)}
                    className={`px-3 py-1 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                      selectedSemester === sem
                        ? "bg-[#FF7A00] text-white shadow-2xs"
                        : "bg-purple-50 dark:bg-white/5 text-stone-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {sem === 0 ? "All Semesters" : `Sem ${sem}`}
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-stone-500 dark:text-purple-300/70 font-semibold mr-1">
                  Type:
                </span>
                {["All", "Theory", "Lab"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                      selectedType === t
                        ? "bg-[#6B46C1] text-white"
                        : "bg-purple-50 dark:bg-white/5 text-stone-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="space-y-3">
            {filteredCourses.length === 0 ? (
              <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-8 border border-purple-100 dark:border-purple-950/60 text-center">
                <p className="text-sm font-semibold text-stone-800 dark:text-purple-200">
                  No matching courses found
                </p>
                <p className="text-xs text-stone-500 dark:text-purple-300/60 mt-1">
                  Try searching with a different keyword or resetting filters.
                </p>
              </div>
            ) : (
              filteredCourses.map((course) => {
                const isExpanded = expandedCourseCode === course.code;
                const sections = getSectionsForCourse(course.code);
                const isAlreadySelected = selectedCourses.some((sc) => sc.courseCode === course.code);

                return (
                  <div
                    key={course.code}
                    className="bg-white dark:bg-[#1A1033] rounded-3xl border border-purple-100 dark:border-purple-950/60 overflow-hidden shadow-xs transition-all"
                  >
                    {/* Course Summary Row */}
                    <div
                      onClick={() =>
                        setExpandedCourseCode(isExpanded ? null : course.code)
                      }
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-purple-50/40 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-purple-950 dark:text-white">
                            {course.code}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              course.type === "Lab"
                                ? "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300"
                                : "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300"
                            }`}
                          >
                            {course.type}
                          </span>
                          <span className="text-xs font-medium text-stone-500 dark:text-purple-300/70">
                            {course.credits} Credits • Semester {course.semester}
                          </span>
                          {isAlreadySelected && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold">
                              In Your Plan
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-stone-900 dark:text-purple-100">
                          {course.name}
                        </h3>
                        {course.description && (
                          <p className="text-xs text-stone-500 dark:text-purple-300/60 line-clamp-1">
                            {course.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
                          {sections.length} Section{sections.length !== 1 ? "s" : ""} Available
                        </span>
                        <div className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Sections Offerings & Clash Compatibility */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-purple-50 dark:border-purple-950/60 bg-purple-50/20 dark:bg-white/[0.01] space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 pt-1">
                          Available Cross-Batch Sections & Routine Compatibility:
                        </div>

                        {sections.length === 0 ? (
                          <p className="text-xs text-stone-500 dark:text-purple-300/60 italic py-2">
                            No open sections found for this course in the current timetable.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sections.map((sec) => {
                              // Check clash against current routine
                              const clashes = checkCandidateClashes(sec.sessions, currentRoutine);
                              const hasClash = clashes.length > 0;

                              return (
                                <div
                                  key={sec.sectionId}
                                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                                    hasClash
                                      ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/60"
                                      : "bg-white dark:bg-[#1A1033] border-purple-100 dark:border-purple-900/60 shadow-xs"
                                  }`}
                                >
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-xs text-stone-900 dark:text-white">
                                          Batch {sec.batch} • Sec {sec.section}
                                        </span>
                                        {sec.faculty && (
                                          <span className="text-[11px] text-stone-500 dark:text-purple-300/70 truncate">
                                            ({sec.faculty})
                                          </span>
                                        )}
                                      </div>

                                      {/* Compatibility badge */}
                                      {hasClash ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                                          <AlertTriangle className="w-3 h-3" />
                                          {clashes.length} Clash
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                                          <CheckCircle2 className="w-3 h-3" />
                                          Fits Routine
                                        </span>
                                      )}
                                    </div>

                                    {/* Session schedules */}
                                    <div className="text-[11px] text-stone-600 dark:text-purple-200/80 space-y-0.5">
                                      {sec.sessions.map((s: ClassSession, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <Clock className="w-3 h-3 text-purple-400 shrink-0" />
                                          <span>
                                            {s.day} {formatTimeString(s.startTime)}–{formatTimeString(s.endTime)} ({s.room})
                                          </span>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Detailed clash warning if any */}
                                    {hasClash && (
                                      <div className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 p-2 rounded-xl">
                                        ⚠ Overlaps with {clashes[0].sessionB.courseCode} on {clashes[0].day}
                                      </div>
                                    )}
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-2 pt-2 border-t border-purple-50 dark:border-purple-950/40">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAddCourseSection(course, sec, "Retake")}
                                      className="flex-1 text-xs border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                                    >
                                      Add as Retake
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAddCourseSection(course, sec, "Improvement")}
                                      className="flex-1 text-xs border-blue-300 dark:border-blue-800/80 text-blue-800 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                                    >
                                      Add as Improvement
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab B: Browse by Batch & Section */}
      {activeTab === "batch" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1A1033] p-5 rounded-3xl border border-purple-100 dark:border-purple-950/60 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-white">
              Select Batch & Section Timetable
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-2">
                  Batch:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableBatches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBatch(b)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedBatch === b
                          ? "bg-[#6B46C1] text-white shadow-xs"
                          : "bg-purple-50 dark:bg-white/5 text-stone-700 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-white/10"
                      }`}
                    >
                      Batch {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-2">
                  Section:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSections.map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setSelectedSection(sec)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSection === sec
                          ? "bg-[#FF7A00] text-white shadow-xs"
                          : "bg-purple-50 dark:bg-white/5 text-stone-700 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-white/10"
                      }`}
                    >
                      Section {sec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Batch Schedule Sessions */}
          <div className="bg-white dark:bg-[#1A1033] p-6 rounded-3xl border border-purple-100 dark:border-purple-950/60 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-50 dark:border-purple-950/60">
              <div>
                <h3 className="font-bold text-stone-900 dark:text-white text-base">
                  Timetable for CSE Batch {selectedBatch} • Section {selectedSection}
                </h3>
                <p className="text-xs text-stone-500 dark:text-purple-300/70">
                  {batchTimetableSessions.length} sessions listed in this cohort
                </p>
              </div>
            </div>

            {batchTimetableSessions.length === 0 ? (
              <div className="text-center py-8 text-xs text-stone-500 dark:text-purple-300/60">
                No sessions found for Batch {selectedBatch} Section {selectedSection}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {batchTimetableSessions.map((session) => {
                  const clashes = checkCandidateClashes([session], currentRoutine);
                  const hasClash = clashes.length > 0;

                  return (
                    <div
                      key={session.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                        hasClash
                          ? "bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60"
                          : "bg-purple-50/40 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/60"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-purple-950 dark:text-purple-200">
                            {session.courseCode}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              hasClash
                                ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                                : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {hasClash ? "Clash with your routine" : "Fits your routine"}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-stone-800 dark:text-white truncate">
                          {session.courseName}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-purple-300/70 flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-purple-400 shrink-0" />
                          <span>
                            {session.day} {formatTimeString(session.startTime)}–{formatTimeString(session.endTime)}
                          </span>
                        </p>
                        <p className="text-[10px] text-stone-400 dark:text-purple-300/50 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                          <span>{session.room} • {session.faculty || "Faculty Assigned"}</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-purple-50 dark:border-purple-950/40 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const course = catalog.courses.find(
                              (c: Course) => c.code.toUpperCase() === session.courseCode.toUpperCase()
                            ) || {
                              id: session.courseCode,
                              code: session.courseCode,
                              name: session.courseName,
                              credits: 3,
                              semester: 3,
                              type: session.type,
                              department: user.department,
                            };
                            const sec: CourseSection = {
                              sectionId: `${session.courseCode}-${session.batch}-${session.section}`,
                              courseCode: session.courseCode,
                              batch: session.batch,
                              section: session.section,
                              faculty: session.faculty,
                              sessions: [session],
                            };
                            handleAddCourseSection(course, sec, "Retake");
                          }}
                          className="flex-1 text-xs border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add to Plan
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notice Footer */}
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
