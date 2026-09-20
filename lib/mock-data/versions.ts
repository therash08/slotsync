import { RoutineVersion } from "@/types";

export const MOCK_ROUTINE_VERSIONS: RoutineVersion[] = [
  {
    id: "ver-3",
    versionNumber: "v3.0",
    semester: "Fall 2026",
    publishedAt: "Sep 17, 2026",
    publishedBy: "Academic Coordination Committee (Prof. S. Huq)",
    status: "Current",
    changeSummary: "Resolved Lab 304 room clash for Batch 61 CSE 3302; adjusted Thursday 4th period timings.",
    sessionsCount: 124,
  },
  {
    id: "ver-2",
    versionNumber: "v2.1",
    semester: "Fall 2026",
    publishedAt: "Sep 10, 2026",
    publishedBy: "Office of the Registrar",
    status: "Archived",
    changeSummary: "Incorporated Batch 63 Section C new course allocations and updated faculty assignments.",
    sessionsCount: 118,
  },
  {
    id: "ver-1",
    versionNumber: "v1.0",
    semester: "Fall 2026",
    publishedAt: "Sep 01, 2026",
    publishedBy: "Department Chairman Office",
    status: "Archived",
    changeSummary: "Initial draft release for departmental preview and conflict review.",
    sessionsCount: 110,
  },
];
