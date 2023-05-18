import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PrimaryPage from './pages/PrimaryPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Preview from './pages/Preview';

/*
? App with Routes v6 - https://reactrouter.com/en/main/start/tutorial 
? All Page are added to app here only.
! don't forget to add .env file and environment variables.
*/

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <PrimaryPage />,
          errorElement: <ErrorPage />,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                { index: true, element: <Login /> },
                {
                  path: '/home',
                  element: <Home />,
                },
                {
                  path: '/preview',
                  element: <Preview />,
                },
                {
                  path: '/signup',
                  element: <Signup />,
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}
