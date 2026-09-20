import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ClassSession,
  SelectedCourse,
  SchedulePreference,
  GeneratedSchedule,
  SavedSchedule,
  Course,
  CourseSection,
} from "@/types";
import { getRoutineForCohort, getOfferingsForDepartment } from "@/lib/mock-data/academic-catalog";
import { generateOptimizedSchedules } from "@/lib/schedule/optimizer";

interface ScheduleState {
  currentRoutine: ClassSession[];
  availableOfferings: ClassSession[];
  selectedCourses: SelectedCourse[];
  lockedSections: Record<string, { batch: string; section: string }>;
  preferences: SchedulePreference;
  generatedSchedules: GeneratedSchedule[];
  selectedScheduleId: string | null;
  savedSchedules: SavedSchedule[];
  comparisonScheduleIds: string[];

  // Actions
  syncCohortRoutine: (department: string, batch: string, section: string) => void;
  addSelectedCourse: (course: Course, enrollmentType: "Retake" | "Improvement") => void;
  removeSelectedCourse: (courseCode: string) => void;
  toggleCourseEnrollmentType: (courseCode: string) => void;
  removeCurrentCourse: (courseCode: string) => void;
  restoreDefaultCurrentRoutine: (department?: string, batch?: string, section?: string) => void;
  clearPlanner: (department?: string, batch?: string, section?: string) => void;
  lockSection: (courseCode: string, batch: string, section: string) => void;
  unlockSection: (courseCode: string) => void;
  updatePreferences: (partial: Partial<SchedulePreference>) => void;
  setGeneratedSchedules: (schedules: GeneratedSchedule[]) => void;
  selectSchedule: (id: string) => void;
  saveSchedule: (schedule: GeneratedSchedule, title?: string) => string;
  renameSavedSchedule: (id: string, newTitle: string) => void;
  deleteSavedSchedule: (id: string) => void;
  applySavedScheduleAsActive: (id: string) => void;
  setSelectedCourseSection: (courseCode: string, section: CourseSection) => void;
  toggleComparisonSchedule: (id: string) => void;
  clearComparison: () => void;
  clearComparisonSchedules: () => void;
  resetToDefaults: (department?: string, batch?: string, section?: string) => void;
  runLocalOptimization: () => GeneratedSchedule[];
}

const DEFAULT_PREFERENCES: SchedulePreference = {
  minCampusDays: 4,
  minWeeklyIdleTime: true,
  avoidEarlyMorning: false,
  avoidEveningClasses: true,
  preferredClassTime: "Afternoon",
  preferredOffDay: "None",
  maxClassesPerDay: 4,
  preferredBatches: ["62", "63"],
  preferredSections: ["A", "B", "C"],
};

const INITIAL_SELECTED_COURSES: SelectedCourse[] = [
  {
    courseId: "cse-2203",
    courseCode: "CSE 2203",
    courseName: "Data Structures and Algorithms",
    credits: 3.0,
    type: "Theory",
    enrollmentType: "Improvement",
  },
  {
    courseId: "mat-1201",
    courseCode: "MAT 1201",
    courseName: "Linear Algebra & Differential Equations",
    credits: 3.0,
    type: "Theory",
    enrollmentType: "Retake",
  },
];

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => {
      // Initial local generation for seeded data (CSE Batch 62, Sec A)
      const initialRoutine = getRoutineForCohort("CSE", "62", "A");
      const initialOfferings = getOfferingsForDepartment("CSE");
      const initialGenerated = generateOptimizedSchedules(
        initialRoutine,
        INITIAL_SELECTED_COURSES,
        initialOfferings,
        DEFAULT_PREFERENCES
      );

      const seededSavedSchedule: SavedSchedule = {
        id: "saved-sched-alpha",
        title: "Schedule Alpha (4-Day Routine)",
        savedAt: "Sep 18, 2026",
        tags: ["No Evening Classes", "4 Campus Days"],
        schedule: initialGenerated[0],
        isPrimary: true,
      };

      return {
        currentRoutine: [...initialRoutine],
        availableOfferings: [...initialOfferings],
        selectedCourses: INITIAL_SELECTED_COURSES,
        lockedSections: {},
        preferences: DEFAULT_PREFERENCES,
        generatedSchedules: initialGenerated,
        selectedScheduleId: initialGenerated[0]?.id || null,
        savedSchedules: [seededSavedSchedule],
        comparisonScheduleIds: [initialGenerated[0]?.id || "", initialGenerated[1]?.id || ""].filter(Boolean),

        syncCohortRoutine: (department, batch, section) => {
          const dept = department || "CSE";
          const b = batch || "62";
          const s = section || "A";
          const newRoutine = getRoutineForCohort(dept, b, s);
          const newOfferings = getOfferingsForDepartment(dept);
          const state = get();
          const generated = generateOptimizedSchedules(
            newRoutine,
            state.selectedCourses,
            newOfferings,
            state.preferences,
            state.lockedSections
          );
          set({
            currentRoutine: newRoutine,
            availableOfferings: newOfferings,
            generatedSchedules: generated,
            selectedScheduleId: generated[0]?.id || null,
          });
        },

        addSelectedCourse: (course, enrollmentType) => {
          const { selectedCourses } = get();
          if (selectedCourses.some((c) => c.courseCode.toUpperCase() === course.code.toUpperCase())) {
            return;
          }
          const updated = [
            ...selectedCourses,
            {
              courseId: course.id,
              courseCode: course.code,
              courseName: course.name,
              credits: course.credits,
              type: course.type,
              enrollmentType,
            },
          ];
          set({ selectedCourses: updated });
        },

        removeSelectedCourse: (courseCode) => {
          const { selectedCourses, lockedSections } = get();
          const updatedCourses = selectedCourses.filter(
            (c) => c.courseCode.toUpperCase() !== courseCode.toUpperCase()
          );
          const updatedLocks = { ...lockedSections };
          delete updatedLocks[courseCode];
          set({ selectedCourses: updatedCourses, lockedSections: updatedLocks });
        },

        toggleCourseEnrollmentType: (courseCode) => {
          const { selectedCourses } = get();
          const updated = selectedCourses.map((c) => {
            if (c.courseCode.toUpperCase() === courseCode.toUpperCase()) {
              return {
                ...c,
                enrollmentType: c.enrollmentType === "Retake" ? ("Improvement" as const) : ("Retake" as const),
              };
            }
            return c;
          });
          set({ selectedCourses: updated });
        },

        removeCurrentCourse: (courseCode) => {
          const { currentRoutine } = get();
          const updated = currentRoutine.filter(
            (s) => s.courseCode.toUpperCase() !== courseCode.toUpperCase()
          );
          set({ currentRoutine: updated });
        },

        restoreDefaultCurrentRoutine: (department, batch, section) => {
          const dept = department || "CSE";
          const b = batch || "62";
          const s = section || "A";
          set({ currentRoutine: getRoutineForCohort(dept, b, s) });
        },

        clearPlanner: (department, batch, section) => {
          const dept = department || "CSE";
          const b = batch || "62";
          const s = section || "A";
          set({
            currentRoutine: getRoutineForCohort(dept, b, s),
            selectedCourses: [],
            lockedSections: {},
            generatedSchedules: [],
            selectedScheduleId: null,
          });
        },

        lockSection: (courseCode, batch, section) => {
          set((state) => ({
            lockedSections: {
              ...state.lockedSections,
              [courseCode]: { batch, section },
            },
          }));
        },

        unlockSection: (courseCode) => {
          set((state) => {
            const updated = { ...state.lockedSections };
            delete updated[courseCode];
            return { lockedSections: updated };
          });
        },

        updatePreferences: (partial) => {
          set((state) => ({
            preferences: { ...state.preferences, ...partial },
          }));
        },

        setGeneratedSchedules: (schedules) => {
          set({
            generatedSchedules: schedules,
            selectedScheduleId: schedules[0]?.id || null,
          });
        },

        selectSchedule: (id) => {
          set({ selectedScheduleId: id });
        },

        saveSchedule: (schedule, title) => {
          const newId = `saved-${Date.now()}`;
          const newTitle = title || schedule.title || `Schedule #${get().savedSchedules.length + 1}`;
          const newSaved: SavedSchedule = {
            id: newId,
            title: newTitle,
            savedAt: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            tags: [
              `${schedule.metrics.campusDays} Days`,
              schedule.metrics.conflictCount === 0 ? "No Conflicts" : `${schedule.metrics.conflictCount} Clash`,
            ],
            schedule,
          };
          set((state) => ({
            savedSchedules: [newSaved, ...state.savedSchedules],
          }));
          return newId;
        },

        renameSavedSchedule: (id, newTitle) => {
          set((state) => ({
            savedSchedules: state.savedSchedules.map((s) =>
              s.id === id ? { ...s, title: newTitle } : s
            ),
          }));
        },

        deleteSavedSchedule: (id) => {
          set((state) => ({
            savedSchedules: state.savedSchedules.filter((s) => s.id !== id),
            comparisonScheduleIds: state.comparisonScheduleIds.filter((sid) => sid !== id),
          }));
        },

        applySavedScheduleAsActive: (id) => {
          const { savedSchedules } = get();
          const target = savedSchedules.find((s) => s.id === id);
          if (target) {
            set({
              currentRoutine: target.schedule.sessions.filter((s) => s.enrollmentType === "Regular"),
              generatedSchedules: [target.schedule],
              selectedScheduleId: target.schedule.id,
            });
          }
        },

        toggleComparisonSchedule: (id) => {
          set((state) => {
            const exists = state.comparisonScheduleIds.includes(id);
            if (exists) {
              return {
                comparisonScheduleIds: state.comparisonScheduleIds.filter((i) => i !== id),
              };
            }
            if (state.comparisonScheduleIds.length >= 3) {
              return {
                comparisonScheduleIds: [...state.comparisonScheduleIds.slice(1), id],
              };
            }
            return {
              comparisonScheduleIds: [...state.comparisonScheduleIds, id],
            };
          });
        },

        setSelectedCourseSection: (courseCode, section) => {
          const { selectedCourses } = get();
          const updated = selectedCourses.map((c) => {
            if (c.courseCode.toUpperCase() === courseCode.toUpperCase()) {
              return {
                ...c,
                targetBatch: section.batch,
                targetSection: section.section,
                selectedSection: section,
              };
            }
            return c;
          });
          set({ selectedCourses: updated });
        },

        clearComparison: () => {
          set({ comparisonScheduleIds: [] });
        },

        clearComparisonSchedules: () => {
          set({ comparisonScheduleIds: [] });
        },

        runLocalOptimization: () => {
          const state = get();
          const generated = generateOptimizedSchedules(
            state.currentRoutine,
            state.selectedCourses,
            state.availableOfferings,
            state.preferences,
            state.lockedSections
          );
          set({
            generatedSchedules: generated,
            selectedScheduleId: generated[0]?.id || null,
          });
          return generated;
        },

        resetToDefaults: (department, batch, section) => {
          const dept = department || "CSE";
          const b = batch || "62";
          const s = section || "A";
          const initialRoutine = getRoutineForCohort(dept, b, s);
          const initialOfferings = getOfferingsForDepartment(dept);
          const generated = generateOptimizedSchedules(
            initialRoutine,
            INITIAL_SELECTED_COURSES,
            initialOfferings,
            DEFAULT_PREFERENCES
          );
          set({
            currentRoutine: initialRoutine,
            availableOfferings: initialOfferings,
            selectedCourses: INITIAL_SELECTED_COURSES,
            lockedSections: {},
            preferences: DEFAULT_PREFERENCES,
            generatedSchedules: generated,
            selectedScheduleId: generated[0]?.id || null,
            savedSchedules: [seededSavedSchedule],
            comparisonScheduleIds: [generated[0]?.id || "", generated[1]?.id || ""].filter(Boolean),
          });
        },
      };
    },
    {
      name: "slotsync_schedule_store_v4",
    }
  )
);
