import React, { useEffect, useRef, useState } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Img from '../components/Img';
import CircleRating from '../components/CircleRating';
import Genres from '../components/Genres';
import PosterFallback from '../assets/no-poster.png';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const { query } = useParams();

  const url = useSelector((state) => state.home.url);
  const navigate = useNavigate();

  const fetchInitialData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`).then(
      (res) => {
        setData(res?.data);
        setPageNo((prev) => prev + 1);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.data?.results],
          });
        } else {
          setData(res?.data);
        }
        setPageNo((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  const trackScrolling = () => {
    const element = document.getElementById('InfiScroll');
    if (window.scrollY >= element.scrollHeight - 400) {
      if (data?.total_pages >= pageNo) {
        fetchNextPageData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', trackScrolling);

    return () => {
      window.removeEventListener('scroll', trackScrolling);
    };
  }, [data]);

  if (!data) {
    return (
      <div className='min-h-[300px] text-white md:mb-0 md:pt-[120px] md:min-h-[700px]'>
        <ContentWrapper>Loading...</ContentWrapper>
      </div>
    );
  }

  return (
    <div className='w-full min-h-[300px] bg-[#04152d] pt-[80px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]'>
      <ContentWrapper>
        <div className='text-white mb-5 md:ml-4 md:text-lg'>
          Search results of '{query}'
        </div>
        <div
          id='InfiScroll'
          className='flex flex-wrap gap-5 justify-center mb-8'
        >
          {data.results.length > 0 ? (
            data?.results?.map((item) => {
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
                    <CircleRating rating={item?.vote_average?.toFixed(1)} />
                    <Genres data={item?.genre_ids?.slice(0, 2)} />
                  </div>
                  <div className='text-white flex flex-col'>
                    <span className='text-base mb-[10px] leading-6'>
                      {item.title || item.name}
                    </span>
                    <span className='text-sm opacity-50'>
                      {dayjs(item.release_date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-white'>No Results found!!</div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;
