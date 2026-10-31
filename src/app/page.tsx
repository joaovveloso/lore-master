"use client";

import { useState } from "react";
import {
  BarChart3,
  Gamepad2,
  MessageSquare,
  Sparkles,
  Star,
  Users,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar, {
  getSection,
  type SectionId,
} from "@/components/Sidebar";
import { useGame } from "@/context/GameContext";
import { mockGames } from "@/data/mockData";
import { AnalysisResponse } from "@/types/analysis";
import { CustomTextForm } from "@/components/ingestion/CustomTextForm";

export default function HomePage() {
  const gameContext = useGame();
  const selectedGame = gameContext?.selectedGame ?? mockGames[0];
  const setSelectedGame = gameContext?.setSelectedGame ?? (() => {});

  // Adicionamos "ingestion" como uma seção válida opcional na UI
  const [activeSection, setActiveSection] = useState<SectionId | "ingestion">("overview");

  // Estados para integração com a API da IA (Dev 9)
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const section = activeSection === "ingestion" 
    ? { label: "Ingestão Manual de Feedback" } 
    : getSection(activeSection as SectionId);
    
  const currentGame = selectedGame ?? mockGames[0];

  // Função para acionar o motor de IA via Ingestão Manual ou Steam
  const handleRunAnalysisWithText = async (textToAnalyze: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameTitle: currentGame.title,
          description: textToAnalyze,
          steamData: currentGame,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao processar a análise preditiva.");
      }

      setAnalysisResult(data);
      setActiveSection("diagnosis"); // Redireciona para ver o resultado gerado
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao chamar a API.");
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      label: "Avaliações analisadas",
      value: currentGame.steamRating ? currentGame.steamRating.totalReviews.toLocaleString() : "—",
      description: "Base de dados processada",
      icon: MessageSquare,
    },
    {
      label: "Avaliação Steam",
      value: currentGame.steamRating ? currentGame.steamRating.scoreDescription : "—",
      description: `${currentGame.steamRating?.positiveReviews.toLocaleString() ?? 0} positivas`,
      icon: Star,
    },
    {
      label: "Jogadores Online",
      value: currentGame.metrics ? currentGame.metrics.currentPlayers.toLocaleString() : "—",
      description: `Pico de 24h: ${currentGame.metrics?.peakPlayers24h.toLocaleString() ?? 0}`,
      icon: Users,
    },
    {
      label: "Diagnóstico por IA",
      value: analysisResult ? `${analysisResult.healthScore}/100` : "Pronto",
      description: analysisResult ? "Análise concluída" : "Gemini 1.5 Flash ativado",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F8FA] text-[#252832]">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
        <Sidebar
          active={activeSection === "ingestion" ? "overview" : activeSection}
          onSelect={(sec) => setActiveSection(sec)}
          className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-[268px] md:self-start md:overflow-y-auto"
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Cabeçalho da Seção */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                  Lore Master / {section.label}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#252832] sm:text-3xl">
                  {section.label}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {/* Botão rápido para alternar para Ingestão Manual */}
                <button
                  type="button"
                  onClick={() => setActiveSection("ingestion")}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#800638]/30 bg-[#800638]/5 px-3.5 py-2 text-xs font-semibold text-[#800638] shadow-sm transition-all hover:bg-[#800638]/10"
                >
                  <FileText size={14} />
                  <span>Colar Feedback Manual (Dev 6B)</span>
                </button>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  {selectedGame ? `Ativo: ${selectedGame.title}` : "Modo Padrão"}
                </span>
              </div>
            </div>

            {/* SEÇÃO: INGESTÃO MANUAL DE TEXTO (DEV 6B) */}
            {activeSection === "ingestion" && (
              <section className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-[#252832]">Ingestão Customizada de Feedback</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Cole comentários brutos de Discord, Reddit ou pesquisas para submetê-los diretamente ao Gemini.
                  </p>
                </div>

                <CustomTextForm
                  onSubmitAnalysis={handleRunAnalysisWithText}
                  isLoading={loading}
                />

                {error && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Erro ao processar ingestão</h4>
                      <p className="text-xs mt-1">{error}</p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {activeSection === "overview" && (
              <>
                {/* Seletor Rápido de Jogos */}
                <section
                  aria-labelledby="game-heading"
                  className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#800638]/10 text-[#800638]">
                        <Gamepad2 size={28} />
                      </div>

                      <div className="min-w-0">
                        <span className="inline-block rounded-md bg-[#800638]/10 px-2 py-0.5 text-xs font-semibold text-[#800638]">
                          AppID: {currentGame.appId}
                        </span>

                        <h2
                          id="game-heading"
                          className="mt-1 break-words text-xl font-bold text-[#252832]"
                        >
                          {currentGame.title}
                        </h2>

                        <p className="mt-0.5 text-xs text-gray-500">
                          Desenvolvido por <span className="font-medium text-[#252832]">{currentGame.developer}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mockGames.map((game) => (
                        <button
                          key={game.appId}
                          type="button"
                          onClick={() => setSelectedGame(game)}
                          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                            currentGame.appId === game.appId
                              ? "bg-[#800638] text-white shadow-md shadow-[#800638]/20"
                              : "border border-[#E5E7EB] bg-white text-gray-700 hover:bg-[#F7F8FA] hover:border-gray-300"
                          }`}
                        >
                          {game.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Métricas */}
                <section aria-labelledby="metrics-heading">
                  <div className="mb-4">
                    <h2 id="metrics-heading" className="text-lg font-semibold text-[#252832]">
                      Indicadores da análise
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Visão resumida dos dados e problemas identificados.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <article
                          key={metric.label}
                          className="min-w-0 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:border-[#800638]/30 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-gray-600">
                              {metric.label}
                            </p>
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#800638]/10 text-[#800638]">
                              <Icon size={18} />
                            </span>
                          </div>

                          <p className="mt-4 text-3xl font-bold tabular-nums text-[#252832]">
                            {metric.value}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-gray-500">
                            {metric.description}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </section>

                {/* Banner do Gemini */}
                <section
                  aria-labelledby="analysis-heading"
                  className="mt-6 rounded-2xl border border-[#800638]/20 bg-gradient-to-br from-[#800638] to-[#A51F4B] p-6 text-white shadow-xl sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        <Sparkles size={14} />
                        <span>Motor IA Gemini 1.5 Flash</span>
                      </div>
                      <h2 id="analysis-heading" className="text-xl font-bold">
                        Pronto para executar o diagnóstico de {currentGame.title}?
                      </h2>
                      <p className="max-w-xl text-sm text-white/90">
                        O motor analítico irá processar os dados para extrair padrões e recomendações acionáveis.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSection("diagnosis")}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#800638] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl active:scale-95"
                    >
                      <span>Ir para Diagnóstico</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </section>
              </>
            )}

            {/* Renderização da Seção de Diagnóstico */}
            {activeSection === "diagnosis" && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-bold text-[#252832]">Motor Preditivo Lore Master</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Dispare o diagnóstico em tempo real para {currentGame.title} utilizando a API Route do Gemini.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveSection("ingestion")}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Usar Texto Customizado
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRunAnalysisWithText(`Jogo desenvolvido por ${currentGame.developer}. AppID: ${currentGame.appId}.`)}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#800638] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#800638]/20 transition-all hover:bg-[#60042a] disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Processando IA...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            <span>Executar Diagnóstico com IA</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Exibição de Erros */}
                  {error && (
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                      <AlertCircle size={20} className="shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Erro ao gerar diagnóstico</h4>
                        <p className="text-xs mt-1">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Exibição dos Resultados da IA */}
                  {analysisResult && (
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center justify-between rounded-xl bg-slate-900 p-6 text-white">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-400 font-mono">Health Score Preditivo</p>
                          <p className="text-4xl font-extrabold text-emerald-400 mt-1">{analysisResult.healthScore} / 100</p>
                        </div>
                        <CheckCircle2 size={40} className="text-emerald-400" />
                      </div>

                      <div className="rounded-xl border border-gray-100 bg-[#F7F8FA] p-5">
                        <h3 className="font-bold text-[#252832] text-md">Resumo Executivo</h3>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{analysisResult.summary}</p>
                      </div>

                      {analysisResult.bottlenecks?.length > 0 && (
                        <div>
                          <h3 className="font-bold text-[#252832] text-md mb-3">Gargalos Identificados</h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {analysisResult.bottlenecks.map((b, idx) => (
                              <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 mb-2">
                                  {b.category} • Impacto {b.impact}
                                </span>
                                <p className="text-sm font-medium text-gray-800">{b.issue}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {analysisResult.recommendations?.length > 0 && (
                        <div>
                          <h3 className="font-bold text-[#252832] text-md mb-3">Recomendações Práticas</h3>
                          <div className="space-y-2">
                            {analysisResult.recommendations.map((r, idx) => (
                              <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-sm font-bold text-[#252832]">{r.action}</p>
                                  <p className="text-xs text-gray-500 mt-1">Resultado Esperado: {r.expectedOutcome}</p>
                                </div>
                                <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                                  Prioridade {r.priority}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Outras seções padrão */}
            {activeSection !== "overview" && activeSection !== "diagnosis" && activeSection !== "ingestion" && (
              <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm">
                <div className="mx-auto flex max-w-lg flex-col items-center py-12 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[#800638]/10 text-[#800638]">
                    <BarChart3 size={28} />
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-[#252832]">{section.label}</h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Esta seção está preparada para exibir os relatórios detalhados e métricas avançadas da Fase 2.
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
