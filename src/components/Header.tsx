"use client";

// ==========================================
// RESERVADO PARA O DEV 5
// Desenvolva o Header com a logo Lore Master,
// o seletor de jogos e o contador de créditos aqui.
// ==========================================

export function Header() {
  return (
    <header className="w-full p-4 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center font-bold text-sm">
          LM
        </div>
        <span className="font-bold tracking-wide">LORE MASTER</span>
      </div>
      <p className="text-xs font-mono text-slate-400">
        [Header Component - Espaço reservado para Dev 5]
      </p>
    </header>
  );
}
