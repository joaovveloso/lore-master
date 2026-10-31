"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import ExportPDFButton from "@/components/report/ExportPDFButton";

export default function DashboardPage() {
  const { 
    credits, 
    deductCredits, 
    hasEnoughCredits, 
    analysis, 
    isLoading, 
    runLocalAnalysis, 
    error: contextError 
  } = useGame();

  const [gameTitle, setGameTitle] = useState("Meu Jogo Indie");
  const [description, setDescription] = useState("Jogo de plataforma focado em exploração com mecânicas de tempo e combate desafiador.");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRunDiagnostic = () => {
    // 1. Valida se tem créditos suficientes (ex: 10 créditos por análise)
    if (!hasEnoughCredits(10)) {
      setLocalError("Créditos insuficientes! Você precisa de pelo menos 10 créditos para rodar o diagnóstico.");
      return;
    }

    setLocalError(null);

    // 2. Tenta deduzir os créditos no contexto global
    const success = deductCredits(10);
    if (!success) {
      setLocalError("Não foi possível deduzir os créditos.");
      return;
    }

    // 3. Dispara a análise local inteligente
    runLocalAnalysis(gameTitle, description);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar com Créditos e Ações */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lore Master Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Plataforma de inteligência e diagnóstico preditivo para jogos indie.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Contador Reativo de Créditos */}
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <span className="text-zinc-400">Créditos:</span>
              <span className="font-extrabold text-rose-500 text-base">{credits.availableCredits}</span>
            </div>

            {/* Botão de Exportar PDF do Dev 3 */}
            <ExportPDFButton analysis={analysis} />

            <button
              onClick={handleRunDiagnostic}
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-500 text-white font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50 text-sm shadow-lg shadow-rose-950/40"
            >
              {isLoading ? "Analisando..." : "Executar Diagnóstico (-10 Créditos)"}
            </button>
          </div>
        </div>

        {/* Card de Entrada de Dados (Feedback Manual) */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 space-y-4 shadow-lg">
          <h2 className="text-sm font-semibold tracking-wider text-rose-400 uppercase">
            Colar Feedback Manual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Título do Jogo</label>
              <input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-rose-600"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Descrição / Feedback da Comunidade</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-rose-600 resize-none"
              />
            </div>
          </div>
        </div>

        {(localError || contextError) && (
          <div className="bg-rose-950/30 border border-rose-900/50 text-rose-300 p-4 rounded-xl text-sm">
            {localError || contextError}
          </div>
        )}

        {/* Grid de Métricas e Skeletons */}
        <MetricsGrid analysis={analysis} isLoading={isLoading} />
      </div>
    </div>
  );
}
