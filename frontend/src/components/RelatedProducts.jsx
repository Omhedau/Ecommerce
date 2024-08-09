import React from 'react';
import { FaExpand, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { ProductItem } from './NewProducts';
const products = [
    {
        id: 1,
        category: 'women',
        img: '../../src/assets/img/product/product-1.jpg', //deleting this imgages so handle accordingly....
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
];

const RelatedProducts = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto"> 
        <h1 className='text-center text-2xl mb-5 uppercase font-semibold'>Related Products</h1>  
        <div className="flex flex-wrap -mx-4">
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
