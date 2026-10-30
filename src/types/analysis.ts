// src/types/analysis.ts

export interface Bottleneck {
  category: 'Game Design' | 'Marketing' | 'Monetization' | 'Technical';
  issue: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface Recommendation {
  action: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedOutcome: string;
}

export interface AnalysisResponse {
  healthScore: number; // De 0 a 100
  summary: string;     // Resumo executivo do potencial do jogo
  bottlenecks: Bottleneck[];
  recommendations: Recommendation[];
  benchmarkComparison?: string;
}

export interface AnalyzePayload {
  gameTitle: string;
  description: string;
  steamData?: {
    appId: number;
    reviewsCount: number;
    ratingDesc: string;
    peakPlayers: number;
  };
}
