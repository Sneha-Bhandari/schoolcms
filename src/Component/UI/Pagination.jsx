import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-5 gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#0B0C28] hover:bg-blue-700"
        }`}
      >
        &laquo; Prev
      </button>
      <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#0B0C28] hover:bg-blue-700"
        }`}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
