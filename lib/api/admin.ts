import { RoutineVersion, RoutineValidationRow } from "@/types";
import { MOCK_ROUTINE_VERSIONS } from "@/lib/mock-data/versions";

/**
 * Service function: Fetch all published routine versions
 * Simulates: GET /api/admin/routine-versions/
 */
export async function getRoutineVersions(): Promise<RoutineVersion[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return [...MOCK_ROUTINE_VERSIONS];
}

/**
 * Service function: Mock upload & parse routine file (Excel/CSV)
 * Simulates: POST /api/admin/routines/upload/
 * Returns 124 simulated sessions with validation status
 */
export async function uploadAndParseRoutine(fileName: string): Promise<{
  totalSessions: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  rows: RoutineValidationRow[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const sampleRows: RoutineValidationRow[] = [
    {
      id: "val-1",
      department: "CSE",
      batch: "61",
      semester: 5,
      section: "A",
      courseCode: "CSE 3301",
      courseName: "Software Engineering & Design",
      type: "Theory",
      day: "Sunday",
      startTime: "11:30",
      endTime: "13:00",
      room: "Room 502",
      faculty: "Dr. Fahim Rahman",
      status: "valid",
    },
    {
      id: "val-2",
      department: "CSE",
      batch: "61",
      semester: 5,
      section: "A",
      courseCode: "CSE 3302",
      courseName: "Software Engineering & Design Lab",
      type: "Lab",
      day: "Sunday",
      startTime: "14:00",
      endTime: "16:30",
      room: "Lab 304",
      faculty: "Ms. Sadia Islam",
      status: "valid",
    },
    {
      id: "val-3",
      department: "CSE",
      batch: "62",
      semester: 3,
      section: "A",
      courseCode: "CSE 2203",
      courseName: "Data Structures and Algorithms",
      type: "Theory",
      day: "Sunday",
      startTime: "11:00",
      endTime: "12:30",
      room: "Room 301",
      faculty: "Dr. Anisul Islam",
      status: "warning",
      issues: ["Overlaps with Batch 61 Section A common time slot."],
    },
    {
      id: "val-4",
      department: "CSE",
      batch: "62",
      semester: 3,
      section: "B",
      courseCode: "CSE 2205",
      courseName: "Discrete Mathematics",
      type: "Theory",
      day: "Monday",
      startTime: "09:30",
      endTime: "11:00",
      room: "Room 302",
      faculty: "",
      status: "warning",
      issues: ["Faculty member unassigned."],
    },
    {
      id: "val-5",
      department: "CSE",
      batch: "63",
      semester: 2,
      section: "A",
      courseCode: "CSE 1204",
      courseName: "OOP Lab",
      type: "Lab",
      day: "Tuesday",
      startTime: "16:00",
      endTime: "15:00",
      room: "Lab 301",
      faculty: "Mr. Tanvir",
      status: "error",
      issues: ["Invalid time range: End time cannot precede start time."],
    },
    {
      id: "val-6",
      department: "CSE",
      batch: "63",
      semester: 2,
      section: "B",
      courseCode: "EEE 1201",
      courseName: "Electrical Circuits",
      type: "Theory",
      day: "Thursday",
      startTime: "08:00",
      endTime: "09:30",
      room: "",
      faculty: "Dr. K. Zaman",
      status: "error",
      issues: ["Room assignment missing."],
    },
  ];

  // Add 118 generated mock rows to reach 124 detected sessions
  for (let i = 7; i <= 124; i++) {
    const isWarn = i === 15 || i === 29;
    sampleRows.push({
      id: `val-${i}`,
      department: "CSE",
      batch: i % 2 === 0 ? "61" : "62",
      semester: i % 2 === 0 ? 5 : 3,
      section: i % 3 === 0 ? "A" : i % 3 === 1 ? "B" : "C",
      courseCode: `CSE ${2000 + (i % 8) * 100 + (i % 5)}`,
      courseName: `Core Computing Module ${i}`,
      type: i % 4 === 0 ? "Lab" : "Theory",
      day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"][i % 5] as any,
      startTime: `${8 + (i % 6)}:30`,
      endTime: `${10 + (i % 6)}:00`,
      room: `Room ${300 + (i % 10)}`,
      faculty: `Faculty Member ${i}`,
      status: isWarn ? "warning" : "valid",
      issues: isWarn ? ["High room occupancy density."] : undefined,
    });
  }

  const validCount = sampleRows.filter((r) => r.status === "valid").length;
  const warningCount = sampleRows.filter((r) => r.status === "warning").length;
  const errorCount = sampleRows.filter((r) => r.status === "error").length;

  return {
    totalSessions: sampleRows.length,
    validCount,
    warningCount,
    errorCount,
    rows: sampleRows,
  };
}
