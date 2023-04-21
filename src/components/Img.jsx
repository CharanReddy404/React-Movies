import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Img = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className}
      height={'100%'}
      width={'100%'}
      alt=''
      effect='blur'
      src={src}
    />
  );
};

export default Img;
