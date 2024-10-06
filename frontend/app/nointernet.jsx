// components/NoInternet.js
import React from 'react';

const NoInternet = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">No Internet Connection</h1>
        <p className="text-lg">Please check your network and try again.</p>
      </div>
    </div>
  );
};

export default NoInternet;
