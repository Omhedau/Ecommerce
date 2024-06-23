import React, { useState } from 'react';
import Hero from '../components/Hero';
import NewProducts from '../components/NewProducts';
import Services from '../components/Services';

const Home = () => {
  const [color, setColor] = useState("black");

  return (
    <div>
      <Hero />
      <div className={` text-${color}-300 h-20 cursor-pointer`}>
        <h1 onClick={() => setColor("blue")}>Color Change</h1>
      </div>
      <NewProducts />
      <Services />
    </div>
  );
};

export default Home;
