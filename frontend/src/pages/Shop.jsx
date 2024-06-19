import React, { useState } from 'react';
import Sidebar from '../components/Siderbar';
import { ProductItem } from '../components/NewProducts'; // Assuming ProductItem is correctly imported
import Pagination from '../components/Pagination';
import Dropdown from '../components/Dropdown';

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
  {
    id: 9,
    category: 'women',
    img: '../../src/assets/img/product/product-1.jpg',
    label: 'New',
    labelColor: 'bg-green-600',
    name: 'Buttons tweed blazer',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 10,
    category: 'men',
    img: '../../src/assets/img/product/product-2.jpg',
    label: '',
    labelColor: '',
    name: 'Flowy striped skirt',
    price: '$49.0',
    rating: 5,
  },
  {
    id: 11,
    category: 'accessories',
    img: '../../src/assets/img/product/product-3.jpg',
    label: 'Out of stock',
    labelColor: 'bg-black',
    name: 'Cotton T-Shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 12,
    category: 'cosmetic',
    img: '../../src/assets/img/product/product-4.jpg',
    label: '',
    labelColor: '',
    name: 'Slim striped pocket shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 13,
    category: 'kid',
    img: '../../src/assets/img/product/product-5.jpg',
    label: '',
    labelColor: '',
    name: 'Fit micro corduroy shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 14,
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
    id: 15,
    category: 'women men kid accessories cosmetic',
    img: '../../src/assets/img/product/product-7.jpg',
    label: '',
    labelColor: '',
    name: 'Contrasting sunglasses',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 16,
    category: 'sale',
    img: '../../src/assets/img/product/product-8.jpg',
    label: 'Sale',
    labelColor: 'bg-red-600',
    name: 'Water resistant backpack',
    price: '$49.0',
    originalPrice: '$59.0',
    rating: 5,
  },
  {
    id: 17,
    category: 'women',
    img: '../../src/assets/img/product/product-1.jpg',
    label: 'New',
    labelColor: 'bg-green-600',
    name: 'Buttons tweed blazer',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 18,
    category: 'men',
    img: '../../src/assets/img/product/product-2.jpg',
    label: '',
    labelColor: '',
    name: 'Flowy striped skirt',
    price: '$49.0',
    rating: 5,
  },
  {
    id: 19,
    category: 'accessories',
    img: '../../src/assets/img/product/product-3.jpg',
    label: 'Out of stock',
    labelColor: 'bg-black',
    name: 'Cotton T-Shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 20,
    category: 'cosmetic',
    img: '../../src/assets/img/product/product-4.jpg',
    label: '',
    labelColor: '',
    name: 'Slim striped pocket shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 21,
    category: 'kid',
    img: '../../src/assets/img/product/product-5.jpg',
    label: '',
    labelColor: '',
    name: 'Fit micro corduroy shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 22,
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
    id: 23,
    category: 'women men kid accessories cosmetic',
    img: '../../src/assets/img/product/product-7.jpg',
    label: '',
    labelColor: '',
    name: 'Contrasting sunglasses',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 24,
    category: 'sale',
    img: '../../src/assets/img/product/product-8.jpg',
    label: 'Sale',
    labelColor: 'bg-red-600',
    name: 'Water resistant backpack',
    price: '$49.0',
    originalPrice: '$59.0',
    rating: 5,
  },
  {
    id: 25,
    category: 'women',
    img: '../../src/assets/img/product/product-1.jpg',
    label: 'New',
    labelColor: 'bg-green-600',
    name: 'Buttons tweed blazer',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 26,
    category: 'men',
    img: '../../src/assets/img/product/product-2.jpg',
    label: '',
    labelColor: '',
    name: 'Flowy striped skirt',
    price: '$49.0',
    rating: 5,
  },
  {
    id: 27,
    category: 'accessories',
    img: '../../src/assets/img/product/product-3.jpg',
    label: 'Out of stock',
    labelColor: 'bg-black',
    name: 'Cotton T-Shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 28,
    category: 'cosmetic',
    img: '../../src/assets/img/product/product-4.jpg',
    label: '',
    labelColor: '',
    name: 'Slim striped pocket shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 29,
    category: 'kid',
    img: '../../src/assets/img/product/product-5.jpg',
    label: '',
    labelColor: '',
    name: 'Fit micro corduroy shirt',
    price: '$59.0',
    rating: 5,
  },
  {
    id: 30,
    category: 'sale',
    img: '../../src/assets/img/product/product-6.jpg',
    label: 'Sale',
    labelColor: 'bg-red-600',
    name: 'Tropical Kimono',
    price: '$49.0',
    originalPrice: '$59.0',
    rating: 5,
  },

];
const ITEMS_PER_PAGE = 9;

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('Low To High');

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    // Apply your sorting logic here based on the option
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <>
    <div className='h-40 bg-[#7b713f5b]'>
       {/* bredcum area */}
    </div>
      <div className="flex flex-wrap px-40">
        <Sidebar />
        <div className="relative w-full lg:w-3/4 md:w-2/3 p-4 h-[1500px] ">
          <div className="flex justify-between ml-5 items-center">
            <div className="text-sm font-medium text-gray-700">
              Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length} results
            </div>
            <Dropdown 
              label="Sort by " 
              options={['Low To High', 'Newest', 'High Rated']} 
              onSelect={handleSortChange} 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;