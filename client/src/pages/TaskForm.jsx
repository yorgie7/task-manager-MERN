import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { FileEdit, PlusCircle, CheckSquare, X } from "lucide-react";

export default function TaskForm({ editMode }) {
  const { id } = useParams();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false
  });

  useEffect(() => {
    if (editMode && id) {
      const t = getTask(id);
      if (t)
        setForm({
          title: t.title,
          description: t.description,
          completed: Boolean(t.completed)
        });
    }
  }, [editMode, id, getTask]);

  const submit = (e) => {
    e.preventDefault();
    if (editMode) updateTask(id, form);
    else createTask(form);
    navigate("../");
  };

  return (
    <>  
      <div
        className="fixed inset-0 bg-black/40 z-40 dark:bg-black60"
        onClick={() => navigate("../")}
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
          {/* Close button */}
          <button
            onClick={() => navigate("../")}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            {editMode ? (
              <>
                <FileEdit className="w-6 h-6 text-blue-600" /> Edit Task
              </>
            ) : (
              <>
                <PlusCircle className="w-6 h-6 text-blue-600" /> New Task
              </>
            )}
          </h2>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            {/* Title */}
            <input
              required
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
            />

            {/* Description */}
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg h-28 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
            />

            {/* Completed checkbox */}
            <label className="flex items-center gap-2 cursor-pointer text-slate-900 dark:text-slate-100">
              <input
                type="checkbox"
                checked={form.completed}
                onChange={(e) =>
                  setForm({ ...form, completed: e.target.checked })
                }
              />
              <span className="flex items-center gap-1">
                <CheckSquare className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                Mark as Completed
              </span>
            </label>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Save
              </button>

              <button
                type="button"
                onClick={() => navigate("../")}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
