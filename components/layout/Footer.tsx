import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#F5EFEB] dark:bg-[#0B0818] pt-16 pb-12 text-sm text-stone-500 dark:text-[#B3ACC8] overflow-hidden">
      {/* Soft gradient divider instead of harsh line */}
      <div className="soft-section-divider absolute top-0 left-0" />

      {/* Ambient background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-b from-[#7C6CFF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Logo href="/" showTagline />
            <p className="text-stone-600 dark:text-[#B3ACC8] max-w-sm text-xs leading-relaxed">
              SlotSync is a university course scheduling and clash-detection platform purpose-built for Leading University students combining regular semester routines with junior batch retake and improvement courses.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 dark:text-[#80769A]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
                <span className="text-stone-700 dark:text-[#F6F2FF] font-medium">All Systems Operational • Fall 2026</span>
              </div>
              <span>•</span>
              <div>
                Developer:{" "}
                <a
                  href="mailto:therash792@gmail.com"
                  className="font-medium text-stone-800 dark:text-[#F6F2FF] hover:text-[#7C6CFF] dark:hover:text-[#A78BFA] hover:underline transition-colors"
                >
                  therash792@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-[#F6F2FF] uppercase tracking-wider mb-3.5">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#features" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard/generate" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Schedule Optimizer
                </Link>
              </li>
              <li>
                <Link href="/dashboard/routine" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Clash Detector
                </Link>
              </li>
              <li>
                <Link href="/dashboard/courses" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Course Directory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-[#F6F2FF] uppercase tracking-wider mb-3.5">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#how-it-works" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Student FAQ
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Quick Onboarding
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors">
                  Department Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-[#F6F2FF] uppercase tracking-wider mb-3.5">
              Legal &amp; Info
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-stone-600 dark:text-[#B3ACC8] hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors cursor-pointer">
                  Academic Integrity
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200/60 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p className="text-stone-500 dark:text-[#80769A]">
            © 2026 <span className="font-semibold text-stone-800 dark:text-[#F6F2FF]">SlotSync</span>. Purpose-built for Leading University routine planning.
          </p>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#131024] backdrop-blur-xs shadow-xs">
            <span className="text-stone-600 dark:text-[#80769A]">Designed &amp; Developed by</span>
            <a
              href="mailto:therash792@gmail.com"
              className="font-medium text-[#7C6CFF] dark:text-[#A78BFA] hover:underline transition-colors"
            >
              therash792@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
