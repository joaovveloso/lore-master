"use client";

import React from "react";
import type { AnalysisResponse } from "@/types";
import LoadingSkeletons from "./LoadingSkeletons";
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

interface MetricsGridProps {
  analysis: AnalysisResponse | null;
  isLoading: boolean;
}

export default function MetricsGrid({ analysis, isLoading }: MetricsGridProps) {
  if (isLoading) {
    return <LoadingSkeletons />;
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6">
        <div className="p-3 rounded-2xl bg-[#800638]/10 text-[#800638] mb-3">
          <Sparkles size={28} />
        </div>
        <h3 className="text-base font-bold text-zinc-800">Nenhum Diagnóstico Executado Ainda</h3>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          Clique no botão "Executar Diagnóstico" acima ou cole um feedback customizado para processar os relatórios.
        </p>
      </div>
    );
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md"><ShieldAlert size={12}/> Crítico</span>;
      case "high":
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md"><AlertTriangle size={12}/> Alta</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md"><CheckCircle2 size={12}/> Média</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumo do Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-[#800638]/5 to-white p-5 space-y-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Índice de Saúde (Health Score)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#800638]">{analysis.overallScore}</span>
            <span className="text-xs font-bold text-zinc-400">/ 100</span>
          </div>
          <p className="text-xs text-zinc-500 pt-1">Calculado pelo motor analítico local</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Taxa de Sucesso Preditiva</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-emerald-600">{(analysis.predictedSuccessRate * 100).toFixed(0)}%</span>
          </div>
          <p className="text-xs text-zinc-500 pt-1">Estimativa de conversão de retenção</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">ID do Relatório</p>
          <p className="text-xl font-mono font-bold text-zinc-800 pt-2">{analysis.analysisId}</p>
          <p className="text-xs text-zinc-400">{new Date(analysis.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Resumo Executivo */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-3">
        <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
          <Sparkles size={18} className="text-[#800638]" />
          <span>Resumo Diagnóstico</span>
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-100">
          {analysis.summary}
        </p>
      </div>

      {/* Gargalos Encontrados */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-zinc-900">Gargalos e Oportunidades Detectadas ({analysis.issues.length})</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {analysis.issues.map((issue) => (
            <div key={issue.id} className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-sm hover:border-[#800638]/30 transition">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-zinc-900">{issue.title}</h4>
                {getSeverityBadge(issue.severity)}
              </div>

              <p className="text-xs text-zinc-600">{issue.description}</p>

              <div className="bg-[#800638]/5 border border-[#800638]/10 rounded-xl p-3 text-xs text-[#800638] font-medium">
                💡 <span className="font-bold">Recomendação:</span> {issue.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
