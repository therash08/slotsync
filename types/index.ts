import { DayOfWeek } from "@/lib/utils";

export type CourseType = "Theory" | "Lab";
export type EnrollmentType = "Regular" | "Retake" | "Improvement";
export type ClassTimePreference = "Morning" | "Afternoon" | "No Preference";

export interface UserProfile {
  id: string;
  studentId: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  university: string;
  department: string;
  program: string;
  batch: string;
  semester: number;
  section: string;
  academicYear: string;
  role: "student" | "admin";
  onboardingCompleted: boolean;
}

export interface Department {
  id: string;
  code: string;
  name: string;
}

export interface Batch {
  id: string;
  number: string;
  departmentId: string;
  admissionYear: number;
  currentSemester: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  department: string;
  type: CourseType;
  prerequisites?: string[];
  description?: string;
  provenance?: "verified" | "demo";
}

export interface ClassSession {
  id: string;
  courseCode: string;
  courseName: string;
  batch: string;
  section: string;
  type: CourseType;
  day: DayOfWeek;
  startTime: string; // "HH:mm" (24h)
  endTime: string;   // "HH:mm" (24h)
  room: string;
  faculty: string;
  enrollmentType?: EnrollmentType;
  provenance?: "verified" | "demo";
}

export interface CourseSection {
  sectionId: string;
  courseCode: string;
  batch: string;
  section: string;
  faculty?: string;
  sessions: ClassSession[];
  provenance?: "verified" | "demo";
}

export interface SelectedCourse {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  type: CourseType;
  enrollmentType: "Retake" | "Improvement";
  targetBatch?: string;
  targetSection?: string;
  selectedSection?: CourseSection;
  isLocked?: boolean;
}

export interface ConflictDetail {
  id: string;
  sessionA: ClassSession;
  sessionB: ClassSession;
  day: DayOfWeek;
  overlapStart: string;
  overlapEnd: string;
  description: string;
  reason: "time_overlap" | "same_course" | "room_overlap";
}

export interface SchedulePreference {
  minCampusDays: number;         // e.g. 4
  minWeeklyIdleTime: boolean;    // minimize gaps
  avoidEarlyMorning: boolean;    // avoid classes at 8:00 AM
  avoidEveningClasses: boolean;  // avoid classes after 17:00
  preferredClassTime: ClassTimePreference;
  preferredOffDay: DayOfWeek | "None";
  maxClassesPerDay: number;      // e.g. 4
  preferredBatches: string[];    // e.g. ["62", "63"]
  preferredSections: string[];   // e.g. ["A", "B", "C"]
}

export interface ScheduleMetrics {
  score: number;                 // 0 to 100
  conflictCount: number;
  campusDays: number;
  weeklyGapMinutes: number;
  earlyMorningCount: number;     // starts <= 08:30
  eveningClassCount: number;     // ends >= 17:00
  totalCourses: number;
  totalCredits: number;
  offDays: DayOfWeek[];
  conflictScore: number;         // 0 to 100
  gapEfficiencyScore: number;    // 0 to 100
  campusDayEfficiency: number;   // 0 to 100
  preferenceMatchScore: number;  // 0 to 100
}

export interface GeneratedSchedule {
  id: string;
  title: string;
  isRecommended?: boolean;
  score: number;
  metrics: ScheduleMetrics;
  sessions: ClassSession[];
  conflicts: ConflictDetail[];
  selectedSections: Record<string, { batch: string; section: string }>; // courseCode -> {batch, section}
  reasons: string[];
  daysWithClasses?: number;
  weeklyIdleMinutes?: number;
  conflictCount?: number;
  satisfactionScore?: number;
}

export interface SavedSchedule {
  id: string;
  title: string;
  savedAt: string;
  tags?: string[];
  schedule: GeneratedSchedule;
  isPrimary?: boolean;
  sessions?: ClassSession[];
  daysWithClasses?: number;
  weeklyIdleMinutes?: number;
  conflictCount?: number;
  satisfactionScore?: number;
}

export interface RoutineVersion {
  id: string;
  versionNumber: string;
  semester: string;
  publishedAt: string;
  publishedBy: string;
  status: "Current" | "Archived" | "Draft";
  changeSummary: string;
  sessionsCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "conflict" | "routine_update" | "section_available" | "system";
  actionUrl?: string;
  actionText?: string;
}

export interface RoutineValidationRow {
  id: string;
  department: string;
  batch: string;
  semester: number;
  section: string;
  courseCode: string;
  courseName: string;
  type: CourseType;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  faculty: string;
  status: "valid" | "warning" | "error";
  issues?: string[];
}
