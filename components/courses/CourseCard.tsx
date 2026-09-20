"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/types";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { useToast } from "@/ui/Toast";
import { BookOpen, Plus, Check, ExternalLink } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { selectedCourses, addSelectedCourse } = useScheduleStore();
  const { showToast } = useToast();

  const isSelected = selectedCourses.some(
    (c) => c.courseCode.toUpperCase() === course.code.toUpperCase()
  );
  const selectedType = selectedCourses.find(
    (c) => c.courseCode.toUpperCase() === course.code.toUpperCase()
  )?.enrollmentType;

  const { lockedSections } = useScheduleStore();
  const locked = lockedSections[course.code];

  const handleAdd = (type: "Retake" | "Improvement") => {
    addSelectedCourse(course, type);
    showToast(`Added ${course.code} as ${type} course to your planner.`, "success");
  };

  const courseSlug = course.code.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-[#E6E0D8] dark:border-white/10 bg-[#FFFDFA] dark:bg-[#121522] shadow-xs hover-card-lift transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-sm text-[#6554D9] dark:text-[#8B8CFF]">
              {course.code}
            </span>
            {locked && (
              <span title={`Section ${locked.section} is locked`} className="flex items-center text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#6554D9] dark:text-[#8B8CFF] border border-[#6554D9]/20">
                Sec {locked.section}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-[#F0ECE5] dark:bg-white/5 text-[#475467] dark:text-[#CBD5E1] border border-[#E6E0D8]/60 dark:border-white/5">
              Sem {course.semester}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-[#F0ECE5] dark:bg-white/5 text-[#475467] dark:text-[#CBD5E1] border border-[#E6E0D8]/60 dark:border-white/5">
              {course.credits} Cr
            </span>
          </div>
        </div>

        <Link
          href={`/dashboard/courses/${courseSlug}`}
          className="font-bold text-sm text-[#20232E] dark:text-[#F4F5FA] group-hover:text-[#6554D9] dark:group-hover:text-[#8B8CFF] transition-colors line-clamp-1 mb-1.5"
        >
          {course.name}
        </Link>

        <p className="text-xs text-[#667085] dark:text-[#9DA7BB] line-clamp-2 mb-4 leading-relaxed">
          {course.description || "Foundational curriculum module with lecture syllabus."}
        </p>
      </div>

      <div className="pt-3 border-t border-[#E6E0D8]/80 dark:border-white/10 flex items-center justify-between gap-2">
        <Link
          href={`/dashboard/courses/${courseSlug}`}
          className="text-xs text-[#667085] hover:text-[#20232E] dark:text-[#9DA7BB] dark:hover:text-[#F4F5FA] flex items-center gap-1"
        >
          <span>Sections</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {isSelected ? (
          <Badge variant={selectedType === "Improvement" ? "improvement" : "retake"} size="sm">
            <Check className="w-3 h-3 mr-1" />
            In Plan ({selectedType})
          </Badge>
        ) : (
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAdd("Retake")}
              className="text-xs h-7 px-2"
            >
              + Retake
            </Button>
            <Button
              size="sm"
              variant="subtle"
              onClick={() => handleAdd("Improvement")}
              className="text-xs h-7 px-2"
            >
              + Improvement
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
