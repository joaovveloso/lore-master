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
import CustomTextForm from "@/components/ingestion/CustomTextForm";
import ExportPDFButton from "@/components/report/ExportPDFButton";
import MetricsGrid from "@/components/dashboard/MetricsGrid";

export default function HomePage() {
  const { 
    selectedGame, 
    setSelectedGame, 
    credits, 
    deductCredits, 
    hasEnoughCredits, 
    analysis, 
    isLoading, 
    runLocalAnalysis, 
    error: contextError 
  } = useGame();

  const [activeSection, setActiveSection] = useState<SectionId | "ingestion">("overview");
  const [localError, setLocalError] = useState<string | null>(null);

  const section = activeSection === "ingestion" 
    ? { label: "Ingestão Manual de Feedback" } 
    : getSection(activeSection as SectionId);
    
  const currentGame = selectedGame ?? mockGames[0];

  // Aciona a análise utilizando o estado global e créditos
  const handleRunAnalysisWithText = (textToAnalyze: string) => {
    setLocalError(null);

    if (!hasEnoughCredits(10)) {
      setLocalError("Créditos insuficientes! Você precisa de pelo menos 10 créditos para rodar o diagnóstico.");
      return;
    }

    const success = deductCredits(10);
    if (!success) {
      setLocalError("Não foi possível deduzir os créditos.");
      return;
    }

    runLocalAnalysis(currentGame.title, textToAnalyze);
    setActiveSection("diagnosis"); // Redireciona para os resultados
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
      value: currentGame.steamRating ? "Extremamente Positiva" : "—",
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
      value: analysis ? `${analysis.overallScore}/100` : "Pronto",
      description: analysis ? "Análise concluída" : "Motor Local Ativo",
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
            
            {/* Cabeçalho da Seção com Créditos e Exportação */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                  Lore Master / {section.label}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#252832] sm:text-3xl">
                  {section.label}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Créditos Disponíveis */}
                <div className="bg-white border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2">
                  <span className="text-gray-500 uppercase">Créditos:</span>
                  <span className="text-[#800638] font-extrabold text-sm">{credits.availableCredits}</span>
                </div>

                {/* Botão de Exportar PDF */}
                <ExportPDFButton analysis={analysis} />

                {/* Botão rápido para alternar para Ingestão Manual */}
                <button
                  type="button"
                  onClick={() => setActiveSection("ingestion")}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#800638]/30 bg-[#800638]/5 px-3.5 py-2 text-xs font-semibold text-[#800638] shadow-sm transition-all hover:bg-[#800638]/10"
                >
                  <FileText size={14} />
                  <span>Colar Feedback Manual</span>
                </button>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  {selectedGame ? `Ativo: ${selectedGame.title}` : "Modo Padrão"}
                </span>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {(localError || contextError) && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Aviso do sistema</h4>
                  <p className="text-xs mt-1">{localError || contextError}</p>
                </div>
              </div>
            )}

            {/* SEÇÃO: INGESTÃO MANUAL DE TEXTO */}
            {activeSection === "ingestion" && (
              <section className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-[#252832]">Ingestão Customizada de Feedback</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Cole comentários brutos de Discord, Reddit ou pesquisas para submetê-los ao motor de análise local (-10 créditos).
                  </p>
                </div>

                <CustomTextForm />
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

                {/* Banner de Diagnóstico */}
                <section
                  aria-labelledby="analysis-heading"
                  className="mt-6 rounded-2xl border border-[#800638]/20 bg-gradient-to-br from-[#800638] to-[#A51F4B] p-6 text-white shadow-xl sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        <Sparkles size={14} />
                        <span>Motor Analítico Local</span>
                      </div>
                      <h2 id="analysis-heading" className="text-xl font-bold">
                        Pronto para executar o diagnóstico de {currentGame.title}?
                      </h2>
                      <p className="max-w-xl text-sm text-white/90">
                        O motor irá processar os dados para extrair gargalos e recomendações acionáveis.
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

            {/* Renderização da Seção de Diagnóstico com os componentes visuais */}
            {activeSection === "diagnosis" && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-bold text-[#252832]">Motor Preditivo Lore Master</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Dispare o diagnóstico em tempo real para {currentGame.title}.
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
                        onClick={() => handleRunAnalysisWithText(`Jogo desenvolvido por ${currentGame.developer}. AppID: ${currentGame.appId}. Análise geral de performance e engajamento.`)}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#800638] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#800638]/20 transition-all hover:bg-[#60042a] disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Processando Análise...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            <span>Executar Diagnóstico (-10 Créditos)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Grid de Métricas Completo do Dev 5 */}
                  <div className="mt-6">
                    <MetricsGrid analysis={analysis} isLoading={isLoading} />
                  </div>
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
                    Esta seção está preparada para exibir os relatórios detalhados e métricas avançadas.
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
