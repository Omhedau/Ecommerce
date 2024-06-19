import React from "react";
import { FaInstagram } from 'react-icons/fa';

const Instagram = () => {
  const images = [
    "../../src/assets/img/instagram/insta-1.jpg",
    "../../src/assets/img/instagram/insta-2.jpg",
    "../../src/assets/img/instagram/insta-3.jpg",
    "../../src/assets/img/instagram/insta-4.jpg",
    "../../src/assets/img/instagram/insta-5.jpg",
    "../../src/assets/img/instagram/insta-6.jpg",
  ];

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-0 relative group"
          >
            <div
              className="flex items-center justify-center h-80 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <FaInstagram className="text-3xl text-black mx-auto" />
                <a
                  href="#"
                  className="text-base text-black font-medium mt-2 block"
                >
                  @ashion_shop
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instagram;
