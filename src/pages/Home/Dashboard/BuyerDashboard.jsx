// buyer/BuyerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import '../../../Dashboard.css';

const BuyerDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalSpent: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setStats({
                totalOrders: 15,
                pendingOrders: 3,
                completedOrders: 12,
                totalSpent: 2450
            });

            setRecentOrders([
                { id: 1, product: 'T-Shirt', status: 'Processing', date: '2024-01-15', total: 150 },
                { id: 2, product: 'Jeans', status: 'Shipped', date: '2024-01-10', total: 300 },
                { id: 3, product: 'Jacket', status: 'Delivered', date: '2024-01-05', total: 500 }
            ]);
        }, 1000);
    }, []);

    return (
        <div className="buyer-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <p>Track your orders and shopping activity</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card orders">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                        <h3>{stats.pendingOrders}</h3>
                        <p>Pending</p>
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <h3>{stats.completedOrders}</h3>
                        <p>Completed</p>
                    </div>
                </div>

                <div className="stat-card spent">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>${stats.totalSpent}</h3>
                        <p>Total Spent</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-grid">
                {/* Recent Orders */}
                <div className="recent-orders">
                    <h2>Recent Orders</h2>
                    <div className="orders-table">
                        {recentOrders.map(order => (
                            <div key={order.id} className="order-row">
                                <div className="order-info">
                                    <h4>{order.product}</h4>
                                    <p>Order #ORD{order.id}</p>
                                </div>
                                <div className="order-status">
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="order-date">
                                    {order.date}
                                </div>
                                <div className="order-total">
                                    ${order.total}
                                </div>
                                <Link to={`/my-orders/${order.id}`} className="view-btn">
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-grid">
                        <Link to="/products" className="action-card">
                            <div className="action-icon">🛍️</div>
                            <span>Browse Products</span>
                        </Link>
                        <Link to="/my-orders" className="action-card">
                            <div className="action-icon">📋</div>
                            <span>My Orders</span>
                        </Link>
                        <Link to="/profile" className="action-card">
                            <div className="action-icon">👤</div>
                            <span>My Profile</span>
                        </Link>
                        <Link to="/tracking" className="action-card">
                            <div className="action-icon">📍</div>
                            <span>Track Order</span>
                        </Link>
                    </div>
                </div>

                {/* Order Tracking */}
                <div className="order-tracking">
                    <h2>Track Your Order</h2>
                    <div className="tracking-input">
                        <input type="text" placeholder="Enter Order ID" />
                        <button className="track-btn">Track</button>
                    </div>
                    <div className="tracking-status">
                        <p>Enter your order ID to track its progress</p>
                    </div>
                </div>

                {/* Recommended Products */}
                <div className="recommended-products">
                    <h2>Recommended For You</h2>
                    <div className="products-grid">
                        <div className="product-card">
                            <div className="product-image">👕</div>
                            <div className="product-info">
                                <h4>Premium T-Shirt</h4>
                                <p>$29.99</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">👖</div>
                            <div className="product-info">
                                <h4>Designer Jeans</h4>
                                <p>$59.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;