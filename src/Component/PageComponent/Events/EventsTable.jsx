import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import Pagination from "../../Ui/Pagination";
import ViewEvent from "./ViewEvent";
import EditEvent from "./EditEvent";
import { useNavigate, useParams } from "react-router-dom";

export default function EventsTable() {
  const navigate = useNavigate();
  const params = useParams();

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: "Highlights from the Annual Sports Day 2025",
      category: "Current",
      date: "2025-01-05",
      author: "School Activities Team",
      description: "A major tech event with speakers from all over Nepal.",
      image: "/aca2.jpg",
    },
    {
      id: 2,
      title: "How Our Students Learn Beyond the Classroom",
      category: "Upcoming",
      date: "2025-02-12",
      author: "School Activities Team",
      description: "Learn full-stack development in 2 weeks.",
      image: "/aca2.jpg",
    },
    {
      id: 3,
      title: "Campus Cultural Fest 2025",
      category: "Past",
      date: "2024-10-22",
      author: "Cultural Club",
      description: "Celebrating arts, music, and creativity on campus.",
      image: "/aca2.jpg",
    },
    {
      id: 4,
      title: "Campus Cultural Fest 2025",
      category: "Past",
      date: "2024-10-22",
      author: "Cultural Club",
      description: "Celebrating arts, music, and creativity on campus.",
      image: "/aca2.jpg",
    },
    {
      id: 5,
      title: "Campus Cultural Fest 2025",
      category: "Past",
      date: "2024-10-22",
      author: "Cultural Club",
      description: "Celebrating arts, music, and creativity on campus.",
      image: "/aca2.jpg",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const selectedViewItem = eventsData.find((m) => m.id === viewId);
  const selectedEditItem = eventsData.find((m) => m.id === editId);

  const totalPages = Math.ceil(eventsData.length / itemsPerPage);
  const paginatedEvents = eventsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);

    if (window.location.pathname.includes("/eventlist/view")) setViewId(id);
    if (window.location.pathname.includes("/eventlist/edit/")) setEditId(id);
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
    setEventsData((prev) => prev.filter((m) => m.id !== id));
    setOpen(false);
    setSelectedId(null);
    setConfirmDeleteId(null);
  };

  const getStatusColor = (category) => {
    switch (category?.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "current":
        return "bg-green-100 text-green-700";
      case "past":
        return "bg-red-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "—";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
const headers=[
  "Image",
  "Title",
  "Category",
  "Date",
  "Author",
  "Description",
  "Actions"]
  
  return (
    <div className="w-11/12 mx-auto py-8 relative">
      <div className="flex flex-col md:items-start items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold underline underline-offset-2 text-gray-800">
          Events & Updates
        </h2>
        <p className="text-gray-500 text-xs">
          This section includes image, title, category, date, author and
          description
        </p>
      </div>

      <button
        onClick={() => navigate("/addevent")}
        className="bg-linear-to-r from-[#0B0C28] to-cyan-400 mb-5 cursor-pointer text-white font-semibold py-2.5 px-6 rounded-lg"
      >
        Add Event
      </button>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
              {headers.map((head, idx) => (
                <th
                  key={idx}
                  className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide text-center"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="py-3 px-5 text-center">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                </td>

                <td className="py-3 px-5 text-sm text-gray-800 max-w-52 truncate">
                  {event.title}
                </td>

                <td className="py-3 px-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </td>

                <td className="py-3 px-5 text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </td>

                <td className="py-3 px-5 text-gray-700 text-sm">
                  {event.author}
                </td>

                <td className="py-3 px-5 text-gray-600 max-w-xs">
                  <div className="line-clamp-2">
                    {truncateDescription(event.description)}
                  </div>
                </td>

                <td className="py-3 px-3 text-center relative">
                  <button
                    onClick={(e) => toggleDropdown(e, event.id)}
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

      {eventsData.length > itemsPerPage && (
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
            onClick={() => navigate(`/events/eventlist/view/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center"
          >
            <MdVisibility /> View
          </button>

          <button
            onClick={() => navigate(`/events/eventlist/edit/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-green-700 items-center"
          >
            <MdEdit /> Edit
          </button>

          <button
            onClick={() => setConfirmDeleteId(selectedId)}
            className="w-full px-4 py-2 flex gap-2 text-red-600 items-center"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {selectedViewItem && (
        <ViewEvent
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/events/eventlist");
          }}
        />
      )}

      {selectedEditItem && (
        <EditEvent
          item={selectedEditItem}
          onUpdate={(updated) =>
            setEventsData((prev) =>
              prev.map((m) => (m.id === updated.id ? updated : m))
            )
          }
          onClose={() => {
            setEditId(null);
            navigate("/events/eventlist");
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
