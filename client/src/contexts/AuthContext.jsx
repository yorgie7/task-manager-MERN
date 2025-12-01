// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


const API = `${process.env.REACT_APP_API_ENDPOINT}/api` || "/api";

const TOKEN_KEY = "app_token";
const USER_KEY = "auth_user";

function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch { }
  }, [token]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(USER_KEY);
    } catch (er) { console.error(er) }
  }, [user]);

  const authFetch = async (path, opts = {}) => {
    const headers = opts.headers ? { ...opts.headers } : {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = headers["Content-Type"] || "application/json";

    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers,
    });

    // auto signout on 401
    if (res.status === 401) {
      signout();
      const err = new Error("Unauthorized");
      err.status = 401;
      throw err;
    }
    return res;
  };

  const signup = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Signup failed");
      }


      if (data.token) {
        setToken(data.token);
        // console.log(data)
        setUser({ username: data.username || username });
      }

      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const signin = async ({ username, password, }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      setToken(data.token);
      const parsedUser = data.user || { username };
      setUser(parsedUser);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const signout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch { }
  };

  const value = {
    user,
    token,
    loading,
    signup,
    signin,
    signout,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
