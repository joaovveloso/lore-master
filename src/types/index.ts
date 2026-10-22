/**
 * @file src/types/index.ts
 * @description Contratos de interfaces e tipos globais para a plataforma web Lore Master.
 * @author Arquiteto de Dados / Dev 4
 */

/**
 * Níveis de severidade aceitos para os diagnósticos e problemas identificados nos jogos.
 */
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

/**
 * Representa os dados consolidados de um jogo, contemplando informações estáticas,
 * dados dinâmicos integrados da Steam e metadados de análise.
 */
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

/**
 * Representa um problema, gargalo ou oportunidade de melhoria identificado no jogo
 * através da inteligência preditiva.
 */
export interface GameIssue {
  id: string;
  category: 'gameplay' | 'performance' | 'monetization' | 'marketing' | 'retention';
  title: string;
  description: string;
  severity: SeverityLevel;
  impactScore: number;
  recommendation: string;
}

/**
 * Representa a resposta completa gerada pelo motor de IA preditiva da plataforma.
 */
export interface AnalysisResponse {
  analysisId: string;
  appId: number;
  timestamp: string;
  overallScore: number;
  summary: string;
  issues: GameIssue[];
  predictedSuccessRate: number;
}

/**
 * Define o contrato para a gestão de créditos do usuário dentro da plataforma web,
 * permitindo o rastreamento de consumo para execuções de diagnósticos.
 */
export interface CreditAccount {
  userId: string;
  availableCredits: number;
  planType: 'free' | 'indie_pro' | 'studio';
  lastRefillDate: string;
}

/**
 * Define o contrato para a seleção atual de jogos e o contexto global de navegação
 * e consumo de créditos na plataforma.
 */
export interface GameContextType {
  selectedGame: GameData | null;
  setSelectedGame: (game: GameData | null) => void;
  credits: CreditAccount;
  deductCredits: (amount: number) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}
