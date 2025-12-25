import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; // সঠিক import (react-router-dom থেকে)
import '../../../Dashboard.css';
import axios from 'axios'; // axios install করে নাও: npm install axios

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        recentOrders: 0,
        totalRevenue: 0 // backend-এ এখনো নেই, manually calculate করতে হবে পরে
    });

    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // JWT token cookie থেকে automatically axios পাঠাবে (withCredentials: true)
                const response = await axios.get('/stats/overview', {
                    withCredentials: true // খুব জরুরি! cookie পাঠানোর জন্য
                });

                const data = response.data;

                setStats({
                    totalUsers: data.totalUsers || 0,
                    totalProducts: data.totalProducts || 0,
                    totalOrders: data.totalOrders || 0,
                    pendingOrders: data.pendingOrders || 0,
                    recentOrders: data.recentOrders || 0,
                    totalRevenue: 0 // পরে order থেকে totalPrice sum করে যোগ করতে পারো
                });

                // Recent Activities (এখানে mock রাখলাম, তুমি চাইলে orders + tracking থেকে combine করে দেখাতে পারো)
                // এটা পরে real data দিয়ে replace করতে পারো
                setRecentActivities([
                    { id: 1, user: 'Manager X', action: 'নতুন প্রোডাক্ট যোগ করেছে', time: '১০ মিনিট আগে' },
                    { id: 2, user: 'Buyer Y', action: 'অর্ডার দিয়েছে', time: '২৫ মিনিট আগে' },
                    { id: 3, user: 'Manager Z', action: 'ট্র্যাকিং আপডেট করেছে', time: '১ ঘণ্টা আগে' },
                    { id: 4, user: 'Buyer A', action: 'অর্ডার বাতিল করেছে', time: '২ ঘণ্টা আগে' },
                    { id: 5, user: 'Admin', action: 'ইউজার রোল চেঞ্জ করেছে', time: '৩ ঘণ্টা আগে' }
                ]);

            } catch (err) {
                console.error("Dashboard data fetch error:", err);
                setError('ড্যাশবোর্ড ডেটা লোড করতে সমস্যা হয়েছে।');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <h1>লোড হচ্ছে...</h1>
                    <p>অপেক্ষা করুন, ড্যাশবোর্ড তৈরি হচ্ছে।</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <h1>সমস্যা হয়েছে</h1>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>অ্যাডমিন ড্যাশবোর্ড</h1>
                <p>স্বাগতম! আপনার ব্যবসার সর্বশেষ অবস্থা এখানে দেখুন।</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>৳{stats.totalRevenue.toLocaleString()}</h3>
                        <p>মোট আয়</p>
                    </div>
                </div>

                <div className="stat-card users">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <h3>{stats.totalUsers}</h3>
                        <p>মোট ইউজার</p>
                    </div>
                </div>

                <div className="stat-card products">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>{stats.totalProducts}</h3>
                        <p>মোট প্রোডাক্ট</p>
                    </div>
                </div>

                <div className="stat-card orders">
                    <div className="stat-icon">📋</div>
                    <div className="stat-info">
                        <h3>{stats.totalOrders}</h3>
                        <p>মোট অর্ডার</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">
                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>দ্রুত অ্যাকশন</h2>
                    <div className="action-grid">
                        <Link to="/admin/users" className="action-card">
                            <div className="action-icon">👥</div>
                            <span>ইউজার ম্যানেজ করুন</span>
                        </Link>
                        <Link to="/admin/products" className="action-card">
                            <div className="action-icon">📦</div>
                            <span>প্রোডাক্ট ম্যানেজ করুন</span>
                        </Link>
                        <Link to="/admin/orders" className="action-card">
                            <div className="action-icon">📋</div>
                            <span>সকল অর্ডার দেখুন</span>
                        </Link>
                        <Link to="/admin/reports" className="action-card">
                            <div className="action-icon">📊</div>
                            <span>রিপোর্ট দেখুন</span>
                        </Link>
                        <Link to="/admin/settings" className="action-card">
                            <div className="action-icon">⚙️</div>
                            <span>সেটিংস</span>
                        </Link>
                        <Link to="/admin/analytics" className="action-card">
                            <div className="action-icon">📈</div>
                            <span>অ্যানালিটিক্স</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="recent-activities">
                    <h2>সাম্প্রতিক কার্যকলাপ</h2>
                    <div className="activities-list">
                        {recentActivities.length > 0 ? (
                            recentActivities.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-avatar">
                                        {activity.user.charAt(0)}
                                    </div>
                                    <div className="activity-details">
                                        <div className="activity-text">
                                            <strong>{activity.user}</strong> {activity.action}
                                        </div>
                                        <div className="activity-time">{activity.time}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>কোনো সাম্প্রতিক কার্যকলাপ নেই</p>
                        )}
                    </div>
                </div>

                {/* Pending Approvals */}
                <div className="pending-approvals">
                    <h2>অনুমোদনের অপেক্ষায়</h2>
                    <div className="pending-list">
                        <div className="pending-item">
                            <div className="pending-info">
                                <h4>{stats.pendingOrders} টি অর্ডার</h4>
                                <p>অনুমোদনের অপেক্ষায়</p>
                            </div>
                            <Link to="/admin/orders?status=Pending" className="view-btn">
                                রিভিউ করুন
                            </Link>
                        </div>
                        <div className="pending-item">
                            <div className="pending-info">
                                <h4>০ জন</h4>
                                <p>ভেরিফিকেশনের অপেক্ষায়</p>
                            </div>
                            <Link to="/admin/users?status=pending" className="view-btn">
                                রিভিউ করুন
                            </Link>
                        </div>
                        <div className="pending-item">
                            <div className="pending-info">
                                <h4>০ টি প্রোডাক্ট</h4>
                                <p>রিভিউ প্রয়োজন</p>
                            </div>
                            <Link to="/admin/products?status=pending" className="view-btn">
                                রিভিউ করুন
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Revenue Chart (Placeholder) */}
                <div className="revenue-chart">
                    <h2>আয়ের সারাংশ</h2>
                    <div className="chart-container">
                        <div className="chart-placeholder">
                            <p>মাসিক আয়ের চার্ট এখানে দেখানো হবে</p>
                            <div className="chart-bars">
                                <div className="chart-bar" style={{ height: '70%' }}></div>
                                <div className="chart-bar" style={{ height: '85%' }}></div>
                                <div className="chart-bar" style={{ height: '60%' }}></div>
                                <div className="chart-bar" style={{ height: '90%' }}></div>
                                <div className="chart-bar" style={{ height: '75%' }}></div>
                                <div className="chart-bar" style={{ height: '95%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="bottom-stats">
                <div className="bottom-stat">
                    <div className="bottom-stat-icon">🎯</div>
                    <div className="bottom-stat-info">
                        <h4>কনভার্সন রেট</h4>
                        <p>3.2%</p>
                    </div>
                </div>
                <div className="bottom-stat">
                    <div className="bottom-stat-icon">🕒</div>
                    <div className="bottom-stat-info">
                        <h4>গড় রেসপন্স টাইম</h4>
                        <p>২.৪ ঘণ্টা</p>
                    </div>
                </div>
                <div className="bottom-stat">
                    <div className="bottom-stat-icon">⭐</div>
                    <div className="bottom-stat-info">
                        <h4>কাস্টমার সন্তুষ্টি</h4>
                        <p>94%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;