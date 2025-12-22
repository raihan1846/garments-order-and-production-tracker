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
                {/* Google Login */}
                <button className="flex items-center justify-center w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-xl shadow hover:shadow-md transition mt-4">
                    <svg
                        aria-label="Google logo"
                        className="mr-2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path fill="#EA4335" d="M256 133.6c35 0 66.6 12 91.5 31l68.1-68C377.3 50.8 317 29 256 29 155 29 69.1 92.4 38.3 189.1l78.9 61.3C131.7 187.5 189 133.6 256 133.6z" />
                        <path fill="#34A853" d="M256 380c-63 0-116-41-136-97.6l-78.9 61.3C69.1 419.6 155 483 256 483c61 0 121.3-21.8 164.6-66l-68.1-68C322.6 368 291 380 256 380z" />
                        <path fill="#FBBC05" d="M120 243.7l-78.9-61.3C27.5 249.1 27.5 263.9 41.1 283l78.9-61.3z" />
                        <path fill="#4285F4" d="M256 133.6c67 0 124.3 54 136.6 127.4l68.1-68C377.3 145.6 322.6 133.6 256 133.6z" />
                    </svg>
                    Login with Google
                </button>

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
