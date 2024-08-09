import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Login from './Login';
import { getUserDetails, logout } from '../redux/actions/user';
import { getUserCart } from '../redux/actions/cart'; 

const categoryData = [
  {
    gender: 'Men',
    categories: [
      { name: 'Topwear', subCategories: ['Coats', 'Jackets', 'Shirt', 'T-shirts', 'Sweaters'] },
      { name: 'Bottumwear', subCategories: ['Pants', 'Shorts', 'Jeans', 'Trousers', 'Sweatpants'] },
      { name: 'Footwear', subCategories: ['Sneakers', 'Boots', 'Loafers', 'Sandals', 'Flip-Flops'] },
      { name: 'Sleepwear', subCategories: ['Pajamas', 'Nightshirts', 'Robes', 'Sleep Shorts', 'Sweatpants'] },
      { name: 'Innerwear', subCategories: ['Underwear', 'Socks', 'Thermals', 'Tank Tops', 'Vests'] },
    ],
  },
  {
    gender: 'Women',
    categories: [
      { name: 'Topwear', subCategories: ['Blouses', 'Jackets', 'Shirt', 'T-shirts', 'Sweaters'] },
      { name: 'Bottumwear', subCategories: ['Skirts', 'Shorts', 'Jeans', 'Leggings', 'Trousers'] },
      { name: 'Footwear', subCategories: ['Heels', 'Boots', 'Flats', 'Sandals', 'Sneakers'] },
      { name: 'Sleepwear', subCategories: ['Nightgowns', 'Robes', 'Pajamas', 'Sleep Shirts', 'Loungewear'] },
      { name: 'Innerwear', subCategories: ['Bras', 'Panties', 'Shapewear', 'Socks', 'Thermals'] },
    ],
  },
  {
    gender: 'Boy',
    categories: [
      { name: 'Topwear', subCategories: ['T-shirts', 'Shirt', 'Sweatshirts', 'Jackets', 'Hoodies'] },
      { name: 'Bottumwear', subCategories: ['Shorts', 'Jeans', 'Pants', 'Joggers', 'Sweatpants'] },
      { name: 'Footwear', subCategories: ['Sneakers', 'Sandals', 'Boots', 'Loafers', 'Flip-Flops'] },
      { name: 'Sleepwear', subCategories: ['Pajamas', 'Nightshirts', 'Robes', 'Sleep Shorts', 'Sweatpants'] },
      { name: 'Innerwear', subCategories: ['Underwear', 'Socks', 'Thermals', 'Tank Tops', 'Vests'] },
    ],
  },
  {
    gender: 'Girl',
    categories: [
      { name: 'Topwear', subCategories: ['T-shirts', 'Blouses', 'Sweaters', 'Jackets', 'Hoodies'] },
      { name: 'Bottumwear', subCategories: ['Skirts', 'Shorts', 'Jeans', 'Leggings', 'Pants'] },
      { name: 'Footwear', subCategories: ['Flats', 'Sandals', 'Boots', 'Sneakers', 'Flip-Flops'] },
      { name: 'Sleepwear', subCategories: ['Nightgowns', 'Robes', 'Pajamas', 'Sleep Shirts', 'Loungewear'] },
      { name: 'Innerwear', subCategories: ['Underwear', 'Socks', 'Bras', 'Shapewear', 'Thermals'] },
    ],
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const jwt = localStorage.getItem("jwt");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  
  const handleMouseEnter = (gender) => {
    setActiveMenu(gender);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const renderUserAvatar = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt="User Avatar" className="h-8 w-8 rounded-full cursor-pointer" />;
    } else {
      const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;
      return (
        <div
          className="h-8 w-8 rounded-full bg-[#133761c2] text-white flex items-center justify-center cursor-pointer"
        >
          {initials}
        </div>
      );
    }
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUserDetails(jwt));
      dispatch(getUserCart());
    }
  }, [jwt, dispatch]);

 const totalCartItems = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <nav className="bg-white shadow-lg relative">
      <div className="container mx-auto px-20 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src="../../src/assets/Logo2.jpg" alt="Logo" className="h-12 mr-32 mt-2" />
          <Link to={'/'} className='py-2 px-4 font-semibold'>
            Home
          </Link>
          {categoryData.map((category) => (
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
                            <Link to={`/shop/${category.gender}/${cat.name}/${subCat}`} key={subCat}>
                              <li className="text-sm text-gray-600 hover:text-red-600 mt-1">
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
          {user ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsAvatarHovered(true)}
              onMouseLeave={() => setIsAvatarHovered(false)}
            >
              {renderUserAvatar()}
              {isAvatarHovered && (
                <div className="absolute right-0 mt-3 w-48 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white border border-gray-200 rounded-md shadow-lg py-1 z-20 opacity-100 transition-opacity duration-300">
                  <div className="absolute right-2 top-[-8px] w-6 h-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 transform rotate-45"></div>
                  <div className='absolute right-0 top-[-12px] w-full h-6'></div>
                  <Link to={'/profile'} className="block px-4 py-2 hover:bg-red-500">Your Profile</Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-red-500"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={openModal} className="py-2 px-4 text-gray-700 font-semibold hover:bg-red-500 hover:text-white transition duration-300 rounded-md">Login</button>
          )}
          <Link to={'/cart'} className="relative">
            <button className="py-2 px-4 text-gray-700 hover:bg-red-500 hover:text-white transition duration-300 rounded-md">
              <FaShoppingCart size={20} />
            </button>
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
      <Login isOpen={modalIsOpen} closeModal={closeModal} />
    </nav>
  );
};

export default Navbar;
