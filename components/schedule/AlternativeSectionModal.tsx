"use client";

import React, { useMemo } from "react";
import { ClassSession } from "@/types";
import { Modal } from "@/ui/Modal";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { checkCandidateClashes } from "@/lib/schedule/conflict";
import { formatTimeString } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Calendar, Clock, MapPin, User, Sparkles } from "lucide-react";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useToast } from "@/ui/Toast";

interface AlternativeSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseCode: string;
}

export const AlternativeSectionModal: React.FC<AlternativeSectionModalProps> = ({
  isOpen,
  onClose,
  courseCode,
}) => {
  const { currentRoutine, availableOfferings, lockSection, runLocalOptimization } = useScheduleStore();
  const { showToast } = useToast();

  // Find all sections of this course across junior batches
  const candidateSections = useMemo(() => {
    const matchingOfferings = availableOfferings.filter(
      (o) => o.courseCode.toUpperCase() === courseCode.toUpperCase()
    );

    // Group by batch + section
    const grouped: Record<string, { batch: string; section: string; sessions: ClassSession[] }> = {};
    for (const off of matchingOfferings) {
      const key = `${off.batch}-${off.section}`;
      if (!grouped[key]) {
        grouped[key] = { batch: off.batch, section: off.section, sessions: [] };
      }
      grouped[key].sessions.push(off);
    }

    return Object.values(grouped).map((group) => {
      const conflicts = checkCandidateClashes(group.sessions, currentRoutine);
      const isCompatible = conflicts.length === 0;

      return {
        batch: group.batch,
        section: group.section,
        sessions: group.sessions,
        conflicts,
        isCompatible,
      };
    });
  }, [availableOfferings, courseCode, currentRoutine]);

  const handleSelectSection = (batch: string, section: string) => {
    lockSection(courseCode, batch, section);
    runLocalOptimization();
    showToast(`Switched ${courseCode} to Batch ${batch} Section ${section}. Conflict resolved!`, "success");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>Alternative Sections for</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400">{courseCode}</span>
        </div>
      }
      description="Select a conflict-free section from junior batches to slot into your routine."
      maxWidth="lg"
    >
      <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
        {candidateSections.map((alt) => {
          return (
            <div
              key={`${alt.batch}-${alt.section}`}
              className={`p-4 rounded-xl border transition-all ${
                alt.isCompatible
                  ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      Batch {alt.batch} — Section {alt.section}
                    </span>
                    {alt.isCompatible ? (
                      <Badge variant="success" size="sm" className="gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>No Conflict</span>
                      </Badge>
                    ) : (
                      <Badge variant="conflict" size="sm" className="gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span>{alt.conflicts.length} Overlap</span>
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {alt.isCompatible
                      ? "Completely fits your existing Monday–Thursday routine with optimal gaps."
                      : `Conflicts with ${alt.conflicts[0]?.sessionB.courseCode} on ${alt.conflicts[0]?.day}.`}
                  </p>
                </div>

                {alt.isCompatible ? (
                  <Button
                    size="sm"
                    onClick={() => handleSelectSection(alt.batch, alt.section)}
                    className="shrink-0 gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Use This Section</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="shrink-0 text-xs text-slate-400 cursor-not-allowed"
                  >
                    Has Conflict
                  </Button>
                )}
              </div>

              {/* Session timings */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                {alt.sessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-300 gap-2"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {s.day}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {formatTimeString(s.startTime)} – {formatTimeString(s.endTime)}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {s.room}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {s.faculty || "Faculty TBA"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {candidateSections.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            No alternative sections found in published routines.
          </div>
        )}
      </div>
    </Modal>
  );
};
