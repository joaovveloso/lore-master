"use client";

import React from "react";
import { AnalysisResponse } from "@/types";
import { handlePrintReport } from "@/utils/pdfGenerator";

interface ExportPDFButtonProps {
  analysis: AnalysisResponse | null;
}

export default function ExportPDFButton({ analysis }: ExportPDFButtonProps) {
  const isEnabled = Boolean(analysis);

  return (
    <button
      onClick={() => handlePrintReport(analysis)}
      disabled={!isEnabled}
      className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 font-medium px-4 py-2.5 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md"
      title={isEnabled ? "Exportar relatório corporativo" : "Gere um diagnóstico primeiro"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-rose-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      <span>Exportar Relatório (PDF / Impressão)</span>
    </button>
  );
}
