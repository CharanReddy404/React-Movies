import React from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import DetailsBanner from './DetailsBanner';

const Details = () => {
  // const { mediaType, id } = useParams();
  // const { data, loading } = useFetch(`/${mediaType}/${id}`);

  return (
    <div className=''>
      <DetailsBanner />
    </div>
  );
};

export default Details;
