export interface DepartmentOption {
  code: string;
  name: string;
  hasRoutineData: boolean;
  availableBatches: string[];
  availableSections: string[];
}

/**
 * Standardized Leading University department options.
 * Exclusively uses the 10 requested display labels.
 */
export const LEADING_UNIVERSITY_DEPARTMENTS: DepartmentOption[] = [
  {
    code: "ENG",
    name: "ENG",
    hasRoutineData: true,
    availableBatches: ["60", "61", "62"],
    availableSections: ["A", "B"],
  },
  {
    code: "CSE",
    name: "CSE",
    hasRoutineData: true,
    availableBatches: ["61", "62", "63"],
    availableSections: ["A", "B", "H"],
  },
  {
    code: "EEE",
    name: "EEE",
    hasRoutineData: true,
    availableBatches: ["59", "60", "61"],
    availableSections: ["A", "B"],
  },
  {
    code: "Civil",
    name: "Civil",
    hasRoutineData: true,
    availableBatches: ["57", "58", "59"],
    availableSections: ["A", "B"],
  },
  {
    code: "ARCH",
    name: "ARCH",
    hasRoutineData: true,
    availableBatches: ["29", "30", "31"],
    availableSections: ["A", "B"],
  },
  {
    code: "Tourism",
    name: "Tourism",
    hasRoutineData: true,
    availableBatches: ["16", "17", "18"],
    availableSections: ["A", "B"],
  },
  {
    code: "Law",
    name: "Law",
    hasRoutineData: true,
    availableBatches: ["51", "52", "53"],
    availableSections: ["A", "B"],
  },
  {
    code: "BBA",
    name: "BBA",
    hasRoutineData: true,
    availableBatches: ["63", "64", "65"],
    availableSections: ["A", "B"],
  },
  {
    code: "Public Health",
    name: "Public Health",
    hasRoutineData: true,
    availableBatches: ["11", "12", "13"],
    availableSections: ["A", "B"],
  },
  {
    code: "IST",
    name: "IST",
    hasRoutineData: true,
    availableBatches: ["09", "10", "11"],
    availableSections: ["A", "B"],
  },
];

export const DEPARTMENT_CODES = LEADING_UNIVERSITY_DEPARTMENTS.map((d) => d.code);
export const DEPARTMENTS = LEADING_UNIVERSITY_DEPARTMENTS;

export function getDepartmentByCode(code: string): DepartmentOption | undefined {
  return LEADING_UNIVERSITY_DEPARTMENTS.find(
    (d) => d.code.toUpperCase() === code.toUpperCase()
  );
}

export function hasDepartmentRoutineData(code: string): boolean {
  return true; // All 10 Leading University departments now have active routine datasets
}
