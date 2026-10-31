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
  FileText,
  Plus,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar, {
  getSection,
  type SectionId,
} from "@/components/Sidebar";
import { useGame } from "@/context/GameContext";
import { mockGames } from "@/data/mockData";
import { GameData } from "@/types";
import CustomTextForm from "@/components/ingestion/CustomTextForm";
import ExportPDFButton from "@/components/report/ExportPDFButton";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import CreditShopModal from "@/components/dashboard/CreditShopModal";
import AddGameModal from "@/components/dashboard/AddGameModal";

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
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);

  // Estado local da biblioteca de jogos do usuário (permite adicionar novos)
  const [gamesList, setGamesList] = useState<GameData[]>(mockGames);

  const section = activeSection === "ingestion" 
    ? { label: "Ingestão Manual de Feedback" } 
    : getSection(activeSection as SectionId);
    
  const currentGame = selectedGame ?? gamesList[0];

  const handleAddGame = (newGame: GameData) => {
    setGamesList((prev) => [newGame, ...prev]);
    setSelectedGame(newGame); // Seleciona automaticamente o jogo recém-criado
  };

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
    setActiveSection("diagnosis");
  };

  const metrics = [
    {
      label: "Avaliações analisadas",
      value: currentGame.steamRating ? currentGame.steamRating.totalReviews.toLocaleString() : "—",
      description: "Base de dados processada",
      icon: MessageSquare,
    },
    {
      label: "Avaliação Geral",
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
            
            {/* Topo com Créditos, Recarga e Exportação */}
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
                <div className="bg-white border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2">
                  <span className="text-gray-500 uppercase">Créditos:</span>
                  <span className="text-[#800638] font-extrabold text-sm">{credits.availableCredits}</span>
                  <button
                    onClick={() => setIsShopOpen(true)}
                    className="ml-2 bg-[#800638] hover:bg-[#60042a] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow-sm"
                  >
                    + Comprar
                  </button>
                </div>

                <ExportPDFButton analysis={analysis} />

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

            {/* SEÇÃO DE CRÉDITOS E FATURAMENTO */}
            {activeSection === "credits" && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-bold text-[#252832]">Gerenciamento de Créditos</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Acompanhe seu saldo atual, histórico de consumo e planos de assinatura do Lore Master.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsShopOpen(true)}
                      className="bg-[#800638] hover:bg-[#60042a] text-white px-5 py-3 rounded-xl text-xs font-bold transition shadow-md shadow-[#800638]/20 flex items-center gap-2"
                    >
                      <Sparkles size={16} />
                      <span>Adicionar Mais Créditos</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl border border-gray-200 bg-[#F7F8FA] p-5 space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Saldo Disponível</p>
                      <p className="text-3xl font-extrabold text-[#800638]">{credits.availableCredits} Créditos</p>
                      <p className="text-xs text-gray-400">Equivale a aprox. {Math.floor(credits.availableCredits / 10)} diagnósticos completos.</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-[#F7F8FA] p-5 space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Plano Atual</p>
                      <p className="text-2xl font-bold text-[#252832]">Indie Pro (Sandbox)</p>
                      <p className="text-xs text-emerald-600 font-medium">● Renovação ativa em ambiente de testes</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-[#F7F8FA] p-5 space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Custo por Análise</p>
                      <p className="text-2xl font-bold text-[#252832]">10 Créditos</p>
                      <p className="text-xs text-gray-400">Inclui motor heurístico, PDF e métricas.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "overview" && (
              <>
                {/* Biblioteca & Seletor de Jogos Local */}
                <section
                  aria-labelledby="game-heading"
                  className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#800638]/10 text-[#800638]">
                        <Gamepad2 size={28} />
                      </div>

                      <div className="min-w-0">
                        <span className="inline-block rounded-md bg-[#800638]/10 px-2 py-0.5 text-xs font-semibold text-[#800638]">
                          ID do Projeto: {currentGame.appId}
                        </span>

                        <h2 id="game-heading" className="mt-1 break-words text-xl font-bold text-[#252832]">
                          {currentGame.title}
                        </h2>

                        <p className="mt-0.5 text-xs text-gray-500">
                          Desenvolvido por <span className="font-medium text-[#252832]">{currentGame.developer}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsAddGameOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#800638] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#800638]/20 transition hover:bg-[#60042a]"
                    >
                      <Plus size={16} />
                      <span>Adicionar Novo Jogo</span>
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2.5 uppercase tracking-wider">
                      Selecione um jogo da sua biblioteca para analisar:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {gamesList.map((game) => (
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
                          🎮 {game.title}
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

            {/* Renderização da Seção de Diagnóstico */}
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

                  {/* Grid de Métricas */}
                  <div className="mt-6">
                    <MetricsGrid analysis={analysis} isLoading={isLoading} />
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Modais de Suporte */}
      <CreditShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
      <AddGameModal isOpen={isAddGameOpen} onClose={() => setIsAddGameOpen(false)} onAddGame={handleAddGame} />
    </div>
  );
}
