"use client";

import React from "react";
import Link from "next/link";
import { ClassSession, ConflictDetail } from "@/types";
import { Drawer } from "@/ui/Drawer";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  Lock,
  Unlock,
  MapPin,
  Clock,
  User,
  GraduationCap,
  Calendar,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { formatTimeString } from "@/lib/utils";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useToast } from "@/ui/Toast";

interface CourseDetailDrawerProps {
  session: ClassSession | null;
  isOpen: boolean;
  onClose: () => void;
  conflicts?: ConflictDetail[];
}

export const CourseDetailDrawer: React.FC<CourseDetailDrawerProps> = ({
  session,
  isOpen,
  onClose,
  conflicts = [],
}) => {
  const { lockedSections, lockSection, unlockSection } = useScheduleStore();
  const { showToast } = useToast();

  if (!session) return null;

  const isLocked =
    lockedSections[session.courseCode]?.batch === session.batch &&
    lockedSections[session.courseCode]?.section === session.section;

  // Filter clashes involving this session
  const relevantConflicts = conflicts.filter(
    (c) => c.sessionA.id === session.id || c.sessionB.id === session.id
  );

  const handleToggleLock = () => {
    if (isLocked) {
      unlockSection(session.courseCode);
      showToast(`Unlocked ${session.courseCode} Section ${session.section}`, "info");
    } else {
      lockSection(session.courseCode, session.batch, session.section);
      showToast(`Locked ${session.courseCode} to Batch ${session.batch} Sec ${session.section}`, "success");
    }
  };

  const courseSlug = session.courseCode.toLowerCase().replace(/\s+/g, "-");

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">
            {session.courseCode}
          </span>
          <Badge
            variant={
              session.enrollmentType === "Improvement"
                ? "improvement"
                : session.enrollmentType === "Retake"
                ? "retake"
                : "regular"
            }
          >
            {session.enrollmentType || "Regular"}
          </Badge>
        </div>
      }
      description={session.courseName}
      footer={
        <div className="flex items-center justify-between w-full">
          <Link href={`/dashboard/courses/${courseSlug}`} onClick={onClose}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <span>View Course</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <Button
            variant={isLocked ? "secondary" : "primary"}
            size="sm"
            onClick={handleToggleLock}
            className="gap-1.5"
          >
            {isLocked ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Section</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Section</span>
              </>
            )}
          </Button>
        </div>
      }
    >
      {/* Clash warning banner if conflict exists */}
      {relevantConflicts.length > 0 && (
        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-xs text-red-700 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>Schedule Conflict Detected</span>
          </div>
          {relevantConflicts.map((conf) => (
            <p key={conf.id} className="text-xs text-red-600 dark:text-red-300">
              {conf.description}
            </p>
          ))}
        </div>
      )}

      {/* Lock explanation badge */}
      {isLocked && (
        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-700 dark:text-indigo-300 flex items-start gap-2">
          <Lock className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
          <span>
            This section is pinned. SlotSync will keep Batch {session.batch} Section {session.section} fixed while optimizing remaining courses.
          </span>
        </div>
      )}

      {/* Session Details Grid */}
      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Course Type</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{session.type}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Credits</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {session.type === "Lab" ? "1.5 Credits" : "3.0 Credits"}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Assigned Batch</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">Batch {session.batch}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Section</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">Section {session.section}</span>
          </div>
        </div>

        {/* Schedule & Timing */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Schedule & Venue
          </h4>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Class Day</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{session.day}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Time Slot</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {formatTimeString(session.startTime)} – {formatTimeString(session.endTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Assigned Room</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{session.room}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Course Instructor</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {session.faculty || "To Be Assigned"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
