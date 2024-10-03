"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited
  const [formData, setFormData] = useState({ name: "", email: "" }); // Form data for the user being edited

  // Fetch users
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setData(res.data);
      toast.success("Users fetched successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching users!");
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
      setData(data.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
      localStorage.removeItem("token");
    } catch (error) {
      toast.error("Error deleting user!");
      console.error("Error deleting user:", error);
    }
  };

  // Handle the update form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format using a regular expression
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    return emailRegex.test(email);
  };

  // Validate inputs before updating
  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required!");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required!");
      return false;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format!");
      return false;
    }
    return true;
  };

  // Update user
  const handleUpdate = async (id) => {
    if (!validateForm()) return; // Ensure the form is valid before proceeding

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, formData);
      setData(
        data.map((user) =>
          user._id === id
            ? { ...user, name: formData.name, email: formData.email }
            : user
        )
      );
      setEditUserId(null); // Exit edit mode after updating
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Error updating user!");
      console.error("Error updating user:", error);
    }
  };

  // Show edit form for user
  const editUserInfo = (user) => {
    setEditUserId(user._id); // Set the ID of the user being edited
    setFormData({ name: user.name, email: user.email }); // Populate form data with the user's current info
  };

  return (
    <div className="min-h-[90.8vh] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-10">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          User Management
        </h1>
        <button
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
          onClick={getUsers}
        >
          Fetch Users
        </button>

        {loading ? (
          <div className="mt-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
          </div>
        ) : data.length > 0 ? (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full table-auto bg-white bg-opacity-50 text-left rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-gray-800 text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-gray-800 text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-gray-800 text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white bg-opacity-50 hover:bg-opacity-75 transition"
                  >
                    {editUserId === user._id ? (
                      <>
                        {/* Edit Mode */}
                        <td className="px-6 py-4 border-b border-gray-300">
                          <input
                            className="px-4 py-2 rounded-lg"
                            type="text"
                            name="name"
                            value={formData.name}
                            required
                            onChange={handleInputChange}
                          />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          <input
                            className="px-4 py-2 rounded-lg"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={() => handleUpdate(user._id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => setEditUserId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* View Mode */}
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                          <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={() => editUserInfo(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white mt-6 text-center">
            No users found. Click "Fetch Users" to load data.
          </p>
        )}

        {/* Toast notification container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default Page;
