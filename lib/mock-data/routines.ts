import { Department, Batch, UserProfile } from "@/types";

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "dept-cse", code: "CSE", name: "Computer Science & Engineering" },
  { id: "dept-eee", code: "EEE", name: "Electrical & Electronic Engineering" },
  { id: "dept-bba", code: "BBA", name: "Business Administration" },
  { id: "dept-ce", code: "CE", name: "Civil Engineering" },
];

export const MOCK_BATCHES: Batch[] = [
  { id: "batch-60", number: "60", departmentId: "dept-cse", admissionYear: 2024, currentSemester: 6 },
  { id: "batch-61", number: "61", departmentId: "dept-cse", admissionYear: 2024, currentSemester: 5 },
  { id: "batch-62", number: "62", departmentId: "dept-cse", admissionYear: 2025, currentSemester: 3 },
  { id: "batch-63", number: "63", departmentId: "dept-cse", admissionYear: 2025, currentSemester: 2 },
];

export const MOCK_SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const LEADING_UNIVERSITY_NAME = "Leading University";

export const SEEDED_DEMO_USER: UserProfile = {
  id: "user-rash",
  studentId: "02212020088",
  name: "RASH",
  email: "therash792@gmail.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  university: LEADING_UNIVERSITY_NAME,
  department: "CSE",
  program: "CSE",
  batch: "62",
  semester: 3,
  section: "A",
  academicYear: "Fall 2026",
  role: "student",
  onboardingCompleted: true,
};
