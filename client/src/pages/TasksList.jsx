import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';


export default function TasksList() {
    const { tasks, deleteTask, updateTask } = useTasks();
    const navigate = useNavigate();


    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Tasks</h2>
                <div>
                    <button onClick={() => navigate('/tasks/new')} className="px-3 py-1 bg-green-600 text-white rounded">New Task</button>
                </div>
            </div>


            {tasks.length === 0 && <div className="p-6 bg-white rounded shadow text-center">No tasks yet.</div>}


            <ul className="space-y-3">
                {tasks.map(t => (
                    <li key={t.id} className="p-4 bg-white rounded shadow flex justify-between items-start">
                        <div>
                            <div className="font-medium">{t.title}</div>
                            <div className="text-sm opacity-80">{t.description}</div>
                            <div className="text-xs text-slate-500">Created: {new Date(t.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => updateTask(t._id, { completed: !t.completed })} className="px-2 py-1 border rounded">{t.completed ? 'Undo' : 'Done'}</button>
                            <button onClick={() => navigate(`/tasks/${t._id}/edit`)} className="px-2 py-1 border rounded">Edit</button>
                            <button onClick={() => deleteTask(t._id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}