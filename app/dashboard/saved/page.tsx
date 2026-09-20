"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { SavedSchedule } from "@/types";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Modal } from "@/ui/Modal";
import { formatDuration } from "@/lib/utils";
import {
  Bookmark,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Copy,
  GitCompare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HardDrive,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function SavedSchedulesPage() {
  const {
    savedSchedules,
    renameSavedSchedule,
    deleteSavedSchedule,
    saveSchedule,
    toggleComparisonSchedule,
    comparisonScheduleIds,
    applySavedScheduleAsActive,
  } = useScheduleStore();
  const { showToast } = useToast();

  // Rename modal state
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [targetSchedule, setTargetSchedule] = useState<SavedSchedule | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<SavedSchedule | null>(null);

  const handleOpenRename = (sched: SavedSchedule) => {
    setTargetSchedule(sched);
    setNewTitle(sched.title);
    setRenameModalOpen(true);
  };

  const handleSaveRename = () => {
    if (targetSchedule && newTitle.trim()) {
      renameSavedSchedule(targetSchedule.id, newTitle.trim());
      showToast(`Schedule renamed to "${newTitle.trim()}".`, "success");
      setRenameModalOpen(false);
    }
  };

  const handleOpenDelete = (sched: SavedSchedule) => {
    setScheduleToDelete(sched);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (scheduleToDelete) {
      deleteSavedSchedule(scheduleToDelete.id);
      showToast(`Deleted "${scheduleToDelete.title}".`, "info");
      setDeleteModalOpen(false);
    }
  };

  const handleDuplicate = (sched: SavedSchedule) => {
    saveSchedule(sched.schedule, `${sched.title} (Copy)`);
    showToast(`Duplicated "${sched.title}".`, "success");
  };

  const handleApplyAsActive = (sched: SavedSchedule) => {
    applySavedScheduleAsActive(sched.id);
    showToast(`Applied "${sched.title}" as active routine.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
            <span>Leading University</span>
            <span>•</span>
            <span>Archived Variations</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Saved Schedules
          </h1>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
            Compare and archive your preferred section arrangements for advising registration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50/70 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-xs text-purple-700 dark:text-purple-300">
            <HardDrive className="w-3.5 h-3.5 text-purple-500" />
            <span>Saved on this device</span>
          </div>

          {savedSchedules.length >= 2 && (
            <Link href="/dashboard/compare">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs"
              >
                <GitCompare className="w-3.5 h-3.5 mr-1.5" />
                Compare Side-by-Side
              </Button>
            </Link>
          )}

          <Link href="/dashboard/courses">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs"
            >
              <Bookmark className="w-3.5 h-3.5 mr-1.5" />
              Find More Sections
            </Button>
          </Link>
        </div>
      </div>

      {/* Schedules List */}
      {savedSchedules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedSchedules.map((item) => {
            const isCompared = comparisonScheduleIds.includes(item.schedule.id);
            const conflictCount = item.schedule.metrics?.conflictCount ?? 0;
            const campusDays = item.schedule.metrics?.campusDays ?? 4;
            const gapMinutes = item.schedule.metrics?.weeklyGapMinutes ?? 0;

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl border border-purple-100 dark:border-purple-950/60 bg-white dark:bg-[#1A1033] shadow-xs flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Title and Date */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base text-stone-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-stone-400 dark:text-purple-300/60 font-mono">
                        Saved on {item.savedAt}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-purple-600 dark:text-purple-300">
                        {item.schedule.score ?? 95}
                      </span>
                      <span className="text-[10px] text-stone-400 dark:text-purple-300/50">/100</span>
                    </div>
                  </div>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap items-center gap-2 py-2.5 border-y border-purple-50 dark:border-purple-950/60 text-xs">
                    <span className="inline-flex items-center gap-1 text-stone-600 dark:text-purple-200">
                      <Calendar className="w-3.5 h-3.5 text-purple-500" />
                      <span>{campusDays} Days</span>
                    </span>

                    <span className="inline-flex items-center gap-1 font-mono text-stone-600 dark:text-purple-200">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      <span>{formatDuration(gapMinutes)} Gap</span>
                    </span>

                    {conflictCount === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        0 Clashes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                        <AlertTriangle className="w-3 h-3" />
                        {conflictCount} Clash
                      </span>
                    )}
                  </div>

                  {/* Included Sections */}
                  {item.schedule.selectedSections &&
                    Object.keys(item.schedule.selectedSections).length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-400 dark:text-purple-300/60 font-semibold uppercase tracking-wider block">
                          Included Sections:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(item.schedule.selectedSections).map(([course, sec]) => (
                            <span
                              key={course}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-stone-700 dark:text-purple-200"
                            >
                              {course}: B{sec.batch}-{sec.section}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Actions Toolbar */}
                <div className="pt-4 mt-4 border-t border-purple-50 dark:border-purple-950/60 flex items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenRename(item)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      title="Rename schedule"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(item)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      title="Duplicate schedule"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDelete(item)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Delete schedule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant={isCompared ? "subtle" : "ghost"}
                      onClick={() => toggleComparisonSchedule(item.schedule.id)}
                      className="text-xs h-8 px-2.5 text-purple-700 dark:text-purple-300"
                    >
                      {isCompared ? "In Compare" : "+ Compare"}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApplyAsActive(item)}
                      className="text-xs h-8 px-2.5 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-12 border border-purple-100 dark:border-purple-950/60 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto border border-purple-200 dark:border-purple-800">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">
            No Saved Schedules Yet
          </h2>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 leading-relaxed">
            When you explore different section combinations or inspect your timetable, click
            &ldquo;Save Schedule&rdquo; to save variations directly to this device for advising registration.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/courses">
              <Button
                variant="primary"
                className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs"
              >
                Browse Course Sections &rarr;
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      <Modal
        isOpen={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        title="Rename Schedule"
        description="Give this routine a memorable name (e.g. 'Option A - 4 Day Week' or 'No Morning Classes')."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setRenameModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveRename}
              className="bg-[#6B46C1] hover:bg-[#5B36B1] text-white text-xs"
            >
              Save Name
            </Button>
          </>
        }
      >
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="e.g. Preferred Schedule - Retake Focus"
          className="w-full text-sm rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-white/5 p-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
          autoFocus
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Saved Schedule"
        description={`Are you sure you want to delete "${scheduleToDelete?.title}"? This action cannot be undone.`}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
              className="text-xs"
            >
              Delete Schedule
            </Button>
          </>
        }
      >
        <p className="text-xs text-stone-500 dark:text-purple-300/70">
          This schedule will be removed from your browser&apos;s saved routines.
        </p>
      </Modal>
    </div>
  );
}
