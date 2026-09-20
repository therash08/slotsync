"use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal";
import { RotateCcw, AlertCircle } from "lucide-react";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useUserStore } from "@/stores/useUserStore";
import { getRoutineForCohort } from "@/lib/mock-data/academic-catalog";
import { useToast } from "@/ui/Toast";

export const PlannerHeader: React.FC = () => {
  const { user } = useUserStore();
  const { selectedCourses, currentRoutine, clearPlanner } = useScheduleStore();
  const { showToast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const defaultRoutine = getRoutineForCohort(user.department, user.batch, user.section);
  const isPlanModified =
    selectedCourses.length > 0 ||
    currentRoutine.length !== defaultRoutine.length;

  const handleStartOverClick = () => {
    if (isPlanModified) {
      setIsConfirmOpen(true);
    } else {
      showToast("Your planning workspace is already in its default state.", "info");
    }
  };

  const handleConfirmReset = () => {
    clearPlanner(user.department, user.batch, user.section);
    setIsConfirmOpen(false);
    showToast("Plan reset to default semester courses.", "success");
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <Logo href="/dashboard" showTagline taglineText="For Leading University" />
        </div>

        {/* Center: Academic Context Line (Desktop) */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)]/80 shadow-2xs">
          <span className="font-semibold text-[var(--text-primary)]">
            {user.department}
          </span>
          <span className="text-[var(--text-muted)]">•</span>
          <span>{user.academicYear}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="font-mono text-[var(--accent)] font-semibold">
            Batch {user.batch} (Sec {user.section})
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <Button
            size="sm"
            variant="outline"
            onClick={handleStartOverClick}
            className="text-xs gap-1.5 border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] active:scale-[0.98]"
            title="Clear planned retakes and restore default semester courses"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span className="hidden sm:inline">Start over</span>
          </Button>
        </div>
      </header>

      {/* Start Over Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-5 h-5" />
            <span>Reset planning workspace?</span>
          </div>
        }
        description="This will clear your selected retake or improvement courses and restore your confirmed regular semester routine."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmReset}
            >
              Confirm Reset
            </Button>
          </>
        }
      >
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-canvas)] text-xs text-[var(--text-secondary)] space-y-2 leading-relaxed">
          <p>
            You currently have{" "}
            <strong className="text-[var(--text-primary)] font-mono">
              {selectedCourses.length}
            </strong>{" "}
            retake/improvement course{selectedCourses.length === 1 ? "" : "s"} added.
          </p>
          <p>
            Resetting will discard these selections and revert your timetable to the
            baseline Fall 2026 Batch {user.batch} routine.
          </p>
        </div>
      </Modal>
    </>
  );
};
