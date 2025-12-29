import React, { useState, useEffect } from "react";
import ViewFacilities from "./ViewFacilities";
import EditFacilities from "./EditFacilities";
import AddFacilities from "./AddFacilities";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdMoreVert,
  MdVisibility,
  MdEdit,
  MdDelete,
  MdAdd,
} from "react-icons/md";
import Pagination from "../../Ui/Pagination";

const defaultFacilities = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14.25c2.5 0 4.5-2 4.5-4.5S14.5 5.25 12 5.25 7.5 7.25 7.5 9.75s2 4.5 4.5 4.5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 14.25H9c-3.3 0-6 2.7-6 6h18c0-3.3-2.7-6-6-6z"
        />
      </svg>
    ),
    title: "Safety First",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia.",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-green-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12M6 12h12"
        />
      </svg>
    ),
    title: "Regular Classes",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-purple-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5h15M4.5 4.5h15M9 4.5v15m6-15v15"
        />
      </svg>
    ),
    title: "Certified Teachers",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"
        />
      </svg>
    ),
    title: "Sufficient Classrooms",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 5,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"
        />
      </svg>
    ),
    title: "Creative Lessons",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 6,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"
        />
      </svg>
    ),
    title: "Sports Facilities",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
];

export default function FacilitiesList() {
  const navigate = useNavigate();
  const params = useParams();

  const [facilities, setFacilities] = useState(defaultFacilities);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedViewItem = facilities.find((m) => m.id === viewId);
  const selectedEditItem = facilities.find((m) => m.id === editId);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(facilities.length / itemsPerPage);
  const paginatedFacilities = facilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const { id } = params;
    if (!id) return;
    const numId = parseInt(id);
    if (window.location.pathname.includes("/ourfacilities/view"))
      setViewId(numId);
    if (window.location.pathname.includes("/ourfacilities/edit"))
      setEditId(numId);
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
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left - 100,
    });
    setSelectedId(id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      setFacilities((prev) => prev.filter((m) => m.id !== id));
      setOpen(false);
      setSelectedId(null);
    }
  };

  const handleUpdate = (updated) => {
    setFacilities((prev) =>
      prev.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            ...updated,
            icon: updated.svg ? (
              <span
                dangerouslySetInnerHTML={{ __html: updated.svg }}
                className="w-12 h-12 text-blue-600 inline-block"
              />
            ) : (
              item.icon
            ),
          };
        }
        return item;
      })
    );
    setEditId(null);
  };

  const normalizeSvg = (svg) => {
    if (!svg) return svg;
    return svg
      .replace(/width="[^"]*"/gi, "")
      .replace(/height="[^"]*"/gi, "")
      .replace(/fill="[^"]*"/gi, 'fill="none"')
      .replace(
        "<svg",
        `<svg class="w-12 h-12 text-blue-600" stroke="currentColor" preserveAspectRatio="xMidYMid meet"`
      );
  };

  return (
    <div className="w-11/12 mx-auto py-12 relative ">
      <div className="flex flex-col justify-start items-start mb-8 gap-2  ">
        <h2 className="text-2xl font-bold text-gray-800">Facilities List</h2>
        <p className="text-sm  text-gray-400 mb-5">This section includes icons,tile and descriptions</p>
        <button
          onClick={() => navigate("/addfacilities")}
          className="bg-[#0B0C28] hover:bg-blue-700 cursor-pointer transition-colors duration-500 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center gap-2"
        >
          <MdAdd /> Add Facility
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              {["Icon", "Title", "Description", "Actions"].map((header, i) => (
                <th
                  key={i}
                  className={`py-3 px-5 text-center text-xs font-semibold uppercase text-gray-600 ${
                    header === "Actions" ? "text-center" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedFacilities.map((facility) => (
              <tr key={facility.id} className="hover:bg-gray-50">
                <td className="py-3 px-5">{facility.icon}</td>
                <td className="py-3 px-5 font-semibold text-gray-800">
                  {facility.title}
                </td>
                <td className="py-3 px-5 text-gray-600 max-w-xs  truncate">
                  {facility.description}
                </td>
                <td className="py-3 px-3 text-center relative">
                  <button
                    onClick={(e) => toggleDropdown(e, facility.id)}
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

      {facilities.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {open && selectedId && (
        <div
          className="dropdown-menu fixed z-50 w-40 bg-white border rounded-lg shadow"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <button
            onClick={() => {
              setShowAddForm(false); 
              setOpen(false); 
              navigate(`/ourfacilities/view/${selectedId}`);
            }}
            className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center"
          >
            <MdVisibility /> View
          </button>
          <button
            onClick={() => {
              setShowAddForm(false); 
              setOpen(false);
              navigate(`/ourfacilities/edit/${selectedId}`);
            }}
            className="w-full px-4 py-2 flex gap-2 text-green-700 items-center"
          >
            <MdEdit /> Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              handleDelete(selectedId);
            }}
            className="w-full px-4 py-2 flex gap-2 text-red-600 items-center"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {selectedViewItem && (
        <ViewFacilities
          item={selectedViewItem}
          onClose={() => setViewId(null)}
        />
      )}
      {selectedEditItem && (
        <EditFacilities
          item={selectedEditItem}
          onUpdate={handleUpdate}
          onClose={() => setEditId(null)}
        />
      )}
      {showAddForm && (
        <AddFacilities
          onSubmit={(values) => {
            if (!values.title.trim() || !values.description.trim()) {
              alert("Title and Description are required");
              return;
            }
            const newFacility = {
              id: Date.now(),
              icon: normalizeSvg(values.svg),
              title: values.title,
              description: values.description,
            };
            setFacilities((prev) => [...prev, newFacility]);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
