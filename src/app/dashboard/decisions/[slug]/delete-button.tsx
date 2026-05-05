"use client";

import { useActionState, useState } from "react";
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
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-red-600">Delete?</span>
        <button
          onClick={handleDelete}
          className="text-xs font-semibold text-red-700 hover:underline"
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-xs font-semibold text-zinc-500 hover:underline"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </button>
      {error && <span className="text-[10px] text-red-600">{error}</span>}
    </div>
  );
}
