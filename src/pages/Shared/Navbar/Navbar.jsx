import React, { useState } from 'react';
import logo from '/src/assets/protracker.webp';
import { Link } from 'react-router';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
        {/* Logo - Start */}
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost text-xl"><img className='h-10 w-30' src={logo} alt="" /> </a>
        </div>

        {/* Center Links (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          {isLoggedIn ? (
            <ul className="menu menu-horizontal px-1">
              <li><Link  to="/home">Home</Link></li>
              <li><a href="/products">All Products</a></li>
              <li><a href="/dashboard" className="text-primary font-semibold">Dashboard</a></li>
            </ul>
          ) : (
            <ul className="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="/products">All Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          )}
        </div>

        {/* End Section */}
        <div className="navbar-end">
          {isLoggedIn ? (
            // Logged-in: Avatar + Dropdown
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li><a href="/profile">Profile</a></li>
                <li><a href="/settings">Settings</a></li>
                <li className="text-error">
                  <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            // Guest: Login + Register
            <>
             <div className=''>
                 <a href="/login" className="btn btn-ghost">Login</a>
              <a href="/register" className="btn btn-primary ml-2">Register</a>
             </div>
            </>
          )}

          {/* Mobile Hamburger Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a href="/">Home</a></li>
              <li><a href="/products">All Products</a></li>
              {isLoggedIn ? (
                <>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li className="text-error"><button onClick={() => setIsLoggedIn(false)}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/register">Register</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Navbar;