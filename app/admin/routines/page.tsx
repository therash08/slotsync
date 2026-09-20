"use client";

import React, { useState } from "react";
import { uploadAndParseRoutine } from "@/lib/api/admin";
import { RoutineValidationRow } from "@/types";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Modal } from "@/ui/Modal";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  Filter,
  Check,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function AdminRoutineManagerPage() {
  const { showToast } = useToast();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState<{
    totalSessions: number;
    validCount: number;
    warningCount: number;
    errorCount: number;
    rows: RoutineValidationRow[];
  } | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | "valid" | "warning" | "error">("all");
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const handleSimulateUpload = async (fileName: string = "Fall2026_Routine_Draft.xlsx") => {
    setIsUploading(true);
    try {
      const data = await uploadAndParseRoutine(fileName);
      setUploadedData(data);
      showToast(`Uploaded ${fileName}: ${data.totalSessions} class sessions detected.`, "success");
    } catch (e) {
      showToast("Failed to parse routine file.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePublish = () => {
    setPublishModalOpen(false);
    showToast("Routine published as Version 3.1 for Fall 2026! Live in student planner.", "success");
  };

  const filteredRows = uploadedData
    ? uploadedData.rows.filter((r) => {
        if (statusFilter === "all") return true;
        return r.status === statusFilter;
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              Routine Importer
            </span>
            <span className="text-xs text-slate-400">Bulk Spreadsheet Parser</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Routine Manager & Validator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload institutional timetable files (.xlsx, .csv) and validate room/faculty conflicts before publishing.
          </p>
        </div>

        {uploadedData && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSimulateUpload("Revalidated_Routine.xlsx")}
              className="gap-1.5 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-Validate</span>
            </Button>

            <Button
              size="sm"
              onClick={() => setPublishModalOpen(true)}
              disabled={uploadedData.errorCount > 0}
              className="gap-1.5 text-xs shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Publish Routine</span>
            </Button>
          </div>
        )}
      </div>

      {/* Drag & Drop Upload Zone */}
      {!uploadedData ? (
        <div
          onClick={() => handleSimulateUpload("Fall2026_Routine_Draft.xlsx")}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
            Drag & drop departmental routine spreadsheet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv).
          </p>

          <Button
            size="sm"
            isLoading={isUploading}
            onClick={(e) => {
              e.stopPropagation();
              handleSimulateUpload("Fall2026_Routine_Master.xlsx");
            }}
            className="shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            <span>Load Sample Excel Routine (124 Sessions)</span>
          </Button>
        </div>
      ) : (
        <>
          {/* Validation Summary Strip */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Validation Complete</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Parsed Fall 2026 Routine Spreadsheet:{" "}
                  <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                    {uploadedData.totalSessions} class sessions detected
                  </span>
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    statusFilter === "all"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  All ({uploadedData.totalSessions})
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("valid")}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    statusFilter === "valid"
                      ? "bg-emerald-600 text-white font-semibold"
                      : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                  }`}
                >
                  {uploadedData.validCount} Valid
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("warning")}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    statusFilter === "warning"
                      ? "bg-amber-600 text-white font-semibold"
                      : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {uploadedData.warningCount} Warnings
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("error")}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    statusFilter === "error"
                      ? "bg-red-600 text-white font-semibold"
                      : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400"
                  }`}
                >
                  {uploadedData.errorCount} Errors
                </button>
              </div>
            </div>

            {/* Error Notice if any */}
            {uploadedData.errorCount > 0 && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-red-500 shrink-0" />
                  <span>
                    {uploadedData.errorCount} fatal errors must be resolved or ignored before publishing to the live student optimizer.
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Auto-fix mock error
                    setUploadedData({
                      ...uploadedData,
                      errorCount: 0,
                      rows: uploadedData.rows.map((r) =>
                        r.status === "error" ? { ...r, status: "valid", issues: undefined } : r
                      ),
                    });
                    showToast("Automatically corrected invalid time ranges and room assignments.", "success");
                  }}
                  className="text-xs h-7 bg-white dark:bg-slate-900"
                >
                  Auto-Resolve All Errors
                </Button>
              </div>
            )}
          </div>

          {/* Validation Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10">
                  <tr className="text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="p-3">Status</th>
                    <th className="p-3">Batch & Sec</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Course Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Day</th>
                    <th className="p-3">Time Range</th>
                    <th className="p-3">Room</th>
                    <th className="p-3">Faculty</th>
                    <th className="p-3">Issues / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredRows.slice(0, 30).map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="p-3">
                        {row.status === "valid" && (
                          <Badge variant="success" size="sm">
                            Valid
                          </Badge>
                        )}
                        {row.status === "warning" && (
                          <Badge variant="warning" size="sm">
                            Warning
                          </Badge>
                        )}
                        {row.status === "error" && (
                          <Badge variant="conflict" size="sm">
                            Error
                          </Badge>
                        )}
                      </td>

                      <td className="p-3 font-mono font-medium">
                        B{row.batch}-{row.section}
                      </td>

                      <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {row.courseCode}
                      </td>

                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                        {row.courseName}
                      </td>

                      <td className="p-3">{row.type}</td>

                      <td className="p-3 font-medium">{row.day}</td>

                      <td className="p-3 font-mono text-slate-500">
                        {row.startTime} – {row.endTime}
                      </td>

                      <td className="p-3 font-medium">
                        {row.room || <span className="text-red-500 font-bold">MISSING</span>}
                      </td>

                      <td className="p-3 text-slate-500">
                        {row.faculty || <span className="text-amber-500 italic">Unassigned</span>}
                      </td>

                      <td className="p-3 text-slate-500 max-w-xs truncate">
                        {row.issues ? (
                          <span className="text-amber-600 dark:text-amber-400">
                            {row.issues.join(", ")}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-400 flex items-center justify-between">
              <span>
                Showing {Math.min(30, filteredRows.length)} of {filteredRows.length} sessions
              </span>
              <span>Routine Table Ready for Deployment</span>
            </div>
          </div>
        </>
      )}

      {/* Publish Confirmation Modal */}
      <Modal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        title="Publish Fall 2026 Routine"
        description="This will deploy the uploaded schedule across all student optimizer sessions as Version 3.1."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setPublishModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handlePublish}>
              Confirm & Publish
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p>
            • 124 class sessions will be updated across Batches 60, 61, 62, and 63.
          </p>
          <p>
            • Students with saved routines containing modified courses will receive an automated clash revision notification.
          </p>
        </div>
      </Modal>
    </div>
  );
}
