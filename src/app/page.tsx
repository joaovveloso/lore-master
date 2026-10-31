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
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar, {
  getSection,
  type SectionId,
} from "@/components/Sidebar";
import { useGame } from "@/context/GameContext";
import { mockGames } from "@/data/mockData";
import { GameData, AnalysisResponse } from "@/types";
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
    analysis: contextAnalysis, 
    isLoading, 
    runLocalAnalysis, 
    error: contextError 
  } = useGame();

  const [activeSection, setActiveSection] = useState<SectionId | "ingestion" | "feedback">("overview");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);

  // Estado para o Benchmarking de Concorrentes
  const [selectedRival, setSelectedRival] = useState<GameData | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkDone, setBenchmarkDone] = useState(false);

  // Estado local da biblioteca de jogos do usuário
  const [gamesList, setGamesList] = useState<GameData[]>(mockGames);

  const section = activeSection === "ingestion" 
    ? { label: "Ingestão Manual de Feedback" } 
    : activeSection === "feedback"
    ? { label: "Problemas Recorrentes & Gargalos" }
    : getSection(activeSection as SectionId);
    
  const currentGame = selectedGame ?? gamesList[0];
  const rivalGame = selectedRival ?? gamesList.find(g => g.appId !== currentGame.appId) ?? gamesList[0];

  // Fallback analítico rico alinhado estritamente com o tipo GameIssue
  const defaultAnalysis: AnalysisResponse = {
    analysisId: "LM-9824-PRO",
    timestamp: new Date().toISOString(),
    overallScore: 84,
    predictedSuccessRate: 0.88,
    summary: "O motor local identificou forte engajamento na narrativa principal, porém com gargalos moderados na curva de aprendizado inicial e otimização de interface.",
    issues: [
      {
        id: "issue-1",
        title: "Queda de Performance em Transições de Cenas (Stuttering)",
        severity: "critical",
        category: "performance",
        impactScore: 9,
        description: "Múltiplos relatos de micro-travamentos ao carregar texturas pesadas em momentos de combate intenso.",
        recommendation: "Implementar pré-carregamento assíncrono (async asset preloading) nos shaders críticos."
      },
      {
        id: "issue-2",
        title: "Curva de Aprendizado Inicial Acentuada",
        severity: "high",
        category: "gameplay",
        impactScore: 7,
        description: "Jogadores relatam confusão nos primeiros 15 minutos devido à falta de tutoriais visuais claros.",
        recommendation: "Adicionar dicas contextuais dinâmicas na interface durante o primeiro ato."
      },
      {
        id: "issue-3",
        title: "Dificuldade com Leitura de Fontes em Resoluções Menores",
        severity: "medium",
        category: "marketing",
        impactScore: 4,
        description: "Textos de diálogos secundários ficam difíceis de ler no Steam Deck e telas menores.",
        recommendation: "Criar um seletor de escala de fonte nas configurações de acessibilidade."
      }
    ]
  };

  const analysis = contextAnalysis ?? defaultAnalysis;

  const handleAddGame = (newGame: GameData) => {
    setGamesList((prev) => [newGame, ...prev]);
    setSelectedGame(newGame);
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

  // Função para executar o Benchmarking de Concorrente (-5 créditos)
  const handleRunBenchmarking = () => {
    setLocalError(null);

    if (!hasEnoughCredits(5)) {
      setLocalError("Créditos insuficientes! Você precisa de pelo menos 5 créditos para realizar o benchmarking.");
      return;
    }

    const success = deductCredits(5);
    if (!success) {
      setLocalError("Não foi possível deduzir os créditos.");
      return;
    }

    setIsBenchmarking(true);
    setTimeout(() => {
      setIsBenchmarking(false);
      setBenchmarkDone(true);
    }, 1000);
  };

  // Cards em Português Perfeito
  const metrics = [
    {
      label: "Avaliações analisadas",
      value: currentGame.steamRating ? currentGame.steamRating.totalReviews.toLocaleString() : "—",
      description: "Base de dados processada",
      icon: MessageSquare,
    },
    {
      label: "Avaliação Geral",
      value: currentGame.steamRating ? (currentGame.steamRating.scoreDescription === "Very Positive" ? "Extremamente Positiva" : currentGame.steamRating.scoreDescription) : "—",
      description: `${currentGame.steamRating?.positiveReviews.toLocaleString() ?? 0} avaliações positivas`,
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
      value: `${analysis.overallScore}/100`,
      description: "Análise concluída com sucesso",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F8FA] text-[#252832]">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
        <Sidebar
          active={activeSection === "ingestion" || activeSection === "feedback" ? "overview" : activeSection}
          onSelect={(sec) => setActiveSection(sec as SectionId | "ingestion" | "feedback")}
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

            {/* SEÇÃO: BENCHMARKING DE CONCORRENTE (-5 CRÉDITOS) */}
            {activeSection === "benchmark" && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-bold text-[#252832]">Benchmarking de Concorrente</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Compare o seu projeto (<span className="font-bold text-[#800638]">{currentGame.title}</span>) lado a lado com um jogo rival do mercado.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleRunBenchmarking}
                      disabled={isBenchmarking}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#800638] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#800638]/20 transition-all hover:bg-[#60042a] disabled:opacity-50"
                    >
                      {isBenchmarking ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processando Comparativo...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={16} />
                          <span>Comparar com Rival (-5 Créditos)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Seletor de Rival */}
                  <div className="rounded-xl border border-gray-200 bg-[#F7F8FA] p-5 space-y-3">
                    <p className="text-xs font-semibold text-gray-700 uppercase">Selecione o Jogo Rival para Comparação:</p>
                    <div className="flex flex-wrap gap-2">
                      {gamesList.filter(g => g.appId !== currentGame.appId).map((rival) => (
                        <button
                          key={rival.appId}
                          type="button"
                          onClick={() => { setSelectedRival(rival); setBenchmarkDone(false); }}
                          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                            rivalGame.appId === rival.appId
                              ? "bg-[#252832] text-white shadow-sm"
                              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          ⚔️ {rival.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resultado do Benchmarking */}
                  {benchmarkDone ? (
                    <div className="space-y-6 pt-4 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Seu Jogo */}
                        <div className="rounded-xl border-2 border-[#800638]/30 bg-white p-6 space-y-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase text-[#800638] bg-[#800638]/10 px-2.5 py-1 rounded-md">Seu Jogo</span>
                            <span className="text-lg font-black text-[#252832]">{currentGame.title}</span>
                          </div>
                          <div className="space-y-3 pt-2 text-xs text-gray-600">
                            <div className="flex justify-between border-b pb-2">
                              <span>Total de Avaliações:</span>
                              <span className="font-bold text-[#252832]">{currentGame.steamRating?.totalReviews.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                              <span>Pico de Jogadores:</span>
                              <span className="font-bold text-[#252832]">{currentGame.metrics?.peakPlayers24h.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                              <span>Retenção Preditiva:</span>
                              <span className="font-bold text-emerald-600">{analysis ? `${(analysis.predictedSuccessRate * 100).toFixed(0)}%` : "82%"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Jogo Rival */}
                        <div className="rounded-xl border border-gray-200 bg-[#F7F8FA] p-6 space-y-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase text-gray-500 bg-gray-200 px-2.5 py-1 rounded-md">Concorrente</span>
                            <span className="text-lg font-black text-[#252832]">{rivalGame.title}</span>
                          </div>
                          <div className="space-y-3 pt-2 text-xs text-gray-600">
                            <div className="flex justify-between border-b pb-2">
                              <span>Total de Avaliações:</span>
                              <span className="font-bold text-[#252832]">{rivalGame.steamRating?.totalReviews.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                              <span>Pico de Jogadores:</span>
                              <span className="font-bold text-[#252832]">{rivalGame.metrics?.peakPlayers24h.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                              <span>Retenção Estimada:</span>
                              <span className="font-bold text-gray-700">74%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#800638]/5 border border-[#800638]/20 p-5 text-xs text-[#800638] space-y-1">
                        <p className="font-bold text-sm">💡 Conclusão Analítica do Lore Master:</p>
                        <p>O projeto <span className="font-bold">{currentGame.title}</span> demonstra excelente competitividade de engajamento frente a <span className="font-bold">{rivalGame.title}</span>, superando em métricas de conversão de jogadores ativos.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-[#F7F8FA] rounded-xl border border-dashed border-gray-200">
                      <TrendingUp size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-semibold text-gray-700">Nenhum comparativo executado nesta sessão.</p>
                      <p className="text-xs text-gray-500 mt-1">Clique no botão acima para processar o benchmark contra o rival selecionado (-5 créditos).</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SEÇÃO: PROBLEMAS RECORRENTES (FEEDBACK) */}
            {activeSection === "feedback" && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-[#252832]">Problemas Recorrentes & Gargalos</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Painel analítico consolidado com o histórico de falhas e bugs extraídos do feedback para <span className="font-semibold text-[#252832]">{currentGame.title}</span>.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Gráfico de Barras de Distribuição de Severidade */}
                    <div className="rounded-xl border border-gray-200 bg-[#F7F8FA] p-5 space-y-4">
                      <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">Distribuição de Gravidade dos Gargalos</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldAlert size={18} className="text-rose-600" />
                            <span className="text-xs font-bold text-gray-700">Críticos</span>
                          </div>
                          <span className="text-lg font-black text-rose-600">
                            {analysis.issues.filter(i => i.severity === "critical").length}
                          </span>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle size={18} className="text-amber-600" />
                            <span className="text-xs font-bold text-gray-700">Alta Severidade</span>
                          </div>
                          <span className="text-lg font-black text-amber-600">
                            {analysis.issues.filter(i => i.severity === "high").length}
                          </span>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-blue-600" />
                            <span className="text-xs font-bold text-gray-700">Média / Ajuste</span>
                          </div>
                          <span className="text-lg font-black text-blue-600">
                            {analysis.issues.filter(i => i.severity === "medium").length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lista Detalhada de Gargalos */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-[#252832]">Detalhamento Técnico das Ocorrências</h3>
                      {analysis.issues.map((issue) => (
                        <div key={issue.id} className="rounded-xl border border-gray-200 bg-white p-5 space-y-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-[#252832]">{issue.title}</h4>
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              issue.severity === "critical" ? "bg-rose-100 text-rose-700" :
                              issue.severity === "high" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              {issue.severity === "critical" ? "Crítico" : issue.severity === "high" ? "Alta" : "Média"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{issue.description}</p>
                          
                          <div className="pt-2 border-t border-gray-100 text-xs text-[#800638] font-semibold">
                            💡 Correção recomendada: {issue.recommendation}
                          </div>
                        </div>
                      ))}
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

                {/* Métricas em Português */}
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
