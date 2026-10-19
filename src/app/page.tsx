"use client";

import { useState } from "react";

const mockGames = [
  { id: "1", name: "Elden Ring", category: "Action RPG", status: "Em Investigação" },
  { id: "2", name: "Cyberpunk 2077", category: "Sci-Fi RPG", status: "Concluído" },
  { id: "3", name: "Hollow Knight", category: "Metroidvania", status: "Em Análise" },
];

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(mockGames[0]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-950 text-white font-sans">
      <div className="w-full max-w-xl border border-rose-900/50 bg-slate-900 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">
            🧪 Teste de Componente Dinâmico (`develop`)
          </span>
          <span className="text-xs bg-rose-950 text-rose-300 px-2.5 py-1 rounded-full border border-rose-800">
            Lore Master PoC
          </span>
        </div>

        <h2 className="text-xl font-bold mb-2">Selecione um jogo para inspecionar:</h2>
        
        {/* Botoes de Selecao */}
        <div className="flex gap-2 mb-6">
          {mockGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                selectedGame.id === game.id
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-900/40"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {game.name}
            </button>
          ))}
        </div>

        {/* Card do Jogo Selecionado */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Detalhes do Alvo</p>
          <h3 className="text-2xl font-bold text-rose-400 mt-1">{selectedGame.name}</h3>
          <div className="mt-3 flex justify-between text-sm text-slate-300">
            <span>Gênero: <strong>{selectedGame.category}</strong></span>
            <span>Status: <strong className="text-emerald-400">{selectedGame.status}</strong></span>
          </div>
        </div>
      </div>
    </main>
  );
}
