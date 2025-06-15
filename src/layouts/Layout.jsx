import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" mx-auto min-h-[calc(100vh-255px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
