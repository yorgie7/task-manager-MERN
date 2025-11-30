import React from "react";
import { ClipboardList } from "lucide-react";
import TaskActions from "./TaskActions";
import StatusBadge from "./StatusBadge";

const DONE = "done";
const TODO = "todo";

export default function TaskCard({ task: t, titleColor, onEdit, onDelete, onUpdate, isAdmin }) {

  const isCompleted = t.status === DONE;

  // map friendly color names to Tailwind classes (text + muted fallback)
  const titleColorMap = {
    neutral: "text-slate-800 dark:text-slate-100",
    indigo: "text-indigo-600 dark:text-indigo-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    sky: "text-sky-600 dark:text-sky-400",
    amber: "text-amber-600 dark:text-amber-400",
    violet: "text-violet-600 dark:text-violet-400",
  };

  function getTitleClass(isCompleted) {
    if (isCompleted) {
      return "text-emerald-700 dark:text-emerald-300";
    }
    return titleColorMap[titleColor] ?? titleColorMap.indigo;
  }

  return (
    <li
      key={t._id}
      className="relative p-4 pb-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
      aria-labelledby={`task-title-${t._id}`}
    >
      <div className="absolute top-2 right-2">
        <StatusBadge status={t.status} />
      </div>

      <div className="flex items-start gap-3">
        <ClipboardList className="w-5 h-5 text-slate-600 dark:text-slate-300 mt-1 shrink-0" />

        <div className="flex-1 min-w-0">
          <div
            id={`task-title-${t._id}`}
            className={`font-semibold text-base leading-snug truncate ${getTitleClass(
              isCompleted
            )}`}
            title={t.title}
          >
            {t.title}
          </div>
          =
          <div className="text-sm text-slate-700 dark:text-slate-300 mt-2 mb-4 line-clamp-5">
            {t.description}
          </div>

          <div className="border-b border-slate-200 dark:border-slate-700 my-2"></div>

          {/* BOTTOM AREA (DATE + BUTTONS ROW) */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t.createdAt ? new Date(t.createdAt).toLocaleString() : "—"}
            </div>

            <div className="flex items-center gap-2">
              <TaskActions
                isAdmin={isAdmin}
                isCompleted={isCompleted}
                status={t.status}
                onUpdate={() => onUpdate && onUpdate(t._id, { status: isCompleted ? TODO : DONE })}
                onEdit={() => onEdit && onEdit(t._id)}
                onDelete={() => onDelete && onDelete(t._id)}
              />
            </div>
          </div>
        </div>
      </div>
    </li>

  )
}
