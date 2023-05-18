import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* 
? This is connection between one Navbar and multiple pages.
? Outlet have other pages like Login, Home & Preview.
*/

const PrimaryPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default PrimaryPage;
