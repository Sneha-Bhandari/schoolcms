import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import toast from "react-hot-toast";
import Pagination from "../../Ui/Pagination";
import ViewFaqPage from "./ViewFaqPage";
import EditFaqForm from "./EditFaqForm";

const mockFaqData = [
  {
    id: 1,
    question: "What is the admission process?",
    answer: "The admission process involves registration, tests, and interviews.",
  },
  {
    id: 2,
    question: "What are the eligibility criteria?",
    answer: "Eligibility criteria vary depending on the program and grade.",
  },
  {
    id: 3,
    question: "How to contact the administration?",
    answer: "You can contact the administration via email or phone.",
  },
  {
    id: 4,
    question: "Are there any scholarships available?",
    answer: "Yes, scholarships are offered based on merit and need.",
  },
  {
    id: 5,
    question: "What extracurricular activities are provided?",
    answer: "We offer sports, music, arts, and clubs for students.",
  },
];

export default function FaqTable() {
  const navigate = useNavigate();
  const params = useParams();

  const [faqData, setFaqData] = useState(mockFaqData);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const itemsPerPage = 3;

  const totalPages = Math.ceil(faqData.length / itemsPerPage);
  const paginatedFaqs = faqData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const id = parseInt(params.id);
    if (!id) return;

    if (window.location.pathname.includes("/faq/view/")) setViewId(id);
    if (window.location.pathname.includes("/faq/edit/")) setEditId(id);
  }, [params]);

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
    const dropdownHeight = 120;
    const spaceBelow = window.innerHeight - rect.bottom;

    const topPosition =
      spaceBelow < dropdownHeight
        ? rect.top + window.scrollY - dropdownHeight - 5
        : rect.bottom + window.scrollY + 5;

    setDropdownPos({
      top: topPosition,
      left: rect.left + window.scrollX - 100,
    });

    setOpen(open && selectedId === id ? false : true);
    setSelectedId(open && selectedId === id ? null : id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setTeamData((prev) => prev.filter((m) => m.id !== id));
      toast.success("Team member deleted");
    }
  };

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const selectedViewItem = faqData.find((f) => f.id === viewId);
  const selectedEditItem = faqData.find((f) => f.id === editId);

  return (
    <div className="w-11/12 py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">FAQ Section</h2>
        <button
          onClick={() => navigate("/faq/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg"
        >
          Add FAQ
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["#", "Question", "Answer", "Actions"].map((h) => (
                <th
                  key={h}
                  className={`py-4 px-5 text-xs font-semibold uppercase text-gray-600 ${
                    h === "Actions" ? "text-center" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedFaqs.map((faq, index) => (
              <tr key={faq.id} className="hover:bg-gray-50 text-sm">
                <td className="py-3 px-5">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-3 px-5 font-medium max-w-xs">
                  {truncateText(faq.question)}
                </td>
                <td className="py-3 px-5 max-w-xs">
                  {truncateText(faq.answer)}
                </td>
                <td className="py-3 px-2  text-center ">
                  <button
                    onClick={(e) => toggleDropdown(e, faq.id)}
                    className="dropdown-button h-8 w-8  "
                  >
                    <h1 className="rounded-full bg-gray-100 p-2"><MdMoreVert /></h1>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {faqData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {open && (
        <div
          className="dropdown-menu fixed z-50 w-40 bg-white border rounded-lg shadow-xl"
          style={dropdownPos}
        >
          <button
            onClick={() => navigate(`/faq/view/${selectedId}`)}
            className="w-full px-4 py-2 text-left flex items-center gap-2 text-blue-600"
          >
            <MdVisibility /> View
          </button>
          <button
            onClick={() => navigate(`/faq/edit/${selectedId}`)}
            className="w-full px-4 py-2 text-left  flex items-center gap-2 text-green-600"
          >
            <MdEdit /> Edit
          </button>
          <button
            onClick={() => handleDelete(setOpen)}
   
            className="w-full px-4 py-2 text-left  flex items-center gap-2 text-red-600"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {selectedViewItem && (
        <ViewFaqPage
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/faq");
          }}
        />
      )}

     
{selectedEditItem && (
  <EditFaqForm
    item={selectedEditItem}
    onUpdate={(updated) =>
      setFaqData((prev) =>
        prev.map((f) => (f.id === updated.id ? updated : f))
      )
    }
    onClose={() => {
      setEditId(null);
      navigate("/faq");
    }}
  />
)}
    </div>
  );
}
