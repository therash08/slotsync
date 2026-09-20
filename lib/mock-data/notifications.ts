import { NotificationItem } from "@/types";

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Routine revision published",
    message: "Department published Routine Version 3 for Fall 2026. Microprocessor lab shifted by 30 minutes.",
    timestamp: "10 minutes ago",
    read: false,
    type: "routine_update",
    actionUrl: "/dashboard/routine",
    actionText: "View Updated Routine",
  },
  {
    id: "notif-2",
    title: "Potential clash detected in saved schedule",
    message: "In 'Schedule Beta', CSE 2203 Section A overlaps with CSE 3301 on Sunday at 11:30 AM.",
    timestamp: "2 hours ago",
    read: false,
    type: "conflict",
    actionUrl: "/dashboard/generate",
    actionText: "Resolve Conflict",
  },
  {
    id: "notif-3",
    title: "New compatible section opened",
    message: "Batch 62 Section C for CSE 2203 has opened 15 additional retake seats with zero conflicts.",
    timestamp: "1 day ago",
    read: true,
    type: "section_available",
    actionUrl: "/dashboard/courses/cse-2203",
    actionText: "View Section",
  },
  {
    id: "notif-4",
    title: "Fall 2026 Course Enrollment Deadline",
    message: "Pre-advising and retake registration closes on October 2nd. Ensure your schedule is finalized.",
    timestamp: "3 days ago",
    read: true,
    type: "system",
  },
];
