import React, { useState } from "react";
import {
  FaStar,
  FaHeart,
  FaAdjust,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus
} from "react-icons/fa";
import "tailwindcss/tailwind.css";
import ProductDetailsTab from "../components/ProductDetailsTab";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetails = () => {
  const images = [
    "../../src/assets/img/product/details/product-1.jpg",
    "../../src/assets/img/product/details/product-2.jpg",
    "../../src/assets/img/product/details/product-3.jpg",
    "../../src/assets/img/product/details/product-4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  return (
    <div className="flex flex-wrap py-20 px-40 mx-auto ">
      {/* Product Images Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex">
        <div className="flex flex-col space-y-2 mr-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              className={`cursor-pointer border ${
                index === currentImageIndex
                  ? "border-red-600"
                  : "border-gray-300"
              } rounded`}
              onClick={() => handleThumbnailClick(index)}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
        <div className="relative w-full">
          <img
            src={images[currentImageIndex]}
            alt={`Product Image ${currentImageIndex + 1}`}
            className="rounded carousel-image"
            style={{
              width: "100%",
              maxHeight: "550px",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-5 bg-gray-300 rounded-full p-2"
            onClick={handlePrevClick}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-5 bg-gray-300 rounded-full p-2"
            onClick={handleNextClick}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-1/2 lg:pl-10">
        <h3 className="text-2xl font-semibold uppercase mb-2">
          Essential Structured Blazer
        </h3>
        <span className="block text-sm font-normal mb-3">Brand: SKMEI</span>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 text-sm" />
          ))}
          <span className="ml-2 text-sm text-gray-600">(138 reviews)</span>
        </div>
        <div className="text-3xl font-bold text-red-600 mb-10">
          $75.0
          <span className="text-lg text-gray-500 line-through ml-2">$83.0</span>
        </div>
        <p className="text-gray-700 mb-8">
          Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret fugit,
          sed quia consequuntur magni lores eos qui ratione voluptatem sequi
          nesciunt.
        </p>

        <div className="flex items-center mb-6">
          <span className="mr-4">Quantity:</span>
          <div className="flex items-center border border-gray-400 rounded-full p-2 px-2 mr-5">
            <button 
              className="text-gray-400 text-sm rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => handleQuantityChange(-1)}
            >
              <FaMinus />
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button 
              className="text-gray-400 rounded-full text-sm w-8 h-8 flex items-center justify-center"
              onClick={() => handleQuantityChange(1)}
            >
              <FaPlus />
            </button>
          </div>
          <button className="bg-red-600 text-white rounded-full px-8 py-3 flex items-center mr-4">
            <FaShoppingBag className="mr-2" /> Add to cart
          </button>
          <ul className="flex space-x-4">
            <li>
              <button className="border border-gray-300 rounded-full p-3">
                <FaHeart className="text-gray-600" />
              </button>
            </li>
            <li>
              <button className="border border-gray-300 rounded-full p-3">
                <FaAdjust className="text-gray-600" />
              </button>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center mb-6">
          
        </div>

        <div className="border-t border-gray-300 pt-6">
          <ul>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Availability:</span>
              <span className="">In Stock</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Available color:</span>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="color" className="form-radio" />
                  <span className="w-5 h-5 rounded-full bg-red-600 ml-2"></span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="color" className="form-radio" />
                  <span className="w-5 h-5 rounded-full bg-black ml-2"></span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="color" className="form-radio" />
                  <span className="w-5 h-5 rounded-full bg-gray-400 ml-2"></span>
                </label>
              </div>
            </li>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Available size:</span>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="size" className="form-radio" />
                  <span className="ml-2">XS</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="size" className="form-radio" />
                  <span className="ml-2">S</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="size" className="form-radio" />
                  <span className="ml-2">M</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="size" className="form-radio" />
                  <span className="ml-2">L</span>
                </label>
              </div>
            </li>
            <li className="flex items-center">
              <span className="w-1/3 font-semibold">Promotions:</span>
              <p className="text-gray-600">Free shipping</p>
            </li>
          </ul>
        </div>
      </div>
      <ProductDetailsTab/>
      <RelatedProducts/>
    </div>
  );
};

export default ProductDetails;
