"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Sparkles,
  Star,
  Users,
  ArrowRight,
  LogOut,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar, {
  getSection,
  type SectionId,
} from "@/components/Sidebar";
import { useGame } from "@/context/GameContext";
import { mockGames } from "@/data/mockData";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { selectedGame, setSelectedGame } = useGame();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const section = getSection(activeSection);
  const currentGame = selectedGame ?? mockGames[0];

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
      value: "Pronto",
      description: "Gemini 1.5 Flash ativado",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F8FA] text-[#252832]">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
        <Sidebar
          active={activeSection}
          onSelect={setActiveSection}
          className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-[268px] md:self-start md:overflow-y-auto"
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Cabeçalho do Dashboard */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                  Lore Master / {section.label}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  {section.label}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {selectedGame ? `Ativo: ${selectedGame.title}` : "Modo Padrão (Deadlock)"}
                </span>

                {/* Botão para retornar à página de login */}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={14} />
                  <span>Sair</span>
                </button>
              </div>
            </div>

            {activeSection === "overview" && (
              <>
                {/* Seletor Rápido de Jogos Indie */}
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
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                            currentGame.appId === game.appId
                              ? "bg-[#800638] text-white shadow-sm"
                              : "border border-[#E5E7EB] bg-white text-gray-700 hover:bg-[#F7F8FA]"
                          }`}
                        >
                          {game.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Grid de Indicadores e Métricas */}
                <section aria-labelledby="metrics-heading">
                  <div className="mb-4">
                    <h2 id="metrics-heading" className="text-lg font-semibold">
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
                          className="min-w-0 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-gray-600">
                              {metric.label}
                            </p>
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#800638]/10 text-[#800638]">
                              <Icon size={19} />
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

                {/* Banner de Execução da IA Gemini 1.5 Flash */}
                <section
                  aria-labelledby="analysis-heading"
                  className="mt-6 rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#800638] to-[#A51F4B] p-6 text-white shadow-lg sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        <Sparkles size={14} />
                        <span>Motor IA Gemini 1.5 Flash</span>
                      </div>
                      <h2 id="analysis-heading" className="text-xl font-bold">
                        Pronto para executar o diagnóstico de {currentGame.title}?
                      </h2>
                      <p className="max-w-xl text-sm text-white/80">
                        O motor analítico irá processar os dados da Steam para extrair padrões de bugs e recomendações acionáveis.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSection("diagnosis")}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#800638] transition-colors hover:bg-white/90"
                    >
                      <span>Ir para Diagnóstico</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeSection !== "overview" && (
              <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8">
                <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#800638]/10 text-[#800638]">
                    <BarChart3 size={24} />
                  </div>

                  <h2 className="mt-4 text-lg font-semibold">{section.label}</h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Esta área está preparada para receber os componentes e dados desta seção.
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
