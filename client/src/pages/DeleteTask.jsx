import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { X, Trash2 } from "lucide-react";

export default function DeleteTask() {
  const { id } = useParams();
  const { deleteTask ,getTask} = useTasks();
  const navigate = useNavigate();

  const [task, setTask] = useState(() => ({
    title: "",
    description: "",
    createdBy : ""
  }));

  const handleCancel = () => navigate("../");

  const handleDelete = () => {
    if (id) deleteTask(id);
    navigate("../");
  };
  //


  useEffect(() => {
    if (id) {
      const t = getTask(id);
      if (t)
        setTask({
          title: t.title,
          description: t.description,
          createdBy : t.createdBy?.username,
          completed: Boolean(t.completed)
        });
    }
  }, [ id, getTask]);
 useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 dark:bg-black60"
        onClick={handleCancel}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Trash2 className="w-6 h-6 text-red-600" /> Delete Task
          </h2>

          <p className="text-slate-700 dark:text-slate-200 mb-6">
            Are you sure you want to delete <strong>{task?.title}</strong> created by <strong>{task?.createdBy}</strong>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
