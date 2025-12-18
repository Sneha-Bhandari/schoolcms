import React from 'react'
import Header from '../Component/Navigation/Header'
import { Outlet } from "react-router-dom";
import SideBar from '../Component/Navigation/SideBar';

const Layout = () => {
  return (
    <div className="overflow-clip h-full  w-screen">
      
      <Header/>
      <div className="grid grid-cols-12 h-full w-full  gap-3">
        <div className="md:col-span-2 ">
          <SideBar />
        </div>
        <div className="relative col-span-10 flex md:items-center justify-center mx-auto  pt-34 md:w-11/13  w-full h-full md:flex md:flex-col flex-col md:justify-start gap-8">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Layout;
