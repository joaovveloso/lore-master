"use client";

import { useGame } from "@/context/GameContext";

export function Header() {
  const { selectedGame, setSelectedGame, games, credits } = useGame();

  return (
    <header className="w-full bg-slate-900/90 border-b border-rose-950/40 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-950/50">
          LM
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-none">LORE MASTER</h1>
          <span className="text-[10px] font-mono text-rose-400 tracking-wider uppercase">AI Game Detective</span>
        </div>
      </div>

      {/* Seletor dos 3 Jogos + Créditos */}
      <div className="flex items-center gap-4">
        {/* Dropdown de Seleção do Jogo */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
          <span className="text-xs text-slate-400 font-medium">Alvo:</span>
          <select
            value={selectedGame.id}
            onChange={(e) => {
              const game = games.find((g) => g.id === e.target.value);
              if (game) setSelectedGame(game);
            }}
            className="bg-transparent text-sm font-semibold text-rose-300 focus:outline-none cursor-pointer"
          >
            {games.map((game) => (
              <option key={game.id} value={game.id} className="bg-slate-900 text-white">
                {game.name}
              </option>
            ))}
          </select>
        </div>

        {/* Badge de Créditos Fictícios */}
        <div className="flex items-center gap-2 bg-rose-950/50 border border-rose-800/60 text-rose-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>{credits} Créditos</span>
        </div>
      </div>
    </header>
  );
}
