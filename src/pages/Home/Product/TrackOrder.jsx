import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const TrackOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://garments-order-production-tracker-s-zeta.vercel.app/orders/user/${user.uid}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Loading your orders...</span>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <span className="text-lg font-medium">You have no orders yet.</span>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Track Your Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">{order.productTitle}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : order.status === "approved"
                  ? "bg-green-200 text-green-800"
                  : order.status === "rejected"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Quantity: {order.quantity} | Total: ৳ {order.totalPrice}
          </p>

          <p className="text-sm text-gray-600 mb-2">Address: {order.address}</p>
          <p className="text-sm text-gray-600 mb-4">Phone: {order.phone}</p>

          {/* Tracking history */}
          <div className="space-y-2">
            <h4 className="text-black font-semibold text-sm mb-1">Tracking Updates:</h4>
            {order.tracking && order.tracking.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {order.tracking.map((t, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{t.date}:</span> {t.status}{" "}
                    {t.location ? `at ${t.location}` : ""} {t.note ? `(${t.note})` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No tracking updates yet.</p>
            )}
          </div>

          <Link
            to={`/dashboard/order-details/${order._id}`}
            className="mt-3 inline-block text-blue-600 hover:underline text-sm"
          >
            View Order Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TrackOrder;
