import React, { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Login from "./Login";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <nav className="bg-white px-10 py-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">
          <a href="/" className="text-black">
            Ashion
          </a>
        </div>
        <ul className="flex space-x-8">
          <li>
            <a href="/" className="text-black hover:text-red-600">
              Home
            </a>
            <div className="h-1 bg-red-600 w-full mt-1"></div>
          </li>
          <li>
            <a href="/shop/Women" className="text-black hover:text-red-600">
              Women's
            </a>
          </li>
          <li>
            <a href="/shop/Men" className="text-black hover:text-red-600">
              Men's
            </a>
          </li>
          <li>
            <a href="/shop" className="text-black hover:text-red-600">
              Shop
            </a>
          </li>
          <li>
            <a href="/pages" className="text-black hover:text-red-600">
              Pages
            </a>
          </li>
          <li>
            <a href="/blog" className="text-black hover:text-red-600">
              Blog
            </a>
          </li>
          <li>
            <a href="/contact" className="text-black hover:text-red-600">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          <button onClick={openModal} className="text-gray-600 mr-32 hover:text-black">
            Login / Register
          </button>
          <button className="relative">
            <HiOutlineHeart className="text-blue-500 h-6 w-6"/>
          </button>
          <button className="relative">
            <HiOutlineShoppingBag className="text-blue-500 h-6 w-6"/>
          </button>
        </div>
      </div>
      <Login isOpen={modalIsOpen} closeModal={closeModal} />
    </nav>
  );
};

export default Navbar;
