import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useFetch from '../../hooks/useFetch';
import Img from '../../components/Img';
import ContentWrapper from '../../components/ContentWrapper';

const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const url = useSelector((state) => state.home.url);
  const { data, loading } = useFetch('/movie/upcoming');

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div
      className='
        w-full h-[450px] bg-black flex items-center relative
        md:h-[700px]'
    >
      {!loading && (
        <div className='w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden'>
          <Img
            src={`${background}`}
            className={'w-full h-full object-cover object-center'}
            alt=''
          />
        </div>
      )}
      <div className='w-full h-[250px] bg-gradient-to-t from-[#04152d] to-[#04152d 79.17%] absolute bottom-0 left-0'></div>
      <ContentWrapper>
        <div className='flex flex-col items-center text-white text-center relative max-w-[800px] mx-auto'>
          <span className='text-5xl font-bold mb-3 md:mb-0 md:text-8xl'>
            Welcome
          </span>
          <span className='text-lg font-medium mb-10 md:text-2xl'>
            Millions of movies, TV shows and people to discover. Explore Now.
          </span>
          <div className='flex items-center w-full'>
            <input
              className='w-[calc(100%-100px)] h-12 text-blue-800 bg-white border-none outline-none rounded-l-[30px] px-4 text-sm
                    md:w-[calc(100%-150px)] md:h-16 md:text-2xl md:px-8'
              type='text'
              placeholder='Search for a movie or tv show....'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button
              onClick={() => {
                navigate(`/search/${query}`);
              }}
              className='w-24 h-12 font-bold bg-gradient-to-r from-[#f89e00] to-[#da2f68] text-white outline-none border-none rounded-r-[30px]  text-base cursor-pointer
                    md:w-36 md:h-16 md:text-lg'
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
