import { ClassSession } from "@/types";
import { getRoutineForCohort, getOfferingsForDepartment } from "@/lib/mock-data/academic-catalog";

/**
 * Service function: Fetch regular semester routine for a student's batch & section
 * Simulates: GET /api/routines/current/
 */
export async function getCurrentRoutine(
  batch: string = "62",
  section: string = "A",
  dept: string = "CSE"
): Promise<ClassSession[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getRoutineForCohort(dept, batch, section);
}

/**
 * Service function: Fetch all offerings for retake/improvement
 * Simulates: GET /api/routines/offerings/
 */
export async function getAllOfferings(dept: string = "CSE"): Promise<ClassSession[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return getOfferingsForDepartment(dept);
}
