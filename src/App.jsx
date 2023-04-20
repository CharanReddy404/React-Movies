import { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration } from './store/homeSlice';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';
import Explore from './pages/Explore';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:mediaType/:id',
        element: <Details />,
      },
      {
        path: '/search/:query',
        element: <SearchResult />,
      },
      {
        path: '/explore/:mediaType',
        element: <Explore />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res);

      const url = {
        backdrop: res.data.images.secure_base_url + 'original',
        poster: res.data.images.secure_base_url + 'original',
        profile: res.data.images.secure_base_url + 'original',
      };

      dispatch(getApiConfiguration(url));
    });
  };

  return <RouterProvider router={router} />;
};

export default App;
