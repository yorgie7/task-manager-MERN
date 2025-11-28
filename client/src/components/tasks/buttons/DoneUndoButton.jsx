import React from "react";
import { Check, Undo2 } from "lucide-react";

/**
 * Props:
 * - isDone: boolean
 * - onClick: fn
 */
export default function DoneUndoButton({ isDone = false, onClick }) {
  const base =
    "px-3 py-1.5 rounded-sm flex items-center gap-1 text-sm font-medium border transition";
  const doneCls =
    "border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:border-emerald-500 dark:hover:bg-emerald-900/20";
  const todoCls =
    "border-blue-600 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-500 dark:hover:bg-blue-900/20";

  return (
    <button
      onClick={onClick}
      aria-label={isDone ? "Mark as todo" : "Mark as done"}
      className={`${base} ${isDone ? doneCls : todoCls}`}
    >
      {isDone ? (
        <>
          <Undo2 className="w-4 h-4" />
          <span className="hidden sm:inline">Undo</span>
        </>
      ) : (
        <>
          <Check className="w-4 h-4" />
          <span className="hidden sm:inline">Done</span>
        </>
      )}
    </button>
  );
}
