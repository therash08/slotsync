import {
  ClassSession,
  SelectedCourse,
  SchedulePreference,
  GeneratedSchedule,
} from "@/types";
import { detectAllConflicts } from "./conflict";
import { calculateScheduleMetrics } from "./metrics";
import { formatDuration } from "@/lib/utils";

interface SectionOption {
  courseCode: string;
  batch: string;
  section: string;
  sessions: ClassSession[];
}

/**
 * Optimizes semester schedule by finding the best section combinations
 * for retake/improvement courses that fit seamlessly into the student's existing routine.
 */
export function generateOptimizedSchedules(
  baseRoutine: ClassSession[],
  selectedCourses: SelectedCourse[],
  availableOfferings: ClassSession[],
  preferences: SchedulePreference,
  lockedSections: Record<string, { batch: string; section: string }> = {}
): GeneratedSchedule[] {
  // If no selected courses, just evaluate the base routine
  if (selectedCourses.length === 0) {
    const conflicts = detectAllConflicts(baseRoutine);
    const metrics = calculateScheduleMetrics(baseRoutine, conflicts.length, preferences);
    return [
      {
        id: "schedule-base",
        title: "Current Regular Routine",
        isRecommended: true,
        score: metrics.score,
        metrics,
        sessions: baseRoutine,
        conflicts,
        selectedSections: {},
        reasons: [
          "Baseline regular semester schedule",
          `${metrics.campusDays} campus days with ${formatDuration(metrics.weeklyGapMinutes)} idle gap`,
          conflicts.length === 0 ? "Zero internal conflicts" : `${conflicts.length} internal clash(es) detected`,
        ],
      },
    ];
  }

  // 1. Group available offerings by courseCode -> Array of SectionOptions
  const courseSectionOptions: Record<string, SectionOption[]> = {};

  for (const sel of selectedCourses) {
    const courseOfferings = availableOfferings.filter(
      (off) => off.courseCode.toUpperCase() === sel.courseCode.toUpperCase()
    );

    // Group by batch + section
    const grouped: Record<string, ClassSession[]> = {};
    for (const off of courseOfferings) {
      const key = `${off.batch}-${off.section}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({
        ...off,
        enrollmentType: sel.enrollmentType,
      });
    }

    let options: SectionOption[] = Object.entries(grouped).map(([key, sessions]) => {
      const [batch, section] = key.split("-");
      return {
        courseCode: sel.courseCode,
        batch,
        section,
        sessions,
      };
    });

    // If locked, filter down to only the locked section
    const locked = lockedSections[sel.courseCode];
    if (locked) {
      options = options.filter(
        (opt) => opt.batch === locked.batch && opt.section === locked.section
      );
    }

    // Filter by preferred batches if specified
    if (preferences.preferredBatches && preferences.preferredBatches.length > 0) {
      const filtered = options.filter((opt) =>
        preferences.preferredBatches.includes(opt.batch)
      );
      if (filtered.length > 0) {
        options = filtered;
      }
    }

    courseSectionOptions[sel.courseCode] = options;
  }

  // 2. Compute Cartesian product of section options
  const courseCodes = selectedCourses.map((c) => c.courseCode);
  const optionLists = courseCodes.map((code) => courseSectionOptions[code] || []);

  // Simple cartesian product
  function cartesian(arrays: SectionOption[][]): SectionOption[][] {
    return arrays.reduce<SectionOption[][]>(
      (acc, curr) => acc.flatMap((x) => curr.map((y) => [...x, y])),
      [[]]
    );
  }

  const combinations = cartesian(optionLists);

  // 3. Evaluate each combination
  const candidateSchedules: GeneratedSchedule[] = [];

  for (let idx = 0; idx < combinations.length; idx++) {
    const combo = combinations[idx];
    const comboSessions: ClassSession[] = [];
    const sectionMap: Record<string, { batch: string; section: string }> = {};

    for (const sec of combo) {
      comboSessions.push(...sec.sessions);
      sectionMap[sec.courseCode] = { batch: sec.batch, section: sec.section };
    }

    const allSessions = [...baseRoutine, ...comboSessions];
    const conflicts = detectAllConflicts(allSessions);
    const metrics = calculateScheduleMetrics(allSessions, conflicts.length, preferences);

    // Build explanatory reasons
    const reasons: string[] = [];
    if (conflicts.length === 0) {
      reasons.push("Zero class conflicts across all regular and retake courses");
    } else {
      reasons.push(`${conflicts.length} overlapping schedule conflict(s) detected`);
    }

    if (metrics.campusDays <= 4) {
      reasons.push(`Compact ${metrics.campusDays}-day campus week (Free days: ${metrics.offDays.join(", ") || "None"})`);
    } else {
      reasons.push(`${metrics.campusDays} campus days required`);
    }

    reasons.push(`Total weekly idle gap: ${formatDuration(metrics.weeklyGapMinutes)}`);

    if (metrics.eveningClassCount === 0) {
      reasons.push("No classes scheduled after 5:00 PM");
    }

    if (metrics.earlyMorningCount === 0) {
      reasons.push("No early 8:00 AM morning classes");
    }

    candidateSchedules.push({
      id: `generated-sched-${idx + 1}`,
      title: `Schedule Option ${idx + 1}`,
      score: metrics.score,
      metrics,
      sessions: allSessions,
      conflicts,
      selectedSections: sectionMap,
      reasons,
    });
  }

  // 4. Sort candidates: Zero-conflict schedules first, then highest score
  candidateSchedules.sort((a, b) => {
    if (a.conflicts.length === 0 && b.conflicts.length > 0) return -1;
    if (a.conflicts.length > 0 && b.conflicts.length === 0) return 1;
    return b.score - a.score;
  });

  // Assign titles & mark recommended top choice
  if (candidateSchedules.length > 0) {
    candidateSchedules[0].isRecommended = true;
    candidateSchedules[0].title = `Schedule #1 (Recommended)`;
  }

  for (let i = 1; i < candidateSchedules.length; i++) {
    candidateSchedules[i].title = `Schedule #${i + 1}`;
  }

  // Return top 8 best variations
  return candidateSchedules.slice(0, 8);
}
