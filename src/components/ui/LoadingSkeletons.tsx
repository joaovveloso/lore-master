"use client";

import React from "react";

export function MetricCardSkeleton() {
  return (
    <div className="bg-[#121212] border border-[#800638]/30 rounded-xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-4">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#800638]/10 to-transparent" />
      <div className="flex items-center justify-between">
        <div className="w-28 h-4 bg-[#800638]/20 rounded-md animate-pulse" />
        <div className="w-8 h-8 rounded-lg bg-[#800638]/20 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="w-20 h-8 bg-[#800638]/30 rounded-md animate-pulse" />
        <div className="w-36 h-3 bg-zinc-800 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export function ReportGenerationSkeleton() {
  return (
    <div className="bg-[#121212] border border-[#800638]/30 rounded-2xl p-8 space-y-6 shadow-xl relative overflow-hidden">
      <div className="space-y-3">
        <div className="w-48 h-6 bg-[#800638]/30 rounded-md animate-pulse" />
        <div className="w-full max-w-md h-4 bg-zinc-800 rounded-md animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
      <div className="w-full h-48 bg-[#800638]/10 rounded-xl border border-[#800638]/20 animate-pulse flex items-center justify-center">
        <div className="text-xs font-medium text-[#A51F4B] tracking-wider uppercase animate-bounce">
          Processando motor de diagnóstico preditivo...
        </div>
      </div>
    </div>
  );
}
