"use client";

import { useState } from "react";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInstantAccess = () => {
    setIsLoggedIn(true);
  };

  // 1. SE AINDA NÃO CLICOU: Exibe a tela de boas-vindas / login com o ícone de chave
  if (!isLoggedIn) {
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

  // 2. APÓS CLICAR: Exibe o Dashboard principal com o Layout Integrado (Sidebar + Header + Cards)
  return (
    <div className="lm-page flex min-h-screen">
      {/* Menu Lateral (Sidebar) */}
      <aside className="lm-sidebar hidden w-64 flex-col p-6 md:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 font-bold">
            LM
          </div>
          <span className="text-lg font-bold tracking-wide">Lore Master</span>
        </div>
        <nav className="space-y-2">
          <a href="#" className="lm-sidebar-item block px-4 py-2.5 text-sm font-medium" aria-current="page">
            Dashboard
          </a>
          <a href="#" className="lm-sidebar-item block px-4 py-2.5 text-sm font-medium opacity-80 hover:opacity-100">
            Ingestão Customizada
          </a>
          <a href="#" className="lm-sidebar-item block px-4 py-2.5 text-sm font-medium opacity-80 hover:opacity-100">
            Diagnóstico Steam
          </a>
        </nav>
      </aside>

      {/* Área Principal */}
      <div className="flex flex-1 flex-col">
        {/* Cabeçalho (Header) */}
        <header className="lm-header flex items-center justify-between px-8 py-4">
          <h1 className="text-xl font-bold">Painel de Diagnóstico</h1>
          <button 
            onClick={() => setIsLoggedIn(false)} 
            className="text-xs text-[var(--lm-text-secondary,#606672)] underline hover:text-[var(--lm-text)]"
          >
            Sair / Voltar
          </button>
        </header>

        {/* Conteúdo Central */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="lm-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--lm-text-muted,#858B96)]">Score de Saúde</p>
              <p className="mt-2 text-3xl font-extrabold text-[var(--lm-brand,#800638)]">85 / 100</p>
            </div>
            <div className="lm-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--lm-text-muted,#858B96)]">Status da Análise</p>
              <p className="mt-2 text-lg font-bold">Estável (Steam API)</p>
            </div>
            <div className="lm-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--lm-text-muted,#858B96)]">Créditos Disponíveis</p>
              <p className="mt-2 text-lg font-bold">50 Créditos</p>
            </div>
          </div>

          <div className="lm-card mt-8 p-6">
            <h2 className="text-lg font-semibold">Exemplo de Diagnóstico de Severidade</h2>
            <p className="mt-2 text-sm text-[var(--lm-text-secondary,#606672)]">
              Aqui aparecerão os relatórios de gameplay, performance e retenção gerados pelo motor de IA.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="badge-severity badge-severity-critical">Crítico: Queda de FPS</span>
              <span className="badge-severity badge-severity-medium">Médio: Curva de Aprendizado</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
