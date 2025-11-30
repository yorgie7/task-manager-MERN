import React from "react";
import { Clock, CheckCircle2 } from "lucide-react";

export default function StatusBadge({ status }) {
  const isDone = status === "done";

  if (isDone) {
    return (
      <span
        className="inline-flex items-center gap-2 px-2 py-1/2 rounded-full text-sm font-small
        bg-emerald-100 text-emerald-700 border border-emerald-200
        dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
      >
        <CheckCircle2 className="w-3 h-3" />
        Completed
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-2 px-2 py-1/2 rounded-full text-sm font-small
      bg-yellow-100 text-yellow-800 border border-yellow-300
      dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
    >
      <Clock className="w-3 h-3" />
      Pending
    </span>
  );
}
