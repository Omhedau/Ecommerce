import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaStar,
  FaHeart,
  FaAdjust,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import "tailwindcss/tailwind.css";
import ProductDetailsTab from "../components/ProductDetailsTab";
import RelatedProducts from "../components/RelatedProducts";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const param = useParams();
  const { id } = param;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5454/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  if (!product) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="flex flex-wrap py-20 px-40 mx-auto">
      {/* Product Images Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex">
        <div className="flex flex-col space-y-2 mr-4">
          {product.imageUrl.map((image, index) => (
            <img
              key={index}
              src={`data:${image.contentType};base64,${btoa(
                new Uint8Array(image.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
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
            src={`data:${
              product.imageUrl[currentImageIndex].contentType
            };base64,${btoa(
              new Uint8Array(
                product.imageUrl[currentImageIndex].data.data
              ).reduce((data, byte) => data + String.fromCharCode(byte), "")
            )}`}
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
          {product.title}
        </h3>
        <span className="block text-sm font-normal mb-3">
          Brand: {product.brand}
        </span>
        <div className="flex items-center mb-4">
          {[...Array(product.ratings.length)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 text-sm" />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews.length} reviews)
          </span>
        </div>
        <div className="text-3xl font-bold text-red-600 mb-10">
          ${product.price}
          <span className="text-lg text-gray-500 line-through ml-2">
            ${product.discountedPrice}
          </span>
        </div>
        <p className="text-gray-700 mb-8">{product.description}</p>

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

        <div className="border-t border-gray-300 pt-6">
          <ul>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Availability:</span>
              <span>In Stock</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Available color:</span>
              <div className="flex space-x-4">
                <span
                  className={`w-5 h-5 rounded-full border-black border ${
                    product.color === "white"
                      ? "bg-white"
                      : product.color === "black"
                      ? "bg-black"
                      : `bg-${product.color}-600`
                  }`}
                ></span>
              </div>
            </li>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Available sizes:</span>
              <div className="flex space-x-4">
                {product.sizes.map((size, index) => (
                  <span key={index} className="ml-2">
                    {size.name}
                  </span>
                ))}
              </div>
            </li>
            <li className="flex items-center">
              <span className="w-1/3 font-semibold">Promotions:</span>
              <p className="text-gray-600">Free shipping</p>
            </li>
          </ul>
        </div>
      </div>
      <ProductDetailsTab />
      {/* <RelatedProducts /> */}
    </div>
  );
};

export default ProductDetails;
