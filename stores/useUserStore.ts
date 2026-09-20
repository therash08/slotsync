import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, NotificationItem } from "@/types";
import { SEEDED_DEMO_USER, LEADING_UNIVERSITY_NAME } from "@/lib/mock-data/routines";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data/notifications";

interface UserState {
  user: UserProfile;
  savedProfiles: UserProfile[];
  notifications: NotificationItem[];

  // Profile actions
  createProfile: (data: {
    studentId: string;
    name: string;
    department: string;
    batch: string;
    section: string;
  }) => UserProfile;
  switchProfile: (profileId: string) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  logoutProfile: () => void;
  deleteProfile: (profileId: string) => void;
  completeOnboarding: () => void;
  clearAllLocalData: () => void;

  // Notification actions
  addNotification: (item: Omit<NotificationItem, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: { ...SEEDED_DEMO_USER },
      savedProfiles: [{ ...SEEDED_DEMO_USER }],
      notifications: [...MOCK_NOTIFICATIONS],

      createProfile: ({ studentId, name, department, batch, section }) => {
        const profileId = `profile-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const newProfile: UserProfile = {
          id: profileId,
          studentId: studentId.trim(),
          name: name.trim(),
          university: LEADING_UNIVERSITY_NAME,
          department,
          program: department,
          batch: batch.trim(),
          section: section.trim().toUpperCase(),
          semester: 3,
          academicYear: "Fall 2026",
          role: "student",
          onboardingCompleted: true,
        };

        set((state) => {
          // Replace or append profile
          const existingIndex = state.savedProfiles.findIndex(
            (p) => p.studentId === newProfile.studentId
          );
          let updatedList = [...state.savedProfiles];
          if (existingIndex >= 0) {
            updatedList[existingIndex] = newProfile;
          } else {
            updatedList.push(newProfile);
          }

          return {
            user: newProfile,
            savedProfiles: updatedList,
          };
        });

        // Add welcome notification
        get().addNotification({
          title: "Profile Created",
          message: `Welcome to SlotSync, ${newProfile.name}! Your local profile for Batch ${newProfile.batch} (${newProfile.section}) is active.`,
          type: "system",
        });

        return newProfile;
      },

      switchProfile: (profileId) => {
        const { savedProfiles } = get();
        const target = savedProfiles.find((p) => p.id === profileId);
        if (target) {
          set({ user: target });
        }
      },

      updateUserProfile: (data) =>
        set((state) => {
          const updatedUser = { ...state.user, ...data };
          const updatedList = state.savedProfiles.map((p) =>
            p.id === updatedUser.id ? updatedUser : p
          );
          return {
            user: updatedUser,
            savedProfiles: updatedList,
          };
        }),

      logoutProfile: () => {
        // Exit active profile without deleting saved plans
        set((state) => ({
          user: {
            ...state.user,
            onboardingCompleted: false,
          },
        }));
      },

      deleteProfile: (profileId) => {
        set((state) => {
          const updatedList = state.savedProfiles.filter((p) => p.id !== profileId);
          const nextUser =
            updatedList.length > 0
              ? updatedList[0]
              : { ...SEEDED_DEMO_USER, onboardingCompleted: false };
          return {
            savedProfiles: updatedList,
            user: nextUser,
          };
        });
      },

      completeOnboarding: () =>
        set((state) => ({
          user: { ...state.user, onboardingCompleted: true },
        })),

      clearAllLocalData: () => {
        set({
          user: { ...SEEDED_DEMO_USER, onboardingCompleted: false },
          savedProfiles: [],
          notifications: [],
        });
      },

      addNotification: ({ title, message, type, actionUrl }) => {
        const { notifications } = get();
        // Deduplicate recent notifications with same message
        const isDuplicate = notifications.some(
          (n) => n.message === message && !n.read
        );
        if (isDuplicate) return;

        const newNotif: NotificationItem = {
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          title,
          message,
          timestamp: "Just now",
          read: false,
          type,
          actionUrl,
        };

        set({ notifications: [newNotif, ...notifications].slice(0, 20) });
      },

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearNotifications: () =>
        set({
          notifications: [],
        }),
    }),
    {
      name: "slotsync_user_store_v5",
    }
  )
);
