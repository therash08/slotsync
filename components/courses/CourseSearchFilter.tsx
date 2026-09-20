"use client";

import React from "react";
import { Search } from "lucide-react";

interface CourseSearchFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedSemester: number;
  onSemesterChange: (sem: number) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const CourseSearchFilter: React.FC<CourseSearchFilterProps> = ({
  query,
  onQueryChange,
  selectedSemester,
  onSemesterChange,
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="space-y-3 bg-[#FFFDFA] dark:bg-[#121522] p-4 sm:p-5 rounded-2xl border border-[#E6E0D8] dark:border-white/10 shadow-xs">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#667085] dark:text-[#9DA7BB] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by course code or title (e.g. CSE 2203, Data Structures, Linear Algebra)..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F0ECE5]/50 dark:bg-white/5 border border-[#E6E0D8] dark:border-white/10 rounded-xl text-[#20232E] dark:text-[#F4F5FA] placeholder:text-[#667085] dark:placeholder:text-[#9DA7BB] focus:outline-none focus:ring-2 focus:ring-[#6554D9] dark:focus:ring-[#8B8CFF]"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        {/* Semester Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[#667085] dark:text-[#9DA7BB] font-medium mr-1">Semester:</span>
          {[0, 1, 2, 3, 4, 5].map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => onSemesterChange(sem)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs select-none ${
                selectedSemester === sem
                  ? "bg-[#6554D9] dark:bg-[#8B8CFF] text-white dark:text-[#090B12] font-semibold shadow-2xs"
                  : "bg-[#F0ECE5] dark:bg-white/5 text-[#475467] dark:text-[#CBD5E1] hover:bg-[#E6E0D8] dark:hover:bg-white/10 border border-transparent"
              }`}
            >
              {sem === 0 ? "All Semesters" : `Sem ${sem}`}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#667085] dark:text-[#9DA7BB] font-medium mr-1">Type:</span>
          {["All", "Theory", "Lab"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTypeChange(t)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs select-none ${
                selectedType === t
                  ? "bg-[#20232E] dark:bg-[#F4F5FA] text-white dark:text-[#090B12] font-semibold shadow-2xs"
                  : "bg-[#F0ECE5] dark:bg-white/5 text-[#475467] dark:text-[#CBD5E1] hover:bg-[#E6E0D8] dark:hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
