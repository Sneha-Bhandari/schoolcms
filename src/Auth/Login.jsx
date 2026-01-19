import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Replace this with your actual school logo path
import SchoolLogo from "../assets/Photo/apexlogo.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAuth", "true");
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">

        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img src={SchoolLogo} alt="School Logo" className="h-24 w-auto" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
          School Admin Portal
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded font-medium hover:bg-blue-800 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Your School Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
