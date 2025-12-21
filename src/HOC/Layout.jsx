import React from "react";
import Header from "../Component/Navigation/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Component/Navigation/SideBar";

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">

        <div className="md:w-56 w-0 md:block hidden">
          <SideBar />
        </div>
        
        <div className="md:hidden">
          <SideBar />
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[95%] md:max-w-[90%] pt-28 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;