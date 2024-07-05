import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../redux/actions/cart";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState(null);

  const cartState = useSelector((state) => state.cart);
  const { cart, loading, error } = cartState;

  useEffect(() => {
    dispatch(getUserCart());

    const savedAddress = sessionStorage.getItem("selectedAddress");
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
    }
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="h-40 bg-[#7b713f5b] flex items-center justify-center text-2xl font-bold text-gray-700">
        {/* Breadcrumb area */}
        Checkout / Summary
      </div>
      <div className="bg-white rounded-lg px-40 my-10">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        {/* Shipping Address Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          {shippingAddress ? (
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm">{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</p>
              <p className="text-sm">{shippingAddress.address}</p>
              <p className="text-sm">{`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipcode}`}</p>
              <p className="text-sm">{shippingAddress.country}</p>
              <p className="text-sm">{shippingAddress.mobile}</p>
              <p className="text-sm">{shippingAddress.email}</p>
            </div>
          ) : (
            <p>No shipping address available.</p>
          )}
        </div>

        {/* Cart Products Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Cart Products</h3>
          {cart && cart.items.length > 0 ? (
            <div className="bg-gray-100 rounded-md p-4">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.imageUrl[0].url}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600">{`Quantity: ${item.quantity}`}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{`$${(
                    item.product.price * item.quantity
                  ).toFixed(2)}`}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>

        {/* Total Section */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <p className="text-sm font-medium">
            Total Items: {cart?.totalItems || 0}
          </p>
          <p className="text-sm font-medium">{`Total Price: $${
            cart?.totalPrice.toFixed(2) || 0
          }`}</p>
          <p className="text-sm font-medium">{`Total Discount: $${
            cart?.totalDiscount.toFixed(2) || 0
          }`}</p>
        </div>

        {/* Continue to Payment Button */}
        <div className="mt-6">
          <Link to={'/checkout/payment'}>
            <button className="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              Continue to Payment
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
