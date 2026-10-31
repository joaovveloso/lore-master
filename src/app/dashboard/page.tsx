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

  const [gameTitle, setGameTitle] = useState("Chronos Odyssey / Indie Demo");
  const [description, setDescription] = useState("O jogo apresenta gráficos incríveis e mecânicas divertidas, mas os jogadores estão reclamando de quedas de FPS durante os combates e o preço está um pouco alto para o mercado.");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRunDiagnostic = () => {
    // 1. Valida se tem créditos suficientes (ex: 10 créditos por análise)
    if (!hasEnoughCredits(10)) {
      setLocalError("Créditos insuficientes! Você precisa de pelo menos 10 créditos para rodar o diagnóstico.");
      return;
    }

    setLocalError(null);

    // 2. Deduz os créditos no contexto global
    const success = deductCredits(10);
    if (!success) {
      setLocalError("Não foi possível deduzir os créditos.");
      return;
    }

    // 3. Dispara a análise local inteligente
    runLocalAnalysis(gameTitle, description);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar: Título, Créditos e Ações */}
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
            {/* Contador de Créditos Reativo */}
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-inner">
              <span className="text-zinc-400 text-xs uppercase font-semibold">Créditos:</span>
              <span className="font-extrabold text-rose-500 text-base">{credits.availableCredits}</span>
            </div>

            {/* Botão de Exportar PDF */}
            <ExportPDFButton analysis={analysis} />
          </div>
        </div>

        {/* Card Principal: Colar Feedback Manual */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-950/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h2 className="text-sm font-bold tracking-wider text-rose-400 uppercase flex items-center gap-2">
              <span>📝 Colar Feedback Manual</span>
            </h2>
            <span className="text-xs text-zinc-500">Modo de Análise Local Ativo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">Título do Jogo</label>
              <input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="Ex: Meu Jogo Indie"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-600 transition"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">Feedback / Descrição da Comunidade (Steam, Itch.io, etc.)</label>
              <div className="flex gap-3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Cole aqui os comentários dos jogadores..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-600 transition resize-none"
                />
                <button
                  onClick={handleRunDiagnostic}
                  disabled={isLoading}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-6 py-2.5 rounded-xl transition disabled:opacity-50 text-sm shadow-lg shadow-rose-950/50 whitespace-nowrap self-end flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analisando...
                    </>
                  ) : (
                    "Executar Diagnóstico (-10 Créditos)"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens de Erro */}
        {(localError || contextError) && (
          <div className="bg-rose-950/30 border border-rose-900/50 text-rose-300 p-4 rounded-xl text-sm flex items-center gap-3">
            <span>⚠️</span>
            <span>{localError || contextError}</span>
          </div>
        )}

        {/* Grid de Métricas, Gráficos e Skeletons */}
        <MetricsGrid analysis={analysis} isLoading={isLoading} />
      </div>
    </div>
  );
}
