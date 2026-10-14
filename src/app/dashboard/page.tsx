"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Problem } from "@/data/mockData";

export default function DashboardPage() {
  const { selectedGame } = useGame();
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // Função auxiliar para cores de Severidade
  const getSeverityBadge = (severity: Problem["severity"]) => {
    switch (severity) {
      case "Crítico":
        return "bg-red-900/50 text-red-400 border-red-700";
      case "Alto":
        return "bg-orange-900/50 text-orange-400 border-orange-700";
      case "Médio":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-700";
      case "Baixo":
        return "bg-green-900/50 text-green-400 border-green-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Título da Página */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard de Análise de Reclamações</h1>
          <p className="text-sm text-gray-400">
            Acompanhe o impacto da IA nas queixas da comunidade para <span className="text-crimson font-semibold">{selectedGame.name}</span>.
          </p>
        </div>
      </div>

      {/* Cards de Métricas Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cardbg border border-cardborder p-4 rounded-xl">
          <span className="text-xs text-gray-400">Total de Feedbacks</span>
          <p className="text-2xl font-bold text-white mt-1">{selectedGame.totalFeedback.toLocaleString("pt-BR")}</p>
        </div>
        <div className="bg-cardbg border border-cardborder p-4 rounded-xl">
          <span className="text-xs text-gray-400">Problemas Críticos</span>
          <p className="text-2xl font-bold text-red-400 mt-1">{selectedGame.criticalIssues}</p>
        </div>
        <div className="bg-cardbg border border-cardborder p-4 rounded-xl">
          <span className="text-xs text-gray-400">Score de Satisfação</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{selectedGame.satisfactionScore}%</p>
        </div>
        <div className="bg-cardbg border border-cardborder p-4 rounded-xl">
          <span className="text-xs text-gray-400">Gênero do Jogo</span>
          <p className="text-2xl font-bold text-white mt-1">{selectedGame.genre}</p>
        </div>
      </div>

      {/* Tabela de Ranking de Problemas */}
      <div className="bg-cardbg border border-cardborder rounded-xl overflow-hidden">
        <div className="p-4 border-b border-cardborder flex justify-between items-center">
          <h2 className="font-bold text-lg text-white">Ranking de Problemas Detectados</h2>
          <span className="text-xs text-gray-400">{selectedGame.problems.length} problemas listados</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-darkbg text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">Problema</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Severidade</th>
                <th className="p-4">Ocorrências</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cardborder">
              {selectedGame.problems.map((prob) => (
                <tr key={prob.id} className="hover:bg-darkbg/50 transition-colors">
                  <td className="p-4 font-medium text-white">{prob.title}</td>
                  <td className="p-4">{prob.category}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border font-medium ${getSeverityBadge(prob.severity)}`}>
                      {prob.severity}
                    </span>
                  </td>
                  <td className="p-4">{prob.occurrences.toLocaleString("pt-BR")}</td>
                  <td className="p-4">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      {prob.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedProblem(prob)}
                      className="bg-crimson hover:bg-crimson-hover text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Diagnóstico IA ✨
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Soluções da IA */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-cardbg border border-cardborder max-w-2xl w-full rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-start border-b border-cardborder pb-4">
              <div>
                <span className="text-xs text-crimson font-mono font-bold uppercase">Diagnóstico do Lore Master</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedProblem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProblem(null)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-1">Resumo da Dor dos Jogadores:</h4>
              <p className="text-sm text-gray-400 bg-darkbg p-3 rounded-lg border border-cardborder">
                {selectedProblem.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Sugestões de Ação Geradas pela IA:</h4>
              
              <div className="bg-darkbg/70 border border-cardborder p-3 rounded-lg">
                <span className="text-xs font-bold text-amber-400">🎮 Game Design</span>
                <p className="text-xs text-gray-300 mt-0.5">{selectedProblem.aiSuggestions.gameDesign}</p>
              </div>

              <div className="bg-darkbg/70 border border-cardborder p-3 rounded-lg">
                <span className="text-xs font-bold text-blue-400">🎨 UI / UX</span>
                <p className="text-xs text-gray-300 mt-0.5">{selectedProblem.aiSuggestions.uiUx}</p>
              </div>

              <div className="bg-darkbg/70 border border-cardborder p-3 rounded-lg">
                <span className="text-xs font-bold text-emerald-400">💻 Ajuste de Código</span>
                <p className="text-xs text-gray-300 mt-0.5 font-mono">{selectedProblem.aiSuggestions.code}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProblem(null)}
                className="bg-darkbg border border-cardborder hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg"
              >
                Fechar Diagnóstico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
