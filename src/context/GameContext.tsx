"use client";

import React, { createContext, useContext, useState } from "react";
import { GameData, GameContextType } from "@/types";
import { mockGames } from "@/data/mockData";

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<GameData>(mockGames[0]);
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
        games: mockGames,
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
