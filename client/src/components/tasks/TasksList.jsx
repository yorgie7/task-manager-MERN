import React from "react";
import TaskCard from "./TaskCard";


/**
 * Props:
 * - tasks: array
 * - isAdmin: boolean
 * - onUpdate, onDelete, onEdit: callbacks
 * - titleColor (optional): one of "neutral" | "indigo" | "emerald" | "sky" | "amber" | "violet"
 */
export default function TasksList({
  tasks = [],
  isAdmin = false,
  onUpdate,
  onDelete,
  onEdit,
  titleColor = "indigo",
}) {
  if (!tasks || tasks.length === 0) {
    return (
      <div
        className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow text-center"
        role="status"
        aria-live="polite"
      >
        No tasks found.
      </div>
    );
  }

  // map friendly color names to Tailwind classes (text + muted fallback)

  return (
    <ul className="space-y-3">
      {
        tasks.map((t) => {
          return <TaskCard
            isAdmin={isAdmin}
            task={t} onEdit={onEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}
            titleColor={titleColor} />
        })
      }
    </ul>
  );
}
