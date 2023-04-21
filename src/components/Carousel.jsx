import React, { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Img from './Img';
import PosterFallback from '../assets/no-poster.png';
import ContentWrapper from './ContentWrapper';
import CircleRating from './CircleRating';
import Genres from './Genres';

const Carousel = ({ data, loading, endpoint }) => {
  const carouselContainer = useRef();

  const url = useSelector((state) => state.home.url);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className='mb-[50px]'>
      <ContentWrapper className='relative'>
        <BsFillArrowLeftCircleFill
          className='text-[30px] text-white absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-60 z-[1] hidden
                md:block md:hover:opacity-100 left-[30px]'
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className='text-[30px] text-white absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-[1] hidden
                md:block md:hover:opacity-100 right-[30px]'
          onClick={() => navigation('right')}
        />
        {!loading ? (
          <div
            ref={carouselContainer}
            className='flex gap-[10px] overflow-y-hidden mx-[-20px] px-5 md:gap-[20px] md:overflow-hidden md:m-0 md:p-0'
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                  className='w-[125px] cursor-pointer md:w-[calc(25% - 15px)] lg:w-[calc(20% - 16px)] flex-shrink-0'
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
        ) : (
          <div className='flex gap-[10px] overflow-y-hidden mx-[-20px] p-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0'>
            <div className='w-[125px] md:w-[calc(25% - 15px)] lg:w-[calc(20% - 16px)] flex-shrink-0'>
              <div className='rounded-[12px] w-full aspect-[1/1.8] mb-[10px]'></div>
              <div className='flex flex-col'>
                <span className='w-full h-[20px] mb-[10px]'></span>
                <span className='w-[75%] h-[20px]'></span>
              </div>
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
