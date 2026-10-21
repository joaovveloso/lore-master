import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0d11] text-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 bg-[#800020]/20 rounded-full border border-[#800020] mb-6 animate-pulse">
        <AlertTriangle className="w-12 h-12 text-[#ff4d6d]" />
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight text-white mb-2">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-[#ff4d6d] mb-4">
        Rota Não Encontrada
      </h2>

      <p className="max-w-md text-gray-400 mb-8">
        A página que você está tentando acessar no Lore Master não existe ou foi movida durante a análise de logs.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#800020] hover:bg-[#a00028] text-white font-medium rounded-lg transition-colors shadow-lg shadow-[#800020]/30"
      >
        <Home className="w-5 h-5" />
        Voltar ao Dashboard
      </Link>
    </div>
  );
}
