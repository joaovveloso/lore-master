"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";

export default function CustomTextForm() {
  const { runLocalAnalysis, isLoading, deductCredits, hasEnoughCredits } = useGame();
  const [gameTitle, setGameTitle] = useState("Meu Jogo Indie");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!description.trim()) {
      setErrorMsg("Por favor, insira o feedback ou a descrição do jogo.");
      return;
    }

    if (!hasEnoughCredits(10)) {
      setErrorMsg("Créditos insuficientes! Você precisa de pelo menos 10 créditos.");
      return;
    }

    const success = deductCredits(10);
    if (!success) return;

    runLocalAnalysis(gameTitle, description);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <h2 className="text-sm font-bold tracking-wider text-rose-400 uppercase">
          Colar Feedback Manual
        </h2>
        <span className="text-xs text-zinc-500">Modo Local Ativo</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Título do Jogo</label>
          <input
            type="text"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Feedback / Descrição da Comunidade</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Cole aqui os comentários da Steam, Itch.io ou redes sociais..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-600 resize-none"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-400">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50 text-sm shadow-lg shadow-rose-950/50"
        >
          {isLoading ? "Processando Análise..." : "Gerar Diagnóstico (-10 Créditos)"}
        </button>
      </form>
    </div>
  );
}
