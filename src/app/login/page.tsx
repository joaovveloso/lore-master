"use client";

import { useRouter } from "next/navigation";
import { KeyRound, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleInstantAccess = () => {
    // Redireciona de forma fluida para a rota principal do Dashboard
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] p-4 text-[#252832]">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Ícone de Chave em destaque no tom Bordô */}
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#800638]/10 text-[#800638]">
            <KeyRound size={28} />
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#252832]">
            Lore Master
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Plataforma corporativa de inteligência preditiva e diagnóstico para jogos indie.
          </p>

          <div className="mt-8 w-full space-y-4">
            <button
              type="button"
              onClick={handleInstantAccess}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800638] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#A51F4B] hover:shadow-lg active:scale-[0.99]"
            >
              <Sparkles size={18} />
              <span>Acesso Instantâneo</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="mt-8 font-mono text-[11px] text-gray-400">
            Ambiente de Homologação • Branch Develop
          </p>
        </div>
      </div>
    </div>
  );
}
