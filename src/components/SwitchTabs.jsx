import React, { useState } from 'react';

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setSelectedTab(index);
    onTabChange(tab, index);
  };

  return (
    <div className='h-[34px] bg-white rounded-[20px] p-[2px]'>
      <div className='flex items-center h-[30px] relative '>
        {data.map((tab, i) => (
          <span
            className={`${
              selectedTab === i ? 'text-white' : 'text-black'
            } h-full flex items-center justify-center w-[100px] text-sm relative z-[1] cursor-pointer`}
            key={i}
            onClick={() => activeTab(tab, i)}
          >
            {tab}
          </span>
        ))}
        <span
          className='h-[30px] w-[100px] rounded-[15px] absolute left-0 bg-gradient-to-r from-[#f89e00] to-[#da2f68]'
          style={{ left }}
        />
      </div>
    </div>
  );
};

export default SwitchTabs;
