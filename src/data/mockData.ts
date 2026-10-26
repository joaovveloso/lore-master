import type { GameData } from '../types';

/**
 * Dados simulados (mock) para o Lore Master.
 * Dados ajustados com base em jogos reais da Steam para testes de fidelidade.
 *
 * - Deadlock: TESTE de fidelidade (Hero Shooter / Early Access).
 * - Resident Evil 4: Jogo AAA Premium (Overwhelmingly Positive).
 * - Among Us: Jogo Indie Viral / Casual (Very Positive).
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
    appId: 2050650,
    title: 'Resident Evil 4',
    developer: 'CAPCOM Co., Ltd.',
    releaseDate: '2023-03-24',
    genres: ['Action', 'Adventure'],
    tags: [
      'Action',
      'Horror',
      'Survival Horror',
      'Third Person',
      'Zombies',
      'Singleplayer',
    ],
    price: 139.00,
    steamRating: {
      positiveReviews: 125800,
      negativeReviews: 3200,
      totalReviews: 129000,
      scoreDescription: 'Overwhelmingly Positive',
    },
    metrics: {
      currentPlayers: 15420,
      peakPlayers24h: 28900,
      estimatedOwners: '5,000,000 - 10,000,000',
    },
  },
  {
    appId: 945360,
    title: 'Among Us',
    developer: 'Innersloth',
    releaseDate: '2018-11-16',
    genres: ['Casual', 'Indie'],
    tags: [
      'Multiplayer',
      'Online Co-Op',
      'Social Deduction',
      'Space',
      'Casual',
      '2D',
    ],
    price: 19.99,
    steamRating: {
      positiveReviews: 598000,
      negativeReviews: 42000,
      totalReviews: 640000,
      scoreDescription: 'Very Positive',
    },
    metrics: {
      currentPlayers: 8900,
      peakPlayers24h: 14200,
      estimatedOwners: '10,000,000 - 20,000,000',
    },
  },
];
