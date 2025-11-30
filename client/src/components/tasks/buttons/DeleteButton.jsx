import React from "react";
import { Trash2 } from "lucide-react";

/**
 * Props:
 * - onClick: fn
 */
export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-sm flex items-center gap-1 text-sm font-medium border border-red-600 text-red-600 hover:bg-red-100 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-900/30 transition"
      title="Delete"
      aria-label="Delete task"
    >
      <Trash2 className="w-4 h-4" />
      <span className="hidden sm:inline">Delete</span>
    </button>
  );
}
