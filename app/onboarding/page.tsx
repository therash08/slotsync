"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/ui/Button";
import { useUserStore } from "@/stores/useUserStore";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useToast } from "@/ui/Toast";
import { StudentPlannerIllustration } from "@/components/illustrations/StudentPlannerIllustration";
import {
  LEADING_UNIVERSITY_DEPARTMENTS,
  getDepartmentByCode,
} from "@/lib/constants/departments";
import {
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Building2,
  Calendar,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, savedProfiles, createProfile, switchProfile } = useUserStore();
  const { restoreDefaultCurrentRoutine, syncCohortRoutine } = useScheduleStore();
  const { showToast } = useToast();

  const [studentId, setStudentId] = useState(user.studentId || "");
  const [fullName, setFullName] = useState(user.name || "");
  const [department, setDepartment] = useState(user.department || "CSE");
  const [batch, setBatch] = useState(user.batch || "62");
  const [section, setSection] = useState(user.section || "A");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When department changes, update available batches and sections
  const selectedDeptConfig = getDepartmentByCode(department);
  const availableBatches = selectedDeptConfig?.availableBatches || ["60", "61", "62", "63"];
  const availableSections = selectedDeptConfig?.availableSections || ["A", "B", "C", "D"];

  useEffect(() => {
    if (!availableBatches.includes(batch)) {
      setBatch(availableBatches[0] || "62");
    }
    if (!availableSections.includes(section)) {
      setSection(availableSections[0] || "A");
    }
  }, [department, availableBatches, availableSections, batch, section]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!studentId.trim()) {
      errs.studentId = "Student ID is required";
    }
    if (!fullName.trim()) {
      errs.fullName = "Full name is required";
    }
    if (!department) {
      errs.department = "Department is required";
    }
    if (!batch.trim()) {
      errs.batch = "Batch is required";
    }
    if (!section.trim()) {
      errs.section = "Section is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanDept = department;
    const cleanBatch = batch.trim();
    const cleanSection = section.trim().toUpperCase();

    // Create local student profile
    createProfile({
      studentId: studentId.trim(),
      name: fullName.trim(),
      department: cleanDept,
      batch: cleanBatch,
      section: cleanSection,
    });

    syncCohortRoutine(cleanDept, cleanBatch, cleanSection);
    showToast("Profile created! Welcome to your course planner.", "success");
    router.push("/dashboard");
  };

  const handleContinueAsExisting = (profileId: string) => {
    switchProfile(profileId);
    const target = savedProfiles.find((p) => p.id === profileId);
    if (target) {
      syncCohortRoutine(target.department, target.batch, target.section);
    }
    showToast(`Welcome back, ${user.name}!`, "info");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F6F4FB] dark:bg-[#0E091B] text-[var(--foreground)] flex flex-col justify-between selection:bg-[#6B46C1] selection:text-white transition-colors duration-200">
      {/* Top Bar */}
      <header className="px-6 py-4 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo href="/" showTagline taglineText="For Leading University" />
        <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#EDE8F7] dark:bg-[#1A122E] text-[#6B46C1] dark:text-[#B59CFF]">
          Fall 2026 Academic Term
        </span>
      </header>

      {/* Main Split Layout */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          {/* Left Column: Greeting, Value & Illustration */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8F7] dark:bg-[#23183E] text-xs font-semibold text-[#6B46C1] dark:text-[#C084FC]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Leading University Course Planner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#1D1530] dark:text-[#F4F1FA]">
              Build your semester{" "}
              <span className="text-[#6B46C1] dark:text-[#9D7BFF]">
                without the clashes.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#5A4E75] dark:text-[#D2C8E6] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              Combine your regular semester routine with retake and improvement courses from other batches. No messy spreadsheets or timetable collisions.
            </p>

            {/* Original Cartoon Vector Illustration */}
            <div className="pt-2">
              <StudentPlannerIllustration className="max-w-md mx-auto lg:mx-0" />
            </div>
          </div>

          {/* Right Column: Welcoming Profile Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#EDE8F7] dark:border-[rgba(180,169,206,0.18)] bg-white dark:bg-[#1A122E] p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#1D1530] dark:text-[#F4F1FA]">
                  Student Profile Setup
                </h2>
                <p className="text-xs text-[#7C7099] dark:text-[#9B8EB5] mt-1">
                  Your profile and course plans are saved in this browser. No password or university login required.
                </p>
              </div>

              {/* Returning User Quick Action */}
              {user.onboardingCompleted && user.studentId && (
                <div className="p-3.5 rounded-2xl border border-[#EDE8F7] dark:border-[rgba(180,169,206,0.18)] bg-[#FBF9FF] dark:bg-[#23183E] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#1D1530] dark:text-[#F4F1FA] truncate">
                      Continue as {user.name}
                    </p>
                    <p className="text-[11px] text-[#7C7099] dark:text-[#9B8EB5] truncate">
                      ID: {user.studentId} • {user.department} Batch {user.batch} ({user.section})
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleContinueAsExisting(user.id)}
                    className="shrink-0 text-xs bg-[#FF7A00] hover:bg-[#EA6C00] text-white gap-1"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field 1: Student ID (text to preserve leading zeros) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1D1530] dark:text-[#F4F1FA]">
                    Student ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                      if (errors.studentId) setErrors((prev) => ({ ...prev, studentId: "" }));
                    }}
                    placeholder="e.g. 02212020088"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE8F7] dark:border-[rgba(180,169,206,0.2)] bg-white dark:bg-[#120A24] text-xs text-[#1D1530] dark:text-[#F4F1FA] placeholder-[#9B8EB5] focus:outline-hidden focus:ring-2 focus:ring-[#6B46C1] transition-all font-mono"
                  />
                  {errors.studentId && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.studentId}</p>
                  )}
                </div>

                {/* Field 2: Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1D1530] dark:text-[#F4F1FA]">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="e.g. Rashik Rahman"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE8F7] dark:border-[rgba(180,169,206,0.2)] bg-white dark:bg-[#120A24] text-xs text-[#1D1530] dark:text-[#F4F1FA] placeholder-[#9B8EB5] focus:outline-hidden focus:ring-2 focus:ring-[#6B46C1] transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Field 3: Department (from the 10 standard codes) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1D1530] dark:text-[#F4F1FA]">
                    Department <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {LEADING_UNIVERSITY_DEPARTMENTS.map((dept) => (
                      <button
                        key={dept.code}
                        type="button"
                        onClick={() => setDepartment(dept.code)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                          department === dept.code
                            ? "bg-[#6B46C1] text-white shadow-sm"
                            : "bg-[#F5F3FB] dark:bg-[#120A24] text-[#5A4E75] dark:text-[#D2C8E6] hover:bg-[#EDE8F7] dark:hover:bg-[#23183E] border border-transparent"
                        }`}
                      >
                        {dept.code}
                      </button>
                    ))}
                  </div>
                  {!selectedDeptConfig?.hasRoutineData && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium pt-0.5">
                      Note: Routine data has not been added for {department} yet. (CSE is fully active).
                    </p>
                  )}
                </div>

                {/* Fields 4 & 5: Batch & Section */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1D1530] dark:text-[#F4F1FA]">
                      Batch <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EDE8F7] dark:border-[rgba(180,169,206,0.2)] bg-white dark:bg-[#120A24] text-xs text-[#1D1530] dark:text-[#F4F1FA] focus:outline-hidden focus:ring-2 focus:ring-[#6B46C1] font-mono cursor-pointer"
                    >
                      {availableBatches.map((b) => (
                        <option key={b} value={b}>
                          Batch {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1D1530] dark:text-[#F4F1FA]">
                      Section <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EDE8F7] dark:border-[rgba(180,169,206,0.2)] bg-white dark:bg-[#120A24] text-xs text-[#1D1530] dark:text-[#F4F1FA] focus:outline-hidden focus:ring-2 focus:ring-[#6B46C1] font-mono cursor-pointer"
                    >
                      {availableSections.map((s) => (
                        <option key={s} value={s}>
                          Section {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 space-y-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full py-3 bg-[#6B46C1] hover:bg-[#5832A8] text-white font-semibold text-xs sm:text-sm rounded-xl gap-2 shadow-md active:scale-[0.98]"
                  >
                    <span>Create profile &amp; continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-[11px] text-center text-[#7C7099] dark:text-[#9B8EB5]">
                    Your profile and plans are saved in this browser.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="px-6 py-4 max-w-7xl mx-auto w-full text-center text-xs text-[#7C7099] dark:text-[#9B8EB5]">
        SlotSync • Purpose-built course planning platform for Leading University students
      </footer>
    </div>
  );
}
