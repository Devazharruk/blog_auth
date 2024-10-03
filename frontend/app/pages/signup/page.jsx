"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";

const SignupForm = () => {
  const savetokentoLocalstorage = (token) => {
    localStorage.setItem("token", token);
  };
  const showWelcomepage = () => {
    // check if user is logged in
    if (localStorage.getItem("token")) {
      window.location.href = "/pages/welcome";
    } else if (!localStorage.getItem("token")) {
      window.location.href = "/pages/signup";
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const api = await axios.post(
        `https://blog-auth-api.vercel.app/api/auth/signup`,
        formData
      );
      savetokentoLocalstorage(api.data.token);
      toast.success("Signup successful!");
      showWelcomepage();
    } catch (error) {
      toast.error("User already exists");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    fetchData();
  };

  // check if user is logged in

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      showWelcomepage(); // Redirect if already logged in
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[90.8vh] bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
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
            <p className="mr-11">Already have an account</p>
            <Link className="text-blue-500 underline" href="/pages/login">Login</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Signup
          </button>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default SignupForm;
