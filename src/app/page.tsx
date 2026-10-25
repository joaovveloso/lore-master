"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleInstantAccess = () => {
    router.push("/");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--lm-background,#F7F8FA)] px-6 py-12 text-[var(--lm-text,#252832)]">
      {/* Background decorativo com o Bordô oficial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--lm-brand,#800638)] opacity-10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--lm-brand-hover,#A51F4B)] opacity-10 blur-[120px]"
      />

      <section className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-[var(--lm-border,#E5E7EB)] bg-[var(--lm-surface,#FFFFFF)] p-8 shadow-xl sm:p-10">
          {/* Identidade da plataforma */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--lm-border,#E5E7EB)] bg-[var(--lm-brand,#800638)]/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-9 w-9 text-[var(--lm-brand,#800638)]"
                aria-hidden="true"
              >
                <path d="M12 3 20 7.5V16.5L12 21 4 16.5V7.5L12 3Z" />
                <path d="m8 10 4-2 4 2-4 2-4-2Z" />
                <path d="M12 12v5" />
              </svg>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lm-brand,#800638)]">
              Indie Game Intelligence
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-[var(--lm-text,#252832)] sm:text-5xl">
              Lore <span className="text-[var(--lm-brand,#800638)]">Master</span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-[var(--lm-text-secondary,#606672)]">
              Descubra o potencial do seu jogo.
              <br />
              Transforme dados em decisões inteligentes.
            </p>
          </div>

          {/* Entrada na plataforma */}
          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--lm-border,#E5E7EB)] bg-[var(--lm-background,#F7F8FA)] p-4">
              <p className="text-sm font-medium text-[var(--lm-text,#252832)]">
                Sua próxima grande ideia começa aqui.
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--lm-text-secondary,#606672)]">
                Acesse a plataforma de inteligência e diagnóstico preditivo
                para jogos indie.
              </p>
            </div>

            <button
              type="button"
              onClick={handleInstantAccess}
              className="lm-button-primary group flex w-full items-center justify-center gap-3 px-6 py-4 font-semibold shadow-md transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-brand,#800638)] focus-visible:ring-offset-2"
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

            <p className="text-center text-xs text-[var(--lm-text-muted,#858B96)]">
              Inteligência, estratégia e novas possibilidades.
            </p>
          </div>
        </div>

        <footer className="mt-6 text-center text-xs text-[var(--lm-text-muted,#858B96)]">
          Lore Master · Indie Game Intelligence
        </footer>
      </section>
    </main>
  );
}
