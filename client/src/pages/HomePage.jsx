import { useState, useMemo } from 'react';
import TasksList from '../components/TasksList';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';

// Lucide Icons
import { Filter, Plus } from 'lucide-react';

export default function HomePage() {

    const [showCompletedOnly, setShowCompletedOnly] = useState(false);

    const { tasks, updateTask, deleteTask } = useTasks();
    const { user } = useAuth();
    const navigate = useNavigate();

    const displayedTasks = useMemo(() => {
        if (showCompletedOnly) {
            return tasks.filter(t => t.status === "done");
        }
        return tasks;
    }, [tasks, showCompletedOnly]);

    const isAdmin = (user.role === 'admin');

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Tasks</h2>

                <div className="flex items-center gap-2">

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowCompletedOnly(prev => !prev)}
                        className={`px-3 py-1 border rounded flex items-center gap-2 ${
                            showCompletedOnly
                                ? 'bg-blue-600 text-white border-blue-700'
                                : 'bg-white text-slate-700'
                        }`}
                    >
                        <Filter size={16} />
                        <span className="text-sm">
                            {showCompletedOnly ? 'Completed' : 'All'}
                        </span>
                    </button>

                    {/* New Task */}
                    <button
                        onClick={() => navigate('/tasks/new')}
                        className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-2"
                    >
                        <Plus size={16} />
                        <span>New Task</span>
                    </button>

                </div>
            </div>

            <TasksList
                tasks={displayedTasks}
                isAdmin={isAdmin}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onEdit={(id) => navigate(`/tasks/${id}/edit`)}
            />
        </div>
    );
}
