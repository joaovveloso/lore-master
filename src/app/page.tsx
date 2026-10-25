"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleInstantAccess = () => {
    router.push("/");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--lm-bg,#0b1020)] px-6 py-12 text-white">
      {/* Background decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--lm-primary,#6366f1)] opacity-20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--lm-secondary,#8b5cf6)] opacity-20 blur-[120px]"
      />

      <section className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* Identidade da plataforma */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[var(--lm-primary,#6366f1)]/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-9 w-9 text-[var(--lm-accent,#a5b4fc)]"
                aria-hidden="true"
              >
                <path d="M12 3 20 7.5V16.5L12 21 4 16.5V7.5L12 3Z" />
                <path d="m8 10 4-2 4 2-4 2-4-2Z" />
                <path d="M12 12v5" />
              </svg>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lm-accent,#a5b4fc)]">
              Indie Game Intelligence
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Lore <span className="text-[var(--lm-accent,#a5b4fc)]">Master</span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Descubra o potencial do seu jogo.
              <br />
              Transforme dados em decisões inteligentes.
            </p>
          </div>

          {/* Entrada na plataforma */}
          <div className="space-y-5">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-slate-200">
                Sua próxima grande ideia começa aqui.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Acesse a plataforma de inteligência e diagnóstico preditivo
                para jogos indie.
              </p>
            </div>

            <button
              type="button"
              onClick={handleInstantAccess}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--lm-primary,#6366f1)] px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--lm-primary-hover,#818cf8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent,#a5b4fc)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020] active:translate-y-0"
            >
              <span>Acesso Instantâneo</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>

            <p className="text-center text-xs text-slate-500">
              Inteligência, estratégia e novas possibilidades.
            </p>
          </div>
        </div>

        <footer className="mt-6 text-center text-xs text-slate-600">
          Lore Master · Indie Game Intelligence
        </footer>
      </section>
    </main>
  );
}
