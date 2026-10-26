import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lore Master - AI Game Detective",
  description: "Plataforma de Inteligência e Diagnósticos para Games Indie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-[#F7F8FA] text-[#252832] antialiased`}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
