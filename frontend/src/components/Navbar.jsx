
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Login from './Login';

const categoryData = [
  {
    gender: 'Men',
    categories: [
      { 
        name: 'Topwear', 
        subCategories: ['Coats', 'Jackets', 'Shirt', 'T-shirts', 'Sweaters'] 
      },
      { 
        name: 'Bottumwear', 
        subCategories: ['Pants', 'Shorts', 'Jeans', 'Trousers', 'Sweatpants'] 
      },
      { 
        name: 'Footwear', 
        subCategories: ['Sneakers', 'Boots', 'Loafers', 'Sandals', 'Flip-Flops'] 
      },
      { 
        name: 'Sleepwear', 
        subCategories: ['Pajamas', 'Nightshirts', 'Robes', 'Sleep Shorts', 'Sweatpants'] 
      },
      { 
        name: 'Innerwear', 
        subCategories: ['Underwear', 'Socks', 'Thermals', 'Tank Tops', 'Vests'] 
      },
    ],
  },
  {
    gender: 'Women',
    categories: [
      { 
        name: 'Topwear', 
        subCategories: ['Blouses', 'Jackets', 'Shirt', 'T-shirts', 'Sweaters'] 
      },
      { 
        name: 'Bottumwear', 
        subCategories: ['Skirts', 'Shorts', 'Jeans', 'Leggings', 'Trousers'] 
      },
      { 
        name: 'Footwear', 
        subCategories: ['Heels', 'Boots', 'Flats', 'Sandals', 'Sneakers'] 
      },
      { 
        name: 'Sleepwear', 
        subCategories: ['Nightgowns', 'Robes', 'Pajamas', 'Sleep Shirts', 'Loungewear'] 
      },
      { 
        name: 'Innerwear', 
        subCategories: ['Bras', 'Panties', 'Shapewear', 'Socks', 'Thermals'] 
      },
    ],
  },
  {
    gender: 'Boy',
    categories: [
      { 
        name: 'Topwear', 
        subCategories: ['T-shirts', 'Shirt', 'Sweatshirts', 'Jackets', 'Hoodies'] 
      },
      { 
        name: 'Bottumwear', 
        subCategories: ['Shorts', 'Jeans', 'Pants', 'Joggers', 'Sweatpants'] 
      },
      { 
        name: 'Footwear', 
        subCategories: ['Sneakers', 'Sandals', 'Boots', 'Loafers', 'Flip-Flops'] 
      },
      { 
        name: 'Sleepwear', 
        subCategories: ['Pajamas', 'Nightshirts', 'Robes', 'Sleep Shorts', 'Sweatpants'] 
      },
      { 
        name: 'Innerwear', 
        subCategories: ['Underwear', 'Socks', 'Thermals', 'Tank Tops', 'Vests'] 
      },
    ],
  },
  {
    gender: 'Girl',
    categories: [
      { 
        name: 'Topwear', 
        subCategories: ['T-shirts', 'Blouses', 'Sweaters', 'Jackets', 'Hoodies'] 
      },
      { 
        name: 'Bottumwear', 
        subCategories: ['Skirts', 'Shorts', 'Jeans', 'Leggings', 'Pants'] 
      },
      { 
        name: 'Footwear', 
        subCategories: ['Flats', 'Sandals', 'Boots', 'Sneakers', 'Flip-Flops'] 
      },
      { 
        name: 'Sleepwear', 
        subCategories: ['Nightgowns', 'Robes', 'Pajamas', 'Sleep Shirts', 'Loungewear'] 
      },
      { 
        name: 'Innerwear', 
        subCategories: ['Underwear', 'Socks', 'Bras', 'Shapewear', 'Thermals'] 
      },
    ],
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [trianglePosition, setTrianglePosition] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  const handleMouseEnter = (gender) => {
    setActiveMenu(gender);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="bg-white shadow-lg relative">
      <div className="container mx-auto px-20 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src="../../src/assets/Logo.png" alt="Logo" className="h-12 mr-32" />
          {categoryData.map((category, index) => (
            <div
              key={category.gender}
              className="relative group"
              onMouseEnter={() => { handleMouseEnter(category.gender); }}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`py-2 px-4 font-semibold ${activeMenu === category.gender ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-700'} transition duration-300`}>
                {category.gender}
              </button>
              {activeMenu === category.gender && (
                <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md z-10 w-[300px] p-4 transition-all duration-300">
                 <div className='h-5 absolute w-full left-0 -top-2'></div>
                  <div className="absolute transform -top-2 left-6 w-4 h-4 bg-white rotate-45" ></div>
                  <div className="grid grid-cols-2 gap-4">
                    {category.categories.map((cat) => (
                      <div key={cat.name}>
                        <h3 className="font-semibold text-gray-800 mb-2">{cat.name}</h3>
                        <ul>
                          {cat.subCategories.map((subCat) => (
                            <Link to={`/shop/${category.gender}/${cat.name}/${subCat}`}>
                            <li key={subCat} className="text-sm text-gray-600 hover:text-gray-800 mt-1">
                              {subCat}
                            </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button  onClick={openModal} className="py-2 px-4 text-gray-700 font-semibold hover:bg-red-500 hover:text-white transition duration-300 rounded-md">Login</button>
          <button className="py-2 px-4 text-gray-700 hover:bg-red-500 hover:text-white transition duration-300 rounded-md">
            <FaShoppingCart size={20} />
          </button>
        </div>
      </div>
      <Login isOpen={modalIsOpen} closeModal={closeModal} />
    </nav>
  );
};

export default Navbar;
