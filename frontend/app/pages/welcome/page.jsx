"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Default import

const Page = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt && jwt.split(".").length === 3) {
      // Check if token has 3 parts
      try {
        const decoded = jwtDecode(jwt);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Invalid token format");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/pages/login"; // Redirect to signup after logout
  };

  return (
    <div className="h-1/2 flex justify-center items-center">
      {decodedToken ? (
        <div className="mt-80 text-6xl">
          <p>Hello {decodedToken.name}</p> {/* Display user's name */}
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-3xl">No token found</p>
      )}
    </div>
  );
};

export default Page;
