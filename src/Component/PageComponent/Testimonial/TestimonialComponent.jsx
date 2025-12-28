import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ViewTestimonialData from "./ViewTestimonialData";
import EditTestimonialData from "./EditTestimonialData";
import Pagination from "../../Ui/Pagination";
import {
  MdAdd,
  MdMoreVert,
  MdVisibility,
  MdDelete,
  MdEdit,
} from "react-icons/md";

const mockTestimonials = [
  {
    id: 1,
    imageid: "/stuone.jpg",
    name: "Sample 1",
    grade: "Grade 8 Student",
    rating: 4,
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    imageid: "/stutwo.jpg",
    name: "Sample 2",
    grade: "Grade 10 Student",
    rating: 5,
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    imageid: "/stuthree.jpeg",
    name: "Sample 3",
    grade: "Grade 7 Student",
    rating: 3,
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    imageid: "/stutwo.jpg",
    name: "Sample 2",
    grade: "Grade 10 Student",
    rating: 5,
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    imageid: "/stuthree.jpeg",
    name: "Sample 3",
    grade: "Grade 7 Student",
    rating: 3,
    description: "Lorem ipsum dolor sit amet.",
  },
];

export default function TestimonialComponent() {
  const navigate = useNavigate();
  const params = useParams();

  const [testimonialData, setTestimonialData] = useState(mockTestimonials);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuStyle, setMenuStyle] = useState({});
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonialData.length / itemsPerPage);

  const paginatedTeam = testimonialData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const id = parseInt(params.id);
    if (!id) return;

    if (window.location.pathname.includes("/testimonial/view/")) setViewId(id);

    if (window.location.pathname.includes("/testimonial/edit/")) setEditId(id);
  }, [params]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openMenu = (id, e) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < 150;

    setMenuStyle({
      position: "fixed",
      top: openUp ? rect.top - 120 : rect.bottom + 8,
      left: rect.right - 140,
      zIndex: 1000,
    });

    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    setTestimonialData((prev) => prev.filter((t) => t.id !== id));

    toast.success("Testimonial deleted");
    setOpenMenuId(null);
  };

  const selectedViewItem = testimonialData.find((t) => t.id === viewId);

  const selectedEditItem = testimonialData.find((t) => t.id === editId);

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        Voices of our Students
      </h2>
      <p className="text-sm text-gray-400 mb-5">
        Testimonials: image, name, grade, rating & description.
      </p>

      <button
        onClick={() => navigate("/testimonial/addtestimonial")}
        className="bg-[#0B0C28] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg mb-6"
      >
        Add Student
      </button>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full">
          <thead className="bg-gray-300">
            <tr>
              {[
                "Image",
                "Name",
                "Grade",
                "Description",
                "Rating",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="py-4 px-6 text-xs font-semibold uppercase text-gray-600 text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {paginatedTeam.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-blue-100 border-b border-gray-300"
              >
                <td className="px-6 py-3">
                  <img
                    src={t.imageid}
                    alt={t.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6">{t.name}</td>
                <td className="px-6">{t.grade}</td>

                <td
                  className="px-2 max-w-[260px] truncate text-left"
                  title={t.description}
                >
                  {t.description}
                </td>

                <td className="px-9">{t.rating}</td>

                <td className="px-6 text-center">
                  <button
                    onClick={(e) => openMenu(t.id, e)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <PiDotsThreeOutlineVerticalFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openMenuId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      {openMenuId && (
        <div
          style={menuStyle}
          className="w-32 bg-white border shadow-lg rounded-lg z-20"
        >
          <button
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-blue-700 text-sm"
            onClick={() => {
              setOpenMenuId(null);
              navigate(`/testimonial/view/${openMenuId}`);
            }}
          >
            <MdVisibility size={16} /> View
          </button>

          <button
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-green-700 text-sm"
            onClick={() => {
              setOpenMenuId(null);
              navigate(`/testimonial/edit/${openMenuId}`);
            }}
          >
            <MdEdit size={16} /> Edit
          </button>

          <button
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-red-700 text-sm"
            onClick={() => handleDelete(openMenuId)}
          >
            <MdDelete size={16} /> Delete
          </button>
        </div>
      )}

      {testimonialData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {selectedViewItem && (
        <ViewTestimonialData
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/testimonial");
          }}
        />
      )}

      {selectedEditItem && (
        <EditTestimonialData
          item={selectedEditItem}
          onClose={() => {
            setEditId(null);
            navigate("/testimonial");
          }}
        />
      )}
    </div>
  );
}
