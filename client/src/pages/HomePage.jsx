import { useState, useMemo } from 'react';
import TasksList from '../components/tasks/TasksList';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';

import NewTaskButton from '../components/tasks/buttons/NewTaskButton';
import HideDoneTaskButton from '../components/tasks/buttons/HideDoneTaskButton';
import FullPageSpinner from '../components/ui/FullpageSpinner';

export default function HomePage() {

    const [showCompletedOnly, setShowCompletedOnly] = useState(false);

    const { tasks, updateTask, loading } = useTasks();
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
                    <HideDoneTaskButton onClick={() => setShowCompletedOnly(prev => !prev)} />
                    <NewTaskButton onClick={() => navigate('new')} />
                </div>
            </div>

            { !loading ? 
                <TasksList
                    user={user}
                    loading={loading}
                    tasks={displayedTasks}
                    isAdmin={isAdmin}
                    onUpdate={updateTask}
                    onEdit={(id) => navigate(`${id}/edit`)}
                    onDelete={(id) => navigate(`${id}/delete`)}
                /> : <FullPageSpinner />
            }
        </div>


        <Outlet />
    </>

    );
}
