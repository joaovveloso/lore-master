import { NextResponse } from "next/server";

export async function GET() {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    status: "ok",
    environment: process.env.NODE_ENV,
    services: {
      geminiApiConfigured: hasGeminiKey,
    },
    timestamp: new Date().toISOString(),
  });
}
