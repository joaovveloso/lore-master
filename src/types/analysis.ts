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
  healthScore: number;
  summary: string;
  bottlenecks: Bottleneck[];
  recommendations: Recommendation[];
  benchmarkComparison?: string;
}

export interface AnalyzeRequestBody {
  gameTitle: string;
  description: string;
  steamData?: Record<string, unknown>;
}
