import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
