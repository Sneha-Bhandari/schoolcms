import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import { TiInfoOutline } from "react-icons/ti";
import { MdDesktopWindows } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { BsCardHeading } from "react-icons/bs";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDrop, setEventDrop] = useState(false);
  const location = useLocation();
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const navitems = [
    { title: "Home", path: "/", icons: <FaHome /> },
    { title: "About", path: "/about", icons: <MdOutlineDescription /> },
    { title: "Team", path: "/team", icons: <FiUsers /> },
    { title: "Banner", path: "/banner", icons: <BsCardHeading /> },
  ];

  const nextnav = [
    {
      title: "Hero Section",
      path: "/heroSection",
      icons: <MdDesktopWindows />,
    },
    { title: "Details", path: "/details", icons: <TiInfoOutline /> },
    {
      title: "Our Facilities",
      path: "/ourfacilities",
      icons: <MdMiscellaneousServices />,
    },
    {
      title: "VisionAndMission",
      path: "/visionAndmission",
      icons: <PiTelevision />,
    },
    { title: "Testimonial", path: "/testimonial", icons: <BiFoodMenu /> },
  ];

  const eventsDropdown = [
    { title: "Event Top Section", path: "/events/event-top-section" },
    { title: "Event List", path: "/events" },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#0B0C28] text-white font-semibold"
      : "text-gray-700";

  return (
    <>
      <div className="fixed top-18 left-0 w-fit  md:hidden z-50  h-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-md shadow-md"
        >
          <VscThreeBars size={24} />
        </button>
      </div>

      <div
        className={`fixed top-18 left-0 h-[calc(100vh-4.5rem)]  md:w-64 bg-gray-50 border-r-2 border-gray-300 overflow-y-auto overflow-x-hidden transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0  w-3/4" : "-translate-x-full"
        }  md:translate-x-0 md:w-56`}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-y border-gray-300 text-[#0B0C28] bg-blue-50">
          <VscThreeBars size={18} />
          <h1 className="text-base font-semibold uppercase tracking-wide">
            Pages
          </h1>
        </div>

        <ul className=" mx-2 ">
          {navitems.map((item, index) => (
            <li key={index} className="w-full h-full">
              <Link
                to={item.path}
                onClick={handleLinkClick}
                className={`w-full cursor-pointer flex items-center gap-3 px-6 py-3 rounded-sm font-bold
                  transition-all duration-500  ${isActive(item.path)}`}
              >
                {item.icons}
                <span className=" font-semibold text-md">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 px-4 py-4 text-[#0B0C28] bg-blue-50 border-y border-gray-300 ">
          <VscThreeBars size={18} />
          <h2 className="text-base font-semibold uppercase tracking-wide ">
            Layout
          </h2>
        </div>

        <ul className="mx-2">
          {nextnav.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={item.path}
                onClick={handleLinkClick}
                className={` w-full cursor-pointer flex items-center gap-3 px-6 py-3 rounded-sm
                  transition-all duration-500 hover:bg-[#0B0C28] hover:text-white ${isActive(
                    item.path
                  )}`}
              >
                {item.icons}
                <span className="text-md font-semibold">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className=" mx-2">
          <button
            onClick={() => setEventDrop(!eventDrop)}
            className="w-full flex justify-between cursor-pointer items-center rounded-sm px-6 py-3 text-gray-700 hover:bg-[#0B0C28] hover:text-white"
          >
            <div className="flex items-center gap-3">
              <IoIosContact />
              <span className="text-md font-medium">Events</span>
            </div>

            <IoIosArrowDown
              className={`transition-transform duration-500 ${
                eventDrop ? "rotate-180" : ""
              }`}
            />
          </button>

          {eventDrop && (
            <ul className="bg-[#0B0C28] w-48  ml-5 mt-1 ">
              {eventsDropdown.map((event, idx) => (
                <li key={idx} className="w-fit">
                  <Link
                    to={event.path}
                    onClick={handleLinkClick}
                    className={` w-full px-3 py-3  transition-all flex gap-3 items-center
                      ${isActive(event.path)} text-white hover:text-gray-300`}
                  >
                    <FaDotCircle size={6} />{" "}
                    <h1 className="text-sm font-semibold"> {event.title}</h1>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
