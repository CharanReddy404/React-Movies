import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data, className }) => {
  const genres = useSelector((state) => state.home.genres);
  return (
    <div className={'relative flex flex-wrap gap-[5px]'}>
      {data?.map((g) => {
        if (!genres[g]) {
          return;
        }
        return (
          <div
            className='bg-pink-800 text-white rounded-xl text-[10px] px-[5px] py-[3px] whitespace-nowrap justify-end'
            key={g}
          >
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
