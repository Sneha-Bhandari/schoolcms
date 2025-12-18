import React from "react";
import { MdTransitEnterexit, MdSchool } from "react-icons/md";
import image from "../../assets/Photo/logos.png"
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full shadow-2xl bg-white h-18 flex items-center justify-between px-4 sm:px-6 md:px-12 z-50">
      <div className="flex items-center">
        <img
          className="object-cover h-10 w-10 sm:h-12 sm:w-12"
          src={image}
          alt="Logo"
        />
      </div>
     
        
        <div className="flex text-xl font-serif gap-1 items-center hover:text-gray-600 cursor-pointer transition-colors duration-700 ease-in-out">
          Global School <MdSchool className="text-base sm:text-lg md:text-xl" />
        </div>
      </div>
   
  );
};

export default Header;
