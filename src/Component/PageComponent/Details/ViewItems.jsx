import React from "react";
import { MdClose } from "react-icons/md";

export default function ViewItems({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full md:w-1/4 rounded-xl p-6 relative">
       <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full"
        >
         <h1 className="text-center ml-2 cursor-pointer"> <MdClose /></h1>
        </button>
        <div
          className="w-16 h-16 mx-auto mb-4 bg-gray-200  border border-gray-500 rounded-xl"
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
        <h3 className="text-xl font-semibold text-center mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 text-center">{item.description}</p>

       
      </div>
    </div>
  );
}
