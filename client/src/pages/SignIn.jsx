import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

export default function SignIn() {
    const { signin } = useAuth();
    const [form, setForm] = useState({ username: "ykAdmin8", password: "ykAdmin8" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signin(form);
            navigate("/tasks");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-14 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <LogIn className="w-6 h-6 text-blue-600" />
                Sign In
            </h2>

            <form onSubmit={submit} className="space-y-5">

                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    <Mail className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                    <input
                        required
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                        className="flex-1 outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300"
                    />
                </div>

                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    <Lock className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        className="flex-1 outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300"
                    />
                </div>

                {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
                )}

                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition">
                    <LogIn className="w-5 h-5" />
                    Sign In
                </button>

                <div className="text-right">
                    <Link
                        to="/signup"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Create New Account
                    </Link>
                </div>
            </form>
        </div>
    );
}
