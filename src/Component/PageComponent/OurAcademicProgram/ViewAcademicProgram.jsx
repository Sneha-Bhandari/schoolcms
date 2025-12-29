import React from "react";
import { MdClose } from "react-icons/md";

export default function ViewAcademicProgram({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl w-full md:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-400 duration-500 "
        >
          <MdClose />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Academic Program Details
        </h2>

        <img
          src={item.academicimageid}
          className="w-full rounded-lg mb-4"
          alt={item.title}
        />

        <p><strong>Title:</strong> {item.title}</p>
        <p><strong>Duration:</strong> {item.academicduration}</p>

        <p className="mt-3">
          <strong>Description:</strong> {item.academicdescription}
        </p>

        <div className="mt-3">
          <strong>Key Features:</strong>
          <ul className="list-disc ml-6 mt-2">
            {item.keyfeatures?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
