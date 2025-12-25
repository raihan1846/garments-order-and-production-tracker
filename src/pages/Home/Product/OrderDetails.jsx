import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://garments-order-production-tracker-s-zeta.vercel.app/products/orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load order details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }
  

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-2">Order Details</h2>
        <p className="text-gray-500 text-sm">
          Order ID: <span className="font-mono">{order._id}</span>
        </p>
      </div>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Left */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-3">
          <h3 className="font-semibold text-lg mb-2">Customer Info</h3>
          <p><strong>Email:</strong> {order.userEmail}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}</p>
        </div>

        {/* Right */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-3">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Unit Price:</strong> ৳ {order.price}</p>
          <p className="font-semibold">
            <strong>Total:</strong> ৳ {order.totalPrice}
          </p>
          <p>
            <strong>Status:</strong>{" "}
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
          </p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Order Tracking</h3>

        {order.tracking?.length > 0 ? (
          <ol className="relative border-l border-gray-300 dark:border-gray-700 ml-4 space-y-6">
            {order.tracking.map((track, index) => (
              <li key={index} className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white text-sm">
                  {index + 1}
                </span>
                <p className="font-semibold">{track.status}</p>
                <p className="text-sm text-gray-500">
                  {track.location} • {new Date(track.createdAt).toLocaleString()}
                </p>
                {track.note && (
                  <p className="text-sm mt-1">{track.note}</p>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No tracking updates yet</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
