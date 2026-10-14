import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { GameProvider } from "@/context/GameContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-darkbg text-white min-h-screen">
        <GameProvider>
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
