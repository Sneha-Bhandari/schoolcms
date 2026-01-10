import React, { useState, useEffect } from "react";
import {
  MdAdd,
  MdMoreVert,
  MdVisibility,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Pagination from "../../Ui/Pagination";
import ViewTeam from "./ViewTeam";
import EditTeamForm from "./EditTeam";

export default function TeamTable() {
  const navigate = useNavigate();
  const params = useParams();

  const [teamData, setTeamData] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "CEO",
      image: "/stufour.jpg",
      facebooklink: "https://www.facebook.com",
      instagramlink: "https://www.instagram.com",
      linkedinlink: "https://www.linkedin.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO",
      image: "/stutwo.jpg",
      facebooklink: "https://www.facebook.com",
      instagramlink: "https://www.instagram.com",
      linkedinlink: "https://www.linkedin.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "Designer",
      image: "/stuone.jpg",
      facebooklink: "https://www.facebook.com",
      instagramlink: "https://www.instagram.com",
      linkedinlink: "https://www.linkedin.com",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(teamData.length / itemsPerPage);
  const paginatedTeam = teamData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const selectedViewItem = teamData.find((t) => t.id === viewId);
  const selectedEditItem = teamData.find((t) => t.id === editId);

  // Handle route params for view/edit
  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);
    if (window.location.pathname.includes("/team/view")) setViewId(id);
    if (window.location.pathname.includes("/team/edit")) setEditId(id);
  }, [params]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownOpen &&
        !e.target.closest(".dropdown-button") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setDropdownOpen(false);
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const toggleDropdown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left - 100,
    });
    setSelectedId(id);
    setDropdownOpen(true);
  };

  const handleDelete = (id) => {
    setTeamData((prev) => prev.filter((t) => t.id !== id));
    setConfirmDeleteId(null);
    setDropdownOpen(false);
    setSelectedId(null);
    toast.success("Team member deleted successfully!");
  };

  return (
    <div className="w-11/12 mx-auto py-8 relative">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-semibold underline underline-offset-2">
          Team Management
        </h2>
        <p className="text-gray-500 text-xs">
          Team member info: image, position, and social links
        </p>
      </div>

      <button
        onClick={() => navigate("/team/add")}
        className="bg-[#0B0C28] hover:bg-blue-700 mb-5 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center gap-2"
      >
        <MdAdd size={18} /> Add Team Member
      </button>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-center">
          <thead className="bg-gray-50 uppercase text-sm text-gray-600">
            <tr>
              {["Image", "Name", "Position", "Links", "Actions"].map((h) => (
                <th key={h} className="py-3 px-6 text-xs font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTeam.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="py-3 px-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-14 h-14 object-cover rounded-lg border mx-auto"
                  />
                </td>
                <td className="py-3 px-2 font-medium">{member.name}</td>
                <td className="py-3 px-2">
                  <span className="bg-red-100 px-3 py-1 rounded-full text-xs">
                    {member.position}
                  </span>
                </td>
                <td className="py-3 px-2 flex gap-2 h-full mt-5   items-center justify-center">
                  {member.facebooklink || member.instagramlink || member.linkedinlink ? (
                    <>
                      {member.facebooklink && <FaFacebookF />}
                      {member.instagramlink && <FaInstagram />}
                      {member.linkedinlink && <FaLinkedinIn />}
                    </>
                  ) : (
                    <span className="text-gray-400">No links</span>
                  )}
                </td>
                <td className="py-3 px-2 relative">
                  <button
                    onClick={(e) => toggleDropdown(e, member.id)}
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

      {teamData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {dropdownOpen && selectedId && (
        <div
          className="dropdown-menu fixed z-50 w-32 bg-white border rounded-lg shadow"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <button
            onClick={() => navigate(`/team/view/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 items-center text-blue-700"
          >
            <MdVisibility /> View
          </button>

          <button
            onClick={() => navigate(`/team/edit/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 items-center text-green-700"
          >
            <MdEdit /> Edit
          </button>

          <button
            onClick={() => setConfirmDeleteId(selectedId)}
            className="w-full px-4 py-2 flex gap-2 items-center text-red-600"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {selectedViewItem && (
        <ViewTeam
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/team");
          }}
        />
      )}

      {selectedEditItem && (
        <EditTeamForm
          item={selectedEditItem}
          onUpdate={(updated) =>
            setTeamData((prev) =>
              prev.map((t) => (t.id === updated.id ? updated : t))
            )
          }
          onClose={() => {
            setEditId(null);
            navigate("/team");
          }}
        />
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete?
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
