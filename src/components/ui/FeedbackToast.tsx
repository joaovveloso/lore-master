"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Coins, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "credits";

interface FeedbackToastProps {
  type: ToastType;
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackToast({
  type,
  title,
  message,
  isOpen,
  onClose,
}: FeedbackToastProps) {
  if (!isOpen) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return { border: "border-[#A51F4B]/50", icon: <CheckCircle2 className="w-5 h-5 text-[#A51F4B]" />, bar: "bg-[#A51F4B]" };
      case "credits":
        return { border: "border-[#800638]/60", icon: <Coins className="w-5 h-5 text-[#800638]" />, bar: "bg-[#800638]" };
      case "warning":
        return { border: "border-amber-500/50", icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, bar: "bg-amber-500" };
      case "error":
      default:
        return { border: "border-red-600/50", icon: <XCircle className="w-5 h-5 text-red-500" />, bar: "bg-red-500" };
    }
  };

  const style = getStyles();

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`bg-[#121212]/95 ${style.border} border rounded-xl p-4 shadow-2xl backdrop-blur-md relative overflow-hidden`}>
        <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${style.bar}`} />
        <div className="flex items-start gap-3 pl-2">
          <div className="mt-0.5 shrink-0">{style.icon}</div>
          <div className="flex-1 pr-4">
            <h4 className="text-sm font-semibold text-zinc-100">{title}</h4>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{message}</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors p-1" aria-label="Fechar">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
