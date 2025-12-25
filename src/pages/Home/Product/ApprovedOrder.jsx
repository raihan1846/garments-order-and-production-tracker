import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const ApprovedOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://garments-order-production-tracker-s-zeta.vercel.app/orders/approved`);
        console.log(res);
        
        setOrders(res.data);
      } catch (error) {
        toast.error('Failed to load approved orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20">Loading approved orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-20">You have no approved orders.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Approved Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order._id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{order.productName}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ৳ {order.totalPrice}</p>
              <p>Status: {order.status}</p>
              <p>Delivery Address: {order.address}</p>
              <p>Phone: {order.phone}</p>
            </div>
            <div>
              {/* Optional: Track delivery or contact seller buttons */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovedOrder;
