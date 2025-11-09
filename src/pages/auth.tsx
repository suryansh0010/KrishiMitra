/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/Subpabase";
import { User } from "@supabase/supabase-js";

// ✅ Exported variable for other components to check login state
export let currentUser: User | null = null;

// ✅ Function to manually get user (can be imported elsewhere)
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Local login state

  // ✅ Check login state on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        currentUser = data.session.user;
        setIsLoggedIn(true);
      } else {
        currentUser = null;
        setIsLoggedIn(false);
      }
    };

    checkSession();

    // ✅ Listen for auth state changes (login, logout)
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user ?? null;
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // ✅ Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit handler for login/signup
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password, name } = formData;

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const { data } = await supabase.auth.getUser();
        currentUser = data.user;
        setIsLoggedIn(true);
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        alert("Signup successful! Please check your email for confirmation.");
        setIsLogin(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    currentUser = null;
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 relative">
      {/* Top-left Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 transition"
      >
        ← Home
      </button>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* If logged in, show logout */}
        {isLoggedIn ? (
          <div className="text-center space-y-4">
            <p className="text-green-700 font-semibold">You are logged in ✅</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        ) : (
          // Auth Form
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition-colors"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
            </button>
          </form>
        )}

        {/* Toggle */}
        {!isLoggedIn && (
          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-700 font-semibold hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
