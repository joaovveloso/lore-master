"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Sparkles, CheckCircle2, X } from "lucide-react";

interface CreditShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditShopModal({ isOpen, onClose }: CreditShopModalProps) {
  const { addCredits } = useGame();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBuy = (amount: number, planName: string) => {
    addCredits(amount);
    setSuccessMsg(`Sucesso! Você adicionou ${amount} créditos (${planName}).`);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition"
        >
          <X size={20} />
        </button>

        <div className="space-y-1 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#800638]/10 px-3 py-1 text-xs font-semibold text-[#800638] border border-[#800638]/20 mb-2">
            <Sparkles size={14} />
            <span>Loja de Créditos Lore Master</span>
          </div>
          <h2 className="text-xl font-bold">Recarregue seus Créditos</h2>
          <p className="text-xs text-zinc-500">Escolha um pacote de simulação (Ambiente Sandbox)</p>
        </div>

        {successMsg ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
            <CheckCircle2 size={36} className="text-emerald-600 animate-bounce" />
            <p className="text-sm font-semibold text-center px-4">{successMsg}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => handleBuy(25, "Pacote Starter")}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:border-[#800638] transition group text-left"
            >
              <div>
                <p className="font-bold text-sm text-zinc-900 group-hover:text-[#800638] transition">Pacote Starter</p>
                <p className="text-xs text-zinc-500">+25 Créditos de Análise</p>
              </div>
              <span className="text-xs font-extrabold bg-white px-3 py-1.5 rounded-lg border border-zinc-200 text-[#800638]">
                Grátis (Sandbox)
              </span>
            </button>

            <button
              onClick={() => handleBuy(100, "Pacote Estúdio Pro")}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-[#800638]/30 bg-gradient-to-r from-[#800638]/5 to-white hover:border-[#800638] transition group text-left shadow-sm"
            >
              <div>
                <p className="font-bold text-sm text-[#800638]">Pacote Estúdio Pro (Popular)</p>
                <p className="text-xs text-zinc-500">+100 Créditos + Suporte Prioritário</p>
              </div>
              <span className="text-xs font-extrabold bg-[#800638] text-white px-3 py-1.5 rounded-lg shadow-sm">
                Grátis (Sandbox)
              </span>
            </button>
          </div>
        )}

        <p className="text-[11px] text-center text-zinc-400">
          * Simulação de checkout para fins de validação e portfólio acadêmico.
        </p>

      </div>
    </div>
  );
}
