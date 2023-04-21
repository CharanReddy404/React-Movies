import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../../components/ContentWrapper';
import useFetch from '../../hooks/useFetch';
import Genres from '../../components/Genres';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Img from '../../components/Img';
import PosterFallback from '../../assets/no-poster.png';

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const url = useSelector((state) => state.home.url);

  const _genres = data?.genres?.map((g) => g.id);
  const rating = data?.vote_average.toFixed(1);

  // const toHoursAndMinutes = (totalMinutes) => {
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;
  //   return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  // };

  return (
    <div className='w-full bg-[#04152d] pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]'>
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className='w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden'>
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className='w-full h-[250px] absolute bottom-0 left-0'></div>
              <ContentWrapper className={''}>
                <div className='flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row '>
                  <div className='flex-shrink-0 h-full'>
                    {data.poster_path ? (
                      <img
                        className={
                          'w-full block rounded-[12px] md:max-w-[350px]'
                        }
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <img
                        className={
                          'w-full block rounded-[12px] md:max-w-[350px]'
                        }
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  <div className='text-white'>
                    <div className='text-[28px] leading-[40px] md:text-[34px] md:leading-[44px]'>
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format('YYYY')})`}
                    </div>
                    <div className='text-[16px] leading-[24px] mb-[15px] italic opacity-50 md:text-[20px] md:leading-[28px]'>
                      {data.tagline}
                    </div>
                    <Genres data={_genres} />
                    <div className='rounded-[50px] max-w-[60px] md:max-w-[60px]  mt-5'>
                      <CircularProgressbar
                        value={rating}
                        maxValue={10}
                        text={rating}
                        styles={buildStyles({
                          pathColor:
                            rating < 5
                              ? 'red'
                              : rating < 7
                              ? 'orange'
                              : 'green',
                          textSize: '35px',
                        })}
                      />
                    </div>
                    <div className='mb-[25px]'>
                      <div className='text-[24px] mb-[10px] mt-[20px]'>
                        Overview
                      </div>
                      <div className='leading-6 md:pr-[100px]'>
                        {data.overview}
                      </div>
                    </div>
                    <div>
                      <span className='bg-green-500 p-2 font-bold rounded-xl'>
                        {data.status}
                      </span>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className='flex relative flex-col gap-[25px] md:gap[50px] md:flex-row'>
          <ContentWrapper className={'flex gap-[50px]'}>
            <div className='flex-shrink-0 w-full block rounded-[12px] aspect-[1/1.5] md:max-w-[350px] skeleton'></div>
            <div className='w-full '>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
              <div className='w-full h-[25px] mb-[20px] rounded-[50px]'></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

// [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(2)]:mb-[50px]

export default DetailsBanner;
