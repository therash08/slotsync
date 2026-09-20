"use client";

import React, { useEffect } from "react";
import { Button } from "@/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] flex flex-col justify-between p-6">
      <div className="max-w-7xl mx-auto w-full">
        <Logo href="/" />
      </div>

      <div className="max-w-md mx-auto text-center space-y-5 my-auto py-12">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          An unexpected error occurred while processing timetable calculations. You can try refreshing the state.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button size="sm" onClick={() => reset()} className="gap-1.5 shadow-xs">
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400">
        © 2026 SlotSync • Build your semester without the clashes.
      </div>
    </div>
  );
}
