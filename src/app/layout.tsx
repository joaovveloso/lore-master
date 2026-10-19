import React from "react";

export const metadata = {
  title: "Lore Master - Dashboard",
  description: "AI-driven game detective dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
