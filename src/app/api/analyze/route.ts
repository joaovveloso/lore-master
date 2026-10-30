import { NextRequest, NextResponse } from 'next/server';
import { runGeminiAnalysis } from '@/services/geminiService';
import { AnalyzeRequestBody } from '@/types/analysis';
import { sanitizeInputText } from '@/utils/sanitizer'; // Import do sanitizador (Dev 8)

export async function POST(req: NextRequest) {
  try {
    // 1. Validação da chave de API no ambiente
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Infraestrutura: GEMINI_API_KEY não encontrada no servidor.' },
        { status: 500 }
      );
    }

    // 2. Leitura do payload do body
    const body: AnalyzeRequestBody = await req.json();

    if (!body.gameTitle || !body.description) {
      return NextResponse.json(
        { error: 'Dados insuficientes: "gameTitle" e "description" são obrigatórios.' },
        { status: 400 }
      );
    }

    // 3. Sanitização e validação de tamanho mínimo (< 20 caracteres)
    const validation = sanitizeInputText(body.description);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 4. Utiliza o texto higienizado
    const sanitizedBody: AnalyzeRequestBody = {
      ...body,
      description: validation.sanitizedText,
    };

    // 5. Processamento via Gemini 1.5 Flash
    const analysis = await runGeminiAnalysis(sanitizedBody);

    // 6. Retorno estruturado com status 200
    return NextResponse.json(analysis, { status: 200 });

  } catch (error) {
    console.error('[API /api/analyze Error]:', error);
    
    return NextResponse.json(
      {
        error: 'Falha no processamento da análise preditiva.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
