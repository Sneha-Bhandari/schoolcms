import React from "react";

export default function ViewFaqPage({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white w-1/2 rounded-xl p-6 relative">
        <h2 className="text-xl font-bold mb-4">View FAQ</h2>

        <p className="mb-3">
          <strong>Question:</strong><br />
          {item.question}
        </p>

        <p>
          <strong>Answer:</strong><br />
          {item.answer}
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
