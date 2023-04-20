import React from 'react';
import HeroBanner from './HeroBanner';
import Trending from './Trending';

const Home = () => {
  return (
    <div className=''>
      <HeroBanner />
      <Trending />
      <div className='h-screen'></div>
    </div>
  );
};

export default Home;
