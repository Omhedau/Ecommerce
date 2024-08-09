import React, { useEffect, useState } from 'react';
import { FaExpand, FaHeart, FaShoppingBag, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProducts } from '../redux/actions/product';
import Loader from './Loader';

export const ProductItem = ({ product }) => {
  const renderImage = () => {
    if (product.imageUrl && product.imageUrl.length > 0) {
      const imageData = product.imageUrl[0];
      return <img src={imageData.url} className="w-full h-72 object-cover" alt={product.title} />;
    } else {
      return <div className="w-full h-72 bg-gray-200"></div>;
    }
  };

  return (
    <Link key={product._id} to={`/product/id/${product._id}`}>
      <div className="w-[300px] p-4">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-72">
            {renderImage()}
            {product.label && (
              <div className={`absolute top-2 left-2 text-xs font-semibold text-white px-2 py-1 rounded ${product.labelColor}`}>
                {product.label}
              </div>
            )}
            <ul className="absolute bottom-4 w-full flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
              <li className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-red-600 transition duration-300">
                <a href={product.imageUrl[0].url} className="text-gray-800 hover:text-white"><FaExpand /></a>
              </li>
              <li className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-red-600 transition duration-300">
                <a href="#" className="text-gray-800 hover:text-white"><FaHeart /></a>
              </li>
              <li className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-red-600 transition duration-300">
                <a href="#" className="text-gray-800 hover:text-white"><FaShoppingBag /></a>
              </li>
            </ul>
          </div>
          <div className="p-4 text-center">
            <h6 className="text-lg font-semibold mb-2">{product.title.length > 20 ? product.title.substring(0,20) + "...":product.title}</h6>
            {product.rating && (
              <div className="flex justify-center mb-2">
                {[...Array(product.rating)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500 text-xs" />
                ))}
              </div>
            )}
            <div className="text-xl font-semibold text-gray-800">
            ₹{product.price}
              {product.originalPrice && <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const NewProducts = () => {
  const dispatch = useDispatch();
  const { newProducts, loading, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  useEffect(() => {
    if (newProducts) {
      setFilteredProducts(newProducts[selectedCategory] || []);
    }
  }, [selectedCategory, newProducts]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="py-16 px-40">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full md:w-1/3">
            <h4 className="text-2xl font-semibold">New Products</h4>
            <div className="h-1 bg-red-600 hover:w-full duration-500 w-16 mt-1"></div>
          </div>
          <div className="w-full md:w-2/3">
            <ul className="flex flex-wrap justify-end space-x-8">
              {['All', 'Mens', 'Womens', 'Kids'].map(category => (
                <li
                  key={category}
                  className={`cursor-pointer text-gray-800 hover:text-red-600 ${selectedCategory === category ? 'text-red-600' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {loading ? (
          <Loader/>
        ) : error ? (
          <div className="text-red-600 text-center mb-8">{"failed to load products"}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-4 -mx-4">
            {filteredProducts.map(product => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center w-full">No products available</div>
        )}
      </div>
    </section>
  );
};

export default NewProducts;
