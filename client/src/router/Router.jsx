import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import HomePage from '../pages/HomePage';
import TaskForm from '../pages/TaskForm';
import PageNotFound from '../pages/PageNotFound';
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
                        <HomePage />
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

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}