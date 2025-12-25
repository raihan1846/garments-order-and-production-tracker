import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Dashboard = () => {
    const { user, userRole, loading } = useAuth();
    const navigate = useNavigate();


    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold">Loading...</div>
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500 font-semibold mb-4">
                    You must be logged in to access the dashboard.
                </div>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // Sidebar Links based on role
    const renderLinks = () => {
        switch (userRole) {
            case "admin":
                return (
                    <>
                        <Link to="/dashboard/manage-users" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Manage Users
                        </Link>
                        <Link to="/addProduct" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Add Product
                        </Link>
                        <Link to="/productLists" className="block py-2 px-4 rounded hover:bg-gray-700">
                             Manage Products
                        </Link>
                        <Link to="/dashboard/all-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                            All Orders
                        </Link>
                        <Link to="/dashboard/my-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                            My Orders
                        </Link>
                        <Link to="/dashboard/track-order" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Track Order
                        </Link>
                    </>
                );
            case "manager":
                return (
                    <>
                        <Link to="/addProduct" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Add Product
                        </Link>
                        <Link to="/productLists" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Manage Products
                        </Link>
                        <Link to="/dashboard/my-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                            My Orders
                        </Link>
                        <Link to="/dashboard/track-order" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Track Order
                        </Link>
                        {/* <Link to="/dashboard/pending-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Pending Orders
                        </Link>
                        <Link to="/dashboard/approved-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Approved Orders
                        </Link> */}
                    </>
                );
            case "buyer":
                return (
                    <>
                        <Link to="/dashboard/my-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                            My Orders
                        </Link>
                        <Link to="/dashboard/track-order" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Track Order
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">Dashboard</div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">
                        Home
                    </Link>
                    {renderLinks()}
                    <Link to="/profile" className="block py-2 px-4 rounded hover:bg-gray-700">
                        Profile
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
