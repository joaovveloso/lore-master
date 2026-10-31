"use client";

import React, { useState } from "react";
import { GameData } from "@/types";
import { Gamepad2, Plus, X } from "lucide-react";

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: GameData) => void;
}

export default function AddGameModal({ isOpen, onClose, onAddGame }: AddGameModalProps) {
  const [title, setTitle] = useState("");
  const [developer, setDeveloper] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGame: GameData = {
      appId: Math.floor(100000 + Math.random() * 900000),
      title,
      developer: developer || "Estúdio Independente",
      releaseDate: new Date().toISOString().split("T")[0],
      price: 0,
      steamRating: {
        scoreDescription: "Extremamente Positiva",
        totalReviews: Math.floor(15 + Math.random() * 200),
        positiveReviews: Math.floor(10 + Math.random() * 180),
        negativeReviews: 5,
      },
      metrics: {
        currentPlayers: Math.floor(10 + Math.random() * 80),
        peakPlayers24h: Math.floor(30 + Math.random() * 250),
      },
    };

    onAddGame(newGame);
    setTitle("");
    setDeveloper("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
          <div className="p-2.5 rounded-xl bg-[#800638]/10 text-[#800638]">
            <Gamepad2 size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-zinc-900">Adicionar Novo Projeto</h3>
            <p className="text-xs text-zinc-500">Cadastre seu jogo do Itch.io ou projeto autoral</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Título do Jogo</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Cyber Knight / Dungeon Crawler"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#800638]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Desenvolvedor / Estúdio</label>
            <input
              type="text"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              placeholder="Ex: PixelArt Studios"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#800638]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#800638] hover:bg-[#60042a] text-white font-bold py-3 rounded-xl transition text-sm shadow-md flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Salvar na Biblioteca Local</span>
          </button>
        </form>
      </div>
    </div>
  );
}
