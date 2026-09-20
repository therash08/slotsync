import { ClassSession, ConflictDetail } from "@/types";
import { timeToMinutes, minutesToFormattedTime, formatTimeString } from "@/lib/utils";

/**
 * Checks if two class sessions conflict in time on the same day.
 * Formula:
 * sessionA.day === sessionB.day AND
 * sessionA.startTime < sessionB.endTime AND
 * sessionB.startTime < sessionA.endTime
 */
export function sessionsDoOverlap(sessionA: ClassSession, sessionB: ClassSession): boolean {
  if (sessionA.day !== sessionB.day) return false;
  if (sessionA.id === sessionB.id) return false;

  const aStart = timeToMinutes(sessionA.startTime);
  const aEnd = timeToMinutes(sessionA.endTime);
  const bStart = timeToMinutes(sessionB.startTime);
  const bEnd = timeToMinutes(sessionB.endTime);

  return aStart < bEnd && bStart < aEnd;
}

/**
 * Creates a detailed ConflictDetail object between two sessions
 */
export function buildConflictDetail(sessionA: ClassSession, sessionB: ClassSession): ConflictDetail {
  const aStart = timeToMinutes(sessionA.startTime);
  const aEnd = timeToMinutes(sessionA.endTime);
  const bStart = timeToMinutes(sessionB.startTime);
  const bEnd = timeToMinutes(sessionB.endTime);

  const overlapStartMins = Math.max(aStart, bStart);
  const overlapEndMins = Math.min(aEnd, bEnd);

  const overlapStart = minutesToFormattedTime(overlapStartMins);
  const overlapEnd = minutesToFormattedTime(overlapEndMins);

  const description = `${sessionA.courseCode} (${sessionA.batch}-${sessionA.section}) overlaps with ${sessionB.courseCode} (${sessionB.batch}-${sessionB.section}) on ${sessionA.day} from ${overlapStart} to ${overlapEnd}.`;

  return {
    id: `conflict-${sessionA.id}-${sessionB.id}`,
    sessionA,
    sessionB,
    day: sessionA.day,
    overlapStart,
    overlapEnd,
    description,
    reason: "time_overlap",
  };
}

/**
 * Detects all conflicting pairs among an array of sessions
 */
export function detectAllConflicts(sessions: ClassSession[]): ConflictDetail[] {
  const conflicts: ConflictDetail[] = [];
  const seenPairs = new Set<string>();

  for (let i = 0; i < sessions.length; i++) {
    for (let j = i + 1; j < sessions.length; j++) {
      const sessionA = sessions[i];
      const sessionB = sessions[j];

      if (sessionsDoOverlap(sessionA, sessionB)) {
        const pairKey = [sessionA.id, sessionB.id].sort().join("-");
        if (!seenPairs.has(pairKey)) {
          seenPairs.add(pairKey);
          conflicts.push(buildConflictDetail(sessionA, sessionB));
        }
      }
    }
  }

  return conflicts;
}

/**
 * Checks if a specific candidate session list (e.g. all sessions of CSE 2203 Section A)
 * conflicts with a baseline routine.
 */
export function checkCandidateClashes(
  candidateSessions: ClassSession[],
  routine: ClassSession[]
): ConflictDetail[] {
  const conflicts: ConflictDetail[] = [];
  for (const cand of candidateSessions) {
    for (const base of routine) {
      if (sessionsDoOverlap(cand, base)) {
        conflicts.push(buildConflictDetail(cand, base));
      }
    }
  }
  return conflicts;
}
