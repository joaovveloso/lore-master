export interface SteamReviewRaw {
  recommendationid: string;
  review: string;
  voted_up: boolean;
  votes_up: number;
  votes_funny: number;
  weighted_vote_score: string;
  comment_count: number;
  steam_purchase: boolean;
  received_for_free: boolean;
  written_during_early_access: boolean;
  author: {
    steamid: string;
    num_games_owned: number;
    num_reviews: number;
    playtime_forever: number;
    playtime_last_two_weeks: number;
    playtime_at_review: number;
    last_played: number;
  };
}

export interface SteamAppDetailsRaw {
  name: string;
  steam_appid: number;
  short_description: string;
  header_image: string;
  genres?: Array<{ id: string; description: string }>;
}

export interface FormattedSteamData {
  appId: number;
  gameTitle: string;
  headerImage: string;
  shortDescription: string;
  genres: string[];
  totalReviewsAnalyzed: number;
  positivePercentage: number;
  aggregatedReviewsText: string;
  isMockFallback: boolean;
}
