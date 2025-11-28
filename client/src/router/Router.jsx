import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TasksList from '../pages/TasksList';
import TaskForm from '../pages/TaskForm';
import ProtectedRoute from '../components/ProtectedRoute';


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />


            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <TasksList />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/tasks/new"
                element={
                    <ProtectedRoute>
                        <TaskForm />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/tasks/:id/edit"
                element={
                    <ProtectedRoute>
                        <TaskForm editMode />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<div>404 - Not found</div>} />
        </Routes>
    );
}