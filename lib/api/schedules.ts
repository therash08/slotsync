import {
  ClassSession,
  SelectedCourse,
  SchedulePreference,
  GeneratedSchedule,
  SavedSchedule,
} from "@/types";
import { generateOptimizedSchedules } from "@/lib/schedule/optimizer";
import { getAllOfferings } from "./routines";

/**
 * Service function: Generate schedule combinations using optimization engine
 * Simulates: POST /api/schedules/generate/
 */
export async function generateSchedules(
  baseRoutine: ClassSession[],
  selectedCourses: SelectedCourse[],
  preferences: SchedulePreference,
  lockedSections: Record<string, { batch: string; section: string }> = {}
): Promise<GeneratedSchedule[]> {
  // Realistic calculation delay for frontend loader
  await new Promise((resolve) => setTimeout(resolve, 350));
  const offerings = await getAllOfferings();
  return generateOptimizedSchedules(
    baseRoutine,
    selectedCourses,
    offerings,
    preferences,
    lockedSections
  );
}
