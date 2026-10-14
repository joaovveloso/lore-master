"use client";

import React, { createContext, useContext, useState } from "react";
import { MOCK_GAMES, GameData } from "@/data/mockData";

interface GameContextType {
  selectedGame: GameData;
  setSelectedGameId: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [selectedGameId, setSelectedGameId] = useState<string>("valorant");

  const selectedGame = MOCK_GAMES[selectedGameId] || MOCK_GAMES["valorant"];

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGameId }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser usado dentro de um GameProvider");
  }
  return context;
}
