import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  title: "Lore Master — AI Game Detective",
  description: "Plataforma de inteligência preditiva e diagnóstico para jogos indie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F7F8FA] text-[#252832] antialiased">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
