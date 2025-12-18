import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdEdit,
  MdMoreVert,
  MdVisibility,
  MdAdd,
} from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ViewTeam from "./ViewTeam";
import EditTeam from "./EditTeam";
import Pagination from "../../Ui/Pagination";

export default function TeamTable() {
  const navigate = useNavigate();

  const mockData = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO",
      imageid: "/stufour.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO",
      imageid: "/stutwo.jpg"
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "Designer",
      imageid: "/stuone.jpg"
    },
  ];

  const [teamData, setTeamData] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(teamData.length / itemsPerPage);
  const paginatedTeam = teamData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const dropdownHeight = 120;

    let topPosition =
      spaceBelow < dropdownHeight
        ? rect.top + window.scrollY - dropdownHeight - 5
        : rect.bottom + window.scrollY + 5;

    setDropdownPos({
      top: topPosition,
      left: rect.left + window.scrollX - 100,
    });

    if (open && selectedId === id) {
      setOpen(false);
      setSelectedId(null);
    } else {
      setOpen(true);
      setSelectedId(id);
    }
  };

  const handleDelete = (id) => {
    setTeamData(teamData.filter((member) => member.id !== id));
    setShowDeleteModal(false);
    setOpen(false);
    setSelectedId(null);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "—";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="flex flex-col my-18">
      <div className="md:flex md:justify-between  flex flex-col gap-3 md:items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Team Management</h2>
        <button
          onClick={() => navigate("/addteam")}
          className="bg-[#0B0C28] hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition cursor-pointer duration-500 flex items-center gap-2"
        >
          <MdAdd size={18} />
          Add Team Member
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Image","Team Member", "Position", "Description", "Actions"].map(
                (header, i) => (
                  <th
                    key={i}
                    className={`py-4 px-5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 ${
                      header === "Actions" ? "text-center" : ""
                    }`}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedTeam.length > 0 ? (
              paginatedTeam.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition duration-150 text-sm">

                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                     
                        <img
                          src={member.imageid}
                          alt={member.name}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                        /> 
                    </div>
                  </td>

                  <td className="py-3 px-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {member.name}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {member.position}
                    </span>
                  </td>

                  <td className="py-3 px-5 text-gray-600 max-w-xs">
                    <div className="line-clamp-2 leading-relaxed">
                      {truncateText(member.description)}
                    </div>
                  </td>

                 

                  {/* Actions */}
                  <td className="py-3 px-3 text-center relative">
                    <button
                      onClick={(e) => toggleDropdown(e, member.id)}
                      className="dropdown-button inline-flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition duration-200"
                    >
                      <MdMoreVert size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-16 px-4 text-center text-gray-400">
                  <p>No Team Members Found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {teamData.length > itemsPerPage && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[10vh] shadow-2xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Team Member</h3>
            <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete this team member?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {open && (
        <div
          className="dropdown-menu fixed z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1"
          style={{ top: dropdownPos.top, left: dropdownPos.left, maxHeight: "140px" }}
        >
          <button
  onClick={() => {
    const selectedMember = teamData.find(m => m.id === selectedId);
    navigate(`/team/view/${selectedId}`, {
      state: { member: selectedMember }
    });
    setOpen(false);
  }}
  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-blue-700 text-sm"
>
  <MdVisibility size={16} /> View
</button>
<button
  onClick={() => {
    const selectedMember = teamData.find(m => m.id === selectedId);
    navigate(`/team/edit/${selectedId}`, {
      state: { member: selectedMember }
    });
    setOpen(false);
  }}
  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-green-700 text-sm"
>
  <MdEdit size={16} /> Edit
</button>

          <button
            onClick={() => {
              setOpen(false);
              setShowDeleteModal(true);
            }}
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-red-600 text-sm"
          >
            <MdDelete size={16} /> Delete
          </button>
        </div>
      )}

      {/* Modals */}
      {viewItem && <ViewTeam member={viewItem} onClose={() => setViewItem(null)} />}
      {editItem && <EditTeam member={editItem} onClose={() => setEditItem(null)} onUpdate={() => {}} />}
    </div>
  );
}
