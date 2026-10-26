"use client";

import { useState } from "react";
import { BarChart3, Coins, Gamepad2, LayoutDashboard, Repeat, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type SectionId =
  | "overview"
  | "recurring"
  | "diagnosis"
  | "benchmark"
  | "credits";

export type Section = {
  id: SectionId;
  label: string;
  description: string;
  icon: LucideIcon;
};

/**
 * As cinco seções de navegação do Lore Master.
 */
const SECTION_BY_ID = {
  overview: {
    id: "overview",
    label: "Visão Geral",
    description: "Resumo do que está acontecendo com o feedback do jogo.",
    icon: LayoutDashboard,
  },
  recurring: {
    id: "recurring",
    label: "Problemas Recorrentes",
    description: "Assuntos que aparecem repetidamente nas avaliações.",
    icon: Repeat,
  },
  diagnosis: {
    id: "diagnosis",
    label: "Diagnóstico IA",
    description: "Leitura assistida por IA sobre as causas dos problemas.",
    icon: Sparkles,
  },
  benchmark: {
    id: "benchmark",
    label: "Benchmarking",
    description: "Comparação com outros jogos parecidos.",
    icon: BarChart3,
  },
  credits: {
    id: "credits",
    label: "Créditos",
    description: "Quanto do uso de IA já foi consumido.",
    icon: Coins,
  },
} satisfies Record<SectionId, Section>;

export const SECTIONS: Section[] = [
  SECTION_BY_ID.overview,
  SECTION_BY_ID.recurring,
  SECTION_BY_ID.diagnosis,
  SECTION_BY_ID.benchmark,
  SECTION_BY_ID.credits,
];

export function getSection(id: SectionId): Section {
  return SECTION_BY_ID[id];
}

type SidebarProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  className?: string;
};

export function Sidebar({ active, onSelect, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-full shrink-0 flex-col border-b border-[#E5E7EB] bg-[#800638] text-white md:h-screen md:w-[268px] md:border-r md:border-b-0",
        className,
      )}
    >
      {/* Logotipo / Título da Sidebar */}
      <div className="flex items-center gap-3 px-5 py-4">
        <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#800638] shadow-sm">
          <Gamepad2 size={21} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-bold tracking-tight text-white">
            Lore Master
          </p>
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
            Painel Steam
          </p>
        </div>
      </div>

      {/* Navegação principal */}
      <nav
        aria-label="Navegação principal"
        className="flex flex-col gap-1.5 px-3 pb-3"
      >
        {SECTIONS.map((section) => {
          const isActive = section.id === active;
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                isActive
                  ? "bg-[#A51F4B] text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-white",
                  !isActive && "hidden",
                )}
              />
              <Icon className="size-[18px] shrink-0" strokeWidth={2} />
              <span className="whitespace-nowrap">{section.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Rodapé / Versão Demo */}
      <div className="mt-auto hidden px-5 py-4 md:block">
        <div className="rounded-lg bg-black/15 px-3 py-2.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/90">
            v0.1 · Versão Demo
          </p>
          <p className="mt-0.5 text-[11px] text-white/70">
            Ambiente de homologação (develop)
          </p>
        </div>
      </div>
    </aside>
  );
}

/** Componente de Preview autocontido para testes da Sidebar */
export function SidebarPreview() {
  const [active, setActive] = useState<SectionId>("overview");
  const section = getSection(active);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] md:flex-row">
      <Sidebar active={active} onSelect={setActive} />
      <main className="flex-1 px-5 py-8 md:px-10 md:py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
          Lore Master / {section.label}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#252832] md:text-4xl">
          {section.label}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-gray-600">{section.description}</p>

        <div className="mt-8 rounded-xl border border-dashed border-[#E5E7EB] bg-white px-6 py-10 text-center shadow-sm">
          <section.icon className="mx-auto size-7 text-[#800638]" />
          <p className="mt-3 text-sm font-medium text-[#252832]">
            Prévia da navegação
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
            O conteúdo de {section.label} será montado aqui. Use os botões da barra lateral para navegar.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Sidebar;
