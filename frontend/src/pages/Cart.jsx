import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar, FaSyncAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { getUserCart, updateCartItem, deleteCartItem } from "../redux/actions/cart";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (quantity) => {
    if (quantity < 1) return; // Prevent reducing quantity below 1
    dispatch(updateCartItem(item._id, quantity));
  };

  const handleRemoveItemClick = () => {
    dispatch(deleteCartItem(item._id));
  };

  return (
    <tr className="border-b">
      <td className="flex items-center w-[3/7] py-8">
        <img src={item.product.imageUrl[0].url} alt="" className="w-24 h-24 mr-6" />
        <div>
          <h6 className="font-semibold">{item.product.title}</h6>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xs" />
            ))}
          </div>
        </div>
      </td>
      <td className="text-red-600 font-semibold w-1/7">{`$${item.product.discountedPrice.toFixed(1)}`}</td>
      <td className="text-gray-600 font-semibold w-1/7">
        <div className="flex items-center">
          <button className="text-gray-400 px-2 py-1" onClick={() => handleQuantityChange(item.quantity - 1)}>
            <span className="text-2xl">-</span>
          </button>
          <div className="px-3 text-center mt-1">{item.quantity}</div>
          <button className="text-gray-400 px-2 py-1" onClick={() => handleQuantityChange(item.quantity + 1)}>
            <span className="text-xl">+</span>
          </button>
        </div>
      </td>
      <td className="text-red-600 font-semibold w-1/7">{`$${(item.quantity * item.product.discountedPrice).toFixed(1)}`}</td>
      <td className="">
        <MdClose className="text-4xl font-bold cursor-pointer p-3 rounded-full bg-slate-200 text-gray-700" onClick={handleRemoveItemClick} />
      </td>
    </tr>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  if (loading || !cart) {
    return <div>Loading...</div>;
  }

  const totalItems = cart.totalItems;
  const totalDiscount = cart.totalDiscount.toFixed(1);
  const totalPrice = cart.totalPrice.toFixed(1);

  return (
    <section className="py-16 px-40">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto mb-8">
          <table className="w-full">
            <thead className="border-b text-lg uppercase font-medium">
              <tr>
                <th className="text-left font-semibold py-4 w-1/2">Product</th>
                <th className="text-left font-semibold py-4 w-1/6">Price</th>
                <th className="text-left font-semibold py-4 w-1/6">Quantity</th>
                <th className="text-left font-semibold py-4 w-1/6">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mb-12">
          <a href="#" className="uppercase font-semibold py-3 px-8 bg-gray-100">
            Continue Shopping
          </a>
          <a href="#" className="uppercase font-semibold py-3 px-8 bg-gray-100 flex items-center">
            <FaSyncAlt className="mr-2" /> Update cart
          </a>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-6">
            <div className="border p-6">
              <h6 className="font-semibold uppercase mb-4">Discount codes</h6>
              <form className="flex">
                <input
                  type="text"
                  placeholder="Enter your coupon code"
                  className="flex-grow border rounded-l-full py-3 px-4"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white rounded-r-full py-3 px-6"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-6">
            <div className="bg-gray-100 p-6">
              <h6 className="font-semibold uppercase mb-4">Cart total</h6>
              <ul className="mb-6">
                <li className="flex justify-between mb-4 font-semibold">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </li>
                <li className="flex justify-between mb-4 font-semibold">
                  <span>Total Discount</span>
                  <span>${totalDiscount}</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span>Total Price</span>
                  <span>${totalPrice}</span>
                </li>
              </ul>
              <a
                href="#"
                className="block bg-red-500 text-white text-center py-3 rounded-full"
              >
                Proceed to checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
