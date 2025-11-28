import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';


export default function TaskForm({ editMode }) {
    const { id } = useParams();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();


    const [form, setForm] = useState({ title: '', description: '', completed: false });


    useEffect(() => {
        if (editMode && id) {
            const t = getTask(id);
            if (t) setForm({ title: t.title, description: t.description, completed: !!t.completed });
        }
    }, [editMode, id, getTask]);


    const submit = (e) => {
        e.preventDefault();
        if (editMode && id) {
            updateTask(id, form);
        } else {
            createTask(form);
        }
        navigate('/tasks');
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-4">{editMode ? 'Edit Task' : 'New Task'}</h2>
            <form onSubmit={submit} className="space-y-4">
                <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border px-3 py-2 rounded" />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border px-3 py-2 rounded" />
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.completed} onChange={(e) => setForm({ ...form, completed: e.target.checked })} /> Completed
                </label>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                    <button type="button" onClick={() => navigate('/tasks')} className="px-4 py-2 border rounded">Cancel</button>
                </div>
            </form>
        </div>
    );
}