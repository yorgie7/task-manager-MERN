import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
    const { signup } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signup(form);
            navigate('/tasks');
        } catch (err) { setError(err.message); }
    };


    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">Create account</h2>
            <form onSubmit={submit} className="space-y-4">
                <input required placeholder="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full border px-3 py-2 rounded" />
                <input required type="password" placeholder="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border px-3 py-2 rounded" />
                {error && <div className="text-red-600">{error}</div>}
                <div className="flex justify-between items-center">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign up</button>
                    <Link to="/signin" className="text-sm">Have an account?</Link>
                </div>
            </form>
        </div>
    );
}