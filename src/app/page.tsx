"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useGame } from "@/context/GameContext";

export default function Home() {
  const { selectedGame } = useGame();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Status Banner */}
            <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-sm font-medium text-emerald-300">
                  Semana 1 Homologada: Shell e Gerenciamento de Estado Ativos!
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                `develop` OK
              </span>
            </div>

            {/* Target Overview Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">
                Alvo Selecionado via GameContext
              </span>
              <h2 className="text-3xl font-bold text-white mt-1">{selectedGame.name}</h2>
              <p className="text-sm text-slate-400 mt-1">Gênero: {selectedGame.genre}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 font-medium">Total de Reviews</p>
                  <p className="text-xl font-bold text-white mt-1">
                    {selectedGame.totalReviews.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 font-medium">Taxa de Queixas</p>
                  <p className="text-xl font-bold text-rose-400 mt-1">
                    {selectedGame.complaintRate}%
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 font-medium">Status na Steam</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">
                    {selectedGame.sentiment}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
