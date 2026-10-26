"use client";

import { useCallback, useState } from "react";
import {
  ChevronDown,
  Gamepad2,
  Coins,
  Plus,
} from "lucide-react";

import { useGame } from "@/context/GameContext";

export default function Header() {
  const {
    selectedGame,
    credits,
  } = useGame();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNewGame = useCallback(() => {
    setIsOpen(false);

    // Ponto de integração com o fluxo de análise via Steam.
    window.dispatchEvent(
      new CustomEvent("lore-master:new-game")
    );
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Identidade visual */}
        <a
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#A51F4B] focus-visible:ring-offset-2"
          aria-label="Lore Master - Página inicial"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#800638] text-white">
            <Gamepad2 size={21} strokeWidth={2} />
          </span>

          <span className="text-lg font-bold tracking-tight text-[#252832] sm:text-xl">
            Lore<span className="text-[#A51F4B]">Master</span>
          </span>
        </a>

        {/* Seletor de jogos */}
        <div className="relative flex min-w-0 flex-1 justify-center">
          <div className="relative w-full max-w-xs">
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls="game-selector-menu"
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-left transition-colors hover:border-[#A51F4B]/50 hover:bg-[#F7F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A51F4B] focus-visible:ring-offset-2"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Gamepad2
                  size={18}
                  className="shrink-0 text-[#800638]"
                />

                <span className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    Jogo em análise
                  </span>

                  <span className="block truncate text-sm font-semibold text-[#252832]">
                    {selectedGame?.title ?? "Selecionar jogo"}
                  </span>
                </span>
              </span>

              <ChevronDown
                size={17}
                className={`shrink-0 text-gray-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <>
                <button
                  type="button"
                  aria-label="Fechar seletor de jogos"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={handleClose}
                />

                <div
                  id="game-selector-menu"
                  role="listbox"
                  aria-label="Selecionar jogo"
                  className="absolute left-0 top-full z-50 mt-2 w-full min-w-64 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-1.5 shadow-lg shadow-black/10"
                >
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Biblioteca
                    </p>
                  </div>

                  {selectedGame && (
                    <button
                      type="button"
                      role="option"
                      aria-selected
                      onClick={handleClose}
                      className="flex w-full items-center gap-2 rounded-lg bg-[#800638]/5 px-3 py-2.5 text-left text-sm font-medium text-[#800638]"
                    >
                      <Gamepad2 size={17} />
                      <span className="min-w-0 flex-1 truncate">
                        {selectedGame.title}
                      </span>
                      <span className="size-2 rounded-full bg-[#A51F4B]" />
                    </button>
                  )}

                  <div className="my-1 border-t border-[#E5E7EB]" />

                  <button
                    type="button"
                    onClick={handleNewGame}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#252832] transition-colors hover:bg-[#F7F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A51F4B]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#A51F4B]/10 text-[#A51F4B]">
                      <Plus size={17} />
                    </span>

                    <span>
                      <span className="block">
                        Analisar novo jogo via Steam
                      </span>
                      <span className="mt-0.5 block text-xs font-normal text-gray-500">
                        Adicione um jogo para análise
                      </span>
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Saldo de créditos */}
        <div
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA] px-2.5 py-2 sm:gap-2.5 sm:px-3"
          aria-label={`${credits.availableCredits} créditos disponíveis`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#800638]/10 text-[#800638]">
            <Coins size={18} />
          </span>

          <span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:block">
              Créditos IA
            </span>
            <span className="block text-sm font-bold tabular-nums text-[#252832]">
              {credits.availableCredits}
              <span className="ml-1 font-normal text-gray-500 sm:hidden">
                créditos
              </span>
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
