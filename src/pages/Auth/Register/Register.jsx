import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    role: "buyer",
    password: "",
    status: "pending",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password } = formData;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!uppercasePattern.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!lowercasePattern.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    setError("");
    console.log("Register data:", formData);
    // Call your registration API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Fill in your details to register
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter photo URL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            <p className="text-gray-400 text-sm mt-1">
              Password must have at least 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition"
          >
            Register
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
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
