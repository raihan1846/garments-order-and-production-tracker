import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      axios.get(`https://garments-order-production-tracker-s-zeta.vercel.app/orders/user/${user.uid}`)
        .then(res => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load your orders");
          setLoading(false);
        });
    }
  }, [user?.uid]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!orders.length)
    return <div className="text-center py-20 text-gray-500">You have no orders yet.</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Total</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="font-mono text-xs">{order._id.slice(0,8)}...</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>৳ {order.totalPrice}</td>
                <td className="text-center">
                  <button
                    onClick={() => navigate(`/dashboard/order-details/${order._id}`)}
                    className="btn btn-sm btn-outline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
