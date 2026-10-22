import { GameData } from "@/types";

export const mockGames: GameData[] = [
  {
    appId: 1091500,
    title: "Cyberpunk Indie Demo",
    developer: "Studio Indie Alpha",
    releaseDate: "2024-05-15",
    genres: ["RPG", "Action", "Cyberpunk"],
    tags: ["Atmospheric", "Sci-fi", "Singleplayer"],
    price: 49.99,
    steamRating: {
      positiveReviews: 1250,
      negativeReviews: 120,
      totalReviews: 1370,
      scoreDescription: "Muito Positiva",
    },
    metrics: {
      currentPlayers: 340,
      peakPlayers24h: 890,
      estimatedOwners: "50,000 - 100,000",
    },
  },
  {
    appId: 2005000,
    title: "Pixel Rogue Survivors",
    developer: "Retro Bit Games",
    releaseDate: "2025-01-10",
    genres: ["Roguelike", "Pixel Art", "Action"],
    tags: ["Difficult", "Indie", "Replay Value"],
    price: 19.99,
    steamRating: {
      positiveReviews: 4500,
      negativeReviews: 300,
      totalReviews: 4800,
      scoreDescription: "Extremamente Positiva",
    },
    metrics: {
      currentPlayers: 1200,
      peakPlayers24h: 3100,
      estimatedOwners: "200,000 - 500,000",
    },
  },
];
