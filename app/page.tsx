"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero3DSchedule } from "@/components/3d/Hero3DSchedule";
import { SyncOrb } from "@/components/3d/SyncOrb";
import { InteractiveConflictDemo } from "@/components/landing/InteractiveConflictDemo";
import { BeforeAfterSlider } from "@/components/landing/BeforeAfterSlider";
import { Button } from "@/ui/Button";
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  Lock,
  Sliders,
  Search,
  Zap,
  ChevronDown,
  Check,
  ShieldCheck,
  TrendingDown,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const valuePills = [
    {
      title: "Automatic Clash Detection",
      icon: ShieldCheck,
      desc: "Real-time conflict analysis",
      glowColor: "from-[#7C6CFF]/20 to-transparent",
    },
    {
      title: "Cross-Batch Sync",
      icon: Layers,
      desc: "Batches 61, 62 & 63",
      glowColor: "from-indigo-500/20 to-transparent",
    },
    {
      title: "4-Day Campus Weeks",
      icon: Calendar,
      desc: "Optimized travel days",
      glowColor: "from-violet-500/20 to-transparent",
    },
    {
      title: "Section Alternative Swap",
      icon: Zap,
      desc: "Compatible slot suggestions",
      glowColor: "from-amber-500/20 to-transparent",
    },
  ];

  const features = [
    {
      icon: AlertTriangle,
      tag: "REAL-TIME DETECTION",
      tagColor: "border-rose-300/80 dark:border-rose-500/30 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
      gradient: "from-rose-500 to-red-600",
      title: "Smart Clash Detection",
      description:
        "Automatically analyzes overlapping start and end times across days to flag timetable collisions before you register.",
      badge: "Clash Detection Algorithm",
    },
    {
      icon: Layers,
      tag: "MULTI-BATCH SYNC",
      tagColor: "border-indigo-300/80 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
      gradient: "from-indigo-500 to-indigo-700",
      title: "Retake & Improvement Planner",
      description:
        "Select backlog courses from previous semesters and easily match them against available junior batch routines.",
      badge: "Cross-Batch Integration",
    },
    {
      icon: Search,
      tag: "COMPATIBILITY SCAN",
      tagColor: "border-sky-300/80 dark:border-sky-500/30 bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300",
      gradient: "from-sky-500 to-blue-600",
      title: "Section Alternative Finder",
      description:
        "Instantly locates open sections across Batches 62 & 63 that fit cleanly into your current semester schedule.",
      badge: "Section Fit Evaluation",
    },
    {
      icon: Sparkles,
      tag: "AUTO-RANKING",
      tagColor: "border-amber-300/80 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
      gradient: "from-amber-500 to-orange-600",
      title: "Schedule Optimizer",
      description:
        "Computes multiple conflict-free semester combinations ranked by campus days, gaps, and convenience scores.",
      badge: "Multi-Criteria Scoring",
    },
    {
      icon: Zap,
      tag: "AUTO-SWAP",
      tagColor: "border-violet-300/80 dark:border-violet-500/30 bg-violet-50/80 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300",
      gradient: "from-violet-500 to-purple-600",
      title: "1-Click Alternative Swap",
      description:
        "If a section causes a clash, SlotSync suggests non-conflicting sections with 1-click swap capabilities.",
      badge: "Conflict Remediation",
    },
    {
      icon: Calendar,
      tag: "VISUAL TIMETABLE",
      tagColor: "border-blue-300/80 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
      gradient: "from-blue-500 to-cyan-600",
      title: "Weekly Calendar",
      description:
        "Visual Sunday–Thursday routine grid with color-coded course categories, room numbers, and faculty details.",
      badge: "5-Day Weekly Grid",
    },
    {
      icon: Sliders,
      tag: "SCORING METRICS",
      tagColor: "border-emerald-300/80 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
      gradient: "from-emerald-500 to-teal-600",
      title: "Smart Routine Ranking",
      description:
        "Ranks routines algorithmically based on campus days, idle break durations, and morning/evening preferences.",
      badge: "0–100 Weighted Score",
    },
    {
      icon: Lock,
      tag: "PIN & FREEZE",
      tagColor: "border-indigo-300/80 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
      gradient: "from-indigo-600 to-purple-700",
      title: "Course Lock",
      description:
        "Pin a favorite section or lab slot; SlotSync holds it constant while optimizing your remaining classes.",
      badge: "Lockable Section Slot",
    },
    {
      icon: TrendingDown,
      tag: "CUSTOM TAILOR",
      tagColor: "border-orange-300/80 dark:border-orange-500/30 bg-orange-50/80 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
      gradient: "from-orange-500 to-amber-600",
      title: "Preference Controls",
      description:
        "Tailor routines: minimize campus days (e.g. 4 days), avoid 8 AM classes, avoid evening classes, or set off-days.",
      badge: "Target 4-Day Routine",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose your batch and section",
      description: "Select your active semester routine (e.g. Fall 2026 • Batch 62 Section A).",
      accent: "from-[#7C6CFF] to-indigo-600",
    },
    {
      number: "02",
      title: "Add retake or improvement courses",
      description: "Pick backlogged or improvement subjects from junior batch routines without guessing.",
      accent: "from-[#A78BFA] to-purple-600",
    },
    {
      number: "03",
      title: "Find a compatible routine",
      description: "Generate clash-free, 4-day schedules ranked by idle breaks and class time preferences.",
      accent: "from-[#F59E0B] to-amber-600",
    },
  ];

  const faqs = [
    {
      question: "How does SlotSync detect routine clashes?",
      answer:
        "SlotSync analyzes published routine sessions across Leading University batches. Two classes conflict if they occur on the same weekday and their time intervals overlap. The app highlights the exact overlap period, conflicting subjects, and room details.",
    },
    {
      question: "Can I take a retake course from a junior batch without manual spreadsheet checking?",
      answer:
        "Yes! SlotSync is built specifically for this pain point at Leading University. When you select a retake course (e.g. CSE 2203), SlotSync cross-examines all junior batch sections against your regular classes to highlight compatible slots.",
    },
    {
      question: "Can I lock a specific lab or theory section that I want?",
      answer:
        "Absolutely. The Course Lock feature allows you to pin any specific section. SlotSync keeps that section fixed and automatically re-optimizes the remaining courses around it.",
    },
    {
      question: "Are schedules ranked by artificial intelligence or transparent metrics?",
      answer:
        "SlotSync uses transparent optimization metrics: conflict penalty, campus day efficiency (preferring 4 or 3-day weeks), idle gap minimization, and your personal time-of-day preferences. You can view the exact mathematical breakdown on any schedule card.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--foreground)] selection:bg-[#7C6CFF] selection:text-white transition-colors duration-250">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#7C6CFF]/15 via-[#8B5CF6]/5 to-transparent blur-[140px] rounded-full pointer-events-none" />
        <div className="hidden dark:block ambient-motion-orb absolute top-12 right-1/4 w-[500px] h-[500px] bg-[#7C6CFF]/12 rounded-full blur-[130px] pointer-events-none" />
        <div className="hidden dark:block absolute top-1/3 left-10 w-[350px] h-[350px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C6CFF]/10 border border-[#7C6CFF]/25 text-xs font-semibold text-[#7C6CFF] dark:text-[#A78BFA] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#7C6CFF] dark:text-[#A78BFA]" />
                <span>Purpose-built for Leading University students</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-stone-900 dark:text-[#F6F2FF]">
                Build your semester{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C6CFF] via-[#9D7BFF] to-[#F59E0B]">
                  without the clashes.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-[#B3ACC8] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Combine your regular semester routine with retake, backlog, and improvement courses across batches into a clean timetable that works for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="gap-2 shadow-xl shadow-orange-500/20 w-full bg-[#FF7A00] hover:bg-[#EA6C00] text-white font-bold active:scale-[0.98] transition-all"
                  >
                    <span>Plan my semester</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-stone-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] text-stone-800 dark:text-[#F6F2FF] hover:bg-stone-100 dark:hover:bg-white/[0.07] active:scale-[0.98]"
                  >
                    <span>See how it works</span>
                  </Button>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-stone-500 dark:text-[#80769A]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Leading University batches 61, 62 &amp; 63
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Automatic clash detection
                </span>
              </div>
            </div>

            {/* Right: 3D Schedule Planner Visualization */}
            <div className="lg:col-span-6">
              <Hero3DSchedule />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE STRIP (FEATURE PILLS) */}
      <section className="relative py-8 bg-[var(--surface-canvas-subtle)] overflow-hidden">
        {/* Soft edge fade dividers */}
        <div className="soft-section-divider absolute top-0 left-0" />
        <div className="soft-section-divider absolute bottom-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {valuePills.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/80 dark:bg-[#131024] border border-stone-200/70 dark:border-white/[0.06] hover:border-[#7C6CFF]/30 hover:bg-white dark:hover:bg-[#18142E] shadow-sm transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#7C6CFF]/12 dark:bg-[#7C6CFF]/15 flex items-center justify-center text-[#7C6CFF] dark:text-[#A78BFA] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 dark:text-[#F6F2FF] tracking-tight">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-[#80769A]">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-rose-300/70 dark:border-rose-500/30 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
              The Retake Dilemma
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              Why cross-batch scheduling was broken
            </h2>
            <p className="text-sm text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
              When taking a retake or improvement course with junior batches, traditional spreadsheets and multi-page PDF notices create fatal clashes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-7 rounded-3xl border border-stone-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-[#131024] shadow-sm hover:border-rose-400/40 dark:hover:border-rose-500/30 hover:bg-white dark:hover:bg-[#18142E] transition-all duration-300 space-y-3.5 group hover:-translate-y-1">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-[#F6F2FF] tracking-tight">
                Overlapping Slot Blindspots
              </h3>
              <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                Even a 15-minute overlap between a morning core lecture and an afternoon retake lab forces sudden course drops during advising week.
              </p>
            </div>

            <div className="relative p-7 rounded-3xl border border-stone-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-[#131024] shadow-sm hover:border-amber-400/40 dark:hover:border-amber-500/30 hover:bg-white dark:hover:bg-[#18142E] transition-all duration-300 space-y-3.5 group hover:-translate-y-1">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-[#F6F2FF] tracking-tight">
                Exhausting 5-Day Commutes
              </h3>
              <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                Without intelligent section grouping, students get routines requiring 5 campus days with 3-hour dead gaps between lectures.
              </p>
            </div>

            <div className="relative p-7 rounded-3xl border border-stone-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-[#131024] shadow-sm hover:border-[#7C6CFF]/40 dark:hover:border-[#7C6CFF]/35 hover:bg-white dark:hover:bg-[#18142E] transition-all duration-300 space-y-3.5 group hover:-translate-y-1">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-[#7C6CFF]/15 text-[#7C6CFF] dark:text-[#A78BFA] border border-indigo-200/60 dark:border-[#7C6CFF]/25 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-[#F6F2FF] tracking-tight">
                Advising Portal Chaos
              </h3>
              <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed">
                Advising registration windows are competitive. If a chosen section conflicts at checkout, students scramble without pre-planned backups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CONFLICT DEMO */}
      <section className="py-24 bg-[var(--surface-canvas-subtle)] relative overflow-hidden">
        {/* Soft divider lines top and bottom */}
        <div className="soft-section-divider absolute top-0 left-0" />
        <div className="soft-section-divider absolute bottom-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#7C6CFF]/25 bg-[#7C6CFF]/10 text-[#7C6CFF] dark:text-[#A78BFA]">
              Interactive Test Drive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              Watch SlotSync resolve a real clash
            </h2>
            <p className="text-sm text-stone-600 dark:text-[#B3ACC8]">
              Click &quot;Find Alternative Section&quot; below to see how our engine swaps clashing times for optimal open slots.
            </p>
          </div>

          <InteractiveConflictDemo />
        </div>
      </section>

      {/* 5. FEATURES SECTION */}
      <section id="features" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#7C6CFF]/25 bg-[#7C6CFF]/10 text-[#7C6CFF] dark:text-[#A78BFA]">
              Feature Suite
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              Engineered for seamless semester planning
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-[#B3ACC8] max-w-xl mx-auto leading-relaxed">
              Everything you need to find junior batch sections, avoid timetable clashes, and craft your ideal university routine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="relative p-7 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-[#131024] shadow-sm hover:border-[#7C6CFF]/35 hover:bg-white dark:hover:bg-[#18142E] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7C6CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-md shadow-black/20 group-hover:scale-105 transition-transform duration-200",
                          feat.gradient
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border",
                          feat.tagColor
                        )}
                      >
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 dark:text-[#F6F2FF] group-hover:text-[#7C6CFF] dark:group-hover:text-[#A78BFA] transition-colors mb-2.5 tracking-tight">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-[#B3ACC8] leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-5 mt-6 border-t border-stone-100 dark:border-white/[0.05] flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-medium text-stone-500 dark:text-[#80769A] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C6CFF] inline-block" />
                      {feat.badge}
                    </span>

                    <span className="text-xs font-semibold text-[#7C6CFF] dark:text-[#A78BFA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BEFORE & AFTER SECTION */}
      <section className="py-24 bg-[var(--surface-canvas-subtle)] relative overflow-hidden">
        <div className="soft-section-divider absolute top-0 left-0" />
        <div className="soft-section-divider absolute bottom-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#7C6CFF]/25 bg-[#7C6CFF]/10 text-[#7C6CFF] dark:text-[#A78BFA]">
              Comparative Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              Transforming your university semester
            </h2>
            <p className="text-sm text-stone-600 dark:text-[#B3ACC8]">
              Toggle between the traditional routine scramble and the SlotSync automated optimization approach.
            </p>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* 7. HOW IT WORKS WORKFLOW */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#7C6CFF]/25 bg-[#7C6CFF]/10 text-[#7C6CFF] dark:text-[#A78BFA]">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              3 simple steps to your clash-free routine
            </h2>
            <p className="text-sm text-stone-600 dark:text-[#B3ACC8]">
              Stop scouring endless PDF schedules. Let SlotSync calculate combinations automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-[#7C6CFF]/25 to-transparent -translate-y-8 pointer-events-none" />

            {steps.map((st) => (
              <div
                key={st.number}
                className="relative p-8 rounded-3xl bg-white/90 dark:bg-[#131024] border border-stone-200/80 dark:border-white/[0.06] hover:border-[#7C6CFF]/35 hover:bg-white dark:hover:bg-[#18142E] shadow-sm transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-stone-300 dark:text-[#7C6CFF]/30">
                    {st.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#7C6CFF]/15 border border-[#7C6CFF]/25 flex items-center justify-center text-[#7C6CFF] dark:text-[#A78BFA]">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-stone-900 dark:text-[#F6F2FF] tracking-tight">
                  {st.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-[#B3ACC8] leading-relaxed font-normal">
                  {st.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 shadow-xl shadow-[#7C6CFF]/20 bg-[#7C6CFF] hover:bg-[#6854F5] text-white font-bold active:scale-[0.98] transition-all"
              >
                <span>Plan my semester</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. MARKETING DASHBOARD PREVIEW IN 3D PERSPECTIVE */}
      <section className="py-24 bg-[var(--surface-canvas-subtle)] relative overflow-hidden">
        <div className="soft-section-divider absolute top-0 left-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="max-w-2xl mx-auto space-y-3.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#7C6CFF]/25 bg-[#7C6CFF]/10 text-[#7C6CFF] dark:text-[#A78BFA]">
              Dashboard Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              A workspace built for academic speed
            </h2>
            <p className="text-sm text-stone-600 dark:text-[#B3ACC8]">
              Clean weekly timetable grids, section comparison tables, and preference controls in one place.
            </p>
          </div>

          {/* Perspective tilted preview frame */}
          <div className="perspective-container pt-4 relative">
            {/* Subtle glow behind preview frame */}
            <div className="absolute -inset-6 bg-gradient-to-b from-[#7C6CFF]/15 via-[#8B5CF6]/10 to-transparent rounded-3xl blur-3xl pointer-events-none" />

            <div className="relative rounded-3xl border border-stone-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#131024]/95 shadow-2xl p-5 sm:p-7 overflow-hidden card-3d-tilt transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0">
              {/* Header mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 dark:border-white/[0.06] mb-5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="font-mono text-stone-500 dark:text-[#80769A] ml-2 text-[11px]">
                    slotsync.app/dashboard/routine
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#7C6CFF]/12 border border-[#7C6CFF]/25 text-[#7C6CFF] dark:text-[#A78BFA] font-semibold text-[11px]">
                  Leading University • Fall 2026
                </span>
              </div>

              {/* Grid content mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map((day, i) => (
                  <div
                    key={day}
                    className="p-3.5 rounded-2xl bg-stone-50/90 dark:bg-[#0E0B1F] border border-stone-200/70 dark:border-white/[0.05] space-y-2.5"
                  >
                    <span className="font-bold text-xs text-stone-900 dark:text-[#F6F2FF] block">
                      {day}
                    </span>
                    <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-[#7C6CFF]/15 border border-indigo-200/60 dark:border-[#7C6CFF]/25 text-[11px]">
                      <span className="font-bold text-[#7C6CFF] dark:text-[#A78BFA] block">
                        CSE 3301
                      </span>
                      <span className="text-[10px] text-stone-500 dark:text-[#80769A]">
                        11:00 AM • R402
                      </span>
                    </div>
                    {i % 2 === 0 && (
                      <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-500/30 text-[11px]">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 block">
                          CSE 2203 (Retake)
                        </span>
                        <span className="text-[10px] text-stone-500 dark:text-[#80769A]">
                          02:30 PM • Sec C
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faq" className="py-24 lg:py-32 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#7C6CFF]/25 bg-[#7C6CFF]/10 text-[#7C6CFF] dark:text-[#A78BFA]">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-[#F6F2FF] tracking-tight">
              Everything students need to know
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={cn(
                    "rounded-2xl border transition-all duration-200 overflow-hidden",
                    isOpen
                      ? "bg-white dark:bg-[#18142E] border-stone-300 dark:border-[#7C6CFF]/35 shadow-md shadow-[#7C6CFF]/5"
                      : "bg-white/80 dark:bg-[#131024] border-stone-200/80 dark:border-white/[0.06] hover:border-stone-300 dark:hover:border-white/[0.12] hover:bg-white dark:hover:bg-[#161228]"
                  )}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 p-5 sm:p-6 cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base text-stone-900 dark:text-[#F6F2FF]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-stone-400 dark:text-[#80769A] transition-transform duration-200 shrink-0",
                        isOpen && "rotate-180 text-[#7C6CFF] dark:text-[#A78BFA]"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-stone-600 dark:text-[#B3ACC8] leading-relaxed border-t border-stone-100 dark:border-white/[0.04] pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA WITH SYNC ORB */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#181335] via-[#14102C] to-[#0E0B20] border border-white/[0.08] text-white shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle warm background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C6CFF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#7C6CFF]/20 border border-[#7C6CFF]/35 text-[#A78BFA]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Ready for Advising Week?</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F6F2FF]">
              Build your ideal clash-free routine today
            </h2>
            <p className="text-xs sm:text-sm text-[#B3ACC8] leading-relaxed">
              No more messy spreadsheets or overlapping classes. Generate compact 4-day schedules and junior batch section options in seconds.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gap-2 bg-[#FF7A00] hover:bg-[#EA6C00] text-white font-bold shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all"
                >
                  <span>Plan my semester</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sync Orb Visual on CTA */}
          <div className="relative z-10 flex items-center justify-center shrink-0">
            <SyncOrb size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
