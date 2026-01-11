import React, { useState, useEffect } from "react";
import { MdEdit, MdVisibility, MdDelete, MdMoreVert } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ViewItems from "./ViewItems";
import EditItems from "./EditItems";

const defaultFacilities = [
  {
    id: 1,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14.25c2.5 0 4.5-2 4.5-4.5S14.5 5.25 12 5.25 7.5 7.25 7.5 9.75s2 4.5 4.5 4.5z"/>
    </svg>`,
    title: "Certified Teachers",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
];

export default function Items() {
  const navigate = useNavigate();
  const params = useParams();

  const [facilities, setFacilities] = useState(defaultFacilities);
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const selectedItem = facilities.find((i) => i.id === viewId);
  const selectedEditItem = facilities.find((i) => i.id === editId);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);

    if (window.location.pathname.includes("/details/view")) setViewId(id);
    if (window.location.pathname.includes("/details/edit")) setEditId(id);
  }, [params]);

  const handleUpdate = (updated) => {
    if (editId === "new") {
      if (facilities.length >= 4) {
        alert("Maximum 4 facilities allowed");
        return;
      }
      setFacilities((prev) => [...prev, { ...updated, id: Date.now() }]);
    } else {
      setFacilities((prev) =>
        prev.map((i) => (i.id === editId ? { ...i, ...updated } : i))
      );
    }
    setEditId(null);
    navigate("/details");
  };

  const handleDelete = (id) => {
    setFacilities((prev) => prev.filter((i) => i.id !== id));
    setConfirmDeleteId(null);
    setOpen(false);
    setSelectedId(null);
  };

  useEffect(() => {
    const close = (e) => {
      if (
        open &&
        !e.target.closest(".dropdown-button") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setOpen(false);
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const toggleDropdown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 5, left: rect.left - 80 });
    setSelectedId(id);
    setOpen(true);
  };

  const headers = ["Icon", "Title", "Description", "Actions"];

  return (
    <div className="w-11/12 mx-auto py-8 relative">
      <h2 className="text-2xl font-semibold underline mb-2">Details Section</h2>
      <p className="text-xs text-gray-400 mb-4">
        SVG icon, title & description (Max 4)
      </p>

      <button
        onClick={() => navigate("/details/add")}
        className="bg-linear-to-r from-[#0B0C28] to-cyan-400 mb-4 text-white px-5 py-2 rounded-lg cursor-pointer"
      >
        Add Details
      </button>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50  uppercase text-sm text-gray-600">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="py-3 px-6 text-xs font-semibold text-center"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {facilities.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="w-14 h-12 object-cover rounded-lg">
                  <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                </td>
                <td className="py-3 px-4 font-semibold ">{item.title}</td>
                <td className="py-3 px-4 text-sm text-gray-600  truncate">
                  {item.description}
                </td>
                <td className="py-3 px-3 text-center relative">
                  <button
                    onClick={(e) => toggleDropdown(e, item.id)}
                    className="dropdown-button inline-flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                  >
                    <MdMoreVert size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          className="dropdown-menu fixed bg-white border rounded shadow w-32  "
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <button
            onClick={() => navigate(`/details/view/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center cursor-pointer"
          >
            <MdVisibility /> View
          </button>
          <button
            onClick={() => navigate(`/details/edit/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-green-700  items-center cursor-pointer"
          >
            <MdEdit /> Edit
          </button>
          <button
            onClick={() => setConfirmDeleteId(selectedId)}
            className="w-full px-4 py-2 flex gap-2 text-red-600  items-center cursor-pointer"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {viewId && (
        <ViewItems
          item={selectedItem}
          onClose={() => {
            setViewId(null);
            navigate("/details");
          }}
        />
      )}

      {editId && (
        <EditItems
          item={
            editId === "new"
              ? { icon: "", title: "", description: "" }
              : selectedEditItem
          }
          onUpdate={handleUpdate}
          onClose={() => {
            setEditId(null);
            navigate("/details");
          }}
        />
      )}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this items?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold"
              >
                Yes
              </button>

              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
    
  );
}
