"use client";

import React, { useState } from "react";
import { ConflictDetail } from "@/types";
import { Button } from "@/ui/Button";
import { formatTimeString } from "@/lib/utils";
import { AlertTriangle, Clock, ArrowRightLeft, Sparkles } from "lucide-react";
import { AlternativeSectionModal } from "./AlternativeSectionModal";

interface ConflictCardProps {
  conflict: ConflictDetail;
}

export const ConflictCard: React.FC<ConflictCardProps> = ({ conflict }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Identify which course is retake/improvement to recommend alternatives for
  const retakeSession =
    conflict.sessionA.enrollmentType !== "Regular" ? conflict.sessionA : conflict.sessionB;
  const regularSession =
    conflict.sessionA.enrollmentType === "Regular" ? conflict.sessionA : conflict.sessionB;

  return (
    <>
      <div className="p-5 rounded-2xl border border-red-300 dark:border-red-900/60 bg-red-50/70 dark:bg-[#1a080c] shadow-2xs hover-card-lift space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <span className="font-semibold text-sm text-red-900 dark:text-red-200">
              Conflict Detected on {conflict.day}
            </span>
          </div>

          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
            {conflict.overlapStart} – {conflict.overlapEnd} Overlap
          </span>
        </div>

        {/* Clash courses side-by-side comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Course A (e.g. Retake candidate) */}
          <div className="p-3.5 rounded-xl bg-[#FFFDFA] dark:bg-[#121522] border border-red-200 dark:border-red-900/40 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-xs text-red-600 dark:text-red-400">
                {retakeSession.courseCode}
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Batch {retakeSession.batch} ({retakeSession.section})
              </span>
            </div>
            <p className="text-xs font-semibold text-[#20232E] dark:text-[#F4F5FA] line-clamp-1">
              {retakeSession.courseName}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#667085] dark:text-[#9DA7BB] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#667085]" />
              <span>
                {formatTimeString(retakeSession.startTime)} – {formatTimeString(retakeSession.endTime)}
              </span>
            </div>
          </div>

          {/* Course B (e.g. Regular current course) */}
          <div className="p-3.5 rounded-xl bg-[#FFFDFA] dark:bg-[#121522] border border-red-200 dark:border-red-900/40 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-xs text-[#20232E] dark:text-[#F4F5FA]">
                {regularSession.courseCode}
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F0ECE5] dark:bg-white/10 text-[#475467] dark:text-[#CBD5E1]">
                Batch {regularSession.batch} ({regularSession.section}) Regular
              </span>
            </div>
            <p className="text-xs font-semibold text-[#20232E] dark:text-[#F4F5FA] line-clamp-1">
              {regularSession.courseName}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#667085] dark:text-[#9DA7BB] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#667085]" />
              <span>
                {formatTimeString(regularSession.startTime)} – {formatTimeString(regularSession.endTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <p className="text-xs text-red-800/90 dark:text-red-300/80">
            Switching <strong>{retakeSession.courseCode}</strong> to a non-conflicting junior section will eliminate this clash.
          </p>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => setModalOpen(true)}
            className="gap-1.5 shrink-0 shadow-xs text-xs"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Find Alternative Section</span>
          </Button>
        </div>
      </div>

      <AlternativeSectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        courseCode={retakeSession.courseCode}
      />
    </>
  );
};
