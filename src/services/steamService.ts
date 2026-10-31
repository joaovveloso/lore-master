import { getMockAnalysisData } from "@/services/mockData";
import { sanitizeInputText } from "@/utils/sanitizer";
import { FormattedSteamData, SteamAppDetailsRaw, SteamReviewRaw } from "@/types/steam";

/**
 * Busca avaliações e detalhes públicos de um jogo na Steam a partir do App ID.
 * Em caso de falha HTTP (429, 500, CORS, etc.), aciona fallback gracioso para Mock Data.
 */
export async function fetchSteamDataByAppId(appId: number): Promise<FormattedSteamData> {
  try {
    // 1. Busca detalhes cadastrais do App na Steam Store API
    const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=pt`;
    const detailsRes = await fetch(detailsUrl, { cache: "no-store" });

    if (!detailsRes.ok) {
      throw new Error(`Steam AppDetails HTTP error! status: ${detailsRes.status}`);
    }

    const detailsData = await detailsRes.json();
    if (!detailsData || !detailsData[appId]?.success) {
      throw new Error(`Jogo com AppID ${appId} não foi encontrado na Steam API.`);
    }

    const appInfo: SteamAppDetailsRaw = detailsData[appId].data;

    // 2. Busca avaliações públicas recentes via Steam Review API
    const reviewsUrl = `https://store.steampowered.com/appreviews/${appId}?json=1&language=all&purchase_type=all&num_per_page=50`;
    const reviewsRes = await fetch(reviewsUrl, { cache: "no-store" });

    if (!reviewsRes.ok) {
      throw new Error(`Steam Reviews HTTP error! status: ${reviewsRes.status}`);
    }

    const reviewsData = await reviewsRes.json();
    if (!reviewsData || !reviewsData.success) {
      throw new Error("Falha ao recuperar os reviews da comunidade Steam.");
    }

    const rawReviews: SteamReviewRaw[] = reviewsData.reviews || [];
    
    // Cálculo do percentual positivo
    const positiveReviewsCount = rawReviews.filter((r) => r.voted_up).length;
    const positivePercentage = rawReviews.length > 0 
      ? Math.round((positiveReviewsCount / rawReviews.length) * 100) 
      : 0;

    // Concatenação e higienizador das avaliações via Sanitizer do Dev 8
    const rawCombinedText = rawReviews
      .map((r) => r.review)
      .join("\n---\n");

    const sanitizedText = sanitizeInputText(rawCombinedText);

    return {
      appId: appInfo.steam_appid,
      gameTitle: appInfo.name,
      headerImage: appInfo.header_image,
      shortDescription: appInfo.short_description || "",
      genres: appInfo.genres?.map((g) => g.description) || [],
      totalReviewsAnalyzed: rawReviews.length,
      positivePercentage,
      aggregatedReviewsText: sanitizedText,
      isMockFallback: false,
    };

  } catch (error) {
    console.warn(`[SteamService] Falha na integração remota com a Steam (AppId: ${appId}). Ativando fallback MOCK:`, error);
    return getFallbackMockSteamData(appId);
  }
}

/**
 * Estruturação do fallback utilizando a base mockada segura (Dev 8)
 */
function getFallbackMockSteamData(appId: number): FormattedSteamData {
  const mockAnalysis = getMockAnalysisData();
  const mockText = mockAnalysis.gargalosIdentificados
    .map((g) => `[${g.categoria.toUpperCase()}] ${g.problema}: ${g.causa}`)
    .join("\n");

  return {
    appId: appId || 1086940,
    gameTitle: "Indie Game Demo (Modo Resiliência)",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    shortDescription: "Dados providos pelo fallback de resiliência corporativo do Lore Master.",
    genres: ["Indie", "Estratégia"],
    totalReviewsAnalyzed: 150,
    positivePercentage: mockAnalysis.healthScore,
    aggregatedReviewsText: sanitizeInputText(mockText),
    isMockFallback: true,
  };
}
