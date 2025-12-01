import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";

/**
 * Props:
 * - onClick: fn
 */
export default function EditButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="px-3 py-1.5 rounded-sm flex items-center gap-1 text-sm font-medium border border-slate-500 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700/40 transition"
      title="Edit"
      aria-label="Edit task"
    >
      <Pencil className="w-4 h-4" />
      <span className="hidden sm:inline">Edit</span>
    </Button>
  );
}
