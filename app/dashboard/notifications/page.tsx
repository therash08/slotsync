"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { NotificationItem } from "@/types";
import { Button } from "@/ui/Button";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Calendar,
  Sparkles,
  Info,
  ArrowRight,
  Check,
} from "lucide-react";
import { useToast } from "@/ui/Toast";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useUserStore();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const handleMarkAll = () => {
    markAllNotificationsRead();
    showToast("All notifications marked as read.", "info");
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "conflict":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "routine_update":
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case "section_available":
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-6 border border-purple-100 dark:border-purple-950/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
            <span>Leading University</span>
            <span>•</span>
            <span>Academic Alerts</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Notifications & Alerts
          </h1>
          <p className="text-xs text-stone-500 dark:text-purple-300/70 mt-0.5">
            Routine revisions, section capacity updates, and clash alerts for your registered batches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAll}
              className="gap-1.5 text-xs border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All as Read</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
            filter === "all"
              ? "bg-[#6B46C1] text-white shadow-xs"
              : "bg-white dark:bg-white/5 text-stone-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/10"
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            filter === "unread"
              ? "bg-[#FF7A00] text-white shadow-xs"
              : "bg-white dark:bg-white/5 text-stone-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/10"
          }`}
        >
          <span>Unread Only</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !item.read
                  ? "border-purple-200 dark:border-purple-800 bg-white dark:bg-[#1A1033] shadow-xs"
                  : "border-purple-50 dark:border-purple-950/60 bg-white/70 dark:bg-[#1A1033]/60 opacity-80"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/80 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-900/60">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      {item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#FF7A00] inline-block animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-stone-600 dark:text-purple-200/80 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] font-mono text-stone-400 dark:text-purple-300/50 block pt-0.5">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {/* Action and Read toggle */}
              <div className="flex items-center gap-2 shrink-0 sm:self-center">
                {item.actionUrl && (
                  <Link href={item.actionUrl}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markNotificationRead(item.id)}
                      className="text-xs gap-1.5 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                    >
                      <span>{item.actionText || "View Details"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                )}

                {!item.read && (
                  <button
                    type="button"
                    onClick={() => {
                      markNotificationRead(item.id);
                      showToast("Notification marked as read.", "info");
                    }}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1A1033] rounded-3xl p-12 border border-purple-100 dark:border-purple-950/60 text-center max-w-lg mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto border border-purple-200 dark:border-purple-800">
            <Bell className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            No Notifications Found
          </h3>
          <p className="text-xs text-stone-500 dark:text-purple-300/70">
            You&apos;re completely up to date! System routine updates and section notices will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
