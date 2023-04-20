import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration } from './store/homeSlice';

const App = () => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi('/movie/popular').then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res.data));
    });
  };

  return (
    <div className=''>
      <h1 className='text-3xl font-bold underline'>
        Hello world! {url?.total_pages}
      </h1>
    </div>
  );
};

export default App;
