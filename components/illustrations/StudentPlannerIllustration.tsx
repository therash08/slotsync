"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StudentPlannerIllustrationProps {
  className?: string;
  compact?: boolean;
}

export const StudentPlannerIllustration: React.FC<StudentPlannerIllustrationProps> = ({
  className = "",
  compact = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const floatTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      };

  const floatOffset = shouldReduceMotion ? 0 : 8;

  return (
    <div className={`relative w-full select-none flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 600 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-lg drop-shadow-sm"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bgGlow" x1="150" y1="100" x2="450" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9D8FD" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F3E8FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>

          <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="calendarHeader" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#3B0764" floodOpacity="0.12" />
          </filter>
          <filter id="cardShadow" x="-15%" y="-15%" width="130%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4C1D95" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Ambient background decorative blob */}
        <ellipse cx="300" cy="240" rx="240" ry="180" fill="url(#bgGlow)" />
        <circle cx="480" cy="110" r="16" fill="#FDE047" opacity="0.6" />
        <circle cx="100" cy="340" r="10" fill="#DDD6FE" />
        <circle cx="510" cy="350" r="12" fill="#FED7AA" />

        {/* =================================================== */}
        {/* DESK SURFACE                                       */}
        {/* =================================================== */}
        <ellipse cx="300" cy="425" rx="270" ry="32" fill="#DDD6FE" opacity="0.6" />
        <rect x="70" y="415" width="460" height="14" rx="7" fill="#C4B5FD" opacity="0.8" />

        {/* Books on the left */}
        <g transform="translate(95, 360)">
          {/* Bottom Book (Deep Purple) */}
          <rect x="0" y="32" width="70" height="14" rx="3" fill="#5B21B6" />
          <rect x="6" y="34" width="60" height="10" fill="#EDE9FE" opacity="0.4" />
          {/* Middle Book (Warm Orange) */}
          <rect x="8" y="18" width="60" height="13" rx="3" fill="#EA580C" />
          <rect x="14" y="20" width="50" height="9" fill="#FFF7ED" opacity="0.4" />
          {/* Top Book (Lavender) */}
          <rect x="14" y="6" width="52" height="11" rx="3" fill="#8B5CF6" />
        </g>

        {/* Coffee Mug on the right */}
        <g transform="translate(455, 375)">
          <rect x="0" y="8" width="26" height="32" rx="6" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />
          <path d="M26 14 C34 14 34 26 26 26" fill="none" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="4" y="14" width="18" height="3" rx="1.5" fill="#F97316" />
          {/* Steam */}
          <path d="M7 3 Q10 -2 7 -6" fill="none" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M15 4 Q18 -1 15 -5" fill="none" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* =================================================== */}
        {/* MAIN CALENDAR BOARD (CENTER)                        */}
        {/* =================================================== */}
        <g filter="url(#softShadow)">
          {/* Calendar Body */}
          <rect x="145" y="110" width="310" height="250" rx="20" fill="#FFFFFF" stroke="#E9D8FD" strokeWidth="3" />

          {/* Calendar Top Header */}
          <path d="M145 130 C145 119 154 110 165 110 L435 110 C446 110 455 119 455 130 L455 155 L145 155 Z" fill="url(#calendarHeader)" />

          {/* Calendar Rings */}
          <rect x="195" y="98" width="10" height="24" rx="5" fill="#4C1D95" />
          <rect x="295" y="98" width="10" height="24" rx="5" fill="#4C1D95" />
          <rect x="395" y="98" width="10" height="24" rx="5" fill="#4C1D95" />

          {/* Header Title */}
          <text x="170" y="138" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            WEEKLY ROUTINE • FALL 2026
          </text>
          <circle cx="430" cy="133" r="5" fill="#34D399" />

          {/* Day Columns */}
          <g transform="translate(160, 165)">
            {/* Days row */}
            {["SUN", "MON", "TUE", "WED", "THU"].map((day, idx) => (
              <g key={day} transform={`translate(${idx * 56}, 0)`}>
                <rect x="0" y="0" width="50" height="22" rx="6" fill="#F5F3FF" />
                <text x="25" y="15" fill="#6D28D9" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  {day}
                </text>
              </g>
            ))}

            {/* Time Slot Rows Background */}
            <line x1="0" y1="32" x2="280" y2="32" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="280" y2="75" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="280" y2="120" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="165" x2="280" y2="165" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="3 3" />

            {/* Fixed Regular Classes in Calendar */}
            {/* Sunday Morning: CSE 3301 */}
            <rect x="0" y="38" width="50" height="42" rx="8" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="25" y="55" fill="#5B21B6" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 3301</text>
            <text x="25" y="68" fill="#7C3AED" fontSize="7" textAnchor="middle" fontFamily="sans-serif">11:30</text>

            {/* Sunday Afternoon Lab: CSE 3302 */}
            <rect x="0" y="86" width="50" height="52" rx="8" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="25" y="106" fill="#5B21B6" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 3302</text>
            <text x="25" y="120" fill="#7C3AED" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Lab 304</text>

            {/* Monday Morning: CSE 3303 */}
            <rect x="56" y="38" width="50" height="42" rx="8" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="81" y="55" fill="#5B21B6" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 3303</text>
            <text x="81" y="68" fill="#7C3AED" fontSize="7" textAnchor="middle" fontFamily="sans-serif">09:30</text>

            {/* Tuesday: CSE 3305 & CSE 3301 */}
            <rect x="112" y="38" width="50" height="36" rx="8" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="137" y="55" fill="#5B21B6" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 3305</text>

            {/* Fitted Retake Course (Warm Orange highlight - Non-overlapping!) */}
            <rect x="112" y="82" width="50" height="42" rx="8" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
            <text x="137" y="99" fill="#C2410C" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 2203</text>
            <text x="137" y="112" fill="#EA580C" fontSize="7" fontWeight="semibold" textAnchor="middle" fontFamily="sans-serif">Retake (C)</text>

            {/* Wednesday & Thursday classes */}
            <rect x="168" y="38" width="50" height="38" rx="8" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="193" y="55" fill="#5B21B6" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 3303</text>

            <rect x="224" y="82" width="50" height="42" rx="8" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
            <text x="249" y="99" fill="#C2410C" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSE 2203</text>
            <text x="249" y="112" fill="#EA580C" fontSize="7" fontWeight="semibold" textAnchor="middle" fontFamily="sans-serif">Sec C</text>
          </g>
        </g>

        {/* =================================================== */}
        {/* FLOATING COURSE CARDS (ANIMATED VECTORS)           */}
        {/* =================================================== */}
        {/* Floating Card 1: Compatible Section Fit (Top Right) */}
        <g filter="url(#cardShadow)" transform="translate(370, 48)">
          <rect x="0" y="0" width="145" height="54" rx="14" fill="#FFFFFF" stroke="#34D399" strokeWidth="2.5" />
          <circle cx="22" cy="27" r="12" fill="#ECFDF5" />
          <path d="M17 27 L20 30 L27 22" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="42" y="24" fill="#1F2937" fontSize="11" fontWeight="bold" fontFamily="sans-serif">CSE 2203 • Sec C</text>
          <text x="42" y="38" fill="#059669" fontSize="9" fontWeight="semibold" fontFamily="sans-serif">Fits Routine (0 Clashes)</text>
        </g>

        {/* Floating Card 2: Clashing Card Moving Away (Left side) */}
        <g filter="url(#cardShadow)" transform="translate(48, 140)">
          <rect x="0" y="0" width="125" height="50" rx="12" fill="#FFFFFF" stroke="#F87171" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.9" />
          <circle cx="18" cy="25" r="9" fill="#FEF2F2" />
          <text x="15" y="29" fill="#DC2626" fontSize="11" fontWeight="bold" fontFamily="sans-serif">✕</text>
          <text x="35" y="22" fill="#374151" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Sec A (Clash)</text>
          <text x="35" y="36" fill="#DC2626" fontSize="8" fontFamily="sans-serif">Overlaps Sun 11:30</text>
        </g>

        {/* =================================================== */}
        {/* FRIENDLY CARTOON STUDENT CHARACTER (RIGHT / FRONT)  */}
        {/* =================================================== */}
        <g transform="translate(390, 240)">
          {/* Shadow beneath character */}
          <ellipse cx="65" cy="180" rx="55" ry="12" fill="#C4B5FD" opacity="0.4" />

          {/* Torso & Sweater (Deep Purple with Orange Trim) */}
          <path d="M35 125 C35 105 95 105 95 125 L108 180 L22 180 Z" fill="url(#purpleGrad)" />
          {/* Orange Collar */}
          <path d="M55 108 L65 122 L75 108 Z" fill="#F97316" />
          <path d="M52 108 L65 125 L78 108" stroke="#FFFFFF" strokeWidth="2" fill="none" />

          {/* Left Arm holding tablet/course list */}
          <path d="M32 125 C18 135 15 155 35 165" fill="none" stroke="#5B21B6" strokeWidth="14" strokeLinecap="round" />
          {/* Right Arm pointing cheerfully to the compatible card */}
          <path d="M96 125 C115 130 125 110 115 88" fill="none" stroke="#5B21B6" strokeWidth="14" strokeLinecap="round" />
          {/* Hand pointing */}
          <circle cx="114" cy="85" r="7" fill="#FDBA74" />

          {/* Neck */}
          <rect x="58" y="94" width="14" height="16" rx="4" fill="#FDBA74" />

          {/* Head */}
          <circle cx="65" cy="70" r="28" fill="#FED7AA" />

          {/* Hair (Dark, friendly curls) */}
          <path d="M36 68 C36 40 94 40 94 68 C88 48 76 42 65 42 C50 42 42 50 36 68 Z" fill="#2E1065" />
          <circle cx="40" cy="54" r="10" fill="#2E1065" />
          <circle cx="56" cy="42" r="12" fill="#2E1065" />
          <circle cx="74" cy="42" r="12" fill="#2E1065" />
          <circle cx="90" cy="54" r="10" fill="#2E1065" />

          {/* Glasses (Purple round frames) */}
          <circle cx="53" cy="68" r="9" fill="#FFFFFF" fillOpacity="0.3" stroke="#4C1D95" strokeWidth="2.5" />
          <circle cx="77" cy="68" r="9" fill="#FFFFFF" fillOpacity="0.3" stroke="#4C1D95" strokeWidth="2.5" />
          <line x1="62" y1="68" x2="68" y2="68" stroke="#4C1D95" strokeWidth="2.5" />

          {/* Eyes (Happy arcs inside glasses) */}
          <path d="M49 68 Q53 64 57 68" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          <path d="M73 68 Q77 64 81 68" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />

          {/* Cheerful Smile */}
          <path d="M59 81 Q65 87 71 81" fill="none" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="46" cy="74" r="4" fill="#F87171" opacity="0.4" />
          <circle cx="84" cy="74" r="4" fill="#F87171" opacity="0.4" />

          {/* Student ID Card Lanyard */}
          <path d="M55 125 L65 150 L75 125" fill="none" stroke="#FB923C" strokeWidth="2" />
          <rect x="58" y="148" width="14" height="18" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="60" y="152" width="10" height="4" fill="#6366F1" />
          <line x1="60" y1="159" x2="70" y2="159" stroke="#94A3B8" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
