// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t px-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center space-y-6 md:space-y-0">
        <div className="w-full md:w-2/6  pr-10">
          <h2 className="font-bold text-2xl">Trendy</h2>
          <p className="text-gray-500 mt-4">
          Step into Style, Embrace the Trend. <br /> Discover Fashion at Trendy. </p>
          <div className="flex mt-4 space-x-2">
            <img src="../../src/assets/img/payment/payment-1.png" alt="MasterCard" className="h-8" />
            <img src="../../src/assets/img/payment/payment-2.png" alt="Visa" className="h-8" />
            <img src="../../src/assets/img/payment/payment-3.png" alt="Discover" className="h-8" />
            <img src="../../src/assets/img/payment/payment-4.png" alt="PayPal" className="h-8" />
            <img src="../../src/assets/img/payment/payment-5.png" alt="Cirrus" className="h-8" />
          </div>
        </div>
        <div className="w-full md:w-1/6 pr-10">
          <h2 className="font-bold text-xl">QUICK LINKS</h2>
          <ul className="mt-4 text-gray-500 space-y-2">
            <li><a href="#">About</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/6  pr-10">
          <h2 className="font-bold text-xl">ACCOUNT</h2>
          <ul className="mt-4 text-gray-500 space-y-2">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Orders Tracking</a></li>
            <li><a href="#">Checkout</a></li>
            <li><a href="#">Wishlist</a></li>
          </ul>
        </div>
        <div className="w-full md:w-2/6 ">
          <h2 className="font-bold text-xl">NEWSLETTER</h2>
          <form className="mt-4 flex flex-col space-y-2">
            <input type="email" placeholder="Email" className="px-4 py-2 w-full rounded-full border border-gray-300" />
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-full">SUBSCRIBE</button>
          </form>
          <div className="flex mt-4 space-x-4 text-gray-500">
            <a href="#" className="text-xl"><FaFacebookF /></a>
            <a href="#" className="text-xl"><FaTwitter /></a>
            <a href="#" className="text-xl"><FaYoutube /></a>
            <a href="#" className="text-xl"><FaInstagram /></a>
            <a href="#" className="text-xl"><FaPinterestP /></a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500">
        <p>Copyright © 2024 All rights reserved | This website is made with <span className="text-red-500">♥</span> by Om Hedau</p>
      </div>
    </footer>
  );
}

export default Footer;
