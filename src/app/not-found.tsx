import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-neutral-100 p-4 dark:bg-neutral-800">
            <Compass className="h-10 w-10 text-neutral-600 dark:text-neutral-400" />
          </div>
        </div>

        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Erro 404
        </span>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Página não encontrada
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Parece que o caminho que você tentou acessar não existe no universo do Lore Master ou foi movido.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-neutral-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </main>
  );
}
