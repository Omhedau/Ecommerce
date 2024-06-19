import React from 'react';
import { FaExpand, FaHeart, FaShoppingBag, FaStar } from 'react-icons/fa';

const products = [
  {
    id: 1,
    category: 'women',
    img: '../../src/assets/img/product/product-1.jpg',
    label: 'New',
    labelColor: 'bg-green-600',
    name: 'Buttons tweed blazer',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 2,
    category: 'men',
    img: '../../src/assets/img/product/product-2.jpg',
    label: '',
    labelColor: '',
    name: 'Flowy striped skirt',
    price: '$49.0',
    rating: 5,
  },
  {
    id: 3,
    category: 'accessories',
    img: '../../src/assets/img/product/product-3.jpg',
    label: 'Out of stock',
    labelColor: 'bg-black',
    name: 'Cotton T-Shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 4,
    category: 'cosmetic',
    img: '../../src/assets/img/product/product-4.jpg',
    label: '',
    labelColor: '',
    name: 'Slim striped pocket shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 5,
    category: 'kid',
    img: '../../src/assets/img/product/product-5.jpg',
    label: '',
    labelColor: '',
    name: 'Fit micro corduroy shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 6,
    category: 'sale',
    img: '../../src/assets/img/product/product-6.jpg',
    label: 'Sale',
    labelColor: 'bg-red-600',
    name: 'Tropical Kimono',
    price: '$49.0',
    originalPrice: '$59.0',
    rating: 5,
  },
  {
    id: 7,
    category: 'women men kid accessories cosmetic',
    img: '../../src/assets/img/product/product-7.jpg',
    label: '',
    labelColor: '',
    name: 'Contrasting sunglasses',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 8,
    category: 'sale',
    img: '../../src/assets/img/product/product-8.jpg',
    label: 'Sale',
    labelColor: 'bg-red-600',
    name: 'Water resistant backpack',
    price: '$49.0',
    originalPrice: '$59.0',
    rating: 5,
  },
];

export const ProductItem = ({ product }) => {
  return (
    <div className="w-[300px] p-4">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-72 bg-cover bg-center" style={{ backgroundImage: `url(${product.img})` }}>
          {product.label && (
            <div className={`absolute top-2 left-2 text-xs font-semibold text-white px-2 py-1 rounded ${product.labelColor}`}>
              {product.label}
            </div>
          )}
          <ul className="absolute bottom-4 w-full flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
            <li className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-red-600 transition duration-300">
              <a href={product.img} className="text-gray-800 hover:text-white"><FaExpand /></a>
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
          <h6 className="text-lg font-semibold mb-2"><a href="#">{product.name}</a></h6>
          <div className="flex justify-center mb-2">
            {[...Array(product.rating)].map((_, index) => (
              <FaStar key={index} className="text-yellow-500 text-xs" />
            ))}
          </div>
          <div className="text-xl font-semibold text-gray-800">
            {product.price}
            {product.originalPrice && <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewProducts = () => {
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
              <li className="cursor-pointer text-gray-800 hover:text-red-600">All</li>
              <li className="cursor-pointer text-gray-800 hover:text-red-600">Women’s</li>
              <li className="cursor-pointer text-gray-800 hover:text-red-600">Men’s</li>
              <li className="cursor-pointer text-gray-800 hover:text-red-600">Kid’s</li>
              <li className="cursor-pointer text-gray-800 hover:text-red-600">Accessories</li>
              <li className="cursor-pointer text-gray-800 hover:text-red-600">Cosmetics</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between -mx-4">
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
