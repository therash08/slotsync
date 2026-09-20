"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/ui/Button";
import { ArrowRight, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Course Planner", href: "/dashboard" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF8F5]/85 dark:bg-[#0B0818]/85 backdrop-blur-md border-b border-stone-200/70 dark:border-white/[0.06] shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo href="/" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-[#B3ACC8]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#7C6CFF] dark:hover:text-[#F6F2FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/onboarding">
            <Button size="sm" variant="outline" className="gap-1.5 border-stone-200/80 dark:border-white/[0.08] text-stone-700 dark:text-[#B3ACC8] hover:bg-stone-100 dark:hover:bg-white/[0.06] dark:hover:text-[#F6F2FF]">
              <span>Setup Profile</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="gap-2 shadow-md shadow-orange-500/20 bg-[#FF7A00] hover:bg-[#EA6C00] text-white font-semibold">
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-600 dark:text-[#B3ACC8] hover:bg-stone-200/50 dark:hover:bg-white/[0.06]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] dark:bg-[#0E0B1F] border-b border-stone-200 dark:border-white/[0.06] px-4 py-5 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-700 dark:text-[#B3ACC8] hover:text-[#7C6CFF]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200/80 dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 dark:text-[#80769A] uppercase tracking-wider">
              Theme Mode
            </span>
            <ThemeToggle variant="segmented" />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center gap-2 bg-[#FF7A00] hover:bg-[#EA6C00] text-white font-semibold">
                <span>Open Course Planner</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
