import { getMockGameFallback } from "@/services/mockData";
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

    // Concatenação dos reviews brutos
    const rawCombinedText = rawReviews
      .map((r) => r.review)
      .join("\n---\n");

    // Tratativa segura para extrair o texto string do SanitizerResult (ou fallback para string direta)
    const sanitizerResult = sanitizeInputText(rawCombinedText);
    const sanitizedText = typeof sanitizerResult === "string" 
      ? sanitizerResult 
      : (sanitizerResult as any).sanitizedText || (sanitizerResult as any).text || rawCombinedText;

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
  const mockProfile = getMockGameFallback(appId);
  
  const mockText = mockProfile.mockAnalysis.bottlenecks
    .map((b) => `[${b.category.toUpperCase()}] ${b.issue}: Impacto ${b.impact}`)
    .join("\n");

  const sanitizerResult = sanitizeInputText(mockText);
  const sanitizedText = typeof sanitizerResult === "string" 
    ? sanitizerResult 
    : (sanitizerResult as any).sanitizedText || (sanitizerResult as any).text || mockText;

  return {
    appId: mockProfile.appId,
    gameTitle: mockProfile.title,
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    shortDescription: mockProfile.description,
    genres: ["Indie", "Ação"],
    totalReviewsAnalyzed: mockProfile.steamRating.totalReviews,
    positivePercentage: mockProfile.mockAnalysis.healthScore,
    aggregatedReviewsText: sanitizedText,
    isMockFallback: true,
  };
}
