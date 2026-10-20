"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Visão Geral", href: "/dashboard", icon: "📊" },
  { label: "Problemas Recorrentes", href: "/dashboard/issues", icon: "🔍" },
  { label: "Diagnóstico por IA", href: "/dashboard/ai", icon: "🧠" },
  { label: "Benchmarking Steam", href: "/dashboard/benchmark", icon: "⚔️" },
  { label: "Créditos & Recarga", href: "/dashboard/credits", icon: "💳" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-73px)]">
      <nav className="space-y-1.5">
        <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 px-3 mb-2 font-bold">
          Módulos
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-rose-900/30 text-rose-300 border border-rose-800/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Info Status Demo */}
      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-400">
        <p className="font-semibold text-rose-400 mb-1">Modo Demo Ativo</p>
        <p className="text-[11px] leading-tight text-slate-500">
          Acesso liberado para avaliação da banca examinadora.
        </p>
      </div>
    </aside>
  );
}
