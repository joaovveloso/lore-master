'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log seguro de exceções para serviços de monitoramento/telemetria
    console.error('Exceção capturada pelo Error Boundary do Lore Master:', error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-neutral-100 p-4 dark:bg-neutral-800">
            <AlertTriangle className="h-10 w-10 text-neutral-600 dark:text-neutral-400" />
          </div>
        </div>

        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Ops! Algo deu errado
        </span>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Ocorreu um erro inesperado
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Tivemos um problema temporário ao carregar estas informações no Lore Master. Não se preocupe, você pode tentar recarregar o componente.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-neutral-700"
          >
            <RotateCcw className="h-4 w-4" />
            Tentar Novamente
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-transparent px-5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <Home className="h-4 w-4" />
            Ir para a Home
          </Link>
        </div>
      </div>
    </main>
  );
}
