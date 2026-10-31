"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import { AnalysisResponse } from "@/types";

export default function DashboardPage() {
  const { credits, deductCredits, hasEnoughCredits, error: contextError } = useGame();
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRunDiagnostic = async () => {
    // Valida se o usuário tem créditos suficientes (10 créditos para diagnóstico)
    if (!hasEnoughCredits(10)) {
      setLocalError("Créditos insuficientes! Você precisa de pelo menos 10 créditos.");
      return;
    }

    setLocalError(null);
    setIsLoading(true);

    // Deduz os créditos via Dev 7 context
    const success = await deductCredits(10);
    if (!success) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de chamada ou integração com a API Route do Dev 9
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: 12345,
          gameTitle: "Deadlock / Indie Game",
          description: "Análise preditiva de feedback e performance da comunidade.",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar diagnóstico na API.");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setLocalError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar com Créditos e Ação */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lore Master Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Plataforma de inteligência e diagnóstico preditivo para jogos indie.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-sm">
              <span className="text-zinc-400">Créditos Disponíveis: </span>
              <span className="font-bold text-rose-500">{credits.availableCredits}</span>
            </div>

            <button
              onClick={handleRunDiagnostic}
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-500 text-white font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50 text-sm shadow-lg shadow-rose-950/40"
            >
              {isLoading ? "Processando..." : "Executar Diagnóstico (10 Créditos)"}
            </button>
          </div>
        </div>

        {(localError || contextError) && (
          <div className="bg-rose-950/30 border border-rose-900/50 text-rose-300 p-4 rounded-xl text-sm">
            {localError || contextError}
          </div>
        )}

        {/* Grid de Métricas do Dev 5 */}
        <MetricsGrid analysis={analysis} isLoading={isLoading} />
      </div>
    </div>
  );
}
