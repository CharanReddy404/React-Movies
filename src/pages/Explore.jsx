import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import useFetch from '../hooks/useFetch';
import Img from '../components/Img';
import CircleRating from '../components/CircleRating';
import Genres from '../components/Genres';

const Explore = () => {
  const { mediaType } = useParams();

  const { data } = useFetch(`/${mediaType}/popular`);

  const url = useSelector((state) => state.home.url);
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className='min-h-[300px] text-white md:mb-0 md:pt-[120px] md:min-h-[700px]'>
        <ContentWrapper>Loading...</ContentWrapper>
      </div>
    );
  }

  return (
    <div className='w-full bg-[#04152d] pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]'>
      <ContentWrapper>
        <div className='flex flex-wrap gap-5 justify-center mb-8'>
          {data.results.map((item) => {
            const posterUrl = item.poster_path
              ? url.poster + item.poster_path
              : PosterFallback;
            return (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/${item.media_type || mediaType}/${item.id}`)
                }
                className='w-[150px] md:w-[200px] cursor-pointer md:w-[calc(25% - 15px)] lg:w-[calc(20% - 16px)] flex-shrink-0'
              >
                <div className='relative w-full aspect-[1/1.8] bg-cover bg-center mb-[10px] flex items-end justify-between p-[10px]'>
                  <Img className={'absolute top-0 left-0'} src={posterUrl} />
                  <CircleRating rating={item?.vote_average.toFixed(1)} />
                  <Genres data={item.genre_ids.slice(0, 2)} />
                </div>
                <div className='text-white flex flex-col'>
                  <span className='text-base mb-[10px] leading-6'>
                    {item.title || item.name}
                  </span>
                  <span className='text-sm opacity-50'>
                    {dayjs(item.release_Date).format('MMM D, YYYY')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Explore;
