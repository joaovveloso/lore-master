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
  hasEnoughCredits: (cost: number) => boolean; // 👈 Adicionado para o Dev 5 e Dev 7
  isLoading: boolean;
  error: string | null;
}

// Helper opcional para o Dev 4/9 mapear a severidade diretamente para a classe do Design System:
export function getSeverityBadgeClass(severity: SeverityLevel): string {
  switch (severity) {
    case 'critical': return 'badge-severity badge-severity-critical';
    case 'high': return 'badge-severity badge-severity-high';
    case 'medium': return 'badge-severity badge-severity-medium';
    case 'low': return 'badge-severity badge-severity-low';
    default: return 'badge-severity';
  }
}
