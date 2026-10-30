// src/services/mockData.ts
import { AnalysisResponse } from '@/types/analysis';

export interface MockGameProfile {
  appId: number;
  title: string;
  developer: string;
  description: string;
  steamRating: {
    totalReviews: number;
    positiveReviews: number;
    scoreDescription: string;
  };
  metrics: {
    currentPlayers: number;
    peakPlayers24h: number;
  };
  mockAnalysis: AnalysisResponse;
}

export const MOCK_GAMES_DATABASE: MockGameProfile[] = [
  {
    appId: 1001,
    title: "Neon Dungeon Crawler",
    developer: "Cyber Pixel Studio",
    description: "Um roguelike de ação ambientado em cavernas cibernéticas com mecânicas aceleradas de hack and slash.",
    steamRating: {
      totalReviews: 1420,
      positiveReviews: 1200,
      scoreDescription: "Muito Positivas",
    },
    metrics: {
      currentPlayers: 340,
      peakPlayers24h: 890,
    },
    mockAnalysis: {
      healthScore: 82,
      summary: "O jogo possui forte apelo visual e boa retenção inicial, mas sofre com quedas de engajamento no meio da campanha.",
      bottlenecks: [
        {
          category: "Game Design",
          issue: "Curva de dificuldade acentuada no terceiro andar da dungeon.",
          impact: "High"
        },
        {
          category: "Marketing",
          issue: "Pouca visibilidade nas tags de exploração da Steam.",
          impact: "Medium"
        }
      ],
      recommendations: [
        {
          action: "Implementar um checkpoint intermediário e ajustar o balanceamento de dano dos chefes.",
          priority: "High",
          expectedOutcome: "Redução de 25% na taxa de desistência precoce dos jogadores."
        }
      ],
      benchmarkComparison: "Desempenho 15% acima da média de roguelikes independentes no mesmo trimestre."
    }
  },
  {
    appId: 1002,
    title: "Starlight Farming & Craft",
    developer: "Cosmic Harvest Devs",
    description: "Simulador de fazenda espacial focado em automação industrial, exploração de luas distantes e comércio intergaláctico.",
    steamRating: {
      totalReviews: 5400,
      positiveReviews: 4950,
      scoreDescription: "Extremamente Positivas",
    },
    metrics: {
      currentPlayers: 1250,
      peakPlayers24h: 3100,
    },
    mockAnalysis: {
      healthScore: 94,
      summary: "Excelente engajamento da comunidade e forte apelo de replay, consolidado como referência no nicho de simulação.",
      bottlenecks: [
        {
          category: "Technical",
          issue: "Gargalo de performance (FPS drop) em bases com mais de 500 automações ativas.",
          impact: "Medium"
        }
      ],
      recommendations: [
        {
          action: "Otimizar o algoritmo de renderização de tiles e objetos estáticos na engine.",
          priority: "Medium",
          expectedOutcome: "Estabilização de 60 FPS em computadores de entrada."
        }
      ],
      benchmarkComparison: "Entre os top 5% em retenção de longo prazo na categoria."
    }
  }
];

/**
 * Retorna um jogo mockado padrão ou busca por ID caso a Steam falhe.
 */
export function getMockGameFallback(appId?: number): MockGameProfile {
  if (appId) {
    const found = MOCK_GAMES_DATABASE.find(g => g.appId === appId);
    if (found) return found;
  }
  // Retorna o primeiro mock como fallback universal padrão
  return MOCK_GAMES_DATABASE[0];
}
