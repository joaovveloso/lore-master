"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

// ==========================================
// RESERVADO PARA O DEV 1 / VISÃO GERAL
// Tela principal (Dashboard) que integrará os
// componentes desenvolvidos pelos membros do time.
// ==========================================

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="border border-slate-800 bg-slate-900 p-6 rounded-2xl text-center space-y-2">
              <h1 className="text-xl font-bold text-white">Lore Master - Dashboard Main</h1>
              <p className="text-xs font-mono text-slate-400">
                [Aguardando envios dos componentes oficiais do time na branch develop]
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
