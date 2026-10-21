"use client";

import { useEffect } from "react";
import { ShieldAlert, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registra a falha no console de desenvolvimento
    console.error("Exceção capturada pelo Error Boundary do Dev 10:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0d0d11] text-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 bg-red-950/40 rounded-full border border-red-800 mb-6">
        <ShieldAlert className="w-12 h-12 text-red-500" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">
        Ocorreu um erro inesperado
      </h1>

      <p className="max-w-md text-gray-400 mb-8">
        O Lore Master encontrou uma falha na renderização de dados. Você pode tentar recarregar o módulo ou retornar com segurança.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#800020] hover:bg-[#a00028] text-white font-medium rounded-lg transition-colors shadow-lg shadow-[#800020]/30"
        >
          <RefreshCw className="w-5 h-5" />
          Tentar Novamente
        </button>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg transition-colors border border-gray-700"
        >
          <Home className="w-5 h-5" />
          Ir para Inicio
        </Link>
      </div>
    </div>
  );
}
