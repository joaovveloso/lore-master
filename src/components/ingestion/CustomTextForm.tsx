"use client";

import React, { useState } from "react";
import { sanitizeInputText } from "@/utils/sanitizer";

interface CustomTextFormProps {
  onSubmitAnalysis: (text: string) => void;
  isLoading?: boolean;
}

export function CustomTextForm({ onSubmitAnalysis, isLoading = false }: CustomTextFormProps) {
  const [rawText, setRawText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const MIN_CHARS = 20;
  const MAX_CHARS = 5000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (rawText.trim().length < MIN_CHARS) {
      setErrorMessage(`O feedback precisa ter no mínimo ${MIN_CHARS} caracteres para uma análise precisa.`);
      return;
    }

    // Aplicação da sanitização oficial do projeto
    const sanitizerResult = sanitizeInputText(rawText);
    const cleanedText = typeof sanitizerResult === "string"
      ? sanitizerResult
      : (sanitizerResult as any).sanitizedText || (sanitizerResult as any).text || rawText;

    onSubmitAnalysis(cleanedText);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">Ingestão de Feedback Manual</h3>
        <p className="text-sm text-gray-500 mt-1">
          Cole avaliações de fóruns, Discord ou pesquisas para gerar um diagnóstico instantâneo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            maxLength={MAX_CHARS}
            rows={6}
            placeholder="Ex: O jogo está incrível, mas o terceiro chefe tem um pico de dificuldade injusto e a interface trava no mobile..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#800638] focus:border-transparent text-gray-800 text-sm resize-none transition-all"
          />
          <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
            <span>{errorMessage ? <span className="text-[#800638] font-medium">{errorMessage}</span> : "Mínimo de 20 caracteres"}</span>
            <span>{rawText.length} / {MAX_CHARS}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || rawText.trim().length < MIN_CHARS}
          className="w-full py-3 px-6 rounded-xl bg-[#800638] hover:bg-[#68042c] text-white font-semibold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processando Inteligência...</span>
            </>
          ) : (
            <span>Gerar Diagnóstico Lore Master</span>
          )}
        </button>
      </form>
    </div>
  );
}
