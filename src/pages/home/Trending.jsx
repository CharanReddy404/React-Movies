import React, { useState } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import SwitchTabs from '../../components/SwitchTabs';
import useFetch from '../../hooks/useFetch';
import Carousel from '../../components/Carousel';

const Trending = () => {
  const [endpoint, setEndpoint] = useState('day');

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week');
  };

  return (
    <div className='relative mb-[70px]'>
      <ContentWrapper>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-2xl text-white font-normal'>Trending</span>
          <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
