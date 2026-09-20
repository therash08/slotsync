import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export const WEEKDAYS: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

/**
 * Converts "14:30" or "9:00" into minutes from midnight (e.g. 14*60 + 30 = 870)
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [hStr, mStr] = timeStr.trim().split(":");
  const hours = parseInt(hStr, 10) || 0;
  const minutes = parseInt(mStr, 10) || 0;
  return hours * 60 + minutes;
}

/**
 * Converts minutes from midnight into "2:30 PM" or "09:00 AM" format
 */
export function minutesToFormattedTime(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const paddedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours12}:${paddedMins} ${period}`;
}

/**
 * Formats "14:30" to "2:30 PM"
 */
export function formatTimeString(timeStr: string): string {
  return minutesToFormattedTime(timeToMinutes(timeStr));
}

/**
 * Formats duration into human readable string e.g. "2h 30m" or "45m"
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
