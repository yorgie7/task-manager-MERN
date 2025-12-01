import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LogOut,
  LogIn,
  UserPlus,
  ListTodo,
  User,
  Menu,
  X
} from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import SignoutButton from "../tasks/buttons/SignoutButton";

export default function Navbar() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signout && signout();
    navigate("/signin");
    setOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <ListTodo className="w-6 h-6" />
              <span className="font-semibold text-lg tracking-tight hidden sm:inline">
                Task App
              </span>
            </Link>
          </div>

          {/* Right: desktop actions */}
          <div className="hidden sm:flex sm:items-center sm:gap-3">
            {user ? (
              <>
                <span className="flex items-center gap-2 text-sm text-slate-700 px-2 dark:text-slate-300">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </span>

                <SignoutButton onClick={handleSignOut} />

              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-3 py-1.5 border rounded flex items-center gap-2 text-sm
                             border-slate-600 text-slate-700 hover:bg-slate-50 transition
                             dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-700/40"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/signup"
                  className="px-3 py-1.5 bg-slate-800 text-white rounded flex items-center gap-2 text-sm
                             hover:bg-slate-900 transition
                             dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
            <div className="text-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: menu Button */}
          <div className="sm:hidden flex items-center">
            <Button
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 transition
                         dark:text-slate-200 dark:hover:bg-slate-700/40 dark:focus:ring-slate-700"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`sm:hidden bg-white border-t border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition-max-h duration-200 overflow-hidden ${open ? "max-h-[480px]" : "max-h-0"
          }`}
      >
        <div className="px-4 pt-3 pb-4 space-y-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-1 text-slate-700 dark:text-slate-300">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.username}</span>
              </div>

              <Link
                to="/tasks"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded text-slate-700 hover:bg-slate-50 transition
                           dark:text-slate-200 dark:hover:bg-slate-700/50"
              >
                <ListTodo className="w-5 h-5" />
                <span className="text-sm">My Tasks</span>
              </Link>

              <Button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded text-red-600 border border-red-100 hover:bg-red-50 transition
                           dark:text-red-400 dark:border-red-400/20 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Sign Out</span>
              </Button>

            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded text-slate-700 hover:bg-slate-50 transition
                           dark:text-slate-200 dark:hover:bg-slate-700/40"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm">Sign In</span>
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded bg-slate-800 text-white hover:bg-slate-900 transition
                           dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-sm">Sign Up</span>
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}