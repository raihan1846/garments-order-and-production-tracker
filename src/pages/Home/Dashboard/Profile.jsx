import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/users?email=${currentUser.email}`);
        const userData = res.data[0]; // ✅ Array থেকে first item

        if (!userData) {
          navigate("/login");
          return;
        }

        if (userData.status === "suspended") {
          alert(`Your account is suspended: ${userData.suspendFeedback}`);
          navigate("/login");
        } else {
          setUser(userData);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!user) return <p className="p-6">User not found.</p>;

  return (
    <div className="p-6 max-w-md mx-auto  shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.status}</p>

      {user.status === "suspended" && (
        <div className="bg-red-100 text-red-800 p-3 rounded mt-4">
          <strong>Suspension Reason:</strong> {user.suspendFeedback}
        </div>
      )}
      <div>
        <Link to="/updateProfile" className="btn btn-primary p-3 bg-green-600">Update Your Profile</Link>
      </div>
    </div>
  );
};

export default Profile;
