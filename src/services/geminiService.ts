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

  // Remove blocos de código markdown ```json ... ``` caso a LLM insira
  let sanitized = rawText.trim();
  if (sanitized.startsWith('```')) {
    sanitized = sanitized.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(sanitized) as AnalysisResponse;

    // Validação estrutural básica dos campos obrigatórios
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
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });

  // Utiliza o gerador de prompt oficial do Dev 4 (aiPrompts.ts) ou um customPrompt
  const promptContent = customPrompt || buildAnalysisPrompt(payload);

  const result = await model.generateContent(promptContent);
  const responseText = result.response.text();

  return parseAndSanitizeResponse(responseText);
}
