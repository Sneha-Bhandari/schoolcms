import React, { useState, useEffect } from "react";
import { MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import Pagination from "../../Ui/Pagination";
import ViewCurriculum from "./ViewCurriculum";
import EditCurriculum from "./EditCurriculum";
import { useNavigate, useParams } from "react-router-dom";

export default function CurriculumDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const [curriculum, setCurriculum] = useState([
    { id: 1, className: "Class 1", pdf: "/pdfs/class1.pdf" },
    { id: 2, className: "Class 2", pdf: "/pdfs/class2.pdf" },
    { id: 3, className: "Class 3", pdf: "/pdfs/class3.pdf" },
    { id: 4, className: "Class 4", pdf: "/pdfs/class4.pdf" },
    { id: 5, className: "Class 5", pdf: "/pdfs/class5.pdf" },
    { id: 6, className: "Class 6", pdf: "/pdfs/class6.pdf" },
    { id: 7, className: "Class 7", pdf: "/pdfs/class3.pdf" },
    { id: 8, className: "Class 8", pdf: "/pdfs/class4.pdf" },
    { id: 9, className: "Class 9", pdf: "/pdfs/class5.pdf" },
    { id: 10, className: "Class 10", pdf: "/pdfs/class6.pdf" },
    { id: 11, className: "Class 11", pdf: "/pdfs/class6.pdf" },
    { id: 12, className: "Class 12", pdf: "/pdfs/class6.pdf" },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const selectedViewItem = curriculum.find((m) => m.id === viewId);
  const selectedEditItem = curriculum.find((m) => m.id === editId);

  const totalPages = Math.ceil(curriculum.length / itemsPerPage);
  const paginatedCurriculum = curriculum.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Set view/edit modal based on URL
  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);

    if (window.location.pathname.includes("/curriculum/view")) setViewId(id);
    if (window.location.pathname.includes("/curriculum/edit")) setEditId(id);
  }, [params]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        !e.target.closest(".dropdown-button") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setOpen(false);
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleDropdown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left - 100,
    });
    setSelectedId(id);
    setOpen(true);
  };

  return (
    <div className="w-full py-8 relative">
      <h2 className="text-2xl font-bold mb-6">Curriculum List</h2>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["S.N", "Class Name", "PDF", "Actions"].map((header, i) => (
                <th
                  key={i}
                  className="py-4 px-5 text-center text-xs font-semibold uppercase text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedCurriculum.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-5 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-3 px-5 text-center font-medium">{item.className}</td>
                <td className="py-3 px-5 text-center">
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Syllabus
                  </a>
                </td>
                <td className="py-3 px-3 text-center relative">
                  <button
                    onClick={(e) => toggleDropdown(e, item.id)}
                    className="dropdown-button inline-flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    <MdMoreVert size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {curriculum.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Dropdown actions */}
      {open && (
        <div
          className="dropdown-menu fixed z-50 w-40 bg-white border rounded-lg shadow"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <button
            onClick={() => navigate(`/curriculum/view/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center"
          >
            <MdVisibility /> View
          </button>

          <button
            onClick={() => navigate(`/curriculum/edit/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-green-700 items-center"
          >
            <MdEdit /> Edit
          </button>
        </div>
      )}

      {/* View Modal */}
      {selectedViewItem && (
        <ViewCurriculum
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/curriculum");
          }}
        />
      )}

      {/* Edit Modal */}
      {selectedEditItem && (
        <EditCurriculum
          item={selectedEditItem}
          onUpdate={(updated) =>
            setCurriculum((prev) =>
              prev.map((m) => (m.id === updated.id ? updated : m))
            )
          }
          onClose={() => {
            setEditId(null);
            navigate("/curriculum");
          }}
        />
      )}
    </div>
  );
}
