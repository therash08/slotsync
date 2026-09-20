import { ClassSession, ScheduleMetrics, SchedulePreference } from "@/types";
import { timeToMinutes, WEEKDAYS, DayOfWeek } from "@/lib/utils";

/**
 * Calculates comprehensive schedule metrics for a given set of class sessions
 */
export function calculateScheduleMetrics(
  sessions: ClassSession[],
  conflictCount: number,
  preferences?: Partial<SchedulePreference>
): ScheduleMetrics {
  // 1. Unique campus days and off days
  const activeDays = new Set<DayOfWeek>();
  sessions.forEach((s) => activeDays.add(s.day));
  const campusDays = activeDays.size;
  const offDays = WEEKDAYS.filter((d) => !activeDays.has(d));

  // 2. Weekly idle gap calculation
  let totalWeeklyGapMinutes = 0;
  let earlyMorningCount = 0;
  let eveningClassCount = 0;

  for (const day of activeDays) {
    const daySessions = sessions
      .filter((s) => s.day === day)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    for (let i = 0; i < daySessions.length; i++) {
      const current = daySessions[i];
      const startMins = timeToMinutes(current.startTime);
      const endMins = timeToMinutes(current.endTime);

      if (startMins <= 510) { // 8:30 AM
        earlyMorningCount++;
      }
      if (endMins >= 1020) { // 5:00 PM
        eveningClassCount++;
      }

      if (i < daySessions.length - 1) {
        const next = daySessions[i + 1];
        const nextStartMins = timeToMinutes(next.startTime);
        const gap = nextStartMins - endMins;
        if (gap > 0) {
          totalWeeklyGapMinutes += gap;
        }
      }
    }
  }

  // 3. Unique courses and credits calculation
  const uniqueCourseCodes = new Set<string>();
  sessions.forEach((s) => uniqueCourseCodes.add(s.courseCode));
  const totalCourses = uniqueCourseCodes.size;
  // Approximation of credits: average 2.5 per session group or calculated from known list
  const totalCredits = Math.round(totalCourses * 3);

  // 4. Component score calculations (0 - 100)
  // Conflict Score: Any conflict penalizes drastically
  const conflictScore = conflictCount === 0 ? 100 : Math.max(0, 100 - conflictCount * 50);

  // Gap Efficiency: 0 to 120 mins = 90-100, > 240 mins drops
  let gapEfficiencyScore = 100;
  if (totalWeeklyGapMinutes > 300) {
    gapEfficiencyScore = Math.max(40, 100 - Math.floor((totalWeeklyGapMinutes - 300) / 10));
  } else if (totalWeeklyGapMinutes > 120) {
    gapEfficiencyScore = Math.max(70, 100 - Math.floor((totalWeeklyGapMinutes - 120) / 15));
  }

  // Campus Day Efficiency
  const targetDays = preferences?.minCampusDays || 4;
  let campusDayEfficiency = 95;
  if (campusDays <= targetDays) {
    campusDayEfficiency = 100;
  } else {
    campusDayEfficiency = Math.max(60, 100 - (campusDays - targetDays) * 20);
  }

  // Preference Match Score
  let preferenceScore = 90;
  if (preferences?.avoidEarlyMorning && earlyMorningCount > 0) {
    preferenceScore -= earlyMorningCount * 12;
  }
  if (preferences?.avoidEveningClasses && eveningClassCount > 0) {
    preferenceScore -= eveningClassCount * 15;
  }
  if (preferences?.preferredOffDay && preferences.preferredOffDay !== "None") {
    if (offDays.includes(preferences.preferredOffDay)) {
      preferenceScore = Math.min(100, preferenceScore + 10);
    } else {
      preferenceScore -= 10;
    }
  }
  const preferenceMatchScore = Math.max(40, Math.min(100, preferenceScore));

  // Overall aggregate score
  const overallScore = Math.round(
    conflictScore * 0.4 +
    campusDayEfficiency * 0.25 +
    gapEfficiencyScore * 0.2 +
    preferenceMatchScore * 0.15
  );

  return {
    score: overallScore,
    conflictCount,
    campusDays,
    weeklyGapMinutes: totalWeeklyGapMinutes,
    earlyMorningCount,
    eveningClassCount,
    totalCourses,
    totalCredits,
    offDays,
    conflictScore,
    gapEfficiencyScore,
    campusDayEfficiency,
    preferenceMatchScore,
  };
}
