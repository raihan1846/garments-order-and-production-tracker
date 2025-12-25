// src/pages/Dashboard/UpdateProfile.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile, updateEmail } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const [userId, setUserId] = useState(null); // MongoDB _id

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/users?email=${currentUser.email}`);
        const userData = res.data[0];
        if (!userData) {
          navigate("/login");
          return;
        }

        setName(userData.name);
        setEmail(userData.email);
        setPhotoURL(userData.photoURL || "");
        setUserId(userData._id);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      Swal.fire("Error", "Name and Email are required", "error");
      return;
    }

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Firebase Auth update
        await updateProfile(currentUser, { displayName: name, photoURL });
        if (currentUser.email !== email) {
          await updateEmail(currentUser, email);
        }
      }

      // MongoDB update
      await axios.put(`http://localhost:3000/users/${userId}`, { name, email, photoURL });

      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Photo URL</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
