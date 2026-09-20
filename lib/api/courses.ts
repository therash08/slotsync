import { Course, ClassSession } from "@/types";
import { ACADEMIC_CATALOG, getCatalogCourses } from "@/lib/mock-data/academic-catalog";

export interface CourseFilterParams {
  search?: string;
  semester?: number;
  department?: string;
  type?: "Theory" | "Lab";
}

/**
 * Service function: Fetch course catalog with search and filters
 * Simulates: GET /api/courses/
 */
export async function getCourses(filters?: CourseFilterParams): Promise<Course[]> {
  // Simulating micro network latency
  await new Promise((resolve) => setTimeout(resolve, 80));

  let results: Course[] = [];
  if (filters?.department) {
    results = [...getCatalogCourses(filters.department)];
  } else {
    results = Object.values(ACADEMIC_CATALOG).flatMap((dept) => dept.courses);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
    );
  }

  if (filters?.semester && filters.semester > 0) {
    results = results.filter((c) => c.semester === filters.semester);
  }

  if (filters?.type) {
    results = results.filter((c) => c.type === filters.type);
  }

  return results;
}

/**
 * Service function: Fetch course details by code
 * Simulates: GET /api/courses/{code}/
 */
export async function getCourseByCode(code: string): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const normalized = code.replace(/-/g, " ").toUpperCase();
  for (const dept of Object.values(ACADEMIC_CATALOG)) {
    const match = dept.courses.find(
      (c) =>
        c.code.toUpperCase() === normalized ||
        c.id.toLowerCase() === code.toLowerCase()
    );
    if (match) return match;
  }
  return null;
}

/**
 * Service function: Fetch all scheduled sections/offerings for a course
 * Simulates: GET /api/courses/{code}/sections/
 */
export async function getCourseOfferings(code: string): Promise<ClassSession[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const normalized = code.replace(/-/g, " ").toUpperCase();
  const allSessions: ClassSession[] = Object.values(ACADEMIC_CATALOG).flatMap((dept) => [
    ...Object.values(dept.routines).flat(),
    ...dept.offerings,
  ]);
  return allSessions.filter((s) => s.courseCode.toUpperCase() === normalized);
}
