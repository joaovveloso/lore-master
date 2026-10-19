export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
      <div className="border border-emerald-500/30 bg-emerald-500/10 p-6 rounded-xl text-center">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          🧪 Ambiente de Testes (`develop`)
        </span>
        <h1 className="text-3xl font-bold mt-2">Lore Master PoC - Branch Develop no Ar!</h1>
        <p className="mt-2 text-slate-400 text-sm">
          A aba de testes da equipe está 100% pronta para receber as contribuições dos 9 integrantes.
        </p>
      </div>
    </main>
  );
}
