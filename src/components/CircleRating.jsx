import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleRating = ({ rating }) => {
  return (
    <div className='bg-white rounded-[50%] p-[2px] w-[40px] h-[40px] absolute top-0 right-0 flex-shrink-0 md:w-[60px] md:h-[60px]'>
      <CircularProgressbar
        className='text-[34px] font-bold fill-[#04152d] '
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
        })}
      />
    </div>
  );
};

export default CircleRating;
