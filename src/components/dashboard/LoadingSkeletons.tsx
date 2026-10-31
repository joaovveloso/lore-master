"use client";

import React from "react";

export default function LoadingSkeletons() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-28 w-full rounded-2xl bg-zinc-200/70" />

      {/* Grid de Cards Superiores (Métricas) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-2xl border border-zinc-200 bg-white p-5 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 rounded bg-zinc-200" />
              <div className="size-8 rounded-xl bg-zinc-200" />
            </div>
            <div className="h-8 w-16 rounded bg-zinc-300" />
            <div className="h-3 w-32 rounded bg-zinc-100" />
          </div>
        ))}
      </div>

      {/* Bloco do Diagnóstico / Problemas Encontrados */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
        <div className="h-6 w-48 rounded bg-zinc-300" />
        <div className="h-4 w-full rounded bg-zinc-200" />
        <div className="h-4 w-3/4 rounded bg-zinc-200" />
        
        <div className="pt-4 space-y-3">
          <div className="h-24 w-full rounded-xl bg-zinc-100 border border-zinc-200 p-4 space-y-2">
            <div className="h-4 w-1/3 rounded bg-zinc-300" />
            <div className="h-3 w-2/3 rounded bg-zinc-200" />
          </div>
          <div className="h-24 w-full rounded-xl bg-zinc-100 border border-zinc-200 p-4 space-y-2">
            <div className="h-4 w-1/3 rounded bg-zinc-300" />
            <div className="h-3 w-2/3 rounded bg-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
