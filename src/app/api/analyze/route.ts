import { NextRequest, NextResponse } from 'next/server';
import { runGeminiAnalysis } from '@/services/geminiService';
import { AnalyzeRequestBody } from '@/types/analysis';

export async function POST(req: NextRequest) {
  try {
    // 1. Validação da chave de API
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Infraestrutura: GEMINI_API_KEY não encontrada no servidor.' },
        { status: 500 }
      );
    }

    // 2. Extração do Payload
    const body: AnalyzeRequestBody = await req.json();

    if (!body.gameTitle || !body.description) {
      return NextResponse.json(
        { error: 'Dados insuficientes: "gameTitle" e "description" são obrigatórios.' },
        { status: 400 }
      );
    }

    // 3. Chamada ao Motor Gemini (Dev 9)
    const analysis = await runGeminiAnalysis(body);

    // 4. Retorno Estruturado
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
