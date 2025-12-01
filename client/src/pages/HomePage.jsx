import { useState, useMemo } from 'react';
import TasksList from '../components/tasks/TasksList';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';

import { Filter } from 'lucide-react';
import NewTaskButton from '../components/tasks/buttons/NewTaskButton';

export default function HomePage() {

    const [showCompletedOnly, setShowCompletedOnly] = useState(false);

    const { tasks, updateTask } = useTasks();
    const { user } = useAuth();
    const navigate = useNavigate();

    const displayedTasks = useMemo(() => {
        if (showCompletedOnly) {
            return tasks.filter(t => t.status === "done");
        }
        return tasks;
    }, [tasks, showCompletedOnly]);

    const isAdmin = (user.role === 'admin');

    return (<>
    <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Tasks</h2>

                <div className="flex items-center gap-2">

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowCompletedOnly(prev => !prev)}
                        className={`px-3 py-1 border rounded flex items-center gap-2 ${showCompletedOnly
                                ? 'bg-blue-600 text-white border-blue-700'
                                : 'bg-white text-slate-700'
                            }`}
                    >
                        <Filter size={16} />
                        <span className="text-sm">
                            {showCompletedOnly ? 'Completed' : 'All'}
                        </span>
                    </button>

                    <NewTaskButton onClick={() => navigate('new')} />

                </div>
            </div>

            <TasksList
                tasks={displayedTasks}
                isAdmin={isAdmin}
                onUpdate={updateTask}
                onEdit={(id) => navigate(`${id}/edit`)}
                onDelete={(id) => navigate(`${id}/delete`)}
            />
        </div>


        <Outlet />
    </>
        
    );
}
