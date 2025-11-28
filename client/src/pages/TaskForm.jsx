import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { FileEdit, PlusCircle, CheckSquare, ChevronLeft } from "lucide-react";

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
        navigate("/tasks");
    };

    return (
        <div className="max-w-md mx-auto mt-14 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
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

            <form onSubmit={submit} className="space-y-5">
                
                {/* Title */}
                <input
                    required
                    placeholder="Task title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border px-3 py-2 rounded-lg"
                />

                {/* Description */}
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded-lg h-28"
                />

                {/* Completed checkbox */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.completed}
                        onChange={(e) =>
                            setForm({ ...form, completed: e.target.checked })
                        }
                    />
                    <span className="flex items-center gap-1">
                        <CheckSquare className="w-4 h-4 text-slate-600" />
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
                        onClick={() => navigate("/tasks")}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
