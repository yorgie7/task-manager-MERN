import { Check, Undo2, Pencil, Trash2, ClipboardList, Clock } from "lucide-react";

const DONE = "done";
const TODO = "todo";

/**
 * Props:
 * - tasks: array
 * - isAdmin: boolean
 * - onUpdate, onDelete, onEdit: callbacks
 * - titleColor (optional): one of "neutral" | "indigo" | "emerald" | "sky" | "amber" | "violet"
 *
 * Defaults:
 * - pending tasks -> use chosen titleColor (default: indigo)
 * - completed tasks -> use emerald (green)
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

    // map friendly color names to Tailwind classes (text + subtle muted fallback)
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
            // completed tasks use green/emerald to signal success
            return "text-emerald-700 dark:text-emerald-300";
        }
        // pending tasks use the selected color, fallback to indigo
        return titleColorMap[titleColor] ?? titleColorMap.indigo;
    }

    return (
        <ul className="space-y-3">
            {tasks.map((t) => {
                const isCompleted = t.status === DONE;

                return (
                    <li
                        key={t._id}
                        className="relative p-4 pb-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
                        aria-labelledby={`task-title-${t._id}`}
                    >
                        {/* STATUS BADGE */}
                        <div className="absolute top-2 right-2">
                            {isCompleted ? (
                                <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full dark:bg-green-900/30 dark:text-green-300">
                                    <Check className="w-3 h-3" /> Completed
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full dark:bg-yellow-900/20 dark:text-yellow-300">
                                    <Clock className="w-3 h-3" /> Pending
                                </span>
                            )}
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="flex items-start gap-3">
                            <ClipboardList className="w-5 h-5 text-slate-600 dark:text-slate-300 mt-1 shrink-0" />

                            <div className="flex-1 min-w-0">
                                {/* Title */}
                                <div
                                    id={`task-title-${t._id}`}
                                    className={`font-semibold text-base leading-snug truncate ${getTitleClass(
                                        isCompleted
                                    )}`}
                                    title={t.title}
                                >
                                    {t.title}
                                </div>

                                {/* Description */}
                                <div className="text-sm text-slate-700 dark:text-slate-300 mt-1 mb-2 line-clamp-2">
                                    {t.description}
                                </div>

                                {/* Grey Divider */}
                                <div className="border-b border-slate-200 dark:border-slate-700 my-2"></div>

                                {/* BOTTOM AREA (DATE + BUTTONS ROW) */}
                                <div className="flex items-center justify-between">

                                    {/* DATE LEFT */}
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {t.createdAt ? new Date(t.createdAt).toLocaleString() : "—"}
                                    </div>

                                    {/* BUTTON ROW (ALWAYS HORIZONTAL) */}
                                    <div className="flex items-center gap-2">
                                        {/* Done/Undo */}
                                        <button
                                            onClick={() =>
                                                onUpdate && onUpdate(t._id, { status: isCompleted ? TODO : DONE })
                                            }
                                            aria-label={isCompleted ? "Mark as todo" : "Mark as done"}
                                            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium border transition
                                                ${isCompleted
                                                    ? "border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:border-emerald-500 dark:hover:bg-emerald-900/20"
                                                    : "border-blue-600 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-500 dark:hover:bg-blue-900/20"
                                                }`}

                                        >
                                            {isCompleted ? (
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

                                        {/* Edit */}
                                        <button
                                            onClick={() => onEdit && onEdit(t._id)}
                                            className="px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium border border-slate-500 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700/40 transition"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>

                                        {/* Delete (admin only) */}
                                        {isAdmin && (
                                            <button
                                                onClick={() => onDelete && onDelete(t._id)}
                                                className="px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium border border-red-600 text-red-600 hover:bg-red-100 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-900/30 transition"
                                                aria-label="Delete task"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="hidden sm:inline">Delete</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
