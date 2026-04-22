"use client";

import { useState } from "react";

type Props = { onReset: () => void };

export function ResetButton({ onReset }: Props) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 justify-center">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Emin misin?</span>
        <button
          onClick={() => { onReset(); setConfirming(false); }}
          className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400"
        >
          Sıfırla
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
    >
      Sıfırla
    </button>
  );
}
