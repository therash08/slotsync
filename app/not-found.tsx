import React from "react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] flex flex-col justify-between p-6">
      <div className="max-w-7xl mx-auto w-full">
        <Logo href="/" />
      </div>

      <div className="max-w-md mx-auto text-center space-y-5 my-auto py-12">
        <div className="font-mono text-6xl sm:text-7xl font-extrabold text-indigo-600 dark:text-indigo-400">
          404
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The schedule or routine route you are looking for has been moved, archived, or doesn&apos;t exist in this academic term.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/dashboard">
            <Button size="sm" className="gap-1.5 shadow-xs">
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <Link href="/">
            <Button size="sm" variant="outline" className="gap-1.5">
              <span>Home</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400">
        © 2026 SlotSync • Build your semester without the clashes.
      </div>
    </div>
  );
}
