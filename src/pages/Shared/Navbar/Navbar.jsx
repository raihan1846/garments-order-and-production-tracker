import React from 'react';
import { Link } from 'react-router';
import logo from '/src/assets/protracker.webp';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch(error => console.log(error));
  };

  // 🔹 Menu config
  const guestLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const userLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
    { name: 'Dashboard', path: '/dashboard', highlight: true },
  ];

  const navLinks = user ? userLinks : guestLinks;

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">

      {/* 🔹 Navbar Start */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          <img className="h-10 w-[120px]" src={logo} alt="ProTracker Logo" />
        </Link>
      </div>

      {/* 🔹 Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={link.highlight ? 'text-primary font-semibold' : ''}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Navbar End */}
      <div className="navbar-end gap-2">

        {/* 🔹 User Avatar / Auth Buttons */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoURL || 'https://i.ibb.co/2kR5zq0/user.png'}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-error btn-sm w-full"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}

        {/* 🔹 Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}

            {user ? (
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-error btn-sm mt-2"
                >
                  Log Out
                </button>
              </li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
