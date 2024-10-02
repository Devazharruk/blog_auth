"use client"; // Ensure this component runs on the client side

import React, { useEffect } from "react";

const CheckLogin = () => {
  useEffect(() => {
    const checkLogin = () => {
      if (localStorage.getItem("token")) {
        window.location.href = "/pages/welcome";
      } else {
        window.location.href = "/pages/signup";
      }
    };

    checkLogin();
  }, []); // Run only once on component mount

  return null; // This component does not render anything
};

export default CheckLogin;
