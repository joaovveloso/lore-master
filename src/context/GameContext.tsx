"use client";

import React, { createContext, useContext, useState } from "react";
import { GameContextType, GameData, CreditAccount } from "@/types";
import { mockGames } from "@/data/mockData";

// ==========================================
// DESENVOLVIDO PELO DEV 7
// ==========================================

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(mockGames[0] || null);
  
  const [credits, setCredits] = useState<CreditAccount>({
    userId: "user_demo_01",
    availableCredits: 250,
    planType: "free",
    lastRefillDate: new Date().toISOString(),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (credits.availableCredits >= amount) {
      setCredits((prev) => ({
        ...prev,
        availableCredits: prev.availableCredits - amount,
      }));
      return true;
    }
    setError("Créditos insuficientes para realizar esta operação.");
    return false;
  };

  return (
    <GameContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        credits,
        deductCredits,
        isLoading,
        error,
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
