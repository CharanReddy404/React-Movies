import React from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import DetailsBanner from './DetailsBanner';

const Details = () => {
  return (
    <div className=''>
      <DetailsBanner />
    </div>
  );
};

export default Details;
