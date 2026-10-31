"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type {
  CreditAccount,
  GameData,
  AnalysisResponse,
} from "@/types";

interface GameContextType {
  selectedGame: GameData | null;
  setSelectedGame: (game: GameData | null) => void;
  credits: CreditAccount;
  deductCredits: (amount: number) => boolean;
  hasEnoughCredits: (cost: number) => boolean;
  addCredits: (amount: number) => void;
  analysis: AnalysisResponse | null;
  setAnalysis: (analysis: AnalysisResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  runLocalAnalysis: (gameTitle: string, description: string) => void;
}

const INITIAL_CREDITS: CreditAccount = {
  userId: "local-user",
  availableCredits: 50, // Iniciamos com 50 para testes folgados
  planType: "indie_pro",
  lastRefillDate: new Date().toISOString(),
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [credits, setCredits] = useState<CreditAccount>(INITIAL_CREDITS);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasEnoughCredits = useCallback((cost: number): boolean => {
    return credits.availableCredits >= cost;
  }, [credits.availableCredits]);

  const deductCredits = useCallback((amount: number): boolean => {
    if (credits.availableCredits < amount) {
      setError("Créditos insuficientes para realizar esta análise.");
      return false;
    }

    setCredits((prev) => ({
      ...prev,
      availableCredits: prev.availableCredits - amount,
    }));
    return true;
  }, [credits.availableCredits]);

  const addCredits = useCallback((amount: number) => {
    setCredits((prev) => ({
      ...prev,
      availableCredits: prev.availableCredits + amount,
    }));
  }, []);

  // Motor local inteligente e contextualizado para o jogo ativo
  const runLocalAnalysis = useCallback((gameTitle: string, description: string) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const lowerDesc = description.toLowerCase();
      const gameInfo = selectedGame ? selectedGame.title : gameTitle;
      
      const isAction = gameInfo.toLowerCase().includes("chronos") || lowerDesc.includes("fps") || lowerDesc.includes("combate") || lowerDesc.includes("lag");

      const mockAnalysis: AnalysisResponse = {
        analysisId: `LM-${Math.floor(100000 + Math.random() * 900000)}`,
        appId: selectedGame?.appId || 999888,
        timestamp: new Date().toISOString(),
        overallScore: Math.floor(72 + Math.random() * 20),
        summary: `Análise preditiva aprofundada para "${gameInfo}" (${selectedGame?.developer || "Estúdio Independente"}). O engajamento base é forte, mas o cruzamento de feedback aponta gargalos de retenção de longo prazo e fricção na conversão de novos jogadores.`,
        predictedSuccessRate: Number((0.75 + Math.random() * 0.18).toFixed(2)),
        issues: [
          {
            id: "issue-1",
            category: isAction ? "performance" : "gameplay",
            title: isAction ? "Quedas de taxa de quadros (FPS) em arenas" : "Balanceamento da curva de dificuldade inicial",
            description: `Com base nas avaliações do jogo "${gameInfo}": "${description.slice(0, 100)}..."`,
            severity: "high",
            impactScore: 88,
            recommendation: isAction ? "Otimizar o pipeline de partículas e implementar culling dinâmico." : "Suavizar o pico de dificuldade nas primeiras 2 horas de progressão."
          },
          {
            id: "issue-2",
            category: "monetization",
            title: "Precificação e percepção de valor na Steam",
            description: "A relação entre o conteúdo entregue e o preço base regional gera resistência em mercados emergentes.",
            severity: "medium",
            impactScore: 74,
            recommendation: "Revisar a matriz de preços regionais e introduzir pacotes de expansão cosmética."
          }
        ]
      };

      setAnalysis(mockAnalysis);
      setIsLoading(false);
    }, 1200);
  }, [selectedGame]);

  return (
    <GameContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        credits,
        deductCredits,
        hasEnoughCredits,
        addCredits,
        analysis,
        setAnalysis,
        isLoading,
        setIsLoading,
        error,
        setError,
        runLocalAnalysis,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser utilizado dentro de um GameProvider.");
  }
  return context;
}
