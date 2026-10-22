import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="text-4xl font-bold mb-2">404</h2>
      <p className="text-xl font-semibold mb-2">Página não encontrada</p>
      <p className="text-gray-600 mb-6">A página que você está procurando no Lore Master não existe ou foi movida.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
