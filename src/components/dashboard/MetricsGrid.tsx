"use client";

import React from "react";
import { AnalysisResponse, getSeverityBadgeClass } from "@/types";

interface MetricsGridProps {
  analysis: AnalysisResponse | null;
  isLoading: boolean;
}

export default function MetricsGrid({ analysis, isLoading }: MetricsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl h-40"></div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl h-40"></div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl h-40"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-8 text-center text-zinc-400">
        Nenhum diagnóstico gerado ainda. Selecione um jogo ou insira um feedback customizado para iniciar.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid Principal de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Health Score */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-950/20 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">
              Health Score Preditivo
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white">
                {analysis.overallScore}
              </span>
              <span className="text-zinc-500 text-lg">/ 100</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 mt-4">
            Baseado na análise integrada de engajamento e feedback.
          </p>
        </div>

        {/* Card Resumo Executivo */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 md:col-span-2 flex flex-col justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">
              Resumo Executivo
            </span>
            <p className="text-zinc-200 mt-2 text-sm leading-relaxed">
              {analysis.summary}
            </p>
          </div>
          <div className="text-xs text-zinc-500 mt-4 flex justify-between items-center">
            <span>ID da Análise: {analysis.analysisId}</span>
            <span>AppID: {analysis.appId}</span>
          </div>
        </div>
      </div>

      {/* Seção de Gargalos e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gargalos Identificados */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase mb-4">
            Gargalos Identificados
          </h3>
          <div className="space-y-4">
            {analysis.issues?.map((issue) => (
              <div
                key={issue.id}
                className="bg-zinc-950/50 border border-zinc-800/60 rounded-lg p-4 transition hover:border-zinc-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                    {issue.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getSeverityBadgeClass(issue.severity)}`}>
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-white font-medium text-sm">{issue.title}</h4>
                <p className="text-zinc-400 text-xs mt-1">{issue.description}</p>
                <div className="mt-3 pt-3 border-t border-zinc-800/40 text-xs text-rose-300/90 font-medium">
                  💡 Recomendação: {issue.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de Sucesso Previsto */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase mb-4">
              Projeção de Mercado
            </h3>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-lg p-6 text-center">
              <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">
                Taxa de Sucesso Prevista pela IA
              </span>
              <span className="text-4xl font-extrabold text-rose-500">
                {(analysis.predictedSuccessRate * 100).toFixed(0)}%
              </span>
              <p className="text-xs text-zinc-500 mt-3">
                Estimativa calculada com base no engajamento atual e correções recomendadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
