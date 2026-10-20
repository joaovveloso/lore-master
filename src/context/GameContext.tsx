"use client";

import React, { createContext, useContext, useState } from "react";
import { GameContextType, GameData } from "@/types";
import { mockGames } from "@/data/mockData";

// ==========================================
// RESERVADO PARA O DEV 7
// Desenvolva o GameProvider, controle do jogo
// selecionado e gerenciamento de créditos aqui.
// ==========================================

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [games] = useState<GameData[]>(mockGames);
  const [selectedGame, setSelectedGame] = useState<GameData>(
    mockGames[0] || {
      id: "placeholder",
      name: "Aguardando Mocks",
      genre: "N/A",
      totalReviews: 0,
      totalIssues: 0,
      complaintRate: 0,
      sentiment: "N/A",
      steamRating: 0,
      issues: [],
    }
  );
  const [credits, setCredits] = useState<number>(250);

  const addCredits = (amount: number) => {
    setCredits((prev) => prev + amount);
  };

  const deductCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits((prev) => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <GameContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        games,
        credits,
        addCredits,
        deductCredits,
      }}
    >
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
