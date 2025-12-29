import React, { useState, useEffect } from "react";
import {  MdEdit, MdVisibility } from "react-icons/md";

import ViewItems from "./ViewItems";
import EditItems from "./EditItems";
import { MdMoreVert } from "react-icons/md";

const defaultFacilities = [
  {
    id: 1,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14.25c2.5 0 4.5-2 4.5-4.5S14.5 5.25 12 5.25 7.5 7.25 7.5 9.75s2 4.5 4.5 4.5z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 14.25H9c-3.3 0-6 2.7-6 6h18c0-3.3-2.7-6-6-6z"/>
    </svg>`,
    title: "Certified Teachers",
    description: "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 2,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M6 12h12"/>
    </svg>`,
    title: "Special Education",
    description: "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 3,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5h15M4.5 4.5h15M9 4.5v15m6-15v15"/>
    </svg>`,
    title: "Book & Library",
    description: "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 4,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"/>
    </svg>`,
    title: "Sport Clubs",
    description: "Even the all-powerful Pointing has no control about the blind texts.",
  },
];

export default function Items() {
  const [facilities, setFacilities] = useState(defaultFacilities);

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const selectedItem = facilities.find((i) => i.id === viewId);
  const selectedEditItem = facilities.find((i) => i.id === editId);

  const handleUpdate = (updated) => {
    setFacilities((prev) =>
      prev.map((item) => (item.id === editId ? { ...item, ...updated } : item))
    );
    setEditId(null);
  };

  useEffect(() => {
    if (selectedItem || selectedEditItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [selectedItem, selectedEditItem]);

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
      left: rect.left - 80,
    });
    setSelectedId(id);
    setOpen(true);
  };

  return (
    <div className="w-11/12 mx-auto gap-12 flex flex-col  md:ml-16 my-6 relative">
      <div>
        <h2 className="text-2xl font-semibold underline">Details Section</h2>
        <p className="text-sm text-gray-400">
          This Section includes SVG, Title and Description
        </p>
      </div>

      <div className="overflow-x-auto shadow-sxl rounded-xl border border-gray-300 w-11/12">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              {["Icon", "Title", "Description", "Actions"].map((h) => (
                <th
                  key={h}
                  className="py-3 px-5 text-center text-xs font-semibold uppercase text-gray-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {facilities.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-4 px-5 text-center">
                  <div
                    className="w-10 h-10 mx-auto"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </td>

                <td className="py-4 px-5 text-sm font-semibold text-gray-800">
                  {item.title}
                </td>

                <td className="py-4 px-5 text-gray-600 text-sm max-w-md truncate">
                  {item.description}
                </td>

                <td className="py-4 px-5 text-center">
                  <button
                    onClick={(e) => toggleDropdown(e, item.id)}
                    className="dropdown-button inline-flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                  >
                    <MdMoreVert />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          className="dropdown-menu fixed z-50 w-32 bg-white border rounded-lg shadow"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <button
            onClick={() => {
              setViewId(selectedId);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2  text-blue-700 text-sm text-left"
          >
            <MdVisibility />  View
          </button>

          <button
            onClick={() => {
              setEditId(selectedId);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2  px-4 py-2 text-green-700 text-sm text-left"
          >
           <MdEdit/> Edit
          </button>
        </div>
      )}

      {selectedItem && (
        <ViewItems
          item={selectedItem}
          onClose={() => setViewId(null)}
          onEdit={() => {
            setEditId(selectedItem.id);
            setViewId(null);
          }}
        />
      )}

      {selectedEditItem && (
        <EditItems
          item={selectedEditItem}
          onUpdate={handleUpdate}
          onClose={() => setEditId(null)}
        />
      )}
    </div>
  );
}
