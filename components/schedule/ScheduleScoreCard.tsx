"use client";

import React, { useState } from "react";
import { GeneratedSchedule } from "@/types";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { formatDuration } from "@/lib/utils";
import {
  Sparkles,
  Bookmark,
  GitCompare,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useToast } from "@/ui/Toast";
import { cn } from "@/lib/utils";

interface ScheduleScoreCardProps {
  schedule: GeneratedSchedule;
  isSelected?: boolean;
  onSelect?: () => void;
  onViewRoutine?: () => void;
}

export const ScheduleScoreCard: React.FC<ScheduleScoreCardProps> = ({
  schedule,
  isSelected = false,
  onSelect,
  onViewRoutine,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { savedSchedules, saveSchedule, comparisonScheduleIds, toggleComparisonSchedule } =
    useScheduleStore();
  const { showToast } = useToast();

  const isSaved = savedSchedules.some((s) => s.schedule.id === schedule.id);
  const isCompared = comparisonScheduleIds.includes(schedule.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSaved) {
      saveSchedule(schedule);
      showToast(`Saved "${schedule.title}" to your saved routines!`, "success");
    } else {
      showToast(`Schedule is already saved.`, "info");
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComparisonSchedule(schedule.id);
    if (!isCompared) {
      showToast(`Added "${schedule.title}" to comparison.`, "info");
    } else {
      showToast(`Removed from comparison.`, "info");
    }
  };

  // Circular Score calculations (SVG circle with strokeDashoffset)
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (schedule.score / 100) * circumference;

  return (
    <div
      onClick={onSelect}
      className={cn(
        "p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover-card-lift relative overflow-hidden",
        isSelected
          ? "border-indigo-500 ring-2 ring-indigo-500/20 bg-white dark:bg-[#121625] shadow-lg dark:shadow-indigo-950/40"
          : schedule.isRecommended
          ? "border-indigo-300 dark:border-indigo-500/40 bg-indigo-50/20 dark:bg-[#101423] hover:border-indigo-400 dark:hover:border-indigo-400/60 shadow-xs"
          : "border-stone-200 dark:border-white/10 bg-white dark:bg-[#10131C] hover:border-indigo-300 dark:hover:border-indigo-500/40 shadow-xs"
      )}
    >
      {/* Top row: Title + Badges + Circular SVG Score */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#20232E] dark:text-[#F4F5FA] text-base truncate">
              {schedule.title}
            </h4>
            {schedule.isRecommended && (
              <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#6554D9]/30 dark:border-[#8B8CFF]/40 bg-[#EEF2FF] dark:bg-[#1A1F35] text-[#6554D9] dark:text-[#8B8CFF] shrink-0">
                <Sparkles className="w-3 h-3" />
                Recommended
              </span>
            )}
          </div>

          {/* Consistent Metric Order: 1. Campus Days, 2. Idle Time, 3. Conflict Count, 4. Preference Match */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs">
            {/* Metric 1: Campus Days */}
            <span className="flex items-center gap-1 font-semibold text-[#20232E] dark:text-[#CBD5E1] bg-[#F0ECE5] dark:bg-white/5 px-2 py-0.5 rounded-md border border-[#E6E0D8]/80 dark:border-white/5">
              <Calendar className="w-3.5 h-3.5 text-[#6554D9] dark:text-[#8B8CFF]" />
              {schedule.metrics.campusDays} Campus Days
            </span>

            {/* Metric 2: Idle Time */}
            <span className="flex items-center gap-1 font-mono text-[#475467] dark:text-[#CBD5E1] bg-[#F0ECE5] dark:bg-white/5 px-2 py-0.5 rounded-md border border-[#E6E0D8]/80 dark:border-white/5">
              <Clock className="w-3.5 h-3.5 text-[#667085] dark:text-[#9DA7BB]" />
              {formatDuration(schedule.metrics.weeklyGapMinutes)} Idle Gap
            </span>

            {/* Metric 3: Conflict Count */}
            {schedule.metrics.conflictCount === 0 ? (
              <Badge variant="success" size="sm">
                0 Conflicts
              </Badge>
            ) : (
              <Badge variant="conflict" size="sm">
                {schedule.metrics.conflictCount} Clashes
              </Badge>
            )}

            {/* Metric 4: Preference Match */}
            {schedule.metrics.preferenceMatchScore && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#EEF2FF] dark:bg-[#1A1F35] text-[#6554D9] dark:text-[#8B8CFF] border border-[#6554D9]/20">
                {schedule.metrics.preferenceMatchScore}% Pref Match
              </span>
            )}
          </div>
        </div>

        {/* Circular Schedule Fit Score (Section 40) */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
              {/* Background Track */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                className="stroke-stone-200 dark:stroke-slate-800"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress Bar */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                className={cn(
                  schedule.score >= 90
                    ? "stroke-emerald-500"
                    : schedule.score >= 75
                    ? "stroke-indigo-500"
                    : "stroke-amber-500"
                )}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
              />
            </svg>
            <span
              className={cn(
                "absolute font-mono font-bold text-sm",
                schedule.score >= 90
                  ? "text-emerald-600 dark:text-emerald-400"
                  : schedule.score >= 75
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-amber-600 dark:text-amber-400"
              )}
            >
              {schedule.score}
            </span>
          </div>
          <span className="text-[10px] text-stone-400 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
            Schedule Fit
          </span>
        </div>
      </div>

      {/* Selected Sections Mapping */}
      {Object.keys(schedule.selectedSections).length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-white/10 flex flex-wrap gap-2">
          {Object.entries(schedule.selectedSections).map(([course, sec]) => (
            <span
              key={course}
              className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-slate-300 flex items-center gap-1.5 border border-stone-200/60 dark:border-white/5"
            >
              <span className="font-semibold">{course}:</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                Batch {sec.batch}-{sec.section}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Why this schedule explanation bullets (Section 41) */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-white/10">
        <h5 className="text-xs font-semibold text-stone-900 dark:text-slate-100 mb-2">
          Why this schedule?
        </h5>
        <ul className="space-y-1.5">
          {schedule.reasons.map((reason, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-stone-600 dark:text-slate-300">
              <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-[10px]">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Scoring details */}
      <div className="mt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 font-medium cursor-pointer"
        >
          <span>{showDetails ? "Hide scoring breakdown" : "See scoring breakdown"}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showDetails && (
          <div className="mt-3 p-3.5 rounded-xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/10 space-y-2.5 text-xs animate-in fade-in duration-150">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-slate-400">Conflict Score</span>
              <div className="flex items-center gap-2 font-mono font-medium">
                <div className="w-24 h-1.5 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${schedule.metrics.conflictScore}%` }}
                  />
                </div>
                <span>{schedule.metrics.conflictScore}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-slate-400">Campus Day Efficiency</span>
              <div className="flex items-center gap-2 font-mono font-medium">
                <div className="w-24 h-1.5 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${schedule.metrics.campusDayEfficiency}%` }}
                  />
                </div>
                <span>{schedule.metrics.campusDayEfficiency}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-slate-400">Gap Efficiency</span>
              <div className="flex items-center gap-2 font-mono font-medium">
                <div className="w-24 h-1.5 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${schedule.metrics.gapEfficiencyScore}%` }}
                  />
                </div>
                <span>{schedule.metrics.gapEfficiencyScore}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-slate-400">Preference Match</span>
              <div className="flex items-center gap-2 font-mono font-medium">
                <div className="w-24 h-1.5 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${schedule.metrics.preferenceMatchScore}%` }}
                  />
                </div>
                <span>{schedule.metrics.preferenceMatchScore}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-white/10 flex items-center justify-between gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onViewRoutine?.();
          }}
          className="text-xs"
        >
          View Timetable
        </Button>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isCompared ? "subtle" : "ghost"}
            onClick={handleToggleCompare}
            className="text-xs gap-1"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompared ? "Compared" : "Compare"}</span>
          </Button>

          <Button
            size="sm"
            variant={isSaved ? "secondary" : "primary"}
            onClick={handleSave}
            className="text-xs gap-1.5 shadow-2xs"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? "Saved" : "Save Schedule"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
