import React from "react";
import { MdClose, MdLink } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function ViewTeam({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full md:w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-600 text-md bg-red-500 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <MdClose />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Team Member Details
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex justify-center lg:justify-start lg:w-2/5">
            <img
              src={item.imageid || "/placeholder.jpg"}
              alt={item.name}
              className="w-full max-w-24 sm:max-w-sm lg:max-w-full h-auto object-cover rounded-lg shadow-md border-4 border-white"
            />
          </div>

          <div className="lg:w-full flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Name
              </h4>
              <p className="text-lg text-gray-800">{item.name}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Position
              </h4>
              <p className="text-gray-800">{item.position}</p>
            </div>

            {(item.facebooklink || item.instagramlink || item.linkedinlink) && (
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1 flex items-center gap-2">
                  <MdLink /> Social Links
                </h4>
                <div className="flex  w-fit gap-2 mt-1">
                  {item.facebooklink && (
                    <a
                      href={item.facebooklink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-300 text-white px-1 py-2 rounded-lg hover:bg-blue-400 transition-colors text-sm flex items-center gap-1"
                    >
                      <FaFacebookF /> Facebook
                    </a>
                  )}
                  {item.instagramlink && (
                    <a
                      href={item.instagramlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm flex items-center gap-1"
                    >
                      <FaInstagram /> Instagram
                    </a>
                  )}
                  {item.linkedinlink && (
                    <a
                      href={item.linkedinlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm flex items-center gap-1"
                    >
                      <FaLinkedinIn /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
