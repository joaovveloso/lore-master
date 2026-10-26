"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleInstantAccess = () => {
    setIsLoading(true);
    // Redireciona diretamente para a rota principal do site
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7F8FA] px-4 py-12 text-[#252832]">
      {/* Container principal de acesso */}
      <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-xl shadow-black/[0.03] sm:p-10">
        
        {/* Cabeçalho da marca */}
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#800638] text-white shadow-md shadow-[#800638]/20">
            <Gamepad2 size={30} strokeWidth={2} />
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#252832] sm:text-3xl">
            Lore<span className="text-[#A51F4B]">Master</span>
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Inteligência e diagnóstico preditivo para jogos baseados em feedback real da Steam.
          </p>
        </div>

        {/* Recursos rápidos em destaque */}
        <div className="my-8 space-y-3 rounded-xl bg-[#F7F8FA] p-4 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 text-xs font-medium text-[#252832]">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#800638]/10 text-[#800638]">
              <Sparkles size={14} />
            </span>
            <span>Análise preditiva por IA (Gemini 1.5 Flash)</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-[#252832]">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#A51F4B]/10 text-[#A51F4B]">
              <Zap size={14} />
            </span>
            <span>20 Créditos de IA liberados na sessão demo</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-[#252832]">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700">
              <ShieldCheck size={14} />
            </span>
            <span>Conexão direta com dados públicos da Steam</span>
          </div>
        </div>

        {/* Botão de Acesso Instantâneo */}
        <button
          type="button"
          onClick={handleInstantAccess}
          disabled={isLoading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#800638] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#A51F4B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A51F4B] focus-visible:ring-offset-2 disabled:opacity-70 shadow-md shadow-[#800638]/15"
        >
          <span>{isLoading ? "Entrando no sistema..." : "Acesso Instantâneo"}</span>
          <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        {/* Rodapé da página */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400">
            v0.1 · Ambiente de Homologação (develop)
          </p>
        </div>
      </div>
    </main>
  );
}
