// manager/ManagerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import '../../../Dashboard.css';

const ManagerDashboard = () => {
    const [stats, setStats] = useState({
        myProducts: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalSales: 0
    });

    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setStats({
                myProducts: 24,
                pendingOrders: 12,
                completedOrders: 89,
                totalSales: 24500
            });

            setPendingOrders([
                { id: 1, product: 'T-Shirt', buyer: 'John Doe', quantity: 100, total: 500 },
                { id: 2, product: 'Jeans', buyer: 'Jane Smith', quantity: 50, total: 1250 },
                { id: 3, product: 'Jacket', buyer: 'Bob Johnson', quantity: 200, total: 4000 }
            ]);
        }, 1000);
    }, []);

    return (
        <div className="manager-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>Manager Dashboard</h1>
                <p>Manage your products and orders efficiently</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card sales">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>${stats.totalSales.toLocaleString()}</h3>
                        <p>Total Sales</p>
                    </div>
                </div>

                <div className="stat-card products">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>{stats.myProducts}</h3>
                        <p>My Products</p>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                        <h3>{stats.pendingOrders}</h3>
                        <p>Pending Orders</p>
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <h3>{stats.completedOrders}</h3>
                        <p>Completed Orders</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-grid">
                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-grid">
                        <Link to="/manager/products" className="action-card">
                            <div className="action-icon">➕</div>
                            <span>Add New Product</span>
                        </Link>
                        <Link to="/manager/orders" className="action-card">
                            <div className="action-icon">📋</div>
                            <span>Manage Orders</span>
                        </Link>
                        <Link to="/manager/inventory" className="action-card">
                            <div className="action-icon">📊</div>
                            <span>Inventory</span>
                        </Link>
                        <Link to="/manager/tracking" className="action-card">
                            <div className="action-icon">📍</div>
                            <span>Update Tracking</span>
                        </Link>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="pending-orders">
                    <h2>Pending Orders</h2>
                    <div className="orders-list">
                        {pendingOrders.map(order => (
                            <div key={order.id} className="order-item">
                                <div className="order-info">
                                    <h4>{order.product}</h4>
                                    <p>Buyer: {order.buyer}</p>
                                    <p>Qty: {order.quantity} | Total: ${order.total}</p>
                                </div>
                                <Link to={`/manager/orders/${order.id}`} className="action-btn">
                                    Process
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="recent-activities">
                    <h2>Recent Updates</h2>
                    <div className="updates-list">
                        <div className="update-item">
                            <div className="update-badge new">New</div>
                            <div className="update-content">
                                <p>New order for T-Shirt</p>
                                <small>10 minutes ago</small>
                            </div>
                        </div>
                        <div className="update-item">
                            <div className="update-badge stock">Stock</div>
                            <div className="update-content">
                                <p>Jeans stock running low</p>
                                <small>2 hours ago</small>
                            </div>
                        </div>
                        <div className="update-item">
                            <div className="update-badge completed">✅</div>
                            <div className="update-content">
                                <p>Order #1234 completed</p>
                                <small>Yesterday</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Production Status */}
                <div className="production-status">
                    <h2>Production Status</h2>
                    <div className="status-grid">
                        <div className="status-item">
                            <div className="status-label">In Production</div>
                            <div className="status-value">8</div>
                        </div>
                        <div className="status-item">
                            <div className="status-label">Quality Check</div>
                            <div className="status-value">3</div>
                        </div>
                        <div className="status-item">
                            <div className="status-label">Ready to Ship</div>
                            <div className="status-value">5</div>
                        </div>
                        <div className="status-item">
                            <div className="status-label">Shipped</div>
                            <div className="status-value">12</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;