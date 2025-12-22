import React from "react";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Login to your account
                </p>
                <form className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <a href="#" className="hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                    <button className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition">
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-indigo-500 font-semibold hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
