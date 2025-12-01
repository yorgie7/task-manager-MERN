// src/contexts/TasksContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const { user, authFetch } = useAuth();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch("/tasks");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load tasks");
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }, [user, authFetch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createTask = async (payload) => {
    if (!user) throw new Error("Unauthenticated");
    setError(null);
    const res = await authFetch("/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Create failed");
    setTasks(prev => [data, ...prev]);
    return data;
  };

  const updateTask = async (id, updates) => {
    if (!user) throw new Error("Unauthenticated");
    setError(null);
    const res = await authFetch(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Update failed");
    setTasks(prev => prev.map(t => (t._id === id ? data : t)));
    return data;
  };

  const deleteTask = async (id) => {
    if (!user) throw new Error("Unauthenticated");
    setError(null);
    const res = await authFetch(`/tasks/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Delete failed");
    setTasks(prev => prev.filter(t => t._id !== id));
    return data;
  };

  const getTask = (id) => tasks.find(t => t._id === id) || null;


  return (
    <TasksContext.Provider
      value={{ tasks, loading, error, refresh, createTask, updateTask, deleteTask, getTask }}>
      {children}
    </TasksContext.Provider>
  );
};
