import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const PendingOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders/pending`);
        console.log(res);
        
        setOrders(res.data);
      } catch (error) {
        toast.error('Failed to load pending orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20">Loading pending orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-20">You have no pending orders.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Pending Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order._id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{order.productName}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ৳ {order.totalPrice}</p>
              <p>Status: {order.status}</p>
            </div>
            <div>
              {/* Future buttons for canceling or paying could go here */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingOrder;
