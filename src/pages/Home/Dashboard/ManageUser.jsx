
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setUsers([]);
      setLoading(false);
    }
  };

  // Update user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, { role: newRole });
      Swal.fire("Success", "User role updated", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };
  // Status update function
const handleStatusChange = async (userId, newStatus) => {
  try {
    await axios.put(`http://localhost:3000/users/${userId}`, { status: newStatus });
    Swal.fire("Success", "User status updated", "success");
    fetchUsers(); // Refresh user list
  } catch (err) {
    Swal.fire("Error", "Failed to update status", "error");
  }
};


  // Suspend user
  const handleSuspend = async (userId) => {
    const { value: reason } = await Swal.fire({
      title: "Suspend User",
      input: "textarea",
      inputLabel: "Reason for suspension",
      inputPlaceholder: "Type your reason here...",
      showCancelButton: true,
    });

    if (reason) {
      try {
        await axios.put(`http://localhost:3000/users/${userId}`, {
          status: "suspended",
          suspendFeedback: reason,
        });
        Swal.fire("Success", "User suspended", "success");
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", "Failed to suspend user", "error");
      }
    }
  };

  // Filter users
  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Pagination
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-4 px-4 py-2 border rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                      disabled={user.status === "suspended"} // Suspended user can't update role
                    >
                      <option className="bg-black text-amber-100" value="manager">Manager</option>
                      <option className="bg-black text-amber-100" value="buyer">Buyer</option>
                      <option className="bg-black text-amber-100" value="admin">Admin</option>
                    </select>
                  </td>
                  {/* <td className="border px-4 py-2">{user.status}</td> */}
                  <td className="border px-4 py-2">
                    <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                        className="border px-2 py-1 rounded"
                        disabled={user.status === "suspended"} // Suspended user can't change status
                    >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                    </select>
                    </td>

                  <td className="border px-4 py-2 space-x-2">
                    {user.status !== "suspended" ? (
                      <button
                        onClick={() => handleSuspend(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Suspend
                      </button>
                    ) : (
                      <span className="text-gray-500">Suspended</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUser;
