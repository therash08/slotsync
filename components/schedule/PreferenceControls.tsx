"use client";

import React from "react";
import { SchedulePreference } from "@/types";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { DayOfWeek, WEEKDAYS } from "@/lib/utils";
import { Sliders, Clock, Calendar, Check, ShieldAlert } from "lucide-react";
import { useToast } from "@/ui/Toast";

export const PreferenceControls: React.FC = () => {
  const { preferences, updatePreferences, runLocalOptimization } = useScheduleStore();
  const { showToast } = useToast();

  const handleToggle = (key: keyof SchedulePreference, value: boolean) => {
    updatePreferences({ [key]: value });
    runLocalOptimization();
    showToast("Optimization preferences updated.", "info");
  };

  const handleSelectChange = (key: keyof SchedulePreference, value: any) => {
    updatePreferences({ [key]: value });
    runLocalOptimization();
    showToast("Optimization preferences updated.", "info");
  };

  return (
    <div className="bg-[#FFFDFA] dark:bg-[#121522] rounded-2xl border border-[#E6E0D8] dark:border-white/10 p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E0D8]/80 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#6554D9] dark:text-[#8B8CFF]" />
          <h3 className="font-bold text-sm text-[#20232E] dark:text-[#F4F5FA]">
            Scheduling Preferences
          </h3>
        </div>
        <span className="text-[11px] text-[#667085] dark:text-[#9DA7BB]">Weighted Optimizer</span>
      </div>

      <div className="space-y-4 text-sm">
        {/* Campus Days Target */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#20232E] dark:text-[#F4F5FA]">
              Maximum Campus Days
            </label>
            <span className="text-xs font-mono font-bold text-[#6554D9] dark:text-[#8B8CFF]">
              {preferences.minCampusDays} Days / Week
            </span>
          </div>
          <input
            type="range"
            min="3"
            max="5"
            step="1"
            value={preferences.minCampusDays}
            onChange={(e) => handleSelectChange("minCampusDays", parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-[#F0ECE5] dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#6554D9] dark:accent-[#8B8CFF]"
          />
          <div className="flex justify-between text-[10px] text-[#667085] dark:text-[#9DA7BB] mt-1 font-mono">
            <span>3 Days (Compact)</span>
            <span>4 Days (Balanced)</span>
            <span>5 Days (Spread)</span>
          </div>
        </div>

        {/* Preferred Class Time */}
        <div>
          <label className="block text-xs font-semibold text-[#20232E] dark:text-[#F4F5FA] mb-1.5">
            Preferred Class Period
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Morning", "Afternoon", "No Preference"] as const).map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleSelectChange("preferredClassTime", time)}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer select-none ${
                  preferences.preferredClassTime === time
                    ? "border-[#6554D9] bg-[#EEF2FF] dark:bg-[#1A1F35] text-[#6554D9] dark:text-[#8B8CFF] font-semibold shadow-2xs"
                    : "border-[#E6E0D8] dark:border-white/10 text-[#475467] dark:text-[#CBD5E1] hover:bg-[#F0ECE5] dark:hover:bg-white/5"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Off Day */}
        <div>
          <label className="block text-xs font-semibold text-[#20232E] dark:text-[#F4F5FA] mb-1.5">
            Preferred Off Day
          </label>
          <select
            value={preferences.preferredOffDay}
            onChange={(e) => handleSelectChange("preferredOffDay", e.target.value)}
            className="w-full text-xs rounded-xl border border-[#E6E0D8] dark:border-white/10 bg-[#FFFDFA] dark:bg-[#1A1F31] p-2 text-[#20232E] dark:text-[#F4F5FA] focus:outline-none focus:ring-2 focus:ring-[#6554D9]"
          >
            <option value="None">No specific off-day preference</option>
            {WEEKDAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Constraints Toggles */}
        <div className="space-y-3 pt-3 border-t border-[#E6E0D8]/80 dark:border-white/10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#9DA7BB] mb-1">
            Soft Optimization Filters
          </div>

          {/* Avoid Evening Classes */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <span className="text-xs font-medium text-[#20232E] dark:text-[#F4F5FA] block group-hover:text-[#6554D9] transition-colors">
                Avoid Evening Classes
              </span>
              <span className="text-[11px] text-[#667085] dark:text-[#9DA7BB] block">
                Penalize sections scheduled after 5:00 PM
              </span>
            </div>
            <input
              type="checkbox"
              checked={preferences.avoidEveningClasses}
              onChange={(e) => handleToggle("avoidEveningClasses", e.target.checked)}
              className="w-4 h-4 text-[#6554D9] rounded border-[#E6E0D8] cursor-pointer accent-[#6554D9] dark:accent-[#8B8CFF]"
            />
          </label>

          {/* Avoid Early Morning */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <span className="text-xs font-medium text-[#20232E] dark:text-[#F4F5FA] block group-hover:text-[#6554D9] transition-colors">
                Avoid 8:00 AM Classes
              </span>
              <span className="text-[11px] text-[#667085] dark:text-[#9DA7BB] block">
                Prefer sessions commencing after 9:00 AM
              </span>
            </div>
            <input
              type="checkbox"
              checked={preferences.avoidEarlyMorning}
              onChange={(e) => handleToggle("avoidEarlyMorning", e.target.checked)}
              className="w-4 h-4 text-[#6554D9] rounded border-[#E6E0D8] cursor-pointer accent-[#6554D9] dark:accent-[#8B8CFF]"
            />
          </label>

          {/* Minimize Idle Gaps */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <span className="text-xs font-medium text-[#20232E] dark:text-[#F4F5FA] block group-hover:text-[#6554D9] transition-colors">
                Minimize Weekly Idle Time
              </span>
              <span className="text-[11px] text-[#667085] dark:text-[#9DA7BB] block">
                Prioritize schedules with compact breaks
              </span>
            </div>
            <input
              type="checkbox"
              checked={preferences.minWeeklyIdleTime}
              onChange={(e) => handleToggle("minWeeklyIdleTime", e.target.checked)}
              className="w-4 h-4 text-[#6554D9] rounded border-[#E6E0D8] cursor-pointer accent-[#6554D9] dark:accent-[#8B8CFF]"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
