"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Save token to localStorage
  const savetokentoLocalstorage = (token) => {
    localStorage.setItem("token", token);
  };

  // Redirect to the welcome page if user is logged in
  const showWelcomepage = () => {
    const token = localStorage.getItem("token");
    window.location.href = token ? "/pages/welcome" : "/pages/login";
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch data from the backend (login endpoint)
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        formData
      );
      savetokentoLocalstorage(response.data.token);
      toast.success("Login successful!");
      showWelcomepage();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials");
      } else {
        toast.error("Network error, please try again");
      }
    }
  };

  // Form submission handling
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    console.log(formData); // Debugging: log form data
    fetchData();
  };

  // Check if user is already logged in and redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      showWelcomepage(); // Redirect if already logged in
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[90.8vh] bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-center items-center text-white">
            <p className="mr-11">Don't have an account?</p>
            <Link className="text-blue-500 underline" href="/pages/signup">Signup</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default LoginForm;
