import React from "react";
import { MdClose } from "react-icons/md";

export default function ViewBlog({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full md:w-1/2 rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full"
        >
         <h1 className="text-center ml-2 cursor-pointer"> <MdClose /></h1>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Blog Details</h2>

        <img
          src={item.image}
          className="w-full max-w-sm mx-auto rounded-lg mb-6"
          alt={item.title}
        />

        <div className="space-y-3">
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
          <p><strong>Supervisor:</strong> {item.supervisor}</p>
            <p><strong>VenueL:</strong>{item.venue}</p>
          <p className="flex gap-2 font-bold">Description:
          </p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      </div>
    </div>
  );
}
