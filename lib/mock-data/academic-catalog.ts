import { Course, ClassSession, CourseSection } from "@/types";

export interface DepartmentCatalog {
  code: string;
  name: string;
  defaultBatch: string;
  defaultSection: string;
  batches: string[];
  sections: string[];
  courses: Course[];
  routines: Record<string, ClassSession[]>; // "batch-section" -> sessions
  offerings: ClassSession[];
}

export const ACADEMIC_CATALOG: Record<string, DepartmentCatalog> = {
  CSE: {
    code: "CSE",
    name: "Computer Science & Engineering",
    defaultBatch: "62",
    defaultSection: "A",
    batches: ["61", "62", "63"],
    sections: ["A", "B", "H"],
    courses: [
      { id: "cse-1101", code: "CSE 1101", name: "Structured Programming Language", credits: 3.0, semester: 1, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-1102", code: "CSE 1102", name: "Structured Programming Language Lab", credits: 1.5, semester: 1, department: "CSE", type: "Lab", provenance: "verified" },
      { id: "mat-1101", code: "MAT 1101", name: "Differential and Integral Calculus", credits: 3.0, semester: 1, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "phy-1103", code: "PHY 1103", name: "Physics (Waves & Thermodynamics)", credits: 3.0, semester: 1, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-1203", code: "CSE 1203", name: "Object Oriented Programming", credits: 3.0, semester: 2, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-1204", code: "CSE 1204", name: "Object Oriented Programming Lab", credits: 1.5, semester: 2, department: "CSE", type: "Lab", provenance: "verified" },
      { id: "mat-1201", code: "MAT 1201", name: "Linear Algebra & Differential Equations", credits: 3.0, semester: 2, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-2201", code: "CSE 2201", name: "Discrete Mathematics", credits: 3.0, semester: 3, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-2203", code: "CSE 2203", name: "Data Structures & Algorithms", credits: 3.0, semester: 3, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-3301", code: "CSE 3301", name: "Software Engineering & Design", credits: 3.0, semester: 5, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-3302", code: "CSE 3302", name: "Software Engineering Lab", credits: 1.5, semester: 5, department: "CSE", type: "Lab", provenance: "verified" },
      { id: "cse-3303", code: "CSE 3303", name: "Operating Systems Principles", credits: 3.0, semester: 5, department: "CSE", type: "Theory", provenance: "verified" },
      { id: "cse-3304", code: "CSE 3304", name: "Operating Systems Lab", credits: 1.5, semester: 5, department: "CSE", type: "Lab", provenance: "verified" },
      { id: "cse-4101", code: "CSE 4101", name: "Artificial Intelligence", credits: 3.0, semester: 7, department: "CSE", type: "Theory", provenance: "demo" },
    ],
    routines: {
      "62-A": [
        { id: "cse-62a-1", courseCode: "CSE 3301", courseName: "Software Engineering & Design", batch: "62", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Room 401", faculty: "Dr. Fahim Rahman", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62a-2", courseCode: "CSE 3302", courseName: "Software Engineering Lab", batch: "62", section: "A", type: "Lab", day: "Sunday", startTime: "14:00", endTime: "16:30", room: "Lab 201", faculty: "Ms. Sadia Islam", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62a-3", courseCode: "CSE 3303", courseName: "Operating Systems Principles", batch: "62", section: "A", type: "Theory", day: "Monday", startTime: "09:30", endTime: "11:00", room: "Room 401", faculty: "Prof. Tariq Ahmed", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62a-4", courseCode: "CSE 3304", courseName: "Operating Systems Lab", batch: "62", section: "A", type: "Lab", day: "Monday", startTime: "11:30", endTime: "14:00", room: "Lab 202", faculty: "Mr. Hasan Mahmud", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62a-5", courseCode: "CSE 2201", courseName: "Discrete Mathematics", batch: "62", section: "A", type: "Theory", day: "Tuesday", startTime: "11:30", endTime: "13:00", room: "Room 402", faculty: "Dr. Nazmul Huda", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62a-6", courseCode: "CSE 3301", courseName: "Software Engineering & Design", batch: "62", section: "A", type: "Theory", day: "Wednesday", startTime: "10:00", endTime: "11:30", room: "Room 401", faculty: "Dr. Fahim Rahman", enrollmentType: "Regular", provenance: "verified" },
      ],
      "62-H": [
        { id: "cse-62h-1", courseCode: "CSE 3301", courseName: "Software Engineering & Design", batch: "62", section: "H", type: "Theory", day: "Sunday", startTime: "11:30", endTime: "13:00", room: "Room 502", faculty: "Dr. Fahim Rahman", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62h-2", courseCode: "CSE 3302", courseName: "Software Engineering Lab", batch: "62", section: "H", type: "Lab", day: "Sunday", startTime: "14:00", endTime: "16:30", room: "Lab 304", faculty: "Ms. Sadia Islam", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62h-3", courseCode: "CSE 3303", courseName: "Operating Systems Principles", batch: "62", section: "H", type: "Theory", day: "Monday", startTime: "09:30", endTime: "11:00", room: "Room 502", faculty: "Prof. Tariq Ahmed", enrollmentType: "Regular", provenance: "verified" },
        { id: "cse-62h-4", courseCode: "CSE 3304", courseName: "Operating Systems Lab", batch: "62", section: "H", type: "Lab", day: "Monday", startTime: "11:30", endTime: "14:00", room: "Lab 304", faculty: "Mr. Hasan Mahmud", enrollmentType: "Regular", provenance: "verified" },
      ],
      "62-B": [
        { id: "cse-62b-1", courseCode: "CSE 3301", courseName: "Software Engineering & Design", batch: "62", section: "B", type: "Theory", day: "Sunday", startTime: "08:30", endTime: "10:00", room: "Room 403", faculty: "Dr. Fahim Rahman", enrollmentType: "Regular", provenance: "demo" },
        { id: "cse-62b-2", courseCode: "CSE 3303", courseName: "Operating Systems Principles", batch: "62", section: "B", type: "Theory", day: "Tuesday", startTime: "09:30", endTime: "11:00", room: "Room 403", faculty: "Prof. Tariq Ahmed", enrollmentType: "Regular", provenance: "demo" },
      ],
      "61-A": [
        { id: "cse-61a-1", courseCode: "CSE 2203", courseName: "Data Structures & Algorithms", batch: "61", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Room 301", faculty: "Dr. Nazmul Huda", enrollmentType: "Regular", provenance: "demo" },
      ],
      "63-A": [
        { id: "cse-63a-1", courseCode: "CSE 1203", courseName: "Object Oriented Programming", batch: "63", section: "A", type: "Theory", day: "Thursday", startTime: "10:00", endTime: "11:30", room: "Room 201", faculty: "Mr. Kamrul Hasan", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      // Test Scenario 1: Section that fits cleanly into 62-A (Tuesday 14:00)
      { id: "cse-off-fit", courseCode: "CSE 2203", courseName: "Data Structures & Algorithms", batch: "61", section: "B", type: "Theory", day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "Room 302", faculty: "Dr. Nazmul Huda", provenance: "demo" },
      // Test Scenario 2: Section that clashes with 62-A (Sunday 10:00 overlaps CSE 3301)
      { id: "cse-off-clash", courseCode: "CSE 2203", courseName: "Data Structures & Algorithms", batch: "61", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Room 301", faculty: "Dr. Nazmul Huda", provenance: "demo" },
      // Test Scenario 3: Alternative section resolving that clash (Thursday 11:30)
      { id: "cse-off-alt", courseCode: "CSE 2203", courseName: "Data Structures & Algorithms", batch: "63", section: "A", type: "Theory", day: "Thursday", startTime: "11:30", endTime: "13:00", room: "Room 203", faculty: "Mr. Kamrul Hasan", provenance: "demo" },
      // Test Scenario 4: Two courses that mutually clash (Both on Thursday 14:00)
      { id: "cse-off-mut1", courseCode: "MAT 1201", courseName: "Linear Algebra & Differential Equations", batch: "63", section: "B", type: "Theory", day: "Thursday", startTime: "14:00", endTime: "15:30", room: "Room 205", faculty: "Dr. M. Ali", provenance: "demo" },
      { id: "cse-off-mut2", courseCode: "PHY 1103", courseName: "Physics (Waves & Thermodynamics)", batch: "63", section: "A", type: "Theory", day: "Thursday", startTime: "14:30", endTime: "16:00", room: "Room 206", faculty: "Dr. K. Ahmed", provenance: "demo" },
      // Test Scenario 5: Course where all sections clash with 62-A
      { id: "cse-off-nocomp1", courseCode: "CSE 1101", courseName: "Structured Programming Language", batch: "63", section: "A", type: "Theory", day: "Sunday", startTime: "10:30", endTime: "12:00", room: "Room 101", faculty: "Ms. Tania Sultana", provenance: "demo" },
      { id: "cse-off-nocomp2", courseCode: "CSE 1101", courseName: "Structured Programming Language", batch: "63", section: "B", type: "Theory", day: "Monday", startTime: "09:30", endTime: "11:00", room: "Room 102", faculty: "Ms. Tania Sultana", provenance: "demo" },
    ],
  },

  ENG: {
    code: "ENG",
    name: "ENG",
    defaultBatch: "62",
    defaultSection: "A",
    batches: ["60", "61", "62"],
    sections: ["A", "B"],
    courses: [
      { id: "eng-1101", code: "ENG 1101", name: "English Reading & Comprehension", credits: 3.0, semester: 1, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-1102", code: "ENG 1102", name: "Academic Writing & Composition", credits: 3.0, semester: 1, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-1201", code: "ENG 1201", name: "Introduction to Linguistics", credits: 3.0, semester: 2, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-1202", code: "ENG 1202", name: "History of English Literature I", credits: 3.0, semester: 2, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-2101", code: "ENG 2101", name: "English Poetry: 14th to 17th Century", credits: 3.0, semester: 3, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-2102", code: "ENG 2102", name: "English Drama: Elizabethan & Jacobean", credits: 3.0, semester: 3, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-2201", code: "ENG 2201", name: "18th Century Prose & Fiction", credits: 3.0, semester: 4, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-3101", code: "ENG 3101", name: "Romantic Poetry", credits: 3.0, semester: 5, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-3102", code: "ENG 3102", name: "Victorian Literature", credits: 3.0, semester: 5, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-3201", code: "ENG 3201", name: "Modern English Drama", credits: 3.0, semester: 6, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-4101", code: "ENG 4101", name: "Literary Theory & Criticism", credits: 3.0, semester: 7, department: "ENG", type: "Theory", provenance: "demo" },
      { id: "eng-4201", code: "ENG 4201", name: "Post-Colonial Literature", credits: 3.0, semester: 8, department: "ENG", type: "Theory", provenance: "demo" },
    ],
    routines: {
      "62-A": [
        { id: "eng-62a-1", courseCode: "ENG 2101", courseName: "English Poetry: 14th to 17th Century", batch: "62", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Arts 101", faculty: "Demo Faculty ENG 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "eng-62a-2", courseCode: "ENG 2102", courseName: "English Drama: Elizabethan & Jacobean", batch: "62", section: "A", type: "Theory", day: "Monday", startTime: "11:30", endTime: "13:00", room: "Arts 102", faculty: "Demo Faculty ENG 2", enrollmentType: "Regular", provenance: "demo" },
        { id: "eng-62a-3", courseCode: "ENG 2201", courseName: "18th Century Prose & Fiction", batch: "62", section: "A", type: "Theory", day: "Tuesday", startTime: "09:30", endTime: "11:00", room: "Arts 103", faculty: "Demo Faculty ENG 3", enrollmentType: "Regular", provenance: "demo" },
        { id: "eng-62a-4", courseCode: "ENG 2101", courseName: "English Poetry: 14th to 17th Century", batch: "62", section: "A", type: "Theory", day: "Wednesday", startTime: "10:00", endTime: "11:30", room: "Arts 101", faculty: "Demo Faculty ENG 1", enrollmentType: "Regular", provenance: "demo" },
      ],
    },
    offerings: [
      { id: "eng-off-fit", courseCode: "ENG 1201", courseName: "Introduction to Linguistics", batch: "61", section: "B", type: "Theory", day: "Sunday", startTime: "14:00", endTime: "15:30", room: "Arts 105", faculty: "Demo Faculty ENG 4", provenance: "demo" },
      { id: "eng-off-clash", courseCode: "ENG 1201", courseName: "Introduction to Linguistics", batch: "61", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Arts 104", faculty: "Demo Faculty ENG 4", provenance: "demo" },
      { id: "eng-off-mut1", courseCode: "ENG 1101", courseName: "English Reading & Comprehension", batch: "60", section: "A", type: "Theory", day: "Thursday", startTime: "10:00", endTime: "11:30", room: "Arts 106", faculty: "Demo Faculty ENG 5", provenance: "demo" },
      { id: "eng-off-mut2", courseCode: "ENG 1102", courseName: "Academic Writing & Composition", batch: "60", section: "B", type: "Theory", day: "Thursday", startTime: "10:30", endTime: "12:00", room: "Arts 107", faculty: "Demo Faculty ENG 6", provenance: "demo" },
    ]
  },

  EEE: {
    code: "EEE",
    name: "EEE",
    defaultBatch: "60",
    defaultSection: "A",
    batches: ["59", "60", "61"],
    sections: ["A", "B"],
    courses: [
      { id: "eee-1101", code: "EEE 1101", name: "Electrical Circuits I", credits: 3.0, semester: 1, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-1102", code: "EEE 1102", name: "Electrical Circuits I Lab", credits: 1.5, semester: 1, department: "EEE", type: "Lab", provenance: "demo" },
      { id: "eee-1201", code: "EEE 1201", name: "Electrical Circuits II", credits: 3.0, semester: 2, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-1202", code: "EEE 1202", name: "Electronic Devices & Circuits", credits: 3.0, semester: 2, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-2101", code: "EEE 2101", name: "Signals & Systems", credits: 3.0, semester: 3, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-2102", code: "EEE 2102", name: "Electrical Machines I", credits: 3.0, semester: 3, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-2201", code: "EEE 2201", name: "Electromagnetic Fields & Waves", credits: 3.0, semester: 4, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-3101", code: "EEE 3101", name: "Power Systems I", credits: 3.0, semester: 5, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-3102", code: "EEE 3102", name: "Microprocessor & Interfacing", credits: 3.0, semester: 5, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-3201", code: "EEE 3201", name: "Control Systems", credits: 3.0, semester: 6, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-4101", code: "EEE 4101", name: "Digital Signal Processing", credits: 3.0, semester: 7, department: "EEE", type: "Theory", provenance: "demo" },
      { id: "eee-4201", code: "EEE 4201", name: "Communication Engineering", credits: 3.0, semester: 8, department: "EEE", type: "Theory", provenance: "demo" },
    ],
    routines: {
      "60-A": [
        { id: "eee-60a-1", courseCode: "EEE 2101", courseName: "Signals & Systems", batch: "60", section: "A", type: "Theory", day: "Sunday", startTime: "09:30", endTime: "11:00", room: "Engg 201", faculty: "Demo Faculty EEE 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "eee-60a-2", courseCode: "EEE 2102", courseName: "Electrical Machines I", batch: "60", section: "A", type: "Theory", day: "Monday", startTime: "11:30", endTime: "13:00", room: "Engg 202", faculty: "Demo Faculty EEE 2", enrollmentType: "Regular", provenance: "demo" },
        { id: "eee-60a-3", courseCode: "EEE 2201", courseName: "Electromagnetic Fields & Waves", batch: "60", section: "A", type: "Theory", day: "Tuesday", startTime: "10:00", endTime: "11:30", room: "Engg 203", faculty: "Demo Faculty EEE 3", enrollmentType: "Regular", provenance: "demo" },
      ],
    },
    offerings: [
      { id: "eee-off-fit", courseCode: "EEE 1201", courseName: "Electrical Circuits II", batch: "61", section: "A", type: "Theory", day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "Engg 205", faculty: "Demo Faculty EEE 4", provenance: "demo" },
      { id: "eee-off-clash", courseCode: "EEE 1201", courseName: "Electrical Circuits II", batch: "59", section: "A", type: "Theory", day: "Sunday", startTime: "09:30", endTime: "11:00", room: "Engg 204", faculty: "Demo Faculty EEE 4", provenance: "demo" },
      { id: "eee-off-mut1", courseCode: "EEE 1101", courseName: "Electrical Circuits I", batch: "61", section: "B", type: "Theory", day: "Thursday", startTime: "11:00", endTime: "12:30", room: "Engg 206", faculty: "Demo Faculty EEE 5", provenance: "demo" },
      { id: "eee-off-mut2", courseCode: "EEE 1102", courseName: "Electrical Circuits I Lab", batch: "61", section: "B", type: "Lab", day: "Thursday", startTime: "11:30", endTime: "14:00", room: "Lab EEE 1", faculty: "Demo Faculty EEE 6", provenance: "demo" },
    ]
  },

  Civil: {
    code: "Civil",
    name: "Civil",
    defaultBatch: "58",
    defaultSection: "A",
    batches: ["57", "58", "59"],
    sections: ["A", "B"],
    courses: [
      { id: "ce-1101", code: "CE 1101", name: "Engineering Mechanics", credits: 3.0, semester: 1, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-1102", code: "CE 1102", name: "Surveying & Leveling", credits: 3.0, semester: 1, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-1201", code: "CE 1201", name: "Fluid Mechanics", credits: 3.0, semester: 2, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-2101", code: "CE 2101", name: "Structural Analysis I", credits: 3.0, semester: 3, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-2102", code: "CE 2102", name: "Geotechnical Engineering I", credits: 3.0, semester: 3, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-2201", code: "CE 2201", name: "Reinforced Concrete Design I", credits: 3.0, semester: 4, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-2202", code: "CE 2202", name: "Environmental Engineering I", credits: 3.0, semester: 4, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-3101", code: "CE 3101", name: "Transportation Engineering I", credits: 3.0, semester: 5, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-3102", code: "CE 3102", name: "Hydrology & Irrigation Engineering", credits: 3.0, semester: 5, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-3201", code: "CE 3201", name: "Structural Steel Design", credits: 3.0, semester: 6, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-4101", code: "CE 4101", name: "Construction Project Management", credits: 3.0, semester: 7, department: "Civil", type: "Theory", provenance: "demo" },
      { id: "ce-4201", code: "CE 4201", name: "Bridge & Tunnel Engineering", credits: 3.0, semester: 8, department: "Civil", type: "Theory", provenance: "demo" },
    ],
    routines: {
      "58-A": [
        { id: "ce-58a-1", courseCode: "CE 2101", courseName: "Structural Analysis I", batch: "58", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Civil 101", faculty: "Demo Faculty CE 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "ce-58a-2", courseCode: "CE 2102", courseName: "Geotechnical Engineering I", batch: "58", section: "A", type: "Theory", day: "Tuesday", startTime: "11:30", endTime: "13:00", room: "Civil 102", faculty: "Demo Faculty CE 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "ce-off-fit", courseCode: "CE 1201", courseName: "Fluid Mechanics", batch: "59", section: "A", type: "Theory", day: "Monday", startTime: "14:00", endTime: "15:30", room: "Civil 103", faculty: "Demo Faculty CE 3", provenance: "demo" },
      { id: "ce-off-clash", courseCode: "CE 1201", courseName: "Fluid Mechanics", batch: "57", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Civil 104", faculty: "Demo Faculty CE 3", provenance: "demo" },
    ]
  },

  ARCH: {
    code: "ARCH",
    name: "ARCH",
    defaultBatch: "30",
    defaultSection: "A",
    batches: ["29", "30", "31"],
    sections: ["A", "B"],
    courses: [
      { id: "arc-1101", code: "ARC 1101", name: "Architectural Graphics & Freehand", credits: 3.0, semester: 1, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-1102", code: "ARC 1102", name: "Basic Design Studio I", credits: 3.0, semester: 1, department: "ARCH", type: "Lab", provenance: "demo" },
      { id: "arc-1201", code: "ARC 1201", name: "History of World Architecture I", credits: 3.0, semester: 2, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-2101", code: "ARC 2101", name: "Building Materials & Construction I", credits: 3.0, semester: 3, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-2102", code: "ARC 2102", name: "Architectural Design Studio III", credits: 4.5, semester: 3, department: "ARCH", type: "Lab", provenance: "demo" },
      { id: "arc-2201", code: "ARC 2201", name: "Climate & Environmental Design", credits: 3.0, semester: 4, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-3101", code: "ARC 3101", name: "Urban Housing Design", credits: 3.0, semester: 5, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-3102", code: "ARC 3102", name: "Landscape Design", credits: 3.0, semester: 5, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-3201", code: "ARC 3201", name: "Urban Planning & Heritage", credits: 3.0, semester: 6, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-4101", code: "ARC 4101", name: "Contemporary Architecture", credits: 3.0, semester: 7, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-4102", code: "ARC 4102", name: "Professional Practice & Ethics", credits: 3.0, semester: 7, department: "ARCH", type: "Theory", provenance: "demo" },
      { id: "arc-4201", code: "ARC 4201", name: "Thesis Design Project", credits: 6.0, semester: 8, department: "ARCH", type: "Lab", provenance: "demo" },
    ],
    routines: {
      "30-A": [
        { id: "arc-30a-1", courseCode: "ARC 2101", courseName: "Building Materials & Construction I", batch: "30", section: "A", type: "Theory", day: "Sunday", startTime: "09:30", endTime: "11:00", room: "Studio 1", faculty: "Demo Faculty ARC 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "arc-30a-2", courseCode: "ARC 2102", courseName: "Architectural Design Studio III", batch: "30", section: "A", type: "Lab", day: "Monday", startTime: "10:00", endTime: "13:00", room: "Studio 1", faculty: "Demo Faculty ARC 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "arc-off-fit", courseCode: "ARC 1201", courseName: "History of World Architecture I", batch: "31", section: "A", type: "Theory", day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "Studio 2", faculty: "Demo Faculty ARC 3", provenance: "demo" },
      { id: "arc-off-clash", courseCode: "ARC 1201", courseName: "History of World Architecture I", batch: "29", section: "A", type: "Theory", day: "Sunday", startTime: "09:30", endTime: "11:00", room: "Studio 2", faculty: "Demo Faculty ARC 3", provenance: "demo" },
    ]
  },

  Tourism: {
    code: "Tourism",
    name: "Tourism",
    defaultBatch: "17",
    defaultSection: "A",
    batches: ["16", "17", "18"],
    sections: ["A", "B"],
    courses: [
      { id: "thm-1101", code: "THM 1101", name: "Introduction to Tourism & Hospitality", credits: 3.0, semester: 1, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-1102", code: "THM 1102", name: "Tourism Geography & Ecology", credits: 3.0, semester: 1, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-1201", code: "THM 1201", name: "Hotel Operations & Front Office Management", credits: 3.0, semester: 2, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-2101", code: "THM 2101", name: "Food & Beverage Management", credits: 3.0, semester: 3, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-2102", code: "THM 2102", name: "Travel Agency & Tour Operations", credits: 3.0, semester: 3, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-2201", code: "THM 2201", name: "Tourism Marketing & Sales", credits: 3.0, semester: 4, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-3101", code: "THM 3101", name: "Eco-Tourism & Sustainable Development", credits: 3.0, semester: 5, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-3102", code: "THM 3102", name: "Event & MICE Management", credits: 3.0, semester: 5, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-3201", code: "THM 3201", name: "Aviation Management & Air Fares", credits: 3.0, semester: 6, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-4101", code: "THM 4101", name: "Destination Planning & Development", credits: 3.0, semester: 7, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-4102", code: "THM 4102", name: "Hospitality Law & Regulations", credits: 3.0, semester: 7, department: "Tourism", type: "Theory", provenance: "demo" },
      { id: "thm-4201", code: "THM 4201", name: "Hospitality Internship & Project", credits: 6.0, semester: 8, department: "Tourism", type: "Theory", provenance: "demo" },
    ],
    routines: {
      "17-A": [
        { id: "thm-17a-1", courseCode: "THM 2101", courseName: "Food & Beverage Management", batch: "17", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "THM 101", faculty: "Demo Faculty THM 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "thm-17a-2", courseCode: "THM 2102", courseName: "Travel Agency & Tour Operations", batch: "17", section: "A", type: "Theory", day: "Tuesday", startTime: "11:30", endTime: "13:00", room: "THM 102", faculty: "Demo Faculty THM 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "thm-off-fit", courseCode: "THM 1201", courseName: "Hotel Operations", batch: "18", section: "A", type: "Theory", day: "Monday", startTime: "14:00", endTime: "15:30", room: "THM 103", faculty: "Demo Faculty THM 3", provenance: "demo" },
      { id: "thm-off-clash", courseCode: "THM 1201", courseName: "Hotel Operations", batch: "16", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "THM 104", faculty: "Demo Faculty THM 3", provenance: "demo" },
    ]
  },

  Law: {
    code: "Law",
    name: "Law",
    defaultBatch: "52",
    defaultSection: "A",
    batches: ["51", "52", "53"],
    sections: ["A", "B"],
    courses: [
      { id: "law-1101", code: "LAW 1101", name: "Jurisprudence & Legal Theory", credits: 3.0, semester: 1, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-1102", code: "LAW 1102", name: "Constitutional Law of Bangladesh", credits: 3.0, semester: 1, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-1201", code: "LAW 1201", name: "Law of Contract", credits: 3.0, semester: 2, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-2101", code: "LAW 2101", name: "Criminal Law & Penal Code", credits: 3.0, semester: 3, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-2102", code: "LAW 2102", name: "Law of Torts & Consumer Protection", credits: 3.0, semester: 3, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-2201", code: "LAW 2201", name: "Muslim Law & Family Relations", credits: 3.0, semester: 4, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-3101", code: "LAW 3101", name: "Land Laws & Transfer of Property Act", credits: 3.0, semester: 5, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-3102", code: "LAW 3102", name: "Public International Law & Human Rights", credits: 3.0, semester: 5, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-3201", code: "LAW 3201", name: "Code of Civil Procedure", credits: 3.0, semester: 6, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-4101", code: "LAW 4101", name: "Law of Evidence", credits: 3.0, semester: 7, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-4102", code: "LAW 4102", name: "Company & Commercial Law", credits: 3.0, semester: 7, department: "Law", type: "Theory", provenance: "demo" },
      { id: "law-4201", code: "LAW 4201", name: "Moot Court & Legal Drafting", credits: 3.0, semester: 8, department: "Law", type: "Lab", provenance: "demo" },
    ],
    routines: {
      "52-A": [
        { id: "law-52a-1", courseCode: "LAW 2101", courseName: "Criminal Law & Penal Code", batch: "52", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Law 201", faculty: "Demo Faculty LAW 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "law-52a-2", courseCode: "LAW 2102", courseName: "Law of Torts & Consumer Protection", batch: "52", section: "A", type: "Theory", day: "Monday", startTime: "11:30", endTime: "13:00", room: "Law 202", faculty: "Demo Faculty LAW 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "law-off-fit", courseCode: "LAW 1201", courseName: "Law of Contract", batch: "53", section: "A", type: "Theory", day: "Wednesday", startTime: "14:00", endTime: "15:30", room: "Law 203", faculty: "Demo Faculty LAW 3", provenance: "demo" },
      { id: "law-off-clash", courseCode: "LAW 1201", courseName: "Law of Contract", batch: "51", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Law 204", faculty: "Demo Faculty LAW 3", provenance: "demo" },
    ]
  },

  BBA: {
    code: "BBA",
    name: "BBA",
    defaultBatch: "64",
    defaultSection: "A",
    batches: ["63", "64", "65"],
    sections: ["A", "B"],
    courses: [
      { id: "bba-1101", code: "BUS 1101", name: "Introduction to Business", credits: 3.0, semester: 1, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-1102", code: "MGT 1102", name: "Principles of Management", credits: 3.0, semester: 1, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-1201", code: "ACT 1201", name: "Financial Accounting", credits: 3.0, semester: 2, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-1202", code: "ECO 1202", name: "Microeconomics", credits: 3.0, semester: 2, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-2101", code: "MKT 2101", name: "Principles of Marketing", credits: 3.0, semester: 3, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-2102", code: "FIN 2102", name: "Corporate Finance", credits: 3.0, semester: 3, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-2201", code: "BUS 2201", name: "Business Statistics", credits: 3.0, semester: 4, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-3101", code: "HRM 3101", name: "Human Resource Management", credits: 3.0, semester: 5, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-3102", code: "MGT 3102", name: "Operations Management", credits: 3.0, semester: 5, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-3201", code: "FIN 3201", name: "Investment & Portfolio Analysis", credits: 3.0, semester: 6, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-4101", code: "BUS 4101", name: "Strategic Management", credits: 3.0, semester: 7, department: "BBA", type: "Theory", provenance: "demo" },
      { id: "bba-4201", code: "MGT 4201", name: "Entrepreneurship & Small Business", credits: 3.0, semester: 8, department: "BBA", type: "Theory", provenance: "demo" },
    ],
    routines: {
      "64-A": [
        { id: "bba-64a-1", courseCode: "MKT 2101", courseName: "Principles of Marketing", batch: "64", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "BBA 101", faculty: "Demo Faculty BBA 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "bba-64a-2", courseCode: "FIN 2102", courseName: "Corporate Finance", batch: "64", section: "A", type: "Theory", day: "Tuesday", startTime: "11:30", endTime: "13:00", room: "BBA 102", faculty: "Demo Faculty BBA 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "bba-off-fit", courseCode: "ACT 1201", courseName: "Financial Accounting", batch: "65", section: "A", type: "Theory", day: "Wednesday", startTime: "14:00", endTime: "15:30", room: "BBA 103", faculty: "Demo Faculty BBA 3", provenance: "demo" },
      { id: "bba-off-clash", courseCode: "ACT 1201", courseName: "Financial Accounting", batch: "63", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "BBA 104", faculty: "Demo Faculty BBA 3", provenance: "demo" },
    ]
  },

  "Public Health": {
    code: "Public Health",
    name: "Public Health",
    defaultBatch: "12",
    defaultSection: "A",
    batches: ["11", "12", "13"],
    sections: ["A", "B"],
    courses: [
      { id: "pbh-1101", code: "PBH 1101", name: "Introduction to Public Health Concepts", credits: 3.0, semester: 1, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-1102", code: "PBH 1102", name: "Human Anatomy & Physiology", credits: 3.0, semester: 1, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-1201", code: "PBH 1201", name: "Principles of Epidemiology", credits: 3.0, semester: 2, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-2101", code: "PBH 2101", name: "Biostatistics for Health Sciences", credits: 3.0, semester: 3, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-2102", code: "PBH 2102", name: "Environmental & Occupational Health", credits: 3.0, semester: 3, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-2201", code: "PBH 2201", name: "Health Promotion & Behavior Change", credits: 3.0, semester: 4, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-3101", code: "PBH 3101", name: "Communicable & Non-Communicable Diseases", credits: 3.0, semester: 5, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-3102", code: "PBH 3102", name: "Maternal & Child Health Nutrition", credits: 3.0, semester: 5, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-3201", code: "PBH 3201", name: "Health Policy, Systems & Management", credits: 3.0, semester: 6, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-4101", code: "PBH 4101", name: "Global Health & Disaster Preparedness", credits: 3.0, semester: 7, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-4102", code: "PBH 4102", name: "Public Health Research Methodology", credits: 3.0, semester: 7, department: "Public Health", type: "Theory", provenance: "demo" },
      { id: "pbh-4201", code: "PBH 4201", name: "Field Practicum & Health Internship", credits: 6.0, semester: 8, department: "Public Health", type: "Lab", provenance: "demo" },
    ],
    routines: {
      "12-A": [
        { id: "pbh-12a-1", courseCode: "PBH 2101", courseName: "Biostatistics for Health Sciences", batch: "12", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Health 101", faculty: "Demo Faculty PBH 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "pbh-12a-2", courseCode: "PBH 2102", courseName: "Environmental Health", batch: "12", section: "A", type: "Theory", day: "Monday", startTime: "11:30", endTime: "13:00", room: "Health 102", faculty: "Demo Faculty PBH 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "pbh-off-fit", courseCode: "PBH 1201", courseName: "Principles of Epidemiology", batch: "13", section: "A", type: "Theory", day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "Health 103", faculty: "Demo Faculty PBH 3", provenance: "demo" },
      { id: "pbh-off-clash", courseCode: "PBH 1201", courseName: "Principles of Epidemiology", batch: "11", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "Health 104", faculty: "Demo Faculty PBH 3", provenance: "demo" },
    ]
  },

  IST: {
    code: "IST",
    name: "IST",
    defaultBatch: "10",
    defaultSection: "A",
    batches: ["09", "10", "11"],
    sections: ["A", "B"],
    courses: [
      { id: "ist-1101", code: "IST 1101", name: "Information Science Foundations", credits: 3.0, semester: 1, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-1102", code: "IST 1102", name: "Information Retrieval & Organization", credits: 3.0, semester: 1, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-1201", code: "IST 1201", name: "Database & Information Technologies", credits: 3.0, semester: 2, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-2101", code: "IST 2101", name: "Systems Analysis & Architecture", credits: 3.0, semester: 3, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-2102", code: "IST 2102", name: "Knowledge Management Systems", credits: 3.0, semester: 3, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-2201", code: "IST 2201", name: "Web Information Architecture", credits: 3.0, semester: 4, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-3101", code: "IST 3101", name: "Data Analytics & Visualization", credits: 3.0, semester: 5, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-3102", code: "IST 3102", name: "Information Security & Digital Ethics", credits: 3.0, semester: 5, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-3201", code: "IST 3201", name: "Digital Libraries & Repositories", credits: 3.0, semester: 6, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-4101", code: "IST 4101", name: "Human-Computer Interaction in IST", credits: 3.0, semester: 7, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-4102", code: "IST 4102", name: "Cloud Information Services", credits: 3.0, semester: 7, department: "IST", type: "Theory", provenance: "demo" },
      { id: "ist-4201", code: "IST 4201", name: "Information System Capstone Project", credits: 6.0, semester: 8, department: "IST", type: "Lab", provenance: "demo" },
    ],
    routines: {
      "10-A": [
        { id: "ist-10a-1", courseCode: "IST 2101", courseName: "Systems Analysis & Architecture", batch: "10", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "IST Lab 1", faculty: "Demo Faculty IST 1", enrollmentType: "Regular", provenance: "demo" },
        { id: "ist-10a-2", courseCode: "IST 2102", courseName: "Knowledge Management Systems", batch: "10", section: "A", type: "Theory", day: "Tuesday", startTime: "11:30", endTime: "13:00", room: "IST Lab 2", faculty: "Demo Faculty IST 2", enrollmentType: "Regular", provenance: "demo" },
      ]
    },
    offerings: [
      { id: "ist-off-fit", courseCode: "IST 1201", courseName: "Database & Information Technologies", batch: "11", section: "A", type: "Theory", day: "Thursday", startTime: "14:00", endTime: "15:30", room: "IST Lab 3", faculty: "Demo Faculty IST 3", provenance: "demo" },
      { id: "ist-off-clash", courseCode: "IST 1201", courseName: "Database & Information Technologies", batch: "09", section: "A", type: "Theory", day: "Sunday", startTime: "10:00", endTime: "11:30", room: "IST Lab 4", faculty: "Demo Faculty IST 3", provenance: "demo" },
    ]
  },
};

/**
 * Accessor methods with safe fallbacks
 */
export function getDepartmentCatalog(deptCode: string): DepartmentCatalog {
  const code = (deptCode || "CSE").toUpperCase();
  return ACADEMIC_CATALOG[code] || ACADEMIC_CATALOG["CSE"];
}

export function getCatalogCourses(deptCode: string): Course[] {
  return getDepartmentCatalog(deptCode).courses;
}

export function getBatchesForDepartment(deptCode: string): string[] {
  return getDepartmentCatalog(deptCode).batches;
}

export function getSectionsForBatch(deptCode: string, batch: string): string[] {
  return getDepartmentCatalog(deptCode).sections;
}

export function getRoutineForCohort(deptCode: string, batch: string, section: string): ClassSession[] {
  const catalog = getDepartmentCatalog(deptCode);
  const key = `${batch}-${section.toUpperCase()}`;
  if (catalog.routines[key] && catalog.routines[key].length > 0) {
    return catalog.routines[key];
  }
  // Try matching any section of this batch
  const batchKeys = Object.keys(catalog.routines).filter((k) => k.startsWith(`${batch}-`));
  if (batchKeys.length > 0 && catalog.routines[batchKeys[0]]) {
    // Map section to requested section to keep consistency
    return catalog.routines[batchKeys[0]].map((s) => ({ ...s, section: section.toUpperCase() }));
  }
  // Fallback to default routine of this department
  const defaultKey = `${catalog.defaultBatch}-${catalog.defaultSection}`;
  if (catalog.routines[defaultKey]) {
    return catalog.routines[defaultKey].map((s) => ({
      ...s,
      batch: batch || catalog.defaultBatch,
      section: section.toUpperCase() || catalog.defaultSection,
    }));
  }
  return [];
}

export function getOfferingsForDepartment(deptCode: string): ClassSession[] {
  return getDepartmentCatalog(deptCode).offerings;
}

export function getProvenanceNotice(deptCode: string, batch: string, section: string): { isVerified: boolean; message: string } {
  const isCseVerified = deptCode.toUpperCase() === "CSE" && (batch === "62" || batch === "61");
  if (isCseVerified) {
    return {
      isVerified: true,
      message: "Verified university routine data for Leading University CSE cohort.",
    };
  }
  return {
    isVerified: false,
    message: "Demo course and routine data — not an official university schedule.",
  };
}

export const DEPARTMENTS_LIST = [
  { code: "ENG", name: "ENG" },
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "EEE", name: "EEE" },
  { code: "Civil", name: "Civil" },
  { code: "ARCH", name: "ARCH" },
  { code: "Tourism", name: "Tourism" },
  { code: "Law", name: "Law" },
  { code: "BBA", name: "BBA" },
  { code: "Public Health", name: "Public Health" },
  { code: "IST", name: "IST" },
];

