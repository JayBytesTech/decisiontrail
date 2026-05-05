"use client";

import { useState } from "react";
import { deleteDecisionAction } from "../../actions";

type DeleteButtonProps = {
  decisionId: string;
};

export function DeleteButton({ decisionId }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const result = await deleteDecisionAction(decisionId);
    if (result?.message) {
      setError(result.message);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-200">
        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
          Delete this record?
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="h-8 rounded-full bg-red-600 px-4 text-[11px] font-bold text-white transition hover:bg-red-700 active:scale-95"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="h-8 rounded-full border border-zinc-200 bg-white px-4 text-[11px] font-bold text-zinc-600 transition hover:bg-zinc-50 active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-red-100 bg-white px-4 text-[11px] font-bold text-red-600 shadow-xs transition-all hover:bg-red-50 active:scale-95"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete Decision
      </button>
      {error && <span className="text-[10px] font-medium text-red-600">{error}</span>}
    </div>
  );
}
