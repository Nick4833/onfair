import { ReactNode, useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Layout = ({current, setCurrent}: {current: any, setCurrent: any}) => {
  return (
    <div>
      <Navbar current={current} setCurrent={setCurrent} />
      <Outlet />
    </div>
  );
};

export default Layout;
