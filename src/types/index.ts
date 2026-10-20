// ==========================================
// RESERVADO PARA O DEV 4
// Definições de tipos e interfaces globais
// do sistema Lore Master.
// ==========================================

export type SeverityLevel = "critico" | "alto" | "medio" | "baixo";

export interface GameIssue {
  id: string;
  title: string;
  category: string;
  severity: SeverityLevel;
  complaintCount: number;
  percentage: number;
  status: "Pendente" | "Em Investigação" | "Resolvido";
}

export interface GameData {
  id: string;
  name: string;
  genre: string;
  totalReviews: number;
  totalIssues: number;
  complaintRate: number;
  sentiment: string;
  steamRating: number;
  issues: GameIssue[];
}

export interface GameContextType {
  selectedGame: GameData;
  setSelectedGame: (game: GameData) => void;
  games: GameData[];
  credits: number;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => boolean;
}
