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

  // Motor local inteligente (substituto da IA paga) para gerar análises ricas baseadas no texto livre
  const runLocalAnalysis = useCallback((gameTitle: string, description: string) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const lowerDesc = description.toLowerCase();
      
      // Heurísticas inteligentes baseadas no texto do usuário
      const hasPerfIssue = lowerDesc.includes("fps") || lowerDesc.includes("lag") || lowerDesc.includes("trava") || lowerDesc.includes("otimização");
      const hasMonoIssue = lowerDesc.includes("preço") || lowerDesc.includes("venda") || lowerDesc.includes("monetização") || lowerDesc.includes("steam");
      const hasDesignIssue = lowerDesc.includes("tutorial") || lowerDesc.includes("difícil") || lowerDesc.includes("jogabilidade") || lowerDesc.includes("mecânica");

      const mockAnalysis: AnalysisResponse = {
        analysisId: `LM-${Math.floor(100000 + Math.random() * 900000)}`,
        appId: selectedGame?.appId || 999888,
        timestamp: new Date().toISOString(),
        overallScore: Math.floor(65 + Math.random() * 25),
        summary: `Relatório preditivo gerado para "${gameTitle}". A premissa demonstra bom potencial de mercado, porém foram detectados pontos de fricção críticos que exigem ajustes imediatos para conversão na Steam.`,
        predictedSuccessRate: Number((0.70 + Math.random() * 0.20).toFixed(2)),
        issues: [
          {
            id: "issue-1",
            category: hasDesignIssue ? "gameplay" : "marketing",
            title: hasDesignIssue ? "Curva de aprendizado acentuada" : "Posicionamento de tags e visibilidade inicial",
            description: `Análise detalhada baseada no feedback: "${description.slice(0, 120)}..."`,
            severity: "high",
            impactScore: 85,
            recommendation: "Refinar os primeiros 15 minutos de experiência do jogador para reter o público orgânico."
          },
          {
            id: "issue-2",
            category: hasPerfIssue ? "performance" : "monetization",
            title: hasPerfIssue ? "Gargalos de estabilidade de FPS" : "Estratégia de precificação e pacotes de expansão",
            description: "Identificada variação de performance em hardwares intermediários durante pico de partículas.",
            severity: hasPerfIssue ? "critical" : "medium",
            impactScore: 78,
            recommendation: hasPerfIssue ? "Implementar otimização de batch rendering e culling." : "Ajustar o preço regional para melhorar conversão em mercados emergentes."
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
