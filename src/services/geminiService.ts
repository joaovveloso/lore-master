import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalysisResponse, AnalyzeRequestBody } from '@/types/analysis';

// Prompt base/fallback (enquanto o Dev 4 finaliza o aiPrompts.ts)
const DEFAULT_SYSTEM_INSTRUCTION = `
Você é o motor preditivo do "Lore Master", especialista em diagnóstico de jogos indie.
Análise o jogo e retorne ESTRITAMENTE um objeto JSON válido, SEM NENHUMA MARCAÇÃO DE MARKDOWN (sem \`\`\`json ou \`\`\`), no seguinte formato:
{
  "healthScore": 85,
  "summary": "Resumo executivo do potencial comercial e de design do jogo.",
  "bottlenecks": [
    {
      "category": "Marketing",
      "issue": "Problema identificado",
      "impact": "High"
    }
  ],
  "recommendations": [
    {
      "action": "Ação corretiva recomendada",
      "priority": "High",
      "expectedOutcome": "Resultado esperado"
    }
  ],
  "benchmarkComparison": "Comparativo curto com indies do mesmo nicho."
}
`;

/**
 * Clean e parse do output da LLM garantindo resiliência a blocos de código markdown.
 */
function parseAndSanitizeResponse(rawText: string): AnalysisResponse {
  if (!rawText) {
    throw new Error('A API do Gemini retornou uma resposta vazia.');
  }

  // Remove blocos de markdown ```json ... ``` se o modelo retornar
  let sanitized = rawText.trim();
  if (sanitized.startsWith('```')) {
    sanitized = sanitized.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(sanitized) as AnalysisResponse;

    // Validação mínima dos campos obrigatórios
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
  payload: AnalyzeRequestBody,
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

  const promptContent = customPrompt || `${DEFAULT_SYSTEM_INSTRUCTION}\n\nDados para Análise:\n${JSON.stringify(payload, null, 2)}`;

  const result = await model.generateContent(promptContent);
  const responseText = result.response.text();

  return parseAndSanitizeResponse(responseText);
}
