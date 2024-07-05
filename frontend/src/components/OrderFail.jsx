import React from "react";
import { useNavigate } from "react-router-dom";

const OrderFail = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Order Failed!</h1>
        <button
          onClick={() => navigate('/cart')}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default OrderFail;
