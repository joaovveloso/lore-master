"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { MOCK_GAMES } from "@/data/mockData";

export default function Header() {
  const { selectedGame, setSelectedGameId } = useGame();

  return (
    <header className="h-16 bg-cardbg border-b border-cardborder px-6 flex items-center justify-between">
      {/* Logo Lore Master */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-crimson flex items-center justify-center font-bold text-white text-lg">
          L
        </div>
        <span className="font-bold text-lg text-white tracking-wide">
          Lore Master <span className="text-xs text-crimson font-mono ml-1">PoC</span>
        </span>
      </div>

      {/* Seletor dos 5 Jogos Reais */}
      <div className="flex items-center gap-4">
        <label htmlFor="game-select" className="text-sm text-gray-400 hidden sm:inline">
          Projeto Ativo:
        </label>
        <select
          id="game-select"
          value={selectedGame.id}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="bg-darkbg text-white border border-cardborder rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-crimson transition-colors"
        >
          {Object.values(MOCK_GAMES).map((game) => (
            <option key={game.id} value={game.id}>
              🎮 {game.name} ({game.genre})
            </option>
          ))}
        </select>

        {/* Badge de Créditos Fictícios */}
        <div className="flex items-center gap-1.5 bg-darkbg border border-cardborder px-3 py-1 rounded-full">
          <span className="text-xs text-gray-400">Créditos:</span>
          <span className="text-xs font-bold text-amber-400">⚡ 1.250</span>
        </div>
      </div>
    </header>
  );
}
