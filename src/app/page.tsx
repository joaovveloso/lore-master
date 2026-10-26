"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Sidebar, type SectionId, getSection } from "@/components/Sidebar";
import { useGame } from "@/context/GameContext";
import { mockGames } from "@/data/mockData";
import { 
  Gamepad2, 
  TrendingUp, 
  Users, 
  Star, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Coins
} from "lucide-react";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const { selectedGame, setSelectedGame } = useGame();
  
  // Define o primeiro jogo do mock (Deadlock) por padrão se nenhum estiver selecionado
  const currentGame = selectedGame ?? mockGames[0];
  const currentSectionInfo = getSection(activeSection);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#252832] md:flex-row">
      {/* Sidebar na lateral esquerda (Fixa no Desktop) */}
      <Sidebar active={activeSection} onSelect={setActiveSection} />

      {/* Container principal de conteúdo */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header superior */}
        <Header />

        {/* Conteúdo dinâmico baseado na seção ativa */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          
          {/* Breadcrumb e Título da Seção */}
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
              Lore Master / {currentSectionInfo.label}
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#252832] sm:text-3xl">
              {currentSectionInfo.label}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {currentSectionInfo.description}
            </p>
          </div>

          {/* Seção 1: Visão Geral (Overview) */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              
              {/* Card de Informações do Jogo Selecionado */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#800638]/10 text-[#800638]">
                      <Gamepad2 size={28} />
                    </div>
                    <div>
                      <span className="inline-block rounded-md bg-[#800638]/10 px-2 py-0.5 text-xs font-semibold text-[#800638]">
                        AppID: {currentGame.appId}
                      </span>
                      <h2 className="mt-1 text-xl font-bold text-[#252832]">
                        {currentGame.title}
                      </h2>
                      <p className="text-xs text-gray-500">
                        Desenvolvido por <span className="font-medium text-[#252832]">{currentGame.developer}</span> • Lançamento: {currentGame.releaseDate}
                      </p>
                    </div>
                  </div>

                  {/* Seletor rápido de jogos de teste */}
                  <div className="flex flex-wrap gap-2">
                    {mockGames.map((game) => (
                      <button
                        key={game.appId}
                        type="button"
                        onClick={() => setSelectedGame(game)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          currentGame.appId === game.appId
                            ? "bg-[#800638] text-white"
                            : "border border-[#E5E7EB] bg-white text-gray-700 hover:bg-[#F7F8FA]"
                        }`}
                      >
                        {game.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid de Métricas Principais da Steam */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <Star size={16} className="text-amber-500" />
                      <span>Avaliação Steam</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-[#252832]">
                      {currentGame.steamRating.scoreDescription}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {currentGame.steamRating.positiveReviews.toLocaleString()} análises positivas ({currentGame.steamRating.totalReviews.toLocaleString()} total)
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <Users size={16} className="text-[#800638]" />
                      <span>Jogadores Atuais (Online)</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-[#252832] tabular-nums">
                      {currentGame.metrics.currentPlayers.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Pico de 24h: {currentGame.metrics.peakPlayers24h.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <TrendingUp size={16} className="text-emerald-600" />
                      <span>Estimativa de Donos</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-[#252832]">
                      {currentGame.metrics.estimatedOwners}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Preço: {currentGame.price === 0 ? "Gratuito para Jogar" : `R$ ${currentGame.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>

                {/* Tags do Jogo */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#E5E7EB] pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tags Steam:</span>
                  {currentGame.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card de Chamada para Diagnóstico IA */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#800638] to-[#A51F4B] p-6 text-white shadow-lg">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                      <Sparkles size={14} />
                      <span>Motor IA Gemini 1.5 Flash</span>
                    </div>
                    <h3 className="text-xl font-bold">Quer descobrir o que está gerando reclamações neste jogo?</h3>
                    <p className="max-w-xl text-sm text-white/80">
                      Nossa inteligência lê milhares de análises da Steam para extrair padrões de bugs, problemas de balanceamento e feedback da comunidade em segundos.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSection("diagnosis")}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#800638] transition-colors hover:bg-white/90"
                  >
                    <span>Executar Diagnóstico</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Seção 2: Problemas Recorrentes */}
          {activeSection === "recurring" && (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
              <ShieldAlert className="mx-auto size-10 text-[#800638]" />
              <h2 className="mt-4 text-lg font-bold text-[#252832]">Análise de Problemas Recorrentes</h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                O mapeamento automático dos tópicos mais frequentes nas avaliações de {currentGame.title} será renderizado aqui.
              </p>
            </div>
          )}

          {/* Seção 3: Diagnóstico IA */}
          {activeSection === "diagnosis" && (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
              <Sparkles className="mx-auto size-10 text-[#A51F4B]" />
              <h2 className="mt-4 text-lg font-bold text-[#252832]">Diagnóstico Preditivo por IA</h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                Os relatórios gerados pelo Gemini 1.5 Flash para {currentGame.title} aparecerão nesta área. (Custo: 10 créditos).
              </p>
            </div>
          )}

          {/* Seção 4: Benchmarking */}
          {activeSection === "benchmark" && (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
              <Gamepad2 className="mx-auto size-10 text-gray-400" />
              <h2 className="mt-4 text-lg font-bold text-[#252832]">Comparativo de Mercado (Benchmarking)</h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                Compare o desempenho de {currentGame.title} com outros títulos da mesma categoria. (Custo: 5 créditos).
              </p>
            </div>
          )}

          {/* Seção 5: Créditos */}
          {activeSection === "credits" && (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
              <Coins className="mx-auto size-10 text-amber-500" />
              <h2 className="mt-4 text-lg font-bold text-[#252832]">Gestão de Créditos de IA</h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                Gerencie seu plano atual e recargas de créditos para análises avançadas.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
