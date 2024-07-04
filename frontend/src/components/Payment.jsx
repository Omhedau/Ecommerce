import React, { useState } from 'react';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod'); 

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Payment Options</h2>

      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="radio"
            value="cod"
            checked={selectedPaymentMethod === 'cod'}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Cash on Delivery
        </label>

        <label className="block mb-2">
          <input
            type="radio"
            value="card"
            checked={selectedPaymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Card Payment
        </label>
      </div>

      {selectedPaymentMethod === 'cod' && (
        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-red-600 text-white rounded">Done</button>
        </div>
      )}

      {selectedPaymentMethod === 'card' && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Card Payment</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-1">Card Number</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="1234 1234 1234 1234" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Expiry Date</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">CVC</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="CVC" />
            </div>

            <div className="mt-4 text-right">
              <button className="px-4 py-2 bg-red-600 text-white rounded">Pay Now</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;
