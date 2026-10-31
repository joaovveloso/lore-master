"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { mockGames } from "@/data/mockData";
import { AnalysisResponse } from "@/types/analysis";
import CustomTextForm from "@/components/ingestion/CustomTextForm";
import ExportPDFButton from "@/components/report/ExportPDFButton";
import MetricsGrid from "@/components/dashboard/MetricsGrid";

export default function HomePage() {
  const { credits, deductCredits, hasEnoughCredits, analysis, isLoading, runLocalAnalysis } = useGame();
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Lore Master <span className="text-xs bg-rose-950 text-rose-400 px-2.5 py-0.5 rounded-full uppercase">Home</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Plataforma de inteligência e diagnóstico preditivo para jogos indie.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-sm">
              <span className="text-zinc-400 text-xs">Créditos: </span>
              <span className="font-bold text-rose-500">{credits.availableCredits}</span>
            </div>
            <ExportPDFButton analysis={analysis} />
          </div>
        </div>

        {/* Formulário de Ingestão Manual */}
        <CustomTextForm />

        {/* Grid de Métricas */}
        <MetricsGrid analysis={analysis} isLoading={isLoading} />
      </div>
    </div>
  );
}
