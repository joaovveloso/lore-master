/**
 * @file src/types/index.ts
 * @description Contratos de interfaces e tipos globais para a plataforma web Lore Master.
 * @author Arquiteto de Dados / Dev 4
 */

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface GameData {
  appId: number;
  title: string;
  developer: string;
  releaseDate: string;
  genres: string[];
  tags: string[];
  price: number;
  steamRating: {
    positiveReviews: number;
    negativeReviews: number;
    totalReviews: number;
    scoreDescription: string;
  };
  metrics: {
    currentPlayers: number;
    peakPlayers24h: number;
    estimatedOwners: string;
  };
}

export interface GameIssue {
  id: string;
  category: 'gameplay' | 'performance' | 'monetization' | 'marketing' | 'retention';
  title: string;
  description: string;
  severity: SeverityLevel;
  impactScore: number;
  recommendation: string;
}

export interface AnalysisResponse {
  analysisId: string;
  appId: number;
  timestamp: string;
  overallScore: number;
  summary: string;
  issues: GameIssue[];
  predictedSuccessRate: number;
}

export interface CreditAccount {
  userId: string;
  availableCredits: number;
  planType: 'free' | 'indie_pro' | 'studio';
  lastRefillDate: string;
}

export interface GameContextType {
  selectedGame: GameData | null;
  setSelectedGame: (game: GameData | null) => void;
  credits: CreditAccount;
  deductCredits: (amount: number) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}
  credits: CreditAccount;
  deductCredits: (amount: number) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}
