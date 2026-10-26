Codigo do DEV 3 Fase 1,analise se esta correto
import type { GameData } from '../types';

/**
 * Dados simulados (mock) para o Lore Master.
 * Todos os números são fictícios e servem apenas para demonstração.
 *
 * - Deadlock: jogo real da Steam usado como TESTE de fidelidade.
 * - Jogo B / Jogo C: placeholders até a definição dos jogos oficiais.
 *
 * Regra de coerência: totalReviews = positiveReviews + negativeReviews.
 */
export const mockGames: GameData[] = [
  {
    appId: 1422450,
    title: 'Deadlock',
    developer: 'Valve',
    releaseDate: '2024-08-23',
    genres: ['Action', 'Free to Play'],
    tags: [
      'Hero Shooter',
      'MOBA',
      'Third-Person Shooter',
      'Multiplayer',
      'Team-Based',
      'Early Access',
    ],
    price: 0,
    steamRating: {
      positiveReviews: 41230,
      negativeReviews: 5870,
      totalReviews: 47100,
      scoreDescription: 'Very Positive',
    },
    metrics: {
      currentPlayers: 38450,
      peakPlayers24h: 62910,
      estimatedOwners: '2,000,000 - 5,000,000',
    },
  },
  {
    appId: 900001,
    title: 'Jogo B',
    developer: 'Estúdio Placeholder B',
    releaseDate: '2023-05-12',
    genres: ['Indie', 'RPG', 'Strategy'],
    tags: ['Roguelike', 'Turn-Based', 'Pixel Graphics', 'Singleplayer', 'Story Rich'],
    price: 19.99,
    steamRating: {
      positiveReviews: 11520,
      negativeReviews: 4480,
      totalReviews: 16000,
      scoreDescription: 'Mostly Positive',
    },
    metrics: {
      currentPlayers: 1840,
      peakPlayers24h: 3275,
      estimatedOwners: '200,000 - 500,000',
    },
  },
  {
    appId: 900002,
    title: 'Jogo C',
    developer: 'Estúdio Placeholder C',
    releaseDate: '2024-11-07',
    genres: ['Indie', 'Adventure', 'Simulation'],
    tags: ['Survival', 'Crafting', 'Open World', 'Co-op', 'Early Access'],
    price: 29.99,
    steamRating: {
      positiveReviews: 2150,
      negativeReviews: 3350,
      totalReviews: 5500,
      scoreDescription: 'Mostly Negative',
    },
    metrics: {
      currentPlayers: 312,
      peakPlayers24h: 590,
      estimatedOwners: '50,000 - 100,000',
    },
  },
];
