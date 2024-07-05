import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/order';
import Loader from '../components/Loader';

const Profile = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    console.log("getting orders...");
    dispatch(getUserOrders());
  }, [dispatch]);

  // Handle different loading and error states
  if (loading || !orders) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // When orders are loaded and not empty
  return (
    <div className="container mx-auto px-40 py-10">
    <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
    {orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-[#9d717161] rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
            <p>Total Discount: ${order.totalDiscount.toFixed(2)}</p>
            <p>Order Status: {order.orderStatus}</p>
            <ul className="mt-2">
              {order.orderItems.map((item) => (
                <li key={item._id}>
                  {item.quantity} x {item.product.title} (${item.price.toFixed(2)} each)
                </li>
              ))}
            </ul>
            <p>
              Shipping Address: {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.state}, {order.shippingAddress.zipcode}
            </p>
            <p>Payment Method: {order.paymentDetails.paymentMethod}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default Profile;
