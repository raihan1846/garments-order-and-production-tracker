import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    // Fetch orders
    useEffect(() => {
        axios.get("http://localhost:3000/orders")
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load orders");
                setLoading(false);
            });
    }, []);

    // Filter logic
    const filteredOrders =
        filter === "all"
            ? orders
            : orders.filter(order => order.status === filter);

    if (loading) {
        return <div className="text-center py-20">Loading orders...</div>;
    }
    // Status update function
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/orders/${orderId}`, { status: newStatus });
            toast.success("Order status updated");
            // Refresh orders
            const res = await axios.get("http://localhost:3000/orders");
            setOrders(res.data);
        } catch (err) {
            toast.error("Failed to update order status");
        }
    };

// Order delete function
const handleDeleteOrder = async (orderId) => {
  if (!window.confirm("Are you sure you want to delete this order?")) return;

  try {
    await axios.delete(`http://localhost:3000/orders/${orderId}`);
    toast.success("Order deleted successfully");
    // Refresh orders
    const res = await axios.get("http://localhost:3000/orders");
    setOrders(res.data);
  } catch (err) {
    toast.error("Failed to delete order");
  }
};

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">All Orders</h2>

            {/* Filter */}
            <div className="mb-4 flex gap-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td className="font-mono text-xs">
                                    {order._id.slice(0, 8)}...
                                </td>

                                <td>{order.userEmail}</td>

                                <td>{order.productName}</td>

                                <td>{order.quantity}</td>

                                {/* <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td> */}
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
      ${order.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>

                                <td className="text-center">
                                    <Link
                                        to={`/dashboard/order-details/${order._id}`}
                                        className="btn btn-sm btn-outline"
                                    >
                                        View
                                    </Link>
                                     <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="btn btn-sm btn-error ml-2"
                                        >
                                            Delete
                                        </button>
                                </td>
                            </tr>
                        ))}

                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
