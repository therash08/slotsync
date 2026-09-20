"use client";

import React from "react";
import { ClassSession, ConflictDetail } from "@/types";
import { Badge } from "@/ui/Badge";
import { AlertTriangle, MapPin, User, Clock, Lock } from "lucide-react";
import { formatTimeString, cn } from "@/lib/utils";

interface CalendarCourseBlockProps {
  session: ClassSession;
  conflicts?: ConflictDetail[];
  isLocked?: boolean;
  onClick?: (session: ClassSession) => void;
  compact?: boolean;
}

export const CalendarCourseBlock: React.FC<CalendarCourseBlockProps> = ({
  session,
  conflicts = [],
  isLocked = false,
  onClick,
  compact = false,
}) => {
  // Check if this session is involved in any conflict
  const hasConflict = conflicts.some(
    (c) => c.sessionA.id === session.id || c.sessionB.id === session.id
  );

  // Find clash partner if any
  const conflictDetail = conflicts.find(
    (c) => c.sessionA.id === session.id || c.sessionB.id === session.id
  );
  const clashPartner = conflictDetail
    ? conflictDetail.sessionA.id === session.id
      ? conflictDetail.sessionB
      : conflictDetail.sessionA
    : null;

  const enrollmentType = session.enrollmentType || "Regular";

  return (
    <div
      onClick={() => onClick?.(session)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(session);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${session.courseCode} ${session.courseName}, ${session.day} from ${formatTimeString(session.startTime)} to ${formatTimeString(session.endTime)}${hasConflict ? ", conflict detected" : ""}`}
      className={cn(
        "group relative text-left rounded-xl transition-all duration-150 cursor-pointer border select-none hover-card-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6554D9] dark:focus-visible:ring-[#8B8CFF]",
        hasConflict
          ? "border-red-400 dark:border-red-600/90 bg-red-50/95 dark:bg-[#200A10] bg-conflict-pattern shadow-xs ring-1 ring-red-400/60"
          : enrollmentType === "Improvement"
          ? "border-[#6554D9]/30 dark:border-[#8B8CFF]/30 bg-[#F5F3FF] dark:bg-[#15182B] shadow-2xs hover:border-[#6554D9] dark:hover:border-[#8B8CFF]"
          : enrollmentType === "Retake"
          ? "border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-[#1C1610] shadow-2xs hover:border-amber-400 dark:hover:border-amber-600"
          : "border-[#E6E0D8] dark:border-white/10 bg-[#FFFDFA] dark:bg-[#121522] shadow-2xs hover:border-[#D8D2C8] dark:hover:border-white/20",
        compact ? "p-2 text-xs" : "p-3"
      )}
    >
      {/* Top row: Code + Badges */}
      <div className="flex items-center justify-between gap-1.5 mb-1">
        <span className="font-mono font-bold text-xs tracking-tight text-[#20232E] dark:text-[#F4F5FA] flex items-center gap-1">
          {session.courseCode}
          {isLocked && (
            <span title={`Section ${session.section} is locked in this schedule`}>
              <Lock className="w-3 h-3 text-[#6554D9] dark:text-[#8B8CFF]" />
            </span>
          )}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          {hasConflict && (
            <span
              className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white shadow-xs"
              title="Time overlap conflict detected"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Clash</span>
            </span>
          )}

          {!hasConflict && enrollmentType !== "Regular" && (
            <Badge
              variant={enrollmentType === "Improvement" ? "improvement" : "retake"}
              size="sm"
            >
              {enrollmentType}
            </Badge>
          )}

          {!hasConflict && enrollmentType === "Regular" && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F0ECE5] dark:bg-white/10 text-[#475467] dark:text-[#CBD5E1] border border-[#E6E0D8]/80 dark:border-white/5">
              Sec {session.section}
            </span>
          )}
        </div>
      </div>

      {/* Course Title */}
      <p className="text-xs font-medium text-[#20232E] dark:text-[#F4F5FA] line-clamp-1 mb-1.5">
        {session.courseName}
      </p>

      {/* Metadata: Time + Room */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-[#667085] dark:text-[#9DA7BB] gap-y-1">
        <span className="flex items-center gap-1 font-mono">
          <Clock className="w-3 h-3 text-[#667085] dark:text-[#9DA7BB] shrink-0" />
          {formatTimeString(session.startTime)} – {formatTimeString(session.endTime)}
        </span>

        <span className="flex items-center gap-1 font-medium text-[#475467] dark:text-[#CBD5E1]">
          <MapPin className="w-3 h-3 text-[#667085] dark:text-[#9DA7BB] shrink-0" />
          {session.room}
        </span>
      </div>

      {/* Conflict description snippet if clashing */}
      {hasConflict && clashPartner && (
        <div className="mt-2 pt-1.5 border-t border-red-200 dark:border-red-900/60 text-[10px] text-red-700 dark:text-red-300 flex items-center justify-between">
          <span className="truncate">
            Overlaps with <strong>{clashPartner.courseCode}</strong> ({clashPartner.section})
          </span>
          <span className="text-red-600 dark:text-red-400 font-semibold underline shrink-0 ml-1">
            Resolve →
          </span>
        </div>
      )}

      {/* Faculty on non-compact */}
      {!compact && !hasConflict && session.faculty && (
        <div className="mt-2 pt-1.5 border-t border-[#E6E0D8]/60 dark:border-white/5 flex items-center justify-between text-[10px] text-[#667085] dark:text-[#9DA7BB]">
          <span className="flex items-center gap-1 truncate">
            <User className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{session.faculty}</span>
          </span>
          <span className="shrink-0 font-mono text-[10px] text-[#667085] dark:text-[#9DA7BB]">
            B{session.batch}-S{session.section}
          </span>
        </div>
      )}
    </div>
  );
};
