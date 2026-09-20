"use client";

import React, { useState } from "react";
import { MOCK_ROUTINE_VERSIONS } from "@/lib/mock-data/versions";
import { RoutineVersion } from "@/types";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Modal } from "@/ui/Modal";
import {
  History,
  CheckCircle2,
  RotateCcw,
  GitCompare,
  FileText,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function RoutineVersionsPage() {
  const { showToast } = useToast();
  const [versions, setVersions] = useState<RoutineVersion[]>(MOCK_ROUTINE_VERSIONS);
  const [selectedVersion, setSelectedVersion] = useState<RoutineVersion | null>(null);
  const [diffModalOpen, setDiffModalOpen] = useState(false);

  const handleRestore = (version: RoutineVersion) => {
    setVersions((prev) =>
      prev.map((v) => ({
        ...v,
        status: v.id === version.id ? "Current" : "Archived",
      }))
    );
    showToast(`Restored Routine ${version.versionNumber} as active version.`, "success");
  };

  const handleOpenDiff = (version: RoutineVersion) => {
    setSelectedVersion(version);
    setDiffModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              Audit & Revision History
            </span>
            <span className="text-xs text-slate-400">Fall 2026 Semester</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Routine Versioning & Rollback
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track departmental routine revisions, inspect change summaries, and safely roll back to prior releases.
          </p>
        </div>
      </div>

      {/* Timeline UI */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {versions.map((ver, idx) => {
          const isCurrent = ver.status === "Current";
          return (
            <div key={ver.id} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                  isCurrent
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-xs"
                    : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                }`}
              >
                {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>

              {/* Version Card */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isCurrent
                    ? "border-indigo-200 dark:border-indigo-800/80 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">
                      {ver.versionNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">{ver.semester}</span>

                    {isCurrent ? (
                      <Badge variant="success" size="sm">
                        Current Live
                      </Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">
                        Archived
                      </Badge>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    Published {ver.publishedAt}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {ver.changeSummary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>By: {ver.publishedBy}</span>
                    <span className="font-mono font-medium text-slate-600 dark:text-slate-300">
                      {ver.sessionsCount} Sessions
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenDiff(ver)}
                      className="text-xs gap-1.5"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>View Diff</span>
                    </Button>

                    {!isCurrent && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestore(ver)}
                        className="text-xs gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore this Version</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diff Inspection Modal */}
      <Modal
        isOpen={diffModalOpen}
        onClose={() => setDiffModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <span>Version Changes:</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">
              {selectedVersion?.versionNumber}
            </span>
          </div>
        }
        description={`Audit trail for ${selectedVersion?.semester} release on ${selectedVersion?.publishedAt}.`}
        footer={
          <Button size="sm" onClick={() => setDiffModalOpen(false)}>
            Close Diff
          </Button>
        }
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-1.5">
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
              + ADDED: Batch 62 Section C CSE 2203 (Tue/Thu 14:30–16:00, Room C-302)
            </div>
            <div className="text-red-600 dark:text-red-400 font-semibold">
              - REMOVED: Batch 61 Section A Room 304 Thursday conflict slot
            </div>
            <div className="text-amber-600 dark:text-amber-400 font-semibold">
              ~ MODIFIED: Microprocessors Lab 306 shifted to 11:30–14:00
            </div>
          </div>

          <p className="text-slate-500">
            All modifications were authenticated and approved by the Department Academic Coordination Committee.
          </p>
        </div>
      </Modal>
    </div>
  );
}
