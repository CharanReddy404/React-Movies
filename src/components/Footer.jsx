import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

import ContentWrapper from './ContentWrapper';

const Footer = () => {
  return (
    <footer className='bg-slate-950 text-white flex shadow-xl py-5 '>
      <ContentWrapper>
        <ul className='flex text-sm justify-evenly pb-2 m-2'>
          <li className=''>Terms Of Use</li>
          <li className=''>Privacy-Policy</li>
          <li className=''>About</li>
          <li className=''>Blog</li>
          <li className=''>FAQ</li>
        </ul>
        <div className='text-center py-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className='m-4 flex items-center justify-evenly text-4xl'>
          <span className='rounded-[50%] p-3 bg-slate-800 shadow-2xl'>
            <FaFacebookF />
          </span>
          <span className='rounded-[50%] p-3 bg-slate-800 shadow-2xl'>
            <FaInstagram />
          </span>
          <span className='rounded-[50%] p-3 bg-slate-800 shadow-2xl'>
            <FaTwitter />
          </span>
          <span className='rounded-[50%] p-3 bg-slate-800 shadow-2xl'>
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
