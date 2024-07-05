import React, { useState, useEffect } from "react";
import { FaStar, FaShoppingBag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import ProductDetailsTab from "../components/ProductDetailsTab";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from "../redux/actions/product";
import { addItemToCart } from "../redux/actions/cart"; // Import the add to cart action
import Loader from "../components/Loader";

const ProductDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, product } = useSelector(state => state.products); 
 // const cart = useSelector(state => state.cart.cart); // Assuming you have cart state in Redux

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(getProductById(id));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      const firstAvailableSize = product.sizes.find(size => size.quantity > 0);
      setSelectedSize(firstAvailableSize);
      setAvailableQuantity(firstAvailableSize ? firstAvailableSize.quantity : 0);
    }
  }, [product]);

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

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setAvailableQuantity(size.quantity);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Handle case where no size is selected
      return;
    }
    dispatch(addItemToCart(product._id, selectedSize.name,1)); // Dispatch action to add item to cart
  };

  if (loading || !product) {
    return <Loader/>; // Placeholder for loading state
  }

  const availableSizes = product.sizes.filter(size => size.quantity > 0);
  const isOutOfStock = availableSizes.length === 0;

  return (
    <div className="flex flex-wrap py-20 px-40 mx-auto">
      {/* Product Images Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex">
        <div className="flex flex-col space-y-2 mr-4">
          {product.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Product Thumbnail ${index + 1}`}
              className={`cursor-pointer border ${index === currentImageIndex ? "border-red-600" : "border-gray-300"} rounded`}
              onClick={() => handleThumbnailClick(index)}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
        <div className="relative w-full">
          <img
            src={product.imageUrl[currentImageIndex].url}
            alt={`Product Image ${currentImageIndex + 1}`}
            className="rounded carousel-image"
            style={{ width: "100%", maxHeight: "550px", objectFit: "cover", objectPosition: "top" }}
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
          {[...Array(product.ratings)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 text-sm" />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews.length} reviews)
          </span>
        </div>
        <div className="text-3xl font-bold text-red-600 mb-10">
          ${product.discountedPrice}
          {product.price && (
            <span className="text-lg text-gray-500 line-through ml-2">
              ${product.price}
            </span>
          )}
        </div>
        <p className="text-gray-700 mb-8">{product.description}</p>

        {!isOutOfStock && (
          <div className="mb-6 flex items-center">
            <span className="mr-3">Select Size:</span>
            <div className="flex items-center">
              {availableSizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-full mr-2 ${selectedSize === size ? "bg-red-600 text-white" : "bg-white"}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center mb-6">
          <button 
            className={`bg-red-600 text-white rounded-full px-8 py-3 flex items-center ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`} 
            onClick={handleAddToCart} // Handle add to cart button click
            disabled={isOutOfStock}
          >
            <FaShoppingBag className="mr-2" /> Add to cart
          </button>
        </div>

        {isOutOfStock && <div className="text-red-600 font-bold">Out of Stock</div>}

        <div className="border-t border-gray-300 pt-6">
          <ul>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Availability:</span>
              <span>{isOutOfStock ? "Out of Stock" : "In Stock"}</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="w-1/3 font-semibold">Available color:</span>
              <div className="flex space-x-4">
                <span
                  className={`w-5 h-5 rounded-full border-black border`}
                  style={{ backgroundColor: product.color }}
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
    </div>
  );
};

export default ProductDetails;
