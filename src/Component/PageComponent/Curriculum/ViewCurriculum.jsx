import React from "react";
import { MdClose, MdPictureAsPdf } from "react-icons/md";

export default function ViewCurriculum({ item, onClose }) {
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
          View Curriculum
        </h2>

        <div className="flex flex-col gap-6">
          <p className="text-lg font-semibold">
            Grade / Class: <span className="text-blue-700">{item.className}</span>
          </p>

          <div className="flex items-center gap-2">
            <MdPictureAsPdf className="text-red-600 text-2xl" />
            <a
              href={item.pdf}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Open PDF in new tab
            </a>
          </div>

          <div className="border rounded-lg overflow-hidden mt-4 flex justify-center items-center h-48 bg-gray-100">
            <MdPictureAsPdf className="text-red-500 text-6xl" />
          </div>

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 self-end"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
