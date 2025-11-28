import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Navbar() {
const { user, signout } = useAuth();
const navigate = useNavigate();


return (
<nav className="p-4 bg-white shadow flex items-center justify-between">
<div>
<Link to="/" className="font-bold">TaskApp</Link>
</div>
<div className="flex items-center gap-3">
{user ? (
<>
<span className="text-sm">{user.username}</span>
<Link to="/tasks" className="px-3 py-1 border rounded">My tasks</Link>
<button
onClick={() => { signout(); navigate('/signin'); }}
className="px-3 py-1 border rounded"
>
Sign out
</button>
</>
) : (
<>
<Link to="/signin" className="px-3 py-1 border rounded">Sign in</Link>
<Link to="/signup" className="px-3 py-1 bg-slate-800 text-white rounded">Sign up</Link>
</>
)}
</div>
</nav>
);
}

