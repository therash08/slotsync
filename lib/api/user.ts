import { UserProfile, NotificationItem } from "@/types";
import { SEEDED_DEMO_USER } from "@/lib/mock-data/routines";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data/notifications";

export async function getUserProfile(): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return { ...SEEDED_DEMO_USER };
}

export async function getNotifications(): Promise<NotificationItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...MOCK_NOTIFICATIONS];
}
