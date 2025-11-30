// import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TasksProvider } from './contexts/TaskContext';
import AppRouter from './router/Router';
import Navbar from './components/layout/Navbar';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TasksProvider>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="p-6">
              <AppRouter />
            </main>
          </div>
        </TasksProvider>
      </AuthProvider>
    </Router>
  );
}