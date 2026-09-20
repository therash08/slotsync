"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Modal } from "@/ui/Modal";
import { DEPARTMENTS } from "@/lib/constants/departments";
import {
  getDepartmentCatalog,
  getBatchesForDepartment,
  getSectionsForBatch,
} from "@/lib/mock-data/academic-catalog";
import { WEEKDAYS, DayOfWeek, cn } from "@/lib/utils";
import {
  User,
  GraduationCap,
  Sliders,
  Sun,
  Moon,
  RotateCcw,
  Save,
  Check,
  Trash2,
  UserPlus,
  HardDrive,
  Info,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function SettingsPage() {
  const {
    user,
    savedProfiles,
    updateUserProfile,
    switchProfile,
    clearAllLocalData,
  } = useUserStore();
  const {
    preferences,
    updatePreferences,
    resetToDefaults,
    restoreDefaultCurrentRoutine,
    clearPlanner,
    syncCohortRoutine,
  } = useScheduleStore();
  const { theme, setTheme } = useThemeStore();
  const { showToast } = useToast();

  // Local state for profile form
  const [studentId, setStudentId] = useState(user.studentId || "02212020088");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [department, setDepartment] = useState(user.department || "CSE");
  const [batch, setBatch] = useState(user.batch || "62");
  const [section, setSection] = useState(user.section || "A");

  // Local state for preferences
  const [minCampusDays, setMinCampusDays] = useState(preferences.minCampusDays);
  const [preferredClassTime, setPreferredClassTime] = useState(preferences.preferredClassTime);
  const [preferredOffDay, setPreferredOffDay] = useState(preferences.preferredOffDay);
  const [avoidEveningClasses, setAvoidEveningClasses] = useState(preferences.avoidEveningClasses);
  const [avoidEarlyMorning, setAvoidEarlyMorning] = useState(preferences.avoidEarlyMorning);
  const [minWeeklyIdleTime, setMinWeeklyIdleTime] = useState(preferences.minWeeklyIdleTime);

  // Clear data modal state
  const [clearModalOpen, setClearModalOpen] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDept = department;
    const cleanBatch = String(batch).trim();
    const cleanSection = section.trim().toUpperCase();

    updateUserProfile({
      studentId: studentId.trim(),
      name: name.trim(),
      email: email.trim(),
      department: cleanDept,
      batch: cleanBatch,
      section: cleanSection,
    });

    syncCohortRoutine(cleanDept, cleanBatch, cleanSection);

    updatePreferences({
      minCampusDays,
      preferredClassTime,
      preferredOffDay,
      avoidEveningClasses,
      avoidEarlyMorning,
      minWeeklyIdleTime,
    });

    showToast("Profile and preferences saved successfully!", "success");
  };

  const handleClearAllData = () => {
    clearAllLocalData();
    resetToDefaults();
    restoreDefaultCurrentRoutine();
    clearPlanner();
    setClearModalOpen(false);
    showToast("Planner and local student data reset to defaults.", "info");
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
            <span>Leading University</span>
            <span>•</span>
            <span>Local Device Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Settings & Preferences
          </h1>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
            Manage your student identity, department, cohort details, and scheduling constraints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setClearModalOpen(true)}
            className="gap-1.5 text-xs border-purple-200 dark:border-purple-800 text-stone-600 dark:text-purple-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>

      {/* 1. Student Identity */}
      <div className="p-6 rounded-3xl border border-purple-100 dark:border-purple-950/60 bg-white dark:bg-[#1A1033] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-purple-50 dark:border-purple-950/60 pb-3">
          <User className="w-4 h-4 text-[#6B46C1]" />
          <span>Student Identity</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-purple-200 mb-1.5 uppercase tracking-wider text-[11px]">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 02212020088"
              className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1] font-mono"
            />
            <span className="text-[10px] text-stone-400 dark:text-purple-300/50 mt-1 block">
              Leading University Matriculation Number
            </span>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-purple-200 mb-1.5 uppercase tracking-wider text-[11px]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rahman"
              className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-purple-200 mb-1.5 uppercase tracking-wider text-[11px]">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@lus.ac.bd"
              className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-purple-200 mb-1.5 uppercase tracking-wider text-[11px]">
              Institution
            </label>
            <div className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-white/5 p-3 text-stone-800 dark:text-purple-200 font-semibold flex items-center justify-between">
              <span>Leading University</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                Single-University Scope
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Department & Cohort */}
      <div className="p-6 rounded-3xl border border-purple-100 dark:border-purple-950/60 bg-white dark:bg-[#1A1033] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-purple-50 dark:border-purple-950/60 pb-3">
          <GraduationCap className="w-4 h-4 text-[#6B46C1]" />
          <span>Department & Cohort (10 Standard Departments)</span>
        </h2>

        <div className="space-y-3">
          <label className="block font-bold text-stone-700 dark:text-purple-200 uppercase tracking-wider text-[11px]">
            Selected Department:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.code}
                type="button"
                onClick={() => {
                  setDepartment(dept.code);
                  const catalog = getDepartmentCatalog(dept.code);
                  setBatch(catalog.defaultBatch);
                  setSection(catalog.defaultSection);
                }}
                className={`p-2.5 rounded-2xl text-xs font-bold transition-all border text-left cursor-pointer ${
                  department === dept.code
                    ? "bg-[#6B46C1] text-white border-transparent shadow-xs"
                    : "bg-purple-50/50 dark:bg-white/5 border-purple-200/60 dark:border-white/10 text-stone-700 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-white/10"
                }`}
              >
                <span className="block font-black">{dept.code}</span>
                <span className="text-[10px] font-normal opacity-80 line-clamp-1">
                  {dept.name}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-stone-700 dark:text-purple-200 uppercase tracking-wider text-[11px]">
                  Enrolled Batch
                </label>
                <div className="flex gap-1">
                  {getBatchesForDepartment(department).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBatch(b)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        batch === b
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200"
                      }`}
                    >
                      B{b}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1] font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-stone-700 dark:text-purple-200 uppercase tracking-wider text-[11px]">
                  Regular Section
                </label>
                <div className="flex gap-1">
                  {getSectionsForBatch(department, batch).map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setSection(sec)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        section === sec
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200"
                      }`}
                    >
                      Sec {sec}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value.toUpperCase())}
                placeholder="e.g. A"
                className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1] font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Local Profiles on this Device */}
      {savedProfiles.length > 1 && (
        <div className="p-6 rounded-3xl border border-purple-100 dark:border-purple-950/60 bg-white dark:bg-[#1A1033] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-purple-50 dark:border-purple-950/60 pb-3">
            <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#6B46C1]" />
              <span>Profiles Saved in this Browser</span>
            </h2>
            <Link href="/onboarding">
              <Button size="sm" variant="ghost" className="text-xs text-purple-700 dark:text-purple-300">
                <UserPlus className="w-3.5 h-3.5 mr-1" />
                Add New Profile
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedProfiles.map((p) => {
              const isActive = p.id === user.id;
              return (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    isActive
                      ? "border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/60"
                      : "border-purple-100 dark:border-purple-900/40 bg-white dark:bg-white/[0.02]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-stone-900 dark:text-white truncate">
                      {p.name}
                    </p>
                    <p className="text-[11px] font-mono text-purple-600 dark:text-purple-300">
                      ID: {p.studentId || "02212020088"} • {p.department} B{p.batch}-{p.section}
                    </p>
                  </div>
                  {isActive ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Active
                    </span>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        switchProfile(p.id);
                        setStudentId(p.studentId || "");
                        setName(p.name || "");
                        setEmail(p.email || "");
                        setDepartment(p.department);
                        setBatch(p.batch);
                        setSection(p.section);
                        syncCohortRoutine(p.department, p.batch, p.section);
                        showToast(`Switched profile to ${p.name} (${p.department} B${p.batch}-${p.section}).`, "success");
                      }}
                      className="text-xs border-purple-200 dark:border-purple-800 cursor-pointer"
                    >
                      Switch
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Scheduling Constraints */}
      <div className="p-6 rounded-3xl border border-purple-100 dark:border-purple-950/60 bg-white dark:bg-[#1A1033] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-purple-50 dark:border-purple-950/60 pb-3">
          <Sliders className="w-4 h-4 text-[#6B46C1]" />
          <span>Scheduling Preferences</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-purple-200 mb-1.5 uppercase tracking-wider text-[11px]">
              Target Campus Days
            </label>
            <select
              value={minCampusDays}
              onChange={(e) => setMinCampusDays(parseInt(e.target.value, 10))}
              className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none"
            >
              <option value="3">3 Days (Condensed)</option>
              <option value="4">4 Days (Standard)</option>
              <option value="5">5 Days (Full Week)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-purple-200 mb-1.5 uppercase tracking-wider text-[11px]">
              Preferred Off Day
            </label>
            <select
              value={preferredOffDay}
              onChange={(e) => setPreferredOffDay(e.target.value as any)}
              className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none"
            >
              <option value="None">Flexible (No preference)</option>
              {WEEKDAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-purple-50 dark:border-purple-950/60 space-y-2 text-xs">
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/50 dark:hover:bg-white/5 cursor-pointer">
            <span className="text-stone-700 dark:text-purple-200 font-medium">
              Avoid Evening Classes (&gt; 5:00 PM)
            </span>
            <input
              type="checkbox"
              checked={avoidEveningClasses}
              onChange={(e) => setAvoidEveningClasses(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded border-purple-300 accent-purple-600"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/50 dark:hover:bg-white/5 cursor-pointer">
            <span className="text-stone-700 dark:text-purple-200 font-medium">
              Avoid 8:00 AM Early Morning Classes
            </span>
            <input
              type="checkbox"
              checked={avoidEarlyMorning}
              onChange={(e) => setAvoidEarlyMorning(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded border-purple-300 accent-purple-600"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/50 dark:hover:bg-white/5 cursor-pointer">
            <span className="text-stone-700 dark:text-purple-200 font-medium">
              Minimize Weekly Idle Time Between Classes
            </span>
            <input
              type="checkbox"
              checked={minWeeklyIdleTime}
              onChange={(e) => setMinWeeklyIdleTime(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded border-purple-300 accent-purple-600"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-[#FF7A00] hover:bg-[#E66E00] text-white shadow-md shadow-[#FF7A00]/25 font-bold px-6"
        >
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        title="Reset Local Planner Data"
        description="Are you sure you want to reset your local student data? This restores the demo baseline."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setClearModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearAllData}
              className="text-xs"
            >
              Reset Data
            </Button>
          </>
        }
      >
        <p className="text-xs text-stone-500 dark:text-purple-300/70">
          All changes saved in this browser will be reset to defaults.
        </p>
      </Modal>
    </form>
  );
}
