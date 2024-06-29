import React, { useState } from 'react';
import Hero from '../components/Hero';
import NewProducts from '../components/NewProducts';
import Services from '../components/Services';

const Home = () => {

  return (
    <div>
      <Hero />
      {/* <NewProducts /> */}
      <Services />
    </div>
  );
};

export default Home;
