import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';

import ContentWrapper from './ContentWrapper';
import logo from '../assets/movix-logo.svg';

const Header = () => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const loaction = useLocation();

  useEffect(() => {
    setShow(false);
    window.scrollTo(0, 0);
  }, [loaction]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(!showSearch);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 100);
    }
  };

  const navigationhandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    } else if (type === 'tv') {
      navigate('/explore/tv');
    }
    setMobileMenu(false);
  };

  const controllNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controllNavBar);

    return () => {
      window.removeEventListener('scroll', controllNavBar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`${
        show ? 'hidden' : ''
      } bg-[#04152d] bg-opacity-30 fixed w-full h-[60px] z-[1] flex items-center shadow-2xl`}
    >
      <ContentWrapper>
        <div className='flex text-white justify-between items-center'>
          <div className=''>
            <a href='/' className='text-xl font-bold text-orange-500'>
              {/* <img src={logo} alt='' /> */}
              React Movies
            </a>
          </div>
          <ul className='hidden md:flex items-center font-bold text-xl '>
            <li
              className='mx-4 cursor-pointer hover:text-fuchsia-600'
              onClick={() => navigationhandler('movie')}
            >
              Movies
            </li>
            <li
              className='mx-4 cursor-pointer hover:text-fuchsia-600'
              onClick={() => navigationhandler('tv')}
            >
              TV Shows
            </li>
            <li className='mx-4 cursor-pointer hover:text-fuchsia-600'>
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className='flex items-center md:hidden'>
            <HiOutlineSearch className='mx-4' onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose
                className='mx-4'
                onClick={() => {
                  setMobileMenu(false);
                }}
              />
            ) : (
              <SlMenu className='mx-4' onClick={openMobileMenu} />
            )}
          </div>
        </div>
        {mobileMenu && (
          <ul className='bg-[#04152d] bg-opacity-80 p-2 absolute m-auto left-0 right-0 text-xl text-white text-center shadow-lg'>
            <li className='mb-4' onClick={() => navigationhandler('movie')}>
              Movies
            </li>
            <li className='mt-4' onClick={() => navigationhandler('tv')}>
              TV Shows
            </li>
          </ul>
        )}
      </ContentWrapper>
      {showSearch && (
        <div className='absolute m-auto left-0 right-0 top-[60px]'>
          <ContentWrapper>
            <div className='flex items-center w-full'>
              <input
                className='w-full p-2 px-4 rounded-l-3xl'
                type='text'
                placeholder='Search for a movie or tv show....'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button className='bg-slate-700 p-3 rounded-r-3xl'>
                <VscChromeClose
                  className='mx-2 text-white'
                  onClick={() => {
                    setShowSearch(false);
                  }}
                />
              </button>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Header;
