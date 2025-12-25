import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [trackingForm, setTrackingForm] = useState({
    location: "",
    note: "",
    status: "Cutting Completed",
    });
    // Fetch orders
    useEffect(() => {
        axios.get("https://garments-order-production-tracker-s-zeta.vercel.app/orders")
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
            await axios.put(`https://garments-order-production-tracker-s-zeta.vercel.app/orders/${orderId}`, { status: newStatus });
            toast.success("Order status updated");
            // Refresh orders
            const res = await axios.get("https://garments-order-production-tracker-s-zeta.vercel.app/orders");
            setOrders(res.data);
        } catch (err) {
            toast.error("Failed to update order status");
        }
    };

// Order delete function
const handleDeleteOrder = async (orderId) => {
  if (!window.confirm("Are you sure you want to delete this order?")) return;

  try {
    await axios.delete(`https://garments-order-production-tracker-s-zeta.vercel.app/orders/${orderId}`);
    toast.success("Order deleted successfully");
    // Refresh orders
    const res = await axios.get("https://garments-order-production-tracker-s-zeta.vercel.app/orders");
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
                                        <button
  onClick={() => {
    setSelectedOrder(order);
    setIsTrackingModalOpen(true);
  }}
  className="btn btn-sm btn-info ml-2"
>
  Tracking
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
                {isTrackingModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">Add Tracking Info</h3>

      <input
        placeholder="Location"
        className="input input-bordered w-full mb-2"
        value={trackingForm.location}
        onChange={(e) =>
          setTrackingForm({ ...trackingForm, location: e.target.value })
        }
      />

      <textarea
        placeholder="Note"
        className="textarea textarea-bordered w-full mb-2"
        value={trackingForm.note}
        onChange={(e) =>
          setTrackingForm({ ...trackingForm, note: e.target.value })
        }
      />

      <select
        className="select select-bordered w-full mb-4"
        value={trackingForm.status}
        onChange={(e) =>
          setTrackingForm({ ...trackingForm, status: e.target.value })
        }
      >
        <option>Cutting Completed</option>
        <option>Sewing Started</option>
        <option>Finishing</option>
        <option>QC Checked</option>
        <option>Packed</option>
        <option>Shipped</option>
        <option>Out for Delivery</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          className="btn btn-outline"
          onClick={() => setIsTrackingModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={async () => {
            try {
              await axios.patch(
                `https://garments-order-production-tracker-s-zeta.vercel.app/orders/${selectedOrder._id}/tracking`,
                trackingForm
              );
              toast.success("Tracking updated");
              setIsTrackingModalOpen(false);
              setTrackingForm({ location: "", note: "", status: "Cutting Completed" });
            } catch {
              toast.error("Failed to add tracking");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

            </div>
        </div>
    );
};

export default AllOrders;
