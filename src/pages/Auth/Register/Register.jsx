import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const { registerUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const handleRegister = (data) => {
  //   registerUser(data.email, data.password)
  //     .then((result) => {
  //       console.log(result.user);
  //       navigate(location.state || "/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleRegister = (data) => {
  registerUser(data.email, data.password)
    .then(async (result) => {
      const user = result.user;

      // Save user in MongoDB
      await axios.post('http://localhost:3000/users', {
        firebaseUid: user.uid,
        name: data.name,
        email: data.email,
        photoURL: data.photoURL || '',
        role: data.role || 'buyer',
        status: 'pending'
      });
      toast.success("Registration successful!"); 
      navigate(location.state || '/');
    })
    .catch((error) => {
      console.log(error);
      toast.error("Registration failed!");
    });
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

        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL")}
              placeholder="Enter photo URL"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              {...register("role")}
              defaultValue="buyer"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">
              Password must have at least 6 characters, including uppercase and
              lowercase letters.
            </p>
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition"
          >
            Register
          </button>
        </form>

        <SocialLogin />

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            state={location.state}
            className="text-indigo-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
