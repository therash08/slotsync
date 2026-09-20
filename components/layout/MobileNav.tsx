"use client";

import React from "react";
import { X } from "lucide-react";
import { AppSidebar } from "./AppSidebar";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 w-72 bg-[#FAF8F5] dark:bg-[#08090D] border-r border-stone-200 dark:border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
        <div className="absolute top-4 right-3 z-50">
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AppSidebar isMobile onNavigate={onClose} className="w-full border-r-0" />
      </div>
    </div>
  );
};
