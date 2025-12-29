import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import Pagination from "../../Ui/Pagination";
// import ViewEvent from "./ViewEvent";
// import EditEvent from "./EditEvent";
import { useNavigate, useParams } from "react-router-dom";
import ViewAcademicProgram from "./ViewAcademicProgram";
import EditAcademicProgram from "./EditAcademicProgram";

export default function AcademicProgramTable() {
  const navigate = useNavigate();
  const params = useParams();
  const [academicData, setAcademicData] = useState([
    {
        id: 1,
        academicimageid: "/aca2.jpg",
        title: "Highlights from the Annual Sports Day 2025",
        academicdescription:
          "Our Foundational Learning Programme focuses on developing strong literacy, numeracy, and social skills. Through interactive lessons, play-based learning, and activity-oriented teaching. Students also engage in creative activities to foster problem-solving skills, confidence, and teamwork. This program lays a strong foundation for lifelong learning and holistic development.",
        academicduration: "1 Month",
        keyfeatures: [
          "Activity Based Learning",
          "Phonics & Early Math Skills",
          "Interactive Classrooms"
        ]
      },
      {
        id: 2,
        academicimageid: "/aca2.jpg",
        title: "Highlights from the Annual Sports Day 2025",
        academicdescription:
          "Our Foundational Learning Programme focuses on developing strong literacy, numeracy, and social skills. Through interactive lessons, play-based learning, and activity-oriented teaching. Students also engage in creative activities to foster problem-solving skills, confidence, and teamwork. This program lays a strong foundation for lifelong learning and holistic development.",
        academicduration: "1 Month",
        keyfeatures: [
          "Activity Based Learning",
          "Phonics & Early Math Skills",
          "Interactive Classrooms"
        ]
      },
      {
        id: 3,
        academicimageid: "/aca2.jpg",
        title: "Highlights from the Annual Sports Day 2025",
        academicdescription:
          "Our Foundational Learning Programme focuses on developing strong literacy, numeracy, and social skills. Through interactive lessons, play-based learning, and activity-oriented teaching. Students also engage in creative activities to foster problem-solving skills, confidence, and teamwork. This program lays a strong foundation for lifelong learning and holistic development.",
        academicduration: "1 Month",
        keyfeatures: [
          "Activity Based Learning",
          "Phonics & Early Math Skills",
          "Interactive Classrooms"
        ]
      },
      {
        id: 4,
        academicimageid: "/aca2.jpg",
        title: "Highlights from the Annual Sports Day 2025",
        academicdescription:
          "Our Foundational Learning Programme focuses on developing strong literacy, numeracy, and social skills. Through interactive lessons, play-based learning, and activity-oriented teaching. Students also engage in creative activities to foster problem-solving skills, confidence, and teamwork. This program lays a strong foundation for lifelong learning and holistic development.",
        academicduration: "1 Month",
        keyfeatures: [
          "Activity Based Learning",
          "Phonics & Early Math Skills",
          "Interactive Classrooms"
        ]
      },
      {
        id: 5,
        academicimageid: "/aca2.jpg",
        title: "Highlights from the Annual Sports Day 2025",
        academicdescription:
          "Our Foundational Learning Programme focuses on developing strong literacy, numeracy, and social skills. Through interactive lessons, play-based learning, and activity-oriented teaching. Students also engage in creative activities to foster problem-solving skills, confidence, and teamwork. This program lays a strong foundation for lifelong learning and holistic development.",
        academicduration: "1 Month",
        keyfeatures: [
          "Activity Based Learning",
          "Phonics & Early Math Skills",
          "Interactive Classrooms"
        ]
      },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const selectedViewItem = academicData.find((m) => m.id === viewId);
  const selectedEditItem = academicData.find((m) => m.id === editId);

  const itemsPerPage = 3;

  const totalPages = Math.ceil(academicData.length / itemsPerPage);
  const paginatedAcademic = academicData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);
  
    if (window.location.pathname.includes("/ouracademicprogram/view"))
      setViewId(id);
  
    if (window.location.pathname.includes("/ouracademicprogram/edit"))
      setEditId(id);
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
    if (window.confirm("Are you sure you want to delete this academic program?")) {
        setAcademicData((prev) => prev.filter((m) => m.id !== id));
      setOpen(false); 
      setSelectedId(null);
    }
  };

  

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "—";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-11/12 mx-auto py-12 relative md:ml-16 ml-0">
      <div>
        <div className="md:flex   justify-start md:justify-between md:items-start gap-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 underline underline-offset-3">Academic Programs Lists</h2>
          <button
            onClick={() => navigate("/addacademicprogram")}
            className="bg-[#0B0C28] hover:bg-blue-700 cursor-pointer transition-colors duration-500 text-white font-semibold py-2.5 px-6 rounded-lg"
          >
            Add Program
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-300">
              <tr>
                {[
                  "Image",
                  "Title",
                  "Description",
                  "Duration",
                  "Features",
                  "Actions",
                ].map((header, i) => (
                  <th
                    key={i}
                    className={`py-3 px-4 text-center text-xs font-semibold uppercase text-gray-600 ${
                      header === "Actions" ? "text-center" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100 text-center">
              {paginatedAcademic.map((academic) => (
                <tr key={academic.id} className="hover:bg-gray-50 text-start">
                  <td className="py-3 px-5">
                    <img
                      src={academic.academicimageid}
                      alt={academic.title}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="py-3 px-2 text-sm text-gray-800 truncate max-w-52 ">
                    {academic.title}
                  </td>

                  <td className="py-3 px-5 text-gray-600 max-w-38 truncate">
                    <div className="">
                      {truncateDescription(academic.academicdescription)}
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold
                      "
                    >
                      {academic.academicduration}
                    </span>
                  </td>

                  <td className="py-3 px-5 text-sm">
                  <ul className="list-disc list-inside space-y-1 line-clamp-1 text-gray-700 text-left">
                    {academic.keyfeatures?.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </td>

                  
                 

                  <td className="py-3 px-3 text-center relative">
                    <button
                      onClick={(e) => toggleDropdown(e, academic.id)}
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

        {academicData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {open && (
          <div
            className="dropdown-menu fixed z-50 w-40 bg-white border rounded-lg shadow"
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
          >
            <button
              onClick={() =>{
                navigate(`/ouracademicprogram/view/${selectedId}`);
                setOpen(null);

              } }
              className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center"
            >
              <MdVisibility /> View
            </button>

            <button
              onClick={() => {
                navigate(`/ouracademicprogram/edit/${selectedId}`);
                setOpen(null);

              }}
              className="w-full px-4 py-2 flex gap-2 text-green-700 items-center"
            >
              <MdEdit /> Edit
            </button>

            <button
              onClick={() => {
                handleDelete(selectedId);
                setOpen(null);
              }}
              className="w-full px-4 py-2 flex gap-2 text-red-600 items-center"
            >
              <MdDelete /> Delete
            </button>
          </div>
        )}
      </div>

      {selectedViewItem && (
        <ViewAcademicProgram
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/ouracademicprogram");
          }}
        />
      )}

      {selectedEditItem && (
        <EditAcademicProgram
          item={selectedEditItem}
          onUpdate={(updated) =>
            setAcademicData((prev) =>
            prev.map((m) => (m.id === updated.id ? updated : m))
          
            )
          }
          onClose={() => {
            setEditId(null);
            navigate("/ouracademicprogram");
          }}
        />
      )}
    </div>
  );
}
