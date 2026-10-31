import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalysisResponse, AnalyzePayload } from '@/types/analysis';
import { buildAnalysisPrompt } from '@/services/aiPrompts';

/**
 * Clean e parse do output da LLM garantindo resiliência a blocos de código markdown.
 */
function parseAndSanitizeResponse(rawText: string): AnalysisResponse {
  if (!rawText) {
    throw new Error('A API do Gemini retornou uma resposta vazia.');
  }

  let sanitized = rawText.trim();
  if (sanitized.startsWith('```')) {
    sanitized = sanitized.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(sanitized) as AnalysisResponse;

    if (typeof parsed.healthScore !== 'number' || !Array.isArray(parsed.bottlenecks)) {
      throw new Error('Estrutura de JSON inválida para AnalysisResponse.');
    }

    return parsed;
  } catch (error) {
    console.error('Erro ao realizar parse do JSON do Gemini:', sanitized);
    throw new Error(`Falha na sanitização da resposta da IA: ${(error as Error).message}`);
  }
}

export async function runGeminiAnalysis(
  payload: AnalyzePayload,
  customPrompt?: string
): Promise<AnalysisResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada no ambiente.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const promptContent = customPrompt || (buildAnalysisPrompt ? buildAnalysisPrompt(payload) : `
Analise o feedback/dados do jogo "${payload.gameTitle}" e retorne estritamente um JSON no seguinte formato:
{
  "healthScore": 85,
  "summary": "Resumo analítico específico sobre ${payload.gameTitle} com base em: ${payload.description}",
  "bottlenecks": [
    { "category": "Game Design", "issue": "Problema específico identificado", "impact": "High" }
  ],
  "recommendations": [
    { "action": "Ação recomendada", "expectedOutcome": "Resultado esperado", "priority": "Alta" }
  ]
}
`);

  // Lista de modelos compatíveis para tentativa e resiliência
  const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];

  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const result = await model.generateContent(promptContent);
      const responseText = result.response.text();
      return parseAndSanitizeResponse(responseText);
    } catch (err) {
      console.warn(`[GeminiService] Falha com modelo ${modelName}, tentando próximo... Erro:`, err);
      lastError = err;
    }
  }

  throw lastError || new Error('Não foi possível obter resposta de nenhum modelo Gemini.');
}
