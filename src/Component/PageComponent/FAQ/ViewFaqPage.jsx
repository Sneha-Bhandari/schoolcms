import React from "react";

export default function ViewFaqPage({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          View FAQ
        </h2>

        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {item.category || "General"}
          </span>
        </div>

        <div className="mb-5">
          <p className="text-sm text-gray-500 mb-1 font-medium">
            Question
          </p>
          <p className="text-gray-800 font-semibold">
            {item.question}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1 font-medium">
            Answer
          </p>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
