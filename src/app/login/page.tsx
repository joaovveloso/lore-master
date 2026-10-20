"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleInstantAccess = () => {
    localStorage.setItem("lore_master_demo", "true");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-rose-900/40 p-8 rounded-2xl shadow-2xl relative z-10 text-center">
        <div className="w-12 h-12 bg-rose-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rose-950 mb-4">
          LM
        </div>
        <h1 className="text-2xl font-bold text-white">LORE MASTER</h1>
        <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mt-1">
          Dashboard de Inteligência para Games
        </p>

        <p className="text-sm text-slate-400 mt-4 leading-relaxed">
          Plataforma de diagnóstico por IA para detecção de problemas, análise de reviews e benchmarking de jogos.
        </p>

        {/* Botao Acesso Instantaneo Jurado */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleInstantAccess}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-600 hover:to-rose-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-950/60 border border-rose-500/30 flex items-center justify-center gap-2"
          >
            <span>🚀 Acesso Instantâneo Modo Demo</span>
          </button>
          <p className="text-[11px] text-slate-500">
            Acesso liberado sem necessidade de e-mail ou senha para jurados.
          </p>
        </div>
      </div>
    </main>
  );
}
