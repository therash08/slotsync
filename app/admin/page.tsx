"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  UploadCloud,
  History,
  Calendar,
  Layers,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MOCK_ROUTINE_VERSIONS } from "@/lib/mock-data/versions";

export default function AdminOverviewPage() {
  const currentVersion = MOCK_ROUTINE_VERSIONS[0];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              Department Operations
            </span>
            <span className="text-xs text-slate-400">Computer Science & Engineering</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Academic Schedule Administration
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage semester timetable releases, parse routine spreadsheets, and validate cross-batch room/faculty allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/routines">
            <Button size="sm" className="gap-1.5 text-xs shadow-xs">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload New Routine</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
            Active Semester
          </span>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">Fall 2026</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            In Progress
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
            Total Courses
          </span>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">19 Modules</p>
          <span className="text-[10px] text-slate-400">Undergrad & Lab</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
            Active Batches
          </span>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">4 Batches</p>
          <span className="text-[10px] text-slate-400">60, 61, 62, 63</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
            Scheduled Sessions
          </span>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">124 Sessions</p>
          <span className="text-[10px] text-slate-400">Across 12 Sections</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
            Routine Version
          </span>
          <p className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {currentVersion.versionNumber}
          </p>
          <span className="text-[10px] text-slate-400">Published {currentVersion.publishedAt}</span>
        </div>
      </div>

      {/* Routine Status & Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Current Version Summary */}
        <div className="lg:col-span-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Published Routine Status
                </h3>
                <Badge variant="success" size="sm">
                  Active in Student Optimizer
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Version {currentVersion.versionNumber} ({currentVersion.semester})
              </p>
            </div>

            <Link href="/admin/routine-versions">
              <Button size="sm" variant="outline" className="text-xs gap-1">
                <History className="w-3.5 h-3.5" />
                <span>Version History</span>
              </Button>
            </Link>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentVersion.changeSummary}
          </p>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Published By:</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {currentVersion.publishedBy}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Valid Sessions:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                118 Valid Sessions
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Warnings Handled:</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">
                4 Non-blocking warnings
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hard Conflict Errors:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">
                0 Critical Errors (Resolved)
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Need to upload a replacement schedule?
            </span>
            <Link href="/admin/routines">
              <Button size="sm" className="gap-1.5 text-xs">
                <span>Upload Excel / CSV Routine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Admin Quick Actions
            </h4>

            <div className="space-y-2 text-xs">
              <Link
                href="/admin/routines"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Import Routine (Excel/CSV)
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/admin/routine-versions"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Version Rollback & Diff
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/dashboard/courses"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Curriculum Master Catalog
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
