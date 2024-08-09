import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t px-10 md:px-40">
      <div className="container mx-auto flex flex-wrap justify-between items-start space-y-6 md:space-y-0">
        <div className="w-full md:w-2/6 pr-10">
          <h2 className="font-bold text-2xl">Trendy</h2>
          <p className="text-gray-500 mt-4">
            Discover the latest in fashion with Trendy. <br /> Explore our collection and follow us on social media for updates.
          </p>
          <div className="flex mt-4 space-x-2">
            <img src="https://res.cloudinary.com/dsme0ihpk/image/upload/v1723222534/payment-1_u0lvft.png" alt="MasterCard" className="h-8" />
            <img src="https://res.cloudinary.com/dsme0ihpk/image/upload/v1723222534/payment-2_fxm947.png" alt="Visa" className="h-8" />
            <img src="https://res.cloudinary.com/dsme0ihpk/image/upload/v1723222534/payment-3_uzsvif.png" alt="Discover" className="h-8" />
            <img src="https://res.cloudinary.com/dsme0ihpk/image/upload/v1723222534/payment-4_jdgoaj.png" alt="PayPal" className="h-8" />
            <img src="https://res.cloudinary.com/dsme0ihpk/image/upload/v1723222534/payment-5_l5naky.png" alt="Cirrus" className="h-8" />
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
        <div className="w-full md:w-1/6 pr-10">
          <h2 className="font-bold text-xl">ACCOUNT</h2>
          <ul className="mt-4 text-gray-500 space-y-2">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Orders Tracking</a></li>
            <li><a href="#">Checkout</a></li>
            <li><a href="#">Wishlist</a></li>
          </ul>
        </div>
        <div className="w-full md:w-2/6">
          <h2 className="font-bold text-xl">FOLLOW US</h2>
          <p className="text-gray-500 mt-4">
            Stay connected for the latest trends and updates.
          </p>
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
