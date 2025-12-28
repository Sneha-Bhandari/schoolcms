import React, { useState, useEffect } from "react";
import { MdAdd, MdMoreVert, MdVisibility,MdDelete, MdEdit, } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Pagination from "../../Ui/Pagination";
import ViewTeam from "./ViewTeam";
import EditTeamForm from "./EditTeam";


const mockTeamData = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO",
    imageid: "/stufour.jpg",
    facebooklink: "https://www.facebook.com",
    instagramlink: "https://www.instagram.com",
    linkedinlink: "https://www.linkedin.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CTO",
    imageid: "/stutwo.jpg",
    facebooklink: "https://www.facebook.com",
    instagramlink: "https://www.instagram.com",
    linkedinlink: "https://www.linkedin.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    position: "Designer",
    imageid: "/stuone.jpg",
    facebooklink: "https://www.facebook.com",
    instagramlink: "https://www.instagram.com",
    linkedinlink: "https://www.linkedin.com",
  },
  {
    id: 4,
    name: "John Doe",
    position: "CEO",
    imageid: "/stufour.jpg",
    facebooklink: "https://www.facebook.com",
    instagramlink: "https://www.instagram.com",
    linkedinlink: "https://www.linkedin.com",
  },
  {
    id: 5,
    name: "Jane Smith",
    position: "CTO",
    imageid: "/stutwo.jpg",
    facebooklink: "https://www.facebook.com",
    instagramlink: "https://www.instagram.com",
    linkedinlink: "https://www.linkedin.com",
  },
];

export default function TeamTable() {
  const navigate = useNavigate();
  const params = useParams();

  const [teamData, setTeamData] = useState(mockTeamData);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuStyle, setMenuStyle] = useState({});

  const itemsPerPage = 3;
  const totalPages = Math.ceil(teamData.length / itemsPerPage);

  const paginatedTeam = teamData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  

useEffect(() => {
  const id = parseInt(params.id);
  if (!id) return;

  if (window.location.pathname.includes("/team/view/")) setViewId(id);
  if (window.location.pathname.includes("/team/edit/")) setEditId(id);
}, [params]);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setTeamData((prev) => prev.filter((m) => m.id !== id));
      toast.success("Team member deleted");
    }
  };

  const openMenu = (id, e) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < 150;

    setMenuStyle({
      position: "fixed",
      top: openUp ? rect.top - 140 : rect.bottom + 8,
      left: rect.right - 140,
      zIndex: 1000,
    });

    setOpenMenuId(openMenuId === id ? null : id);
  };

  const selectedViewItem = teamData.find((m) => m.id === viewId);
  const selectedEditItem = teamData.find((m) => m.id === editId);

  return (
    <div className="w-11/13 mx-auto ">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Team Management</h2>
      <p className="text-sm text-gray-400 mb-5">
        Team members info: image, position, and social links.
      </p>

      <button
        onClick={() => navigate("/team/add")}
        className="bg-[#0B0C28] hover:bg-blue-700 cursor-pointer transition-colors duration-500 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 mb-6"
      >
        <MdAdd size={18} /> Add Team Member
      </button>

      <div className=" overflow-x-auto border border-gray-200 rounded-xl ">
        <table className="min-w-full border-0  border-gray-300  ">
          <thead className="bg-gray-300 border border-gray-300 ">
            <tr>
              {["Image", "Name", "Position", "Links", "Actions"].map((h) => (
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

          <tbody className="bg-white border border-gray-300">
            {paginatedTeam.map((m) => (
              <tr
                key={m.id}
                className=" hover:bg-blue-100 border-b border-gray-200"
              >
                <td className="py-3 px-5">
                  <img
                    src={m.imageid}
                    alt={m.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </td>
                <td className="py-3 px-5 font-medium">{m.name}</td>
                <td className="py-3 px-5">
                  <span className="bg-red-100 px-3 py-1 rounded-full text-xs">
                    {m.position}
                  </span>
                </td>
                <td className="py-3 px-5 flex  gap-2 items-center mt-6 mx-auto">
                  {m.facebooklink || m.instagramlink || m.linkedinlink ? (
                    <>
                      {" "}
                      <FaFacebookF /> <FaInstagram /> <FaLinkedinIn />{" "}
                    </>
                  ) : (
                    <span className="text-gray-400">No links</span>
                  )}{" "}
                </td>

                <td className="py-3 text-center ">
                  <button
                    onClick={(e) => openMenu(m.id, e)}
                    className="p-2 rounded-full  hover:bg-gray-50 cursor-pointer"
                  >
                    <MdMoreVert />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openMenuId && (
        <div
          className="fixed inset-0 z-10 "
          onClick={() => setOpenMenuId(null)}
        />
      )}

      {openMenuId && (
        <div
          style={menuStyle}
          className="w-32 bg-white border shadow-lg rounded-lg"
        >
          <button
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-blue-700 text-sm"
            onClick={() => {
              setOpenMenuId(null);
              navigate(`/team/view/${openMenuId}`);
            }}
          >
             <MdVisibility size={16} /> View
          </button>

          <button
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-green-700 text-sm"
            onClick={() => {
              setOpenMenuId(null);
              navigate(`/team/edit/${openMenuId}`);
            }}
          >
             <MdEdit size={16} /> Edit
          </button>
          <button
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-red-700 text-sm"
            onClick={() =>{ handleDelete(openMenuId)
            setOpenMenuId(null);
          
             }} >
            <MdDelete size={16} /> Delete
          </button>
        </div>
      )}

      {teamData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
          onClose={() => {
            setEditId(null);
            navigate("/team");
          }}
        />
      )}
    </div>
  );
}
