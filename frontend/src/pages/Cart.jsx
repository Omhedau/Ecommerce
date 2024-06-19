import React from "react";
import { FaStar, FaTimes, FaSyncAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const CartItem = ({ imgSrc, title, price, quantity, total }) => {
  return (
    <tr className="border-b">
      <td className="flex items-center w-[3/7] py-8">
        <img src={imgSrc} alt="" className=" w-24 h-24 mr-6" />
        <div>
          <h6 className="font-semibold">{title}</h6>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xs" />
            ))}
          </div>
        </div>
      </td>
      <td className="text-red-600 font-semibold w-1/7">{`$${price.toFixed(
        1
      )}`}</td>
      <td className="text-gray-600 font-semibold w-1/7">
        <div className="flex items-center">
          <button className="text-gray-400 px-2 py-1">
            <span className="text-2xl">-</span>
          </button>
          <div className="px-3 text-center mt-1">{quantity}</div>
          <button className="text-gray-400 px-2 py-1">
            <span className="text-xl">+</span>
          </button>
        </div>
      </td>
      <td className="text-red-600 font-semibold w-1/7">{`$${total.toFixed(
        1
      )}`}</td>
      <td className="">
        <MdClose className="text-4xl font-bold cursor-pointer p-3 rounded-full bg-slate-200 text-gray-700" />
      </td>
    </tr>
  );
};

const Cart = () => {
  const cartItems = [
    {
      imgSrc: "../../src/assets/img/shop-cart/cp-1.jpg",
      title: "Chain bucket bag",
      price: 150.0,
      quantity: 1,
      total: 300.0,
    },
    {
      imgSrc: "../../src/assets/img/shop-cart/cp-2.jpg",
      title: "Zip-pockets pebbled tote briefcase",
      price: 170.0,
      quantity: 1,
      total: 170.0,
    },
    {
      imgSrc: "../../src/assets/img/shop-cart/cp-3.jpg",
      title: "Black jean",
      price: 85.0,
      quantity: 1,
      total: 170.0,
    },
    {
      imgSrc: "../../src/assets/img/shop-cart/cp-4.jpg",
      title: "Cotton Shirt",
      price: 55.0,
      quantity: 1,
      total: 110.0,
    },
  ];

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
              {cartItems.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mb-12">
          <a href="#" className="uppercase font-semibold py-3 px-8 bg-gray-100">
            Continue Shopping
          </a>
          <a
            href="#"
            className="uppercase font-semibold py-3 px-8 bg-gray-100 flex items-center"
          >
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
                  <span>Subtotal</span>
                  <span>$750.0</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$750.0</span>
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
