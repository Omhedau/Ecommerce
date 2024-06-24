import React, { useEffect, useState } from 'react';
import { FaExpand, FaHeart, FaShoppingBag, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

// const products = [
//   {
//     id: 1,
//     category: 'women',
//     img: '../../src/assets/img/product/product-1.jpg',
//     label: 'New',
//     labelColor: 'bg-green-600',
//     name: 'Buttons tweed blazer',
//     price: '$59.0',
//     rating: 5,
//   },
//   {
//     id: 2,
//     category: 'men',
//     img: '../../src/assets/img/product/product-2.jpg',
//     label: '',
//     labelColor: '',
//     name: 'Flowy striped skirt',
//     price: '$49.0',
//     rating: 5,
//   },
//   {
//     id: 3,
//     category: 'accessories',
//     img: '../../src/assets/img/product/product-3.jpg',
//     label: 'Out of stock',
//     labelColor: 'bg-black',
//     name: 'Cotton T-Shirt',
//     price: '$59.0',
//     rating: 5,
//   },
//   {
//     id: 4,
//     category: 'cosmetic',
//     img: '../../src/assets/img/product/product-4.jpg',
//     label: '',
//     labelColor: '',
//     name: 'Slim striped pocket shirt',
//     price: '$59.0',
//     rating: 5,
//   },
//   {
//     id: 5,
//     category: 'kid',
//     img: '../../src/assets/img/product/product-5.jpg',
//     label: '',
//     labelColor: '',
//     name: 'Fit micro corduroy shirt',
//     price: '$59.0',
//     rating: 5,
//   },
//   {
//     id: 6,
//     category: 'sale',
//     img: '../../src/assets/img/product/product-6.jpg',
//     label: 'Sale',
//     labelColor: 'bg-red-600',
//     name: 'Tropical Kimono',
//     price: '$49.0',
//     originalPrice: '$59.0',
//     rating: 5,
//   },
//   {
//     id: 7,
//     category: 'women men kid accessories cosmetic',
//     img: '../../src/assets/img/product/product-7.jpg',
//     label: '',
//     labelColor: '',
//     name: 'Contrasting sunglasses',
//     price: '$59.0',
//     rating: 5,
//   },
//   {
//     id: 8,
//     category: 'sale',
//     img: '../../src/assets/img/product/product-8.jpg',
//     label: 'Sale',
//     labelColor: 'bg-red-600',
//     name: 'Water resistant backpack',
//     price: '$49.0',
//     originalPrice: '$59.0',
//     rating: 5,
//   },
// ];

export const ProductItem = ({ product }) => {
  const renderImage = () => {
    if (product.imageUrl && product.imageUrl.length > 0) {
      const imageData = product.imageUrl[0];
      const base64Image = `data:${imageData.contentType};base64,${btoa(
        new Uint8Array(imageData.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )}`;

      return <img src={base64Image} className="w-full h-72 object-cover" alt={product.title} />;
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
              <a href={product.imageUrl[0].data} className="text-gray-800 hover:text-white"><FaExpand /></a>
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
          <h6 className="text-lg font-semibold mb-2"><a href="#">{product.title}</a></h6>
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
    </Link>
  );
};


const NewProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allProducts, setAllProducts] = useState([]);
  const [clothingProducts, setClothingProducts] = useState([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [cosmeticProducts, setCosmeticProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5454/product');
      const fetchedProducts = response.data;
      setAllProducts(fetchedProducts);
      setClothingProducts(fetchedProducts.filter(product => product.category.name === 'Clothing'));
      setAccessoriesProducts(fetchedProducts.filter(product => product.category.name === 'Accessories'));
      setCosmeticProducts(fetchedProducts.filter(product => product.category.name === 'Cosmetics'));
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("calling me....");
    switch (selectedCategory) {
      case 'All':
        setFilteredProducts(allProducts);
        break;
      case 'Clothing':
        setFilteredProducts(clothingProducts);
        break;
      case 'Accessories':
        setFilteredProducts(accessoriesProducts);
        break;
      case 'Cosmetics':
        setFilteredProducts(cosmeticProducts);
        break;
      default:
        setFilteredProducts([]);
    }
  }, [selectedCategory, allProducts, clothingProducts, accessoriesProducts, cosmeticProducts]);

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
              {['All', 'Clothing', 'Accessories', 'Cosmetics'].map(category => (
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
        {error && <div className="text-red-600 text-center mb-8">{error}</div>}
        <div className="flex flex-wrap -mx-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center w-full" key="no-products">
              No products available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
