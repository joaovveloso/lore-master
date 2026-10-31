"use client";

import { useGame } from "@/context/GameContext";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import CustomTextForm from "@/components/ingestion/CustomTextForm";
import ExportPDFButton from "@/components/report/ExportPDFButton";

export default function DashboardPage() {
  const { credits, analysis, isLoading, error: contextError } = useGame();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar: Título, Créditos e Botão de Exportação PDF */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 gap-4 shadow-xl">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Lore Master</span>
              <span className="text-xs bg-rose-950/80 text-rose-400 border border-rose-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Dashboard
              </span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Plataforma de inteligência e diagnóstico preditivo para jogos indie.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Créditos */}
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-inner">
              <span className="text-zinc-400 text-xs uppercase font-semibold">Créditos:</span>
              <span className="font-extrabold text-rose-500 text-base">{credits.availableCredits}</span>
            </div>

            {/* Botão Exportar PDF (Dev 3) */}
            <ExportPDFButton analysis={analysis} />
          </div>
        </div>

        {/* Formulário de Ingestão Manual (Sem o 6B) */}
        <CustomTextForm />

        {contextError && (
          <div className="bg-rose-950/30 border border-rose-900/50 text-rose-300 p-4 rounded-xl text-sm">
            {contextError}
          </div>
        )}

        {/* Grid de Métricas e Skeletons */}
        <MetricsGrid analysis={analysis} isLoading={isLoading} />
      </div>
    </div>
  );
}
