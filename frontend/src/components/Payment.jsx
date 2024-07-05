import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/actions/order";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming shippingAddress is stored in Redux state
  const shippingAddress = useSelector((state) => state.address.shippingAddress);

  // Fetch shippingAddress from session storage if not available in Redux state
  const sessionShippingAddress = JSON.parse(sessionStorage.getItem('selectedAddress'));
  const finalShippingAddress = shippingAddress || sessionShippingAddress;

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleCashOnDelivery = () => {
    const paymentDetails = {
      paymentMethod: 'Cash On Delivery'
    };

    dispatch(createOrder(finalShippingAddress, paymentDetails))
      .then(() => {
        navigate('/order/success');
      })
      .catch(() => {
        navigate('/order/fail');
      });
  };

  return (
    <>
      <div className="h-40 bg-[#7b713f5b] flex items-center justify-center text-2xl font-bold text-gray-700">
        {/* Breadcrumb area */}
        Checkout / Payment
      </div>
      <div className="px-40 py-10 mx-auto my-10 bg-white rounded w-full">
        <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
        <div className="mb-6">
          <label className="block mb-3">
            <input
              type="radio"
              value="cod"
              checked={selectedPaymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
              className="mr-3 accent-red-600"
            />
            <span className="text-lg">Cash on Delivery</span>
          </label>

          <label className="block mb-3">
            <input
              type="radio"
              value="card"
              checked={selectedPaymentMethod === "card"}
              onChange={handlePaymentMethodChange}
              className="mr-3 accent-red-600"
            />
            <span className="text-lg">Card Payment</span>
          </label>
        </div>

        {selectedPaymentMethod === "cod" && (
          <div className="mt-6 text-right">
            <button onClick={handleCashOnDelivery} className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300">
              Confirm Order
            </button>
          </div>
        )}

        {selectedPaymentMethod === "card" && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Card Payment</h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Card Number</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="1234 1234 1234 1234"
                />
              </div>

              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block mb-2 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 font-medium">CVC</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <div className="mt-6 text-right">
                <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300">
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
