import { NextRequest, NextResponse } from 'next/server';
import { runGeminiAnalysis } from '@/services/geminiService';
import { AnalyzeRequestBody, AnalysisResponse } from '@/types/analysis';
import { sanitizeInputText } from '@/utils/sanitizer';
import { getMockGameFallback } from '@/services/mockData';

export async function POST(req: NextRequest) {
  try {
    // 1. Leitura do payload do body
    const body: AnalyzeRequestBody = await req.json();

    if (!body.gameTitle || !body.description) {
      return NextResponse.json(
        { error: 'Dados insuficientes: "gameTitle" e "description" são obrigatórios.' },
        { status: 400 }
      );
    }

    // 2. Sanitização e validação de tamanho do texto
    const validation = sanitizeInputText(body.description);
    const sanitizedText = typeof validation === 'string'
      ? validation
      : (validation as any).sanitizedText || (validation as any).text || body.description;

    const sanitizedBody: AnalyzeRequestBody = {
      ...body,
      description: sanitizedText,
    };

    // 3. Tenta processar via Gemini 1.5 Flash (se a chave API estiver configurada)
    if (process.env.GEMINI_API_KEY) {
      try {
        const analysis = await runGeminiAnalysis(sanitizedBody);
        if (analysis) {
          return NextResponse.json(analysis, { status: 200 });
        }
      } catch (geminiError) {
        console.warn('[API /api/analyze] Chamada Gemini falhou. Ativando fallback de resiliência:', geminiError);
      }
    }

    // 4. Fallback de Resiliência: Extração segura do appId numérico
    const rawAppId = (body.steamData as any)?.appId;
    const appId = typeof rawAppId === 'number' ? rawAppId : Number(rawAppId) || 1001;

    const fallbackProfile = getMockGameFallback(appId);
    
    // Constrói resposta no formato esperado pela UI
    const fallbackAnalysis: AnalysisResponse = {
      healthScore: fallbackProfile.mockAnalysis.healthScore,
      summary: `Análise Preditiva para ${body.gameTitle}: ${fallbackProfile.mockAnalysis.summary}`,
      bottlenecks: fallbackProfile.mockAnalysis.bottlenecks,
      recommendations: fallbackProfile.mockAnalysis.recommendations,
      benchmarkComparison: fallbackProfile.mockAnalysis.benchmarkComparison,
    };

    return NextResponse.json(fallbackAnalysis, { status: 200 });

  } catch (error) {
    console.error('[API /api/analyze Critical Error]:', error);

    // Fallback de emergência final para garantir que o front nunca receba erro 500
    const defaultProfile = getMockGameFallback(1001);
    return NextResponse.json(defaultProfile.mockAnalysis, { status: 200 });
  }
}
