import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
export default function Auth() {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

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
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6 transition-all duration-500">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* Form Section */}
        {isLogin ? (
          // Login Form
          <form className="space-y-4 transition-all duration-500">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        ) : (
          // Signup Form
          <form className="space-y-4 transition-all duration-500">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition-colors"
            >
              Signup
            </button>
          </form>
        )}

        {/* Toggle Button */}
        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-700 font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
