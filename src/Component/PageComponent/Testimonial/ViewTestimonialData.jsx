import React from "react";
import { ImCross } from "react-icons/im";
export default function ViewTestimonialData({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl sm:max-w-11/12 md:max-w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-600 text-md bg-red-500 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <ImCross/>
        </button>

        <h2 className="text-2xl sm:text-xl font-bold text-gray-800 mb-6 text-center">
          Testimonial Details
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex justify-center lg:justify-start lg:w-2/5">
            <img
              src={item.imageid}
              className="w-full max-w-24 sm:max-w-sm lg:max-w-full h-auto object-contain rounded-lg shadow-md border-4 border-white"
              alt={item.name}
            />
          </div>

          <div className="lg:w-3/5 flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Name
              </h4>
              <p className="text-lg text-gray-800">{item.name}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Grade
              </h4>
              <p className="text-gray-800">{item.grade}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Rating
              </h4>
              <p className="text-gray-800">{item.rating} ⭐</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Description
              </h4>
              <div className="prose prose-sm p-2 sm:p-3 bg-gray-50 rounded-lg text-gray-700 overflow-auto max-h-48 sm:max-h-64">
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}