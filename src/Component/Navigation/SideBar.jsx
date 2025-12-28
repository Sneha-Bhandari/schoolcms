import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { FaHome, FaDotCircle } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import {IoIosArrowDown } from "react-icons/io";
import { MdOutlineDescription, MdDesktopWindows, MdMiscellaneousServices,MdEventNote } from "react-icons/md";
import { TiInfoOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { BsCardHeading } from "react-icons/bs";
import { LuContact } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";
import { TfiGallery } from "react-icons/tfi";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { LiaImages } from "react-icons/lia";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDrop, setEventDrop] = useState(false);
  const [blogDrop, setBlogDrop] = useState(false);
  const location = useLocation();

  const navitems = [
    { title: "Home", path: "/", icons: <FaHome /> },
    { title: "About", path: "/about", icons: <MdOutlineDescription /> },
    { title: "Hero Section", path: "/heroSection", icons: <MdDesktopWindows /> },
    { title: "Team", path: "/team", icons: <FiUsers /> },
    { title: "Banner", path: "/banner", icons: <BsCardHeading /> },
    { title: "Gallery", path: "/gallery", icons: <TfiGallery /> }
  ];

  const nextnav = [
    { title: "Details", path: "/details", icons: <TiInfoOutline /> },
    { title: "Our Facilities", path: "/ourfacilities", icons: <MdMiscellaneousServices /> },
    { title: "VisionAndMission", path: "/visionAndmission", icons: <LiaImages /> },
    { title: "Testimonial", path: "/testimonial", icons: <BiFoodMenu /> },
    { title: "FAQ", path: "/faq", icons: <MdDesktopWindows /> },
    { title: "Curriculum", path: "/curriculum", icons: <MdOutlineChromeReaderMode /> },
    { title: "Contact", path: "/contact", icons: <LuContact /> },
  ];

  const blogsDropdown = [
    { title: "Blog Top Section", path: "/blogs/blog-top-section" },
    { title: "Blog List", path: "/blogs/bloglist" },
  ];

  const eventsDropdown = [
    { title: "Event Top Section", path: "/events/event-top-section" },
    { title: "Event List", path: "/events/eventlist" },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#0B0C28] text-white font-semibold"
      : "text-gray-700";

  return (
    <>
      
      <div className="fixed top-18 right-2 w-fit md:hidden z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-md shadow-md"
        >
          <VscThreeBars size={24} />
        </button>
      </div>

      <div
        className={`fixed top-18 left-0 h-full w-3/5 bg-gray-50 border-r-2 border-gray-300 transform transition-transform duration-300 z-40 overflow-y-auto  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:top-18 md:w-56 md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 text-[#0B0C28] bg-blue-50 sticky top-0 z-20">
          <VscThreeBars size={18} />
          <h1 className="text-base font-semibold uppercase tracking-wide">Pages</h1>
        </div>

        <ul className="mx-2">
          {navitems.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 rounded-sm font-bold transition-all duration-500 ${isActive(item.path)}`}
              >
                {item.icons}
                <span className="font-semibold text-md">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 px-4 py-3 mb-4 text-[#0B0C28] bg-blue-50 border-y border-gray-300 sticky top-14 z-10">
          <VscThreeBars size={18} />
          <h2 className="text-base font-semibold uppercase tracking-wide">Layout</h2>
        </div>

      
        <div className="mx-2">
          <button
            onClick={() => setEventDrop(!eventDrop)}
            className="w-full flex justify-between items-center rounded-sm px-6 py-2.5 text-gray-700 hover:bg-[#0B0C28] hover:text-white"
          >
            <div className="flex items-center gap-3">
              <MdEventNote />
              <span className="text-md font-medium">Events</span>
            </div>
            <IoIosArrowDown className={`transition-transform duration-500 ${eventDrop ? "rotate-180" : ""}`} />
          </button>

          {eventDrop && (
            <ul className="text-black w-42 ml-5 my-4 max-h-60 overflow-y-auto">
              {eventsDropdown.map((event, idx) => (
                <li key={idx} className="">
                  <Link
                    to={event.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2  hover:bg-blue-100 w-full`}
                  >
                    <FaDotCircle size={6} />
                    <span className="text-sm font-semibold">{event.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mx-2">
          <button
            onClick={() => setBlogDrop(!blogDrop)}
            className="w-full flex justify-between items-center rounded-sm px-6 py-2.5 text-gray-700 hover:bg-[#0B0C28] hover:text-white"
          >
            <div className="flex items-center gap-3">
              <IoIosInformationCircle />
              <span className="text-md font-medium">Blogs</span>
            </div>
            <IoIosArrowDown className={`transition-transform duration-500 ${blogDrop ? "rotate-180" : ""}`} />
          </button>

          {blogDrop && (
            <ul className=" text-black w-42 ml-5 my-4 max-h-60 overflow-y-auto">
              {blogsDropdown.map((blog, idx) => (
                <li key={idx} className="">
                  <Link
                    to={blog.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2  hover:bg-blue-100 w-full`}
                  >
                    <FaDotCircle size={6} />
                    <span className="text-sm font-semibold">{blog.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="mx-2 mb-26 ">
          {nextnav.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 rounded-sm transition-all duration-500 hover:bg-[#0B0C28] hover:text-white ${isActive(item.path)}`}
              >
                {item.icons}
                <span className="text-md font-semibold">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
