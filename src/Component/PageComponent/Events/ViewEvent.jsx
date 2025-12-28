import React from "react";
import { MdClose } from "react-icons/md";

export default function ViewEvent({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full md:w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
        >
          <MdClose />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Event Details
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img
              src={item.eventimageid || "/placeholder.jpg"}
              alt={item.title}
              className="w-full max-w-sm object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase">
                Title
              </h4>
              <p className="text-lg text-gray-800">{item.title}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase">
                Category
              </h4>
              <p className="text-gray-800">{item.eventcategory}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase">
                Date
              </h4>
              <p className="text-gray-800">
                {new Date(item.eventdate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase">
                Author
              </h4>
              <p className="text-gray-800">{item.eventauthor}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Description
              </h4>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: item.eventdescription,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
