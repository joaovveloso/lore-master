"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type {
  CreditAccount,
  GameContextType,
  GameData,
} from "@/types";

const INITIAL_CREDITS: CreditAccount = {
  userId: "local-user",
  availableCredits: 20,
  planType: "free",
  lastRefillDate: new Date().toISOString(),
};

const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(
    null
  );

  const [credits, setCredits] =
    useState<CreditAccount>(INITIAL_CREDITS);

  const creditsRef = useRef<CreditAccount>(INITIAL_CREDITS);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deductCredits = useCallback(
    async (amount: number): Promise<boolean> => {
      if (amount !== 5 && amount !== 10) {
        setError(
          "Operação inválida. Use 10 créditos para diagnóstico ou 5 para benchmarking."
        );
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const currentAccount = creditsRef.current;

        if (currentAccount.availableCredits < amount) {
          setError("Créditos insuficientes para esta operação.");
          return false;
        }

        const updatedAccount: CreditAccount = {
          ...currentAccount,
          availableCredits:
            currentAccount.availableCredits - amount,
        };

        // Atualiza a referência antes de permitir outra operação.
        creditsRef.current = updatedAccount;
        setCredits(updatedAccount);

        return true;
      } catch {
        setError("Não foi possível atualizar os créditos.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value: GameContextType = {
    selectedGame,
    setSelectedGame,
    credits,
    deductCredits,
    isLoading,
    error,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame deve ser utilizado dentro de um GameProvider."
    );
  }

  return context;
}
